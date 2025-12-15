// mother-product-details.js → Fully Integrated with Backend Wishlist API (Port 8083)
let currentProduct = null;
let quantity = 1;
let selectedVariant = null;
let currentUserId = 1;
const API_BASE = "http://localhost:8083/api/mb/products";
const IMAGE_BASE = "http://localhost:8083";
const CART_API_BASE = "http://localhost:8083/api/cart";
const WISHLIST_API_BASE = "http://localhost:8083/api/wishlist";
const selectedId = localStorage.getItem("selectedProductId");

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
                        console.log("Found users:", users);
                        return users[0].id || users[0].userId || 1;
                    }
                }
            } catch (e) {
                console.log(`Endpoint ${endpoint} not available`);
            }
        }
    } catch (error) {
        console.log("Could not fetch users:", error);
    }
 
    const testIds = [1, 100, 1000, 1001, 10000];
 
    for (const testId of testIds) {
        try {
            const response = await fetch(`${CART_API_BASE}/get-cart-items?userId=${testId}`);
            if (response.ok || response.status === 200) {
                console.log(`User ID ${testId} is valid (cart endpoint works)`);
                return testId;
            }
        } catch (e) {
            console.log(`User ID ${testId} test failed:`, e.message);
        }
    }
 
    console.warn("No valid user ID found. Using default ID 1.");
    console.warn("PLEASE CREATE A USER IN YOUR DATABASE WITH ID = 1");
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

async function loadRelatedProducts() {
    const container = document.getElementById('relatedProductsContainer');
    if (!container) return;
 
    container.innerHTML = '<div class="text-center py-8 w-full"><i class="fas fa-spinner fa-spin text-3xl text-pink-600"></i><p class="mt-2 text-gray-600">Loading related products...</p></div>';
 
    try {
        if (!currentProduct || !currentProduct.subcategory) {
            container.innerHTML = '<div class="text-center text-gray-500 py-8 w-full"><p class="text-lg">No related products found</p></div>';
            return;
        }
        const response = await fetch(`${API_BASE}/subcategory/exact/${encodeURIComponent(currentProduct.subcategory)}`);
     
        if (!response.ok) {
            throw new Error('Failed to fetch related products');
        }
     
        const products = await response.json();
        const relatedProducts = products.filter(product => product.id !== currentProduct.id).slice(0, 6);
     
        if (relatedProducts.length === 0) {
            container.innerHTML = '<div class="text-center text-gray-500 py-8 w-full"><p class="text-lg">No related products found</p></div>';
            return;
        }
     
        container.innerHTML = '';
     
        relatedProducts.forEach(product => {
            const price = product.price || 0;
            const originalPrice = product.originalPrice || null;
            const discount = product.discount || (originalPrice && originalPrice > price ? Math.round(((originalPrice - price) / originalPrice) * 100) : 0);
         
            const card = document.createElement('div');
            card.className = 'related-product-card bg-white rounded-xl shadow-md overflow-hidden cursor-pointer';
            card.style.minWidth = '250px';
            card.style.maxWidth = '250px';
         
            card.innerHTML = `
                <div class="related-image-container">
                    <img src="${IMAGE_BASE}/api/mb/products/${product.id}/image"
                         alt="${product.title}"
                         class="w-full h-48 object-cover"
                         onerror="this.src='https://via.placeholder.com/300x200?text=No+Image'">
                    ${discount > 0 ? `<span class="absolute top-3 right-2 bg-red-500 text-white px-2 py-1 rounded text-xs font-bold">${discount}% OFF</span>` : ''}
                    <button class="absolute top-2 right-2 w-10 h-10 bg-white rounded-full shadow-md flex items-center justify-center hover:bg-gray-100 wishlist-btn" data-id="${product.id}">
                        <i class="far fa-heart text-pink-600"></i>
                    </button>
                </div>
                <div class="related-content-container">
                    <h3 class="font-semibold text-gray-800 text-sm mb-1 truncate">${product.title}</h3>
                    <p class="text-gray-500 text-xs mb-2">${product.category || 'Mother Care'}</p>
                    <div class="flex items-center justify-between mt-2">
                        <div>
                            <span class="font-bold text-md text-green-600">₹${price.toLocaleString()}</span>
                            ${originalPrice ? `<span class="text-gray-500 text-sm line-through ml-1">₹${originalPrice.toLocaleString()}</span>` : ''}
                            ${discount > 0 ? `<span class="font-bold text-sm text-red-500 ml-1">(${discount}% OFF</span>` : ''}
                        </div>
                    </div>
                </div>
                <button class="view-details-btn view-details-button" data-id="${product.id}">
                    <i class="fas fa-eye mr-2"></i> View Details
                </button>
            `;
         
            container.appendChild(card);
         
            card.onclick = (e) => {
                if (e.target.closest('.wishlist-btn') || e.target.closest('.view-details-button')) {
                    return;
                }
                navigateToProduct(product.id);
            };
        });
     
        document.querySelectorAll('.view-details-button').forEach(btn => {
            btn.onclick = (e) => {
                e.stopPropagation();
                const productId = btn.getAttribute('data-id');
                navigateToProduct(productId);
            };
        });
     
        document.querySelectorAll('.wishlist-btn').forEach(btn => {
            btn.onclick = async (e) => {
                e.stopPropagation();
                const productId = parseInt(btn.getAttribute('data-id'));
                const product = relatedProducts.find(p => p.id === productId);
                if (product) {
                    await toggleProductWishlistBackend(product, btn);
                }
            };
        });
    } catch (error) {
        console.error('Error loading related products:', error);
        container.innerHTML = `
            <div class="text-center text-red-500 py-8 w-full">
                <p class="text-lg">Failed to load related products</p>
                <p class="text-sm mt-2">${error.message}</p>
            </div>
        `;
    }
}

function navigateToProduct(productId) {
    localStorage.setItem('selectedProductId', productId);
    window.location.reload();
}

// Backend Wishlist Functions
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

        if (response.ok) {
            const result = await response.json();
            console.log("Added to backend wishlist:", result);
            return true;
        } else {
            const error = await response.json();
            console.error("Failed to add to backend wishlist:", error);
            return false;
        }
    } catch (err) {
        console.error("Error calling wishlist API:", err);
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

        if (response.ok) {
            console.log("Removed from backend wishlist");
            return true;
        } else {
            console.error("Failed to remove from backend wishlist");
            return false;
        }
    } catch (err) {
        console.error("Error removing from wishlist:", err);
        return false;
    }
}

async function isInWishlistBackend(productId) {
    try {
        const response = await fetch(`${WISHLIST_API_BASE}/get-wishlist-items?userId=${currentUserId}`);
        if (!response.ok) return false;
        const items = await response.json();
        return items.some(item => item.productId == productId && item.productType === "MOTHER");
    } catch (err) {
        console.error("Error checking wishlist status:", err);
        return false;
    }
}

async function toggleProductWishlistBackend(product, btn) {
    const icon = btn.querySelector('i');
    const isCurrentlyIn = icon.classList.contains('fas');

    if (isCurrentlyIn) {
        const success = await removeFromWishlistBackend(product);
        if (success) {
            icon.className = "far fa-heart text-pink-600";
            showToast("Removed from Wishlist");
            updateLocalWishlistSync(product, false);
        }
    } else {
        const success = await addToWishlistBackend(product);
        if (success) {
            icon.className = "fas fa-heart text-pink-600";
            showToast("Added to Wishlist");
            updateLocalWishlistSync(product, true);
        }
    }
    updateWishlistCount();
}

// Keep localStorage in sync (for UI consistency)
function updateLocalWishlistSync(product, isAdded) {
    let wishlist = JSON.parse(localStorage.getItem("wishlist") || "[]");
    if (isAdded) {
        if (!wishlist.some(p => p.id === product.id)) {
            wishlist.push({
                id: product.id,
                name: product.title,
                price: product.price,
                originalPrice: product.originalPrice || null,
                image: `${IMAGE_BASE}/api/mb/products/${product.id}/image`
            });
        }
    } else {
        wishlist = wishlist.filter(p => p.id !== product.id);
    }
    localStorage.setItem("wishlist", JSON.stringify(wishlist));
}

function updateProductPage() {
    if (!currentProduct) {
        console.error('No current product to display');
        return;
    }
    const titleEl = document.getElementById('product-title');
    const breadcrumbEl = document.getElementById('breadcrumb-name');
    const mainImageEl = document.getElementById('mainImage');
    const descriptionEl = document.getElementById('product-description');
    if (titleEl) titleEl.textContent = currentProduct.title || 'Product';
    if (breadcrumbEl) breadcrumbEl.textContent = currentProduct.title || 'Product';
    if (mainImageEl) {
        mainImageEl.src = `${IMAGE_BASE}/api/mb/products/${currentProduct.id}/image`;
        mainImageEl.onerror = () => mainImageEl.src = 'https://via.placeholder.com/600x400?text=No+Image';
    }
 
    const description = Array.isArray(currentProduct.description)
        ? currentProduct.description.join(". ")
        : (currentProduct.description || "Premium quality product for mother care.");
    if (descriptionEl) descriptionEl.textContent = description;
    const starsSmallEl = document.getElementById('stars-small');
    const reviewsCountEl = document.getElementById('reviews-count');
    if (starsSmallEl) starsSmallEl.innerHTML = getStars(currentProduct.rating || 4.5);
    if (reviewsCountEl) reviewsCountEl.textContent = `(${currentProduct.reviewCount || 0} reviews)`;
    const sizeContainer = document.getElementById('sizeButtons');
    if (sizeContainer) {
        sizeContainer.innerHTML = '';
        const basePrice = currentProduct.price || 999;
        const baseOriginalPrice = currentProduct.originalPrice || null;
        const hasStock = currentProduct.inStock !== false;
        const stockQty = currentProduct.stockQuantity || 0;
        let variants = [];
     
        if (currentProduct.sizes && Array.isArray(currentProduct.sizes) && currentProduct.sizes.length > 0) {
            variants = currentProduct.sizes.map(size => ({
                size: size,
                price: basePrice,
                originalPrice: baseOriginalPrice,
                inStock: hasStock
            }));
        } else {
            variants = [
                { size: "S", price: basePrice - 100, originalPrice: baseOriginalPrice ? baseOriginalPrice - 100 : null, inStock: hasStock },
                { size: "M", price: basePrice, originalPrice: baseOriginalPrice, inStock: hasStock },
                { size: "L", price: basePrice + 100, originalPrice: baseOriginalPrice ? baseOriginalPrice + 100 : null, inStock: hasStock },
                { size: "XL", price: basePrice + 200, originalPrice: baseOriginalPrice ? baseOriginalPrice + 200 : null, inStock: hasStock },
                { size: "XXL", price: basePrice + 300, originalPrice: baseOriginalPrice ? baseOriginalPrice + 300 : null, inStock: stockQty > 50 }
            ];
        }
        variants.forEach(variant => {
            const btn = document.createElement('button');
            btn.className = `size-btn ${!variant.inStock ? 'disabled' : ''}`;
            btn.textContent = variant.size;
            btn.disabled = !variant.inStock;
            if (variant.inStock) {
                btn.onclick = () => selectSize(btn, variant);
            }
            sizeContainer.appendChild(btn);
        });
        const defaultBtn = sizeContainer.querySelector('.size-btn:not(.disabled)');
        if (defaultBtn) {
            defaultBtn.click();
        }
    }
    const thumbContainer = document.getElementById('thumbnailContainer');
    if (thumbContainer) {
        thumbContainer.innerHTML = '';
     
        const mainImageUrl = `${IMAGE_BASE}/api/mb/products/${currentProduct.id}/image`;
        const images = [mainImageUrl];
     
        for (let i = 0; i < 5; i++) {
            images.push(`${IMAGE_BASE}/api/mb/products/${currentProduct.id}/subimage/${i}`);
        }
     
        images.forEach((src, i) => {
            const img = document.createElement('img');
            img.src = src;
            img.className = 'thumbnail' + (i === 0 ? ' thumbnail-active' : '');
         
            img.onerror = () => {
                if (i === 0) {
                    img.src = 'https://via.placeholder.com/100?text=No+Image';
                } else {
                    img.style.display = 'none';
                }
            };
         
            img.onclick = () => {
                if (mainImageEl) {
                    mainImageEl.src = src;
                    mainImageEl.onerror = () => mainImageEl.src = mainImageUrl;
                }
                thumbContainer.querySelectorAll('.thumbnail').forEach(t => t.classList.remove('thumbnail-active'));
                img.classList.add('thumbnail-active');
            };
            thumbContainer.appendChild(img);
        });
    }
    const specsListEl = document.getElementById('specifications-list');
    if (specsListEl) {
        let specs = {};
     
        if (currentProduct.specifications) {
            try {
                specs = typeof currentProduct.specifications === 'string'
                    ? JSON.parse(currentProduct.specifications)
                    : currentProduct.specifications;
            } catch (e) {
                console.error('Error parsing specifications:', e);
                specs = {};
            }
        }
     
        if (Object.keys(specs).length === 0) {
            specs = {
                "Brand": currentProduct.brand || "Premium Brand",
                "Category": currentProduct.category || "Mother Care",
                "Subcategory": currentProduct.subcategory || "N/A",
                "Stock": currentProduct.inStock ? "In Stock" : "Out of Stock",
                "Stock Quantity": currentProduct.stockQuantity || "Limited"
            };
        }
     
        specsListEl.innerHTML = Object.entries(specs).map(([k, v], idx, arr) =>
            `<div class="flex justify-between py-3 ${idx !== arr.length - 1 ? 'border-b' : ''}">
                <span class="font-medium">${k}</span><span>${v}</span>
            </div>`
        ).join('');
    }
    if (currentProduct.features && Array.isArray(currentProduct.features) && currentProduct.features.length > 0) {
        const descriptionContent = document.getElementById('descriptionContent');
        if (descriptionContent && !descriptionContent.querySelector('.features-list')) {
            const featuresHtml = currentProduct.features.map(feature =>
                `<li class="flex items-start mb-2">
                    <i class="fas fa-check-circle text-green-500 mr-2 mt-1"></i>
                    <span>${feature}</span>
                </li>`
            ).join('');
         
            const featuresDiv = document.createElement('div');
            featuresDiv.className = 'mt-6';
            featuresDiv.innerHTML = `
                <h3 class="font-bold text-lg mb-3">Key Features:</h3>
                <ul class="features-list">${featuresHtml}</ul>
            `;
            descriptionContent.appendChild(featuresDiv);
        }
    }
    const overallRatingEl = document.getElementById('overall-rating');
    const starsLargeEl = document.getElementById('stars-large');
    const reviewSummaryEl = document.getElementById('review-summary');
 
    if (overallRatingEl) overallRatingEl.textContent = currentProduct.rating || 4.7;
    if (starsLargeEl) starsLargeEl.innerHTML = getStars(currentProduct.rating || 4.7);
    if (reviewSummaryEl) reviewSummaryEl.textContent = `Based on ${currentProduct.reviewCount || 0} reviews`;
 
    loadRelatedProducts();
}

async function addToCart() {
    console.log("addToCart function called");
 
    if (!selectedVariant) {
        showToast("Please select a size");
        return;
    }
    if (!currentProduct) {
        showToast("Product information not available");
        return;
    }
    const qtyEl = document.getElementById("quantity");
    const qty = qtyEl ? parseInt(qtyEl.textContent) : 1;
 
    console.log(`Adding to cart - Product ID: ${currentProduct.id}, Size: ${selectedVariant.size}, Quantity: ${qty}, User ID: ${currentUserId}`);
    try {
        const cartData = {
            userId: currentUserId,
            type: "MBP",
            mbpId: currentProduct.id,
            quantity: qty,
            selectedSize: selectedVariant.size || "",
            productType: "MOTHER"
        };
        console.log("Sending cart data to backend:", cartData);
        const response = await fetch(`${CART_API_BASE}/add-cart-items`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(cartData)
        });
        console.log("Backend response status:", response.status);
        if (!response.ok) {
            const errorText = await response.text();
            console.error("Backend error response:", errorText);
         
            if (errorText.includes("User not found")) {
                console.log("Trying to get valid user ID...");
                currentUserId = await getValidUserId();
                console.log("New user ID:", currentUserId);
             
                cartData.userId = currentUserId;
             
                const retryResponse = await fetch(`${CART_API_BASE}/add-cart-items`, {
                    method: 'POST',
                    headers: {
                        'Content-Type': 'application/json',
                    },
                    body: JSON.stringify(cartData)
                });
             
                if (!retryResponse.ok) {
                    throw new Error("Failed after retry: User not found");
                }
             
                const result = await retryResponse.json();
                console.log("Backend success response after retry:", result);
             
                updateLocalCart(qty);
                showToast(`Added ${qty} × Size ${selectedVariant.size} to cart`);
                updateCartUI();
                return;
            }
         
            throw new Error(`Failed to add to cart: ${errorText}`);
        }
        const result = await response.json();
        console.log("Backend success response:", result);
     
        updateLocalCart(qty);
        showToast(`Added ${qty} × Size ${selectedVariant.size} to cart`);
        updateCartUI();
     
    } catch (error) {
        console.error("Error adding to cart:", error);
     
        updateLocalCart(qty);
        showToast(`Added ${qty} × Size ${selectedVariant.size} to cart (offline mode)`);
        updateCartUI();
    }
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
    if (existing) {
        existing.quantity += qty;
    } else {
        cart.push(cartItem);
    }
    localStorage.setItem("cart", JSON.stringify(cart));
    updateCartCount();
}

function updateCartUI() {
    const btn = document.getElementById("addToCartBtn");
    if (btn) {
        btn.innerHTML = `<i class="fas fa-check mr-3"></i> Go to Bag`;
        btn.className = "flex-1 bg-green-600 hover:bg-[#3A6F43] text-white py-2 px-8 rounded-lg font-bold text-lg shadow-lg flex items-center justify-center top-0 p-0";
        btn.onclick = () => window.location.href = "../cart.html";
    }
}

async function toggleWishlist() {
    if (!currentProduct) return;
    const wishlistIcon = document.querySelector("#addToWishlistBtn i");
    const isFilled = wishlistIcon.classList.contains("fas");

    if (isFilled) {
        const success = await removeFromWishlistBackend(currentProduct);
        if (success) {
            wishlistIcon.className = "far fa-heart";
            showToast("Removed from Wishlist");
            updateLocalWishlistSync(currentProduct, false);
        }
    } else {
        const success = await addToWishlistBackend(currentProduct);
        if (success) {
            wishlistIcon.className = "fas fa-heart text-pink-600";
            showToast("Added to Wishlist");
            updateLocalWishlistSync(currentProduct, true);
        }
    }
    updateWishlistCount();
}

function showToast(msg) {
    console.log("Showing toast:", msg);
 
    const toast = document.createElement("div");
    toast.textContent = msg;
    toast.className = "fixed bottom-24 left-1/2 -translate-x-1/2 bg-black text-white px-6 py-3 rounded-full z-50 shadow-2xl text-sm font-medium";
    document.body.appendChild(toast);
    setTimeout(() => {
        toast.remove();
        console.log("Toast removed");
    }, 2000);
}

function updateCartCount() {
    console.log("Updating cart count from local storage");
 
    const cart = JSON.parse(localStorage.getItem("cart") || "[]");
    const total = cart.reduce((sum, item) => sum + (item.quantity || 1), 0);
 
    console.log(`Local storage cart count: ${total} items`);
 
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

async function loadProductFromBackend(productId) {
    try {
        console.log(`Fetching product ${productId} from ${API_BASE}/${productId}`);
        const response = await fetch(`${API_BASE}/${productId}`);
     
        if (!response.ok) {
            throw new Error(`HTTP error! status: ${response.status}`);
        }
     
        const product = await response.json();
        console.log('Product loaded successfully:', product);
        return product;
    } catch (error) {
        console.error('Error loading product from backend:', error);
        return null;
    }
}

document.addEventListener("DOMContentLoaded", async () => {
    console.log('DOM Content Loaded');
    console.log('Selected Product ID:', selectedId);
 
    try {
        currentUserId = await getValidUserId();
        console.log("Using user ID:", currentUserId);
        localStorage.setItem("currentUserId", currentUserId);
    } catch (error) {
        console.error("Could not get valid user ID:", error);
        currentUserId = 1;
    }
 
    if (!selectedId) {
        console.error('No product ID found in localStorage');
        showToast('No product selected. Redirecting...');
        setTimeout(() => {
            window.location.href = 'mother.html';
        }, 2000);
        return;
    }
    console.log('Loading product from backend...');
    currentProduct = await loadProductFromBackend(selectedId);
 
    if (!currentProduct) {
        console.error('Failed to load product');
        showToast('Product not found. Redirecting...');
        setTimeout(() => {
            window.location.href = 'mother.html';
        }, 2000);
        return;
    }
    console.log('Current product loaded:', currentProduct);
    updateProductPage();

    // Check wishlist status on load
    const isWishlisted = await isInWishlistBackend(currentProduct.id);
    const wishlistIcon = document.querySelector("#addToWishlistBtn i");
    if (isWishlisted) {
        wishlistIcon.className = "fas fa-heart text-pink-600";
        updateLocalWishlistSync(currentProduct, true);
    } else {
        wishlistIcon.className = "far fa-heart";
    }

    const increaseQtyBtn = document.getElementById("increaseQty");
    const decreaseQtyBtn = document.getElementById("decreaseQty");
    const addToCartBtn = document.getElementById("addToCartBtn");
    const addToWishlistBtn = document.getElementById("addToWishlistBtn");
    if (increaseQtyBtn) {
        increaseQtyBtn.onclick = () => {
            quantity++;
            const qtyEl = document.getElementById("quantity");
            if (qtyEl) qtyEl.textContent = quantity;
        };
    }
 
    if (decreaseQtyBtn) {
        decreaseQtyBtn.onclick = () => {
            if (quantity > 1) {
                quantity--;
                const qtyEl = document.getElementById("quantity");
                if (qtyEl) qtyEl.textContent = quantity;
            }
        };
    }
 
    if (addToCartBtn) {
        addToCartBtn.onclick = addToCart;
        console.log("Add to cart button event listener attached");
    }
 
    if (addToWishlistBtn) addToWishlistBtn.onclick = toggleWishlist;
    document.querySelectorAll('.tab-button').forEach(btn => {
        btn.onclick = () => {
            document.querySelectorAll('.tab-button').forEach(b => b.classList.remove('active'));
            document.querySelectorAll('[id$="Content"]').forEach(c => c.classList.add('hidden'));
            btn.classList.add('active');
            const contentId = btn.dataset.tab + 'Content';
            const contentEl = document.getElementById(contentId);
            if (contentEl) contentEl.classList.remove('hidden');
        };
    });
    document.querySelectorAll('.accordion-header').forEach(h => {
        h.onclick = () => {
            const content = h.nextElementSibling;
            const icon = h.querySelector('i');
            if (content) content.classList.toggle('active');
            if (icon) icon.classList.toggle('rotate-180');
        };
    });
 
    updateCartCount();
    updateWishlistCount();
 
    console.log("Page initialization complete");
});