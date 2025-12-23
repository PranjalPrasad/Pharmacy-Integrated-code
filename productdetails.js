// ==================== productdetails.js ====================
const API_BASE_URL = 'http://localhost:8083/api/products';
const CART_API_BASE = 'http://localhost:8083/api/cart';
const WISHLIST_API_BASE = 'http://localhost:8083/api/wishlist';
// Global variables
let cart = JSON.parse(localStorage.getItem('cart') || '[]');
let currentProduct = null;
let currentUserId = 1; // Will be updated dynamically
// ------------------- Utility Functions -------------------
function removeSkeleton() {
    document.querySelectorAll('.skeleton').forEach(el => {
        el.classList.remove('skeleton');
        el.style.background = '';
        el.style.backgroundImage = '';
        el.style.animation = '';
    });
}
function showToast(message) {
    document.querySelectorAll('.toast-notification').forEach(toast => toast.remove());
    const toast = document.createElement('div');
    toast.className = 'toast-notification fixed top-20 right-4 bg-green-600 text-white px-6 py-3 rounded-lg shadow-lg z-50 animate-in slide-in-from-right duration-300';
    toast.textContent = message;
    document.body.appendChild(toast);
    setTimeout(() => {
        toast.classList.add('animate-out', 'slide-out-to-right', 'duration-300');
        setTimeout(() => toast.remove(), 300);
    }, 3000);
}
function updateCartCount() {
    const total = cart.reduce((sum, item) => sum + (item.quantity || 1), 0);
    ['desktop-cart-count', 'mobile-cart-count'].forEach(id => {
        const el = document.getElementById(id);
        if (el) {
            el.textContent = total;
            el.style.display = total > 0 ? 'flex' : 'none';
        }
    });
}
function updateRightCartPanel() {
    const items = cart.reduce((sum, i) => sum + (i.quantity || 1), 0);
    const countEl = document.getElementById('cart-items-number');
    const textEl = document.getElementById('cart-items-text');
    const fullText = document.getElementById('cart-item-count-display');
    if (countEl) countEl.textContent = items;
    if (textEl) textEl.textContent = items === 1 ? '' : 's';
    if (fullText) {
        fullText.innerHTML = items === 0
            ? 'Your cart is empty'
            : `<span id="cart-items-number">${items}</span> Item<span id="cart-items-text">${items === 1 ? '' : 's'}</span> in Cart`;
    }
}
// Local cart sync helper (used for UI consistency and offline fallback)
function updateLocalCart(product, qty = 1) {
    const cartItem = {
        id: product.id,
        name: product.name,
        price: Number(product.price),
        image: product.image,
        quantity: qty,
        brand: product.brand || '',
        unit: product.unit || '',
        type: "PRODUCT",
        productId: product.id,
        productType: "MEDICINE" // Adjust if you have different categories
    };
    const existing = cart.find(item => item.id == cartItem.id);
    if (existing) {
        existing.quantity += qty;
    } else {
        cart.push(cartItem);
    }
    localStorage.setItem('cart', JSON.stringify(cart));
    updateCartCount();
    updateRightCartPanel();
}
// ------------------- Backend Cart Functions -------------------
async function getValidUserId() {
    const testIds = [1, 100, 1000, 1001, 10000];
    for (const testId of testIds) {
        try {
            const response = await fetch(`${CART_API_BASE}/get-cart-items?userId=${testId}`);
            if (response.ok || response.status === 200) {
                return testId;
            }
        } catch (e) {
            // continue
        }
    }
    console.warn("No valid user ID found. Using default 1.");
    return 1;
}
async function addToCartBackend(product, qty = 1) {
    try {
        const payload = {
            userId: currentUserId,
            type: "PRODUCT",
            productId: product.id,
            quantity: qty,
            selectedSize: "", // No size for medicines usually
            productType: "MEDICINE" // Change to MOTHER/BABY if needed
        };
        const response = await fetch(`${CART_API_BASE}/add-cart-items`, {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(payload)
        });
        if (!response.ok) {
            const err = await response.text();
            if (err.includes("User not found")) {
                currentUserId = await getValidUserId();
                payload.userId = currentUserId;
                const retry = await fetch(`${CART_API_BASE}/add-cart-items`, {
                    method: 'POST',
                    headers: { 'Content-Type': 'application/json' },
                    body: JSON.stringify(payload)
                });
                if (!retry.ok) throw new Error("Retry failed");
                const result = await retry.json();
                console.log("Cart add success (after retry):", result);
                return true;
            }
            throw new Error(err);
        }
        const result = await response.json();
        console.log("Cart add success:", result);
        return true;
    } catch (err) {
        console.error("Backend cart error:", err);
        return false;
    }
}
async function syncCartFromBackend() {
    try {
        const response = await fetch(`${CART_API_BASE}/get-cart-items?userId=${currentUserId}`);
        if (response.ok) {
            const items = await response.json();
            cart = items.map(item => ({
                id: item.itemId,
                name: item.title,
                price: Number(item.price),
                image: item.imageUrl,
                quantity: item.quantity,
                brand: '',
                unit: '',
                type: item.type,
                productId: item.itemId,
                productType: item.productType
            }));
            localStorage.setItem('cart', JSON.stringify(cart));
            updateCartCount();
            updateRightCartPanel();
        }
    } catch (err) {
        console.error("Failed to sync cart from backend:", err);
    }
}
// ------------------- Backend Wishlist Functions -------------------
async function addToWishlistBackend(product) {
    try {
        const response = await fetch(`${WISHLIST_API_BASE}/add-wishlist-items`, {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({
                userId: currentUserId,
                productId: product.id,
                productType: "MEDICINE" // Adjust if needed
            })
        });
        return response.ok;
    } catch (err) {
        console.error("Wishlist add error:", err);
        return false;
    }
}
async function removeFromWishlistBackend(product) {
    try {
        const response = await fetch(`${WISHLIST_API_BASE}/remove-wishlist-items`, {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({
                userId: currentUserId,
                productId: product.id
            })
        });
        return response.ok;
    } catch (err) {
        console.error("Wishlist remove error:", err);
        return false;
    }
}
async function isInWishlistBackend(productId) {
    try {
        const response = await fetch(`${WISHLIST_API_BASE}/get-wishlist-items?userId=${currentUserId}`);
        if (!response.ok) return false;
        const items = await response.json();
        return items.some(item => item.productId == productId);
    } catch (err) {
        console.error("Wishlist check error:", err);
        return false;
    }
}
function updateLocalWishlistSync(product, isAdded) {
    let wishlist = JSON.parse(localStorage.getItem('wishlist') || '[]');
    if (isAdded) {
        if (!wishlist.some(p => p.id === product.id)) {
            wishlist.push({
                id: product.id,
                name: product.name,
                price: product.price,
                image: product.image,
                brand: product.brand,
                unit: product.unit
            });
        }
    } else {
        wishlist = wishlist.filter(p => p.id !== product.id);
    }
    localStorage.setItem('wishlist', JSON.stringify(wishlist));
    window.dispatchEvent(new CustomEvent('wishlistUpdated'));
}
async function toggleWishlist(product) {
    const wishlistBtn = document.getElementById('wishlist-btn');
    if (!wishlistBtn) return;
    const heartIcon = wishlistBtn.querySelector('i');
    const isCurrentlyWishlisted = heartIcon.classList.contains('fas');
    if (isCurrentlyWishlisted) {
        const success = await removeFromWishlistBackend(product);
        if (success) {
            heartIcon.className = 'far fa-heart text-2xl text-gray-600';
            wishlistBtn.title = 'Add to wishlist';
            showToast('Removed from wishlist!');
            updateLocalWishlistSync(product, false);
        }
    } else {
        const success = await addToWishlistBackend(product);
        if (success) {
            heartIcon.className = 'fas fa-heart text-2xl text-red-500';
            wishlistBtn.title = 'Remove from wishlist';
            showToast('Added to wishlist!');
            updateLocalWishlistSync(product, true);
        }
    }
}
function updateWishlistButton() {
    const wishlistBtn = document.getElementById('wishlist-btn');
    if (!wishlistBtn || !currentProduct) return;
    const heartIcon = wishlistBtn.querySelector('i');
    if (heartIcon) {
        heartIcon.className = 'far fa-heart text-2xl text-gray-600'; // default
        wishlistBtn.title = 'Add to wishlist';
    }
    // Check backend status
    if (currentProduct) {
        isInWishlistBackend(currentProduct.id).then(isWishlisted => {
            if (isWishlisted) {
                heartIcon.className = 'fas fa-heart text-2xl text-red-500';
                wishlistBtn.title = 'Remove from wishlist';
            }
            wishlistBtn.onclick = () => toggleWishlist(currentProduct);
        });
    }
}
// ------------------- Updated Add to Cart -------------------
async function addToCart(product, qty = 1) {
    const success = await addToCartBackend(product, qty);
    if (success) {
        showToast(`${qty} ${qty > 1 ? 'items' : 'item'} added to cart!`);
    } else {
        showToast(`${qty} ${qty > 1 ? 'items' : 'item'} added to cart (saved locally)`);
    }
    // Always update local cart for UI consistency
    updateLocalCart(product, qty);
}
// ------------------- API Calls -------------------
async function fetchProductById(productId) {
    try {
        const response = await fetch(`${API_BASE_URL}/get-product/${productId}`);
        if (!response.ok) throw new Error('Product not found');
        return await response.json();
    } catch (err) {
        console.error(err);
        return null;
    }
}
async function fetchRelatedProducts(category, currentId) {
    try {
        const response = await fetch(`${API_BASE_URL}/get-by-category/${encodeURIComponent(category)}`);
        if (!response.ok) return [];
        const products = await response.json();
        return products
            .filter(p => p.productId != currentId && p.productQuantity > 0)
            .sort(() => Math.random() - 0.5)
            .slice(0, 4);
    } catch (err) {
        console.error(err);
        return [];
    }
}
// ------------------- Rendering Functions -------------------
// (All rendering functions remain exactly the same as original)
async function renderThumbnails(productId, mainImageUrl) {
    const container = document.getElementById('thumbnail-container');
    if (!container) return;
    container.innerHTML = '';
    const images = [mainImageUrl];
    for (let i = 0; i < 5; i++) {
        try {
            const res = await fetch(`${API_BASE_URL}/${productId}/subimage/${i}`);
            if (res.ok) {
                images.push(`${API_BASE_URL}/${productId}/subimage/${i}`);
            } else {
                break;
            }
        } catch {
            break;
        }
    }
    images.forEach((src, index) => {
        const img = document.createElement('img');
        img.src = src;
        img.alt = 'Product thumbnail';
        img.className = 'w-20 h-20 object-contain border-2 rounded-lg cursor-pointer hover:border-pharmeasy-green transition';
        img.onclick = () => {
            document.getElementById('main-product-image').src = src;
            container.querySelectorAll('img').forEach(t => t.classList.remove('border-pharmeasy-green'));
            img.classList.add('border-pharmeasy-green');
        };
        container.appendChild(img);
    });
    if (container.children.length > 0) {
        container.children[0].classList.add('border-pharmeasy-green');
    }
}
function formatDate(dateStr) {
    if (!dateStr) return 'Not specified';
    try {
        const date = new Date(dateStr);
        return date.toLocaleDateString('en-IN', { day: '2-digit', month: 'short', year: 'numeric' });
    } catch {
        return dateStr;
    }
}
function renderProductDetailsTab() {
    const tableBody = document.getElementById('specifications-table-body');
    if (!tableBody || !currentProduct) return;
    tableBody.innerHTML = '';
    const dynamicFields = currentProduct.productDynamicFields || {};
    const productDetails = [
        { label: 'Product Description', value: currentProduct.productDescription || 'No description available' },
        { label: 'Brand', value: currentProduct.brandName || 'Generic' },
        { label: 'Category', value: currentProduct.productSubCategory || currentProduct.productCategory || 'Health Supplements' },
        { label: 'Manufacturing Date', value: formatDate(currentProduct.mfgDate) },
        { label: 'Expiry Date', value: formatDate(currentProduct.expDate) },
        { label: 'Batch Number', value: currentProduct.batchNo || 'Not specified' },
        { label: 'Product Status', value: currentProduct.productQuantity > 0 ?
            '<span class="text-green-600 font-semibold">In Stock</span>' :
            '<span class="text-red-600 font-semibold">Out of Stock</span>' },
        { label: 'Available Quantity', value: currentProduct.productQuantity || 0 },
        { label: 'Product Unit', value: currentProduct.productUnit || 'Not specified' },
        { label: 'Form', value: dynamicFields.form || 'Not specified' },
        { label: 'Strength', value: dynamicFields.strength || 'Not specified' },
        { label: 'Shelf Life', value: dynamicFields.shelfLife || '24 months' },
        { label: 'Country of Origin', value: dynamicFields.countryOfOrigin || 'India' }
    ];
    productDetails.forEach((detail, index) => {
        if (detail.value && detail.value.toString().trim() !== '') {
            const row = document.createElement('tr');
            row.className = index % 2 === 0 ? 'bg-gray-50' : 'bg-white';
            row.innerHTML = `
                <td class="spec-label py-3 px-6 border-b border-gray-200">
                    <span class="font-semibold text-gray-700">${detail.label}</span>
                </td>
                <td class="spec-value py-3 px-6 border-b border-gray-200">
                    <div class="text-gray-600">${detail.value}</div>
                </td>
            `;
            tableBody.appendChild(row);
        }
    });
}
function renderBenefitsTab() {
    const content = document.getElementById('benefits-content');
    if (!content || !currentProduct) return;
    const benefits = currentProduct.benefitsList || [];
    content.innerHTML = benefits.length === 0
        ? `<div class="py-8"><h3 class="text-xl font-bold text-gray-800 mb-6">Product Benefits</h3><p class="text-gray-600">No benefits information available.</p></div>`
        : `<div class="py-8">
            <h3 class="text-xl font-bold text-gray-800 mb-6">Key Benefits</h3>
            <div class="bg-white rounded-lg border border-gray-200 p-6">
                <ul class="space-y-4">
                    ${benefits.map(b => `
                        <li class="flex items-start">
                            <span class="flex-shrink-0 w-8 h-8 bg-green-100 rounded-full flex items-center justify-center mr-3 mt-1">
                                <i class="fas fa-check text-green-600 text-sm"></i>
                            </span>
                            <span class="text-gray-700">${b}</span>
                        </li>`).join('')}
                </ul>
            </div>
        </div>`;
}
function renderIngredientsTab() {
    const content = document.getElementById('ingredients-content');
    if (!content || !currentProduct) return;
    const ingredients = currentProduct.ingredientsList || [];
    content.innerHTML = ingredients.length === 0
        ? `<div class="py-8"><h3 class="text-xl font-bold text-gray-800 mb-6">Product Ingredients</h3><p class="text-gray-600">No ingredients information available.</p></div>`
        : `<div class="py-8">
            <h3 class="text-xl font-bold text-gray-800 mb-6">Product Composition</h3>
            <div class="bg-white rounded-lg border border-gray-200 p-6">
                <ul class="space-y-3">
                    ${ingredients.map((ing, i) => `
                        <li class="flex items-start">
                            <span class="flex-shrink-0 w-6 h-6 bg-blue-100 rounded-full flex items-center justify-center mr-3 mt-1">
                                <span class="text-blue-600 text-xs font-bold">${i + 1}</span>
                            </span>
                            <span class="text-gray-700">${ing}</span>
                        </li>`).join('')}
                </ul>
            </div>
        </div>`;
}
function renderDirectionsTab() {
    const content = document.getElementById('directions-content');
    if (!content || !currentProduct) return;
    const directions = currentProduct.directionsList || [];
    const dynamic = currentProduct.productDynamicFields || {};
    let html = `<div class="py-8"><h3 class="text-xl font-bold text-gray-800 mb-6">Directions for Use</h3>`;
    if (directions.length > 0) {
        html += `<div class="mb-8"><div class="bg-white rounded-lg border border-gray-200 p-6">
            <ul class="space-y-4">
                ${directions.map((d, i) => `
                    <li class="flex items-start">
                        <span class="flex-shrink-0 w-8 h-8 bg-orange-100 rounded-full flex items-center justify-center mr-3 mt-1">
                            <span class="text-orange-600 font-bold">${i + 1}</span>
                        </span>
                        <span class="text-gray-700">${d}</span>
                    </li>`).join('')}
            </ul>
        </div></div>`;
    } else {
        html += `<div class="mb-8"><p class="text-gray-600">No directions information available.</p></div>`;
    }
    const additional = [];
    if (dynamic.dosage) additional.push({ label: 'Recommended Dosage', value: dynamic.dosage });
    if (currentProduct.prescriptionRequired) {
        additional.push({ label: 'Prescription Required', value: '<span class="text-red-600 font-semibold">Yes</span>' });
    } else {
        additional.push({ label: 'Prescription Required', value: '<span class="text-green-600 font-semibold">No</span>' });
    }
    if (dynamic.storage) additional.push({ label: 'Storage Instructions', value: dynamic.storage });
    if (dynamic.suitableFor) additional.push({ label: 'Suitable For', value: dynamic.suitableFor });
    if (additional.length > 0) {
        html += `<div><h4 class="text-lg font-bold text-gray-800 mb-4">Additional Information</h4>
            <div class="bg-gray-50 rounded-lg border border-gray-200 p-6">
                <table class="w-full"><tbody>
                    ${additional.map(a => `
                        <tr class="border-b border-gray-200 last:border-b-0">
                            <td class="py-3 font-medium text-gray-700 w-1/3">${a.label}</td>
                            <td class="py-3 text-gray-600">${a.value}</td>
                        </tr>`).join('')}
                </tbody></table>
            </div></div>`;
    }
    if (dynamic.warnings || dynamic.precautions) {
        html += `<div class="mt-8"><h4 class="text-lg font-bold text-red-800 mb-4">⚠️ Important Warnings</h4>
            <div class="bg-red-50 rounded-lg border border-red-200 p-6">
                <p class="text-red-700">${dynamic.warnings || dynamic.precautions}</p>
            </div></div>`;
    }
    html += `</div>`;
    content.innerHTML = html;
}
function renderAllTabs() {
    renderProductDetailsTab();
    renderBenefitsTab();
    renderIngredientsTab();
    renderDirectionsTab();
}
function renderRelatedProducts(products) {
    const container = document.getElementById('related-products-container');
    if (!container) return;
    container.innerHTML = products.length === 0
        ? '<p class="col-span-full text-center text-gray-500 py-8">No related products found</p>'
        : '';
    products.forEach(p => {
        const price = p.productPrice || 0;
        const mrp = p.productMRP || p.productOldPrice || 0;
        const discount = mrp > price ? Math.round(((mrp - price) / mrp) * 100) : 0;
        const card = document.createElement('div');
        card.className = 'bg-white rounded-xl shadow-md p-4 hover:shadow-lg transition cursor-pointer';
        card.innerHTML = `
            <img src="${API_BASE_URL}/${p.productId}/image" class="w-full h-40 object-cover rounded-lg mb-3" alt="${p.productName}">
            <h4 class="font-medium text-sm line-clamp-2 mb-1">${p.productName}</h4>
            <p class="text-xs text-gray-500">${p.brandName || 'Generic'}</p>
            <div class="mt-2 flex items-center gap-2">
                <span class="text-lg font-bold text-green-600">₹${price.toFixed(0)}</span>
                ${mrp > price ? `
                    <span class="text-sm text-gray-400 line-through">₹${mrp.toFixed(0)}</span>
                    <span class="text-xs text-green-600 font-bold">${discount}% off</span>
                ` : ''}
            </div>
            <button onclick="window.location.href='productdetails.html?id=${p.productId}'"
                class="w-full mt-3 bg-blue-600 hover:bg-blue-700 text-white py-2 rounded-lg text-sm font-medium">
                View Details
            </button>
        `;
        container.appendChild(card);
    });
}
// ------------------- Main Load Function -------------------
async function loadProduct() {
    // Get valid user ID first
    currentUserId = await getValidUserId();
    await syncCartFromBackend();
    const params = new URLSearchParams(window.location.search);
    const productId = params.get('id');
    if (!productId) {
        showNotFound();
        return;
    }
    const product = await fetchProductById(productId);
    if (!product) {
        showNotFound();
        return;
    }
    currentProduct = {
        ...product,
        id: product.productId,
        name: product.productName,
        price: product.productPrice,
        image: `${API_BASE_URL}/${product.productId}/image`,
        brand: product.brandName,
        unit: product.productUnit,
        category: product.productCategory
    };
    document.getElementById('product-name').textContent = currentProduct.name;
    document.getElementById('selling-price').textContent = '₹' + currentProduct.price.toFixed(0);
    const mrpPriceEl = document.getElementById('mrp-price');
    const discountBadge = document.getElementById('discount-badge');
    const lineThrough = document.querySelector('.line-through');
    if (product.productMRP && product.productMRP > currentProduct.price) {
        const mrp = product.productMRP;
        mrpPriceEl.textContent = '₹' + mrp.toFixed(0);
        const discount = Math.round(((mrp - currentProduct.price) / mrp) * 100);
        discountBadge.textContent = discount + '% OFF';
        discountBadge.classList.remove('hidden');
        if (lineThrough) lineThrough.classList.remove('hidden');
    } else {
        discountBadge.classList.add('hidden');
        if (lineThrough) lineThrough.classList.add('hidden');
    }
    const productUnitEl = document.getElementById('product-unit');
    if (productUnitEl && currentProduct.unit) {
        productUnitEl.textContent = currentProduct.unit;
    }
    const mainImg = document.getElementById('main-product-image');
    if (mainImg) {
        mainImg.src = currentProduct.image;
    }
    await renderThumbnails(product.productId, currentProduct.image);
    const quantityInput = document.getElementById('quantity-input');
    const available = currentProduct.productQuantity || 0;
    const addToCartBtn = document.getElementById('add-to-cart-btn');
    const buyNowBtn = document.getElementById('buy-now-btn');
    if (available > 0) {
        quantityInput.max = Math.min(available, 10);
        quantityInput.value = 1;
        quantityInput.disabled = false;
        addToCartBtn.disabled = false;
        addToCartBtn.innerHTML = '<i class="fas fa-shopping-cart mr-2"></i> Add to Cart';
        addToCartBtn.className = 'flex-1 px-2 bg-[#295F98] hover:bg-[#5C7285] text-white font-bold py-3 rounded-lg text-md shadow-lg transition flex items-center justify-center';
        buyNowBtn.disabled = false;
        buyNowBtn.innerHTML = '<i class="fas fa-bolt mr-2"></i> Buy Now';
        buyNowBtn.className = 'px-6 bg-orange-500 hover:bg-orange-600 text-white font-bold py-3 rounded-lg text-md shadow-lg transition';
    } else {
        quantityInput.disabled = true;
        quantityInput.value = 0;
        quantityInput.placeholder = 'Out of Stock';
        addToCartBtn.disabled = true;
        addToCartBtn.innerHTML = '<i class="fas fa-times-circle mr-2"></i> Out of Stock';
        addToCartBtn.className = 'flex-1 px-2 bg-gray-400 cursor-not-allowed text-white font-bold py-3 rounded-lg text-md shadow-lg transition flex items-center justify-center';
        buyNowBtn.disabled = true;
        buyNowBtn.innerHTML = '<i class="fas fa-times-circle mr-2"></i> Out of Stock';
        buyNowBtn.className = 'px-6 bg-gray-400 cursor-not-allowed text-white font-bold py-3 rounded-lg text-md shadow-lg transition';
    }
    renderAllTabs();
    updateWishlistButton();
    const related = await fetchRelatedProducts(currentProduct.category, currentProduct.id);
    renderRelatedProducts(related);
    initCartButtons();
    removeSkeleton();
}
function showNotFound() {
    document.getElementById('product-name').textContent = 'Product Not Found';
    document.getElementById('main-product-image').src = 'https://via.placeholder.com/600?text=Product+Not+Found';
    document.getElementById('selling-price').textContent = '₹0';
    document.getElementById('discount-badge').classList.add('hidden');
    removeSkeleton();
}
// ------------------- Init Functions -------------------
function initTabs() {
    const tabButtons = document.querySelectorAll('.tab-button');
    const tabContents = document.querySelectorAll('.tab-content');
    tabButtons.forEach(button => {
        button.addEventListener('click', () => {
            const tabId = button.getAttribute('data-tab');
            tabButtons.forEach(btn => btn.classList.remove('active'));
            tabContents.forEach(content => content.classList.remove('active'));
            button.classList.add('active');
            document.getElementById(`${tabId}-content`).classList.add('active');
        });
    });
}
function initQuantitySelector() {
    const decreaseBtn = document.getElementById('decrease-qty');
    const increaseBtn = document.getElementById('increase-qty');
    const quantityInput = document.getElementById('quantity-input');
    if (!decreaseBtn || !increaseBtn || !quantityInput) return;
    decreaseBtn.onclick = () => {
        const val = parseInt(quantityInput.value);
        if (val > 1) quantityInput.value = val - 1;
    };
    increaseBtn.onclick = () => {
        const val = parseInt(quantityInput.value);
        const max = parseInt(quantityInput.max);
        if (val < max) quantityInput.value = val + 1;
    };
    quantityInput.onchange = () => {
        let val = parseInt(quantityInput.value);
        const max = parseInt(quantityInput.max) || 10;
        const min = 1;
        if (isNaN(val) || val < min) val = min;
        if (val > max) val = max;
        quantityInput.value = val;
    };
}
function initCartButtons() {
    const addBtn = document.getElementById('add-to-cart-btn');
    const buyBtn = document.getElementById('buy-now-btn');
    if (addBtn && currentProduct && currentProduct.productQuantity > 0) {
        addBtn.onclick = async () => {
            const qty = parseInt(document.getElementById('quantity-input').value) || 1;
            await addToCart(currentProduct, qty);
        };
    }
    if (buyBtn && currentProduct && currentProduct.productQuantity > 0) {
        buyBtn.onclick = async () => {
            const qty = parseInt(document.getElementById('quantity-input').value) || 1;
            await addToCart(currentProduct, qty);
            setTimeout(() => window.location.href = 'cart.html', 300);
        };
    }
}
// ------------------- Page Init -------------------
document.addEventListener('DOMContentLoaded', () => {
    initTabs();
    initQuantitySelector();
    updateCartCount();
    updateRightCartPanel();
    loadProduct();
    const style = document.createElement('style');
    style.textContent = `
        @keyframes slideInFromRight { from { transform: translateX(100%); opacity: 0; } to { transform: translateX(0); opacity: 1; } }
        @keyframes slideOutToRight { from { transform: translateX(0); opacity: 1; } to { transform: translateX(100%); opacity: 0; } }
        .animate-in { animation: slideInFromRight 0.3s ease-out; }
        .animate-out { animation: slideOutToRight 0.3s ease-in; }
        .toast-notification { min-width: 300px; }
    `;
    document.head.appendChild(style);
});