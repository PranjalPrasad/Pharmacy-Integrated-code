// ====================== CONFIG & GLOBALS ======================
let currentProduct = null;
let quantity = 1;
let selectedVariant = null;
let currentUserId = 1;

const API_BASE = "http://localhost:8083/api/mb/products";
const IMAGE_BASE = "http://localhost:8083";
const CART_API_BASE = "http://localhost:8083/api/cart";
const WISHLIST_API_BASE = "http://localhost:8083/api/wishlist";

const selectedId = localStorage.getItem("selectedProductId");

// ====================== HELPER FUNCTIONS ======================
async function getValidUserId() {
    console.log("Getting valid user ID...");
    try {
        const endpoints = [
            'http://localhost:8083/api/users',
            'http://localhost:8083/api/users/all',
            'http://localhost:8083/api/users/list'
        ];

        for (const endpoint of endpoints) {
            try {
                const response = await fetch(endpoint);
                if (response.ok) {
                    const users = await response.json();
                    if (users && users.length > 0) {
                        return users[0].id || users[0].userId || 1;
                    }
                }
            } catch (e) { console.log(`Endpoint ${endpoint} not available`); }
        }
    } catch (error) { console.log("Could not fetch users:", error); }

    const testIds = [1, 100, 1000, 1001, 10000];
    for (const testId of testIds) {
        try {
            const response = await fetch(`${CART_API_BASE}/get-cart-items?userId=${testId}`);
            if (response.ok || response.status === 200) {
                console.log(`User ID ${testId} is valid`);
                return testId;
            }
        } catch (e) { }
    }
    console.warn("Using default user ID 1");
    return 1;
}

function getStars(rating) {
    let html = '';
    for (let i = 1; i <= 5; i++) {
        if (i <= Math.floor(rating)) html += '<i class="fas fa-star text-yellow-400"></i>';
        else if (i === Math.ceil(rating) && rating % 1 >= 0.5) html += '<i class="fas fa-star-half-alt text-yellow-400"></i>';
        else html += '<i class="far fa-star text-yellow-400"></i>';
    }
    return html;
}

function updatePriceDisplay() {
    if (!selectedVariant) return;
    const currentPriceEl = document.getElementById('current-price');
    const originalPriceEl = document.getElementById('original-price');
    const discountBadgeEl = document.getElementById('discount-badge');

    if (currentPriceEl) currentPriceEl.textContent = `₹${selectedVariant.price.toLocaleString()}`;
    if (originalPriceEl) {
        originalPriceEl.textContent = selectedVariant.originalPrice ? `₹${selectedVariant.originalPrice.toLocaleString()}` : '';
        originalPriceEl.classList.toggle('hidden', !selectedVariant.originalPrice);
    }
    if (discountBadgeEl) {
        if (selectedVariant.originalPrice && selectedVariant.originalPrice > selectedVariant.price) {
            const discount = Math.round(((selectedVariant.originalPrice - selectedVariant.price) / selectedVariant.originalPrice) * 100);
            discountBadgeEl.textContent = `${discount}% OFF`;
            discountBadgeEl.classList.remove('hidden');
        } else {
            discountBadgeEl.classList.add('hidden');
        }
    }
}

function selectSize(btn, variant) {
    document.querySelectorAll('.size-btn').forEach(b => b.classList.remove('selected'));
    btn.classList.add('selected');
    selectedVariant = variant;
    updatePriceDisplay();

    const cartBtn = document.getElementById('addToCartBtn');
    if (cartBtn) {
        cartBtn.disabled = false;
        cartBtn.classList.remove('opacity-50', 'bg-gray-400', 'cursor-not-allowed');
        cartBtn.classList.add('bg-[#CD2C58]', 'hover:bg-[#850E35]');
        cartBtn.innerHTML = `<i class="fas fa-shopping-cart mr-3"></i> Add to Cart`;
    }
}

function navigateToProduct(productId) {
    localStorage.setItem('selectedProductId', productId);
    window.location.reload();
}

function showToast(msg) {
    const toast = document.createElement("div");
    toast.textContent = msg;
    toast.className = "fixed bottom-24 left-1/2 -translate-x-1/2 bg-black text-white px-6 py-3 rounded-full z-50 shadow-2xl text-sm font-medium";
    document.body.appendChild(toast);
    setTimeout(() => toast.remove(), 2000);
}

function updateCartCount() {
    const cart = JSON.parse(localStorage.getItem("cart") || "[]");
    const total = cart.reduce((sum, item) => sum + (item.quantity || 1), 0);
    document.querySelectorAll("#cartCount, .cart-count").forEach(el => {
        el.textContent = total;
        el.classList.toggle("hidden", total === 0);
    });
}

function updateWishlistCount() {
    const wishlist = JSON.parse(localStorage.getItem("wishlist") || "[]");
    document.querySelectorAll("#wishlistCount, .wishlist-count").forEach(el => {
        el.textContent = wishlist.length;
        el.classList.toggle("hidden", wishlist.length === 0);
    });
}

function updateLocalCart(qty) {
    let cart = JSON.parse(localStorage.getItem("cart") || "[]");
    const cartItem = {
        id: currentProduct.id,
        name: currentProduct.title,
        size: selectedVariant.size,
        price: selectedVariant.price,
        originalPrice: selectedVariant.originalPrice || null,
        image: `${IMAGE_BASE}/api/mb/products/${currentProduct.id}/image`,
        quantity: qty,
        type: "MBP",
        mbpId: currentProduct.id,
        productType: "MOTHER"
    };
    const existing = cart.find(item => item.id === cartItem.id && item.size === cartItem.size);
    if (existing) existing.quantity += qty;
    else cart.push(cartItem);
    localStorage.setItem("cart", JSON.stringify(cart));
    updateCartCount();
}

function updateLocalWishlistSync(product, isAdded) {
    let wishlist = JSON.parse(localStorage.getItem("wishlist") || "[]");
    if (isAdded) {
        if (!wishlist.some(p => p.id === product.id)) {
            wishlist.push({
                id: product.id,
                name: product.title,
                price: product.price?.[0] || 0,
                originalPrice: product.originalPrice?.[0] || null,
                image: `${IMAGE_BASE}/api/mb/products/${product.id}/image`
            });
        }
    } else {
        wishlist = wishlist.filter(p => p.id !== product.id);
    }
    localStorage.setItem("wishlist", JSON.stringify(wishlist));
}

// ====================== BACKEND INTEGRATIONS ======================
async function loadProductFromBackend(productId) {
    try {
        const response = await fetch(`${API_BASE}/${productId}`);
        if (!response.ok) throw new Error(`HTTP ${response.status}`);
        return await response.json();
    } catch (error) {
        console.error('Error loading product:', error);
        return null;
    }
}

async function loadRelatedProducts() {
    const container = document.getElementById('relatedProductsContainer');
    if (!container) return;

    container.innerHTML = '<div class="text-center py-8 w-full"><i class="fas fa-spinner fa-spin text-3xl text-pink-600"></i><p class="mt-2 text-gray-600">Loading related products...</p></div>';

    try {
        if (!currentProduct || !currentProduct.subCategory) {
            container.innerHTML = '<div class="text-center text-gray-500 py-8 w-full"><p class="text-lg">No subcategory found</p></div>';
            return;
        }

        const subCategory = encodeURIComponent(currentProduct.subCategory.trim());
        const response = await fetch(`${API_BASE}/sub-category/${subCategory}`);
        if (!response.ok) throw new Error("Failed to fetch related products");

        const products = await response.json();
        const related = products.filter(p => p.id !== currentProduct.id).slice(0, 6);

        if (related.length === 0) {
            container.innerHTML = '<div class="text-center text-gray-500 py-8 w-full"><p class="text-lg">No related products found</p></div>';
            return;
        }

        container.innerHTML = '';
        related.forEach(product => {
            const price = product.price?.[0] || 0;
            const originalPrice = product.originalPrice?.[0] || null;
            const discount = product.discount || (originalPrice && originalPrice > price
                ? Math.round(((originalPrice - price) / originalPrice) * 100)
                : 0);

            const card = document.createElement('div');
            card.className = 'related-product-card bg-white rounded-xl shadow-md overflow-hidden cursor-pointer';
            card.innerHTML = `
                <div class="related-image-container relative">
                    <img src="${IMAGE_BASE}/api/mb/products/${product.id}/image" alt="${product.title}" class="w-full h-48 object-cover"
                         onerror="this.src='https://via.placeholder.com/300x200?text=No+Image'">
                    ${discount > 0 ? `<span class="absolute top-3 right-2 bg-red-500 text-white px-2 py-1 rounded text-xs font-bold">${discount}% OFF</span>` : ''}
                    <button class="absolute top-2 right-2 w-10 h-10 bg-white rounded-full shadow-md flex items-center justify-center hover:bg-gray-100 wishlist-btn" data-id="${product.id}">
                        <i class="far fa-heart text-pink-600"></i>
                    </button>
                </div>
                <div class="related-content-container p-4">
                    <h3 class="font-semibold text-gray-800 text-sm mb-1 truncate">${product.title}</h3>
                    <p class="text-gray-500 text-xs mb-2">${product.category || 'Mother Care'}</p>
                    <div class="flex items-center justify-between mt-2">
                        <div>
                            <span class="font-bold text-md text-green-600">₹${price.toLocaleString()}</span>
                            ${originalPrice ? `<span class="text-gray-500 text-sm line-through ml-1">₹${originalPrice.toLocaleString()}</span>` : ''}
                            ${discount > 0 ? `<span class="font-bold text-sm text-red-500 ml-1">(${discount}% OFF)</span>` : ''}
                        </div>
                    </div>
                </div>
                <button class="view-details-btn view-details-button w-full bg-pink-600 text-white py-2 font-medium hover:bg-pink-700" data-id="${product.id}">
                    <i class="fas fa-eye mr-2"></i> View Details
                </button>
            `;
            container.appendChild(card);

            card.onclick = (e) => {
                if (e.target.closest('.wishlist-btn') || e.target.closest('.view-details-button')) return;
                navigateToProduct(product.id);
            };
        });

        document.querySelectorAll('.view-details-button').forEach(btn => {
            btn.onclick = (e) => {
                e.stopPropagation();
                navigateToProduct(btn.getAttribute('data-id'));
            };
        });

        document.querySelectorAll('.wishlist-btn').forEach(btn => {
            btn.onclick = async (e) => {
                e.stopPropagation();
                const productId = parseInt(btn.getAttribute('data-id'));
                const product = related.find(p => p.id === productId);
                if (product) await toggleProductWishlistBackend(product, btn);
            };
        });

    } catch (error) {
        console.error('Error loading related products:', error);
        container.innerHTML = `<div class="text-center text-red-500 py-8 w-full"><p>Failed to load related products</p></div>`;
    }
}

// Wishlist Backend
async function addToWishlistBackend(product) {
    try {
        const response = await fetch(`${WISHLIST_API_BASE}/add-wishlist-items`, {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({
                userId: currentUserId,
                productId: product.id,
                productType: "MOTHER"
            })
        });
        return response.ok;
    } catch (err) { console.error(err); return false; }
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
    } catch (err) { console.error(err); return false; }
}

async function isInWishlistBackend(productId) {
    try {
        const response = await fetch(`${WISHLIST_API_BASE}/get-wishlist-items?userId=${currentUserId}`);
        if (!response.ok) return false;
        const items = await response.json();
        return items.some(item => item.productId == productId && item.productType === "MOTHER");
    } catch (err) { return false; }
}

async function toggleProductWishlistBackend(product, btn) {
    const icon = btn.querySelector('i');
    const isFilled = icon.classList.contains('fas');
    const success = isFilled ? await removeFromWishlistBackend(product) : await addToWishlistBackend(product);
    if (success) {
        icon.className = isFilled ? "far fa-heart text-pink-600" : "fas fa-heart text-pink-600";
        showToast(isFilled ? "Removed from Wishlist" : "Added to Wishlist");
        updateLocalWishlistSync(product, !isFilled);
        updateWishlistCount();
    }
}

async function toggleWishlist() {
    if (!currentProduct) return;
    const icon = document.querySelector("#addToWishlistBtn i");
    const isFilled = icon.classList.contains("fas");
    const success = isFilled ? await removeFromWishlistBackend(currentProduct) : await addToWishlistBackend(currentProduct);
    if (success) {
        icon.className = isFilled ? "far fa-heart" : "fas fa-heart text-pink-600";
        showToast(isFilled ? "Removed from Wishlist" : "Added to Wishlist");
        updateLocalWishlistSync(currentProduct, !isFilled);
        updateWishlistCount();
    }
}

async function addToCart() {
    if (!selectedVariant) return showToast("Please select a size");
    if (!currentProduct) return showToast("Product not loaded");

    const qty = parseInt(document.getElementById("quantity").textContent);

    try {
        const cartData = {
            userId: currentUserId,
            type: "MBP",
            mbpId: currentProduct.id,
            quantity: qty,
            selectedSize: selectedVariant.size || "",
            productType: "MOTHER"
        };

        const response = await fetch(`${CART_API_BASE}/add-cart-items`, {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(cartData)
        });

        if (!response.ok) {
            const text = await response.text();
            if (text.includes("User not found")) {
                currentUserId = await getValidUserId();
                cartData.userId = currentUserId;
                const retry = await fetch(`${CART_API_BASE}/add-cart-items`, {
                    method: 'POST',
                    headers: { 'Content-Type': 'application/json' },
                    body: JSON.stringify(cartData)
                });
                if (!retry.ok) throw new Error("Retry failed");
            } else throw new Error("Add to cart failed");
        }

        updateLocalCart(qty);
        showToast(`Added ${qty} × Size ${selectedVariant.size} to cart`);
        const btn = document.getElementById("addToCartBtn");
        btn.innerHTML = `<i class="fas fa-check mr-3"></i> Go to Bag`;
        btn.onclick = () => window.location.href = "../cart.html";

    } catch (error) {
        console.error(error);
        updateLocalCart(qty);
        showToast(`Added to cart (offline)`);
    }
}

// ====================== UI UPDATE ======================
function updateProductPage() {
    if (!currentProduct) return;

    document.getElementById('product-title').textContent = currentProduct.title || 'Product';
    document.getElementById('breadcrumb-name').textContent = currentProduct.title || 'Product';

    const mainImg = document.getElementById('mainImage');
    mainImg.src = `${IMAGE_BASE}/api/mb/products/${currentProduct.id}/image`;
    mainImg.onerror = () => mainImg.src = 'https://via.placeholder.com/600x400?text=No+Image';

    const desc = Array.isArray(currentProduct.description)
        ? currentProduct.description.join(". ")
        : (currentProduct.description || "Premium quality product for mother care.");
    document.getElementById('product-description').textContent = desc;

    document.getElementById('stars-small').innerHTML = getStars(currentProduct.rating || 4.5);

    // Sizes & Pricing
    const sizeContainer = document.getElementById('sizeButtons');
    sizeContainer.innerHTML = '';

    const basePrice = currentProduct.price?.[0] || 999;
    const baseOriginalPrice = currentProduct.originalPrice?.[0] || null;

    let variants = [];
    if (currentProduct.sizes && currentProduct.sizes.length > 0) {
        variants = currentProduct.sizes.map((size, i) => ({
            size,
            price: currentProduct.price?.[i] || basePrice,
            originalPrice: currentProduct.originalPrice?.[i] || baseOriginalPrice,
            inStock: currentProduct.inStock !== false
        }));
    } else {
        variants = ["S", "M", "L", "XL", "XXL"].map((size, i) => ({
            size,
            price: basePrice + i * 100 - 100,
            originalPrice: baseOriginalPrice ? baseOriginalPrice + i * 100 - 100 : null,
            inStock: true
        }));
    }

    variants.forEach(variant => {
        const btn = document.createElement('button');
        btn.className = `size-btn ${!variant.inStock ? 'disabled' : ''}`;
        btn.textContent = variant.size;
        btn.disabled = !variant.inStock;
        if (variant.inStock) btn.onclick = () => selectSize(btn, variant);
        sizeContainer.appendChild(btn);
    });

    if (sizeContainer.querySelector('.size-btn:not(.disabled)')) {
        sizeContainer.querySelector('.size-btn:not(.disabled)').click();
    }

    // Thumbnails
    const thumbContainer = document.getElementById('thumbnailContainer');
    thumbContainer.innerHTML = '';
    const images = [`${IMAGE_BASE}/api/mb/products/${currentProduct.id}/image`];
    for (let i = 0; i < 5; i++) {
        images.push(`${IMAGE_BASE}/api/mb/products/${currentProduct.id}/subimage/${i}`);
    }
    images.forEach((src, i) => {
        const img = document.createElement('img');
        img.src = src;
        img.className = 'thumbnail' + (i === 0 ? ' thumbnail-active' : '');
        img.onerror = () => { if (i !== 0) img.style.display = 'none'; };
        img.onclick = () => {
            mainImg.src = src;
            thumbContainer.querySelectorAll('.thumbnail').forEach(t => t.classList.remove('thumbnail-active'));
            img.classList.add('thumbnail-active');
        };
        thumbContainer.appendChild(img);
    });

    // Specifications
    let specs = {};
    if (currentProduct.specifications) {
        try { specs = typeof currentProduct.specifications === 'string' ? JSON.parse(currentProduct.specifications) : currentProduct.specifications; }
        catch (e) { specs = {}; }
    }
    if (Object.keys(specs).length === 0) {
        specs = {
            "Brand": currentProduct.brand || "Premium Brand",
            "Category": currentProduct.category || "Mother Care",
            "Subcategory": currentProduct.subCategory || "N/A",
            "Stock": currentProduct.inStock ? "In Stock" : "Out of Stock"
        };
    }
    document.getElementById('specifications-list').innerHTML = Object.entries(specs)
        .map(([k, v], i, arr) => `<div class="flex justify-between py-3 ${i !== arr.length - 1 ? 'border-b' : ''}"><span class="font-medium">${k}</span><span>${v}</span></div>`)
        .join('');

    // Features
    if (currentProduct.features && currentProduct.features.length > 0) {
        const descParent = document.querySelector('#product-description').parentElement;
        if (!descParent.querySelector('.features-list')) {
            const featuresDiv = document.createElement('div');
            featuresDiv.className = 'mt-6';
            featuresDiv.innerHTML = `<h3 class="font-bold text-lg mb-3">Key Features:</h3><ul class="features-list space-y-2">${currentProduct.features.map(f => `<li class="flex items-start"><i class="fas fa-check-circle text-green-500 mr-2 mt-1"></i><span>${f}</span></li>`).join('')}</ul>`;
            descParent.appendChild(featuresDiv);
        }
    }

    loadRelatedProducts();
}

// ====================== INITIALIZATION ======================
document.addEventListener("DOMContentLoaded", async () => {
    currentUserId = await getValidUserId();
    localStorage.setItem("currentUserId", currentUserId);

    if (!selectedId) {
        showToast('No product selected. Redirecting...');
        setTimeout(() => window.location.href = 'mother.html', 2000);
        return;
    }

    currentProduct = await loadProductFromBackend(selectedId);
    if (!currentProduct) {
        showToast('Product not found');
        setTimeout(() => window.location.href = 'mother.html', 2000);
        return;
    }

    updateProductPage();

    const isWishlisted = await isInWishlistBackend(currentProduct.id);
    const wishlistIcon = document.querySelector("#addToWishlistBtn i");
    wishlistIcon.className = isWishlisted ? "fas fa-heart text-pink-600" : "far fa-heart";
    if (isWishlisted) updateLocalWishlistSync(currentProduct, true);

    document.getElementById("increaseQty").onclick = () => {
        quantity++;
        document.getElementById("quantity").textContent = quantity;
    };
    document.getElementById("decreaseQty").onclick = () => {
        if (quantity > 1) {
            quantity--;
            document.getElementById("quantity").textContent = quantity;
        }
    };

    document.getElementById("addToCartBtn").onclick = addToCart;
    document.getElementById("addToWishlistBtn").onclick = toggleWishlist;

    // Tabs
    document.querySelectorAll('.tab-button').forEach(btn => {
        btn.onclick = () => {
            document.querySelectorAll('.tab-button').forEach(b => b.classList.remove('active'));
            document.querySelectorAll('[id$="Content"]').forEach(c => c.classList.add('hidden'));
            btn.classList.add('active');
            document.getElementById(btn.dataset.tab + 'Content').classList.remove('hidden');
        };
    });

    // Accordions
    document.querySelectorAll('.accordion-header').forEach(h => {
        h.onclick = () => {
            const content = h.nextElementSibling;
            const icon = h.querySelector('i');
            content.classList.toggle('active');
            icon.classList.toggle('rotate-180');
        };
    });

    updateCartCount();
    updateWishlistCount();
});