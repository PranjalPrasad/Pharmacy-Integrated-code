// mother-product-details.js → SIZE BUTTONS (S, M, L, XL, XXL) + DYNAMIC PRICING + RELATED PRODUCTS

let currentProduct = null;
let quantity = 1;
let selectedVariant = null;

const allProducts = JSON.parse(localStorage.getItem("allProducts") || "[]");
const selectedId = localStorage.getItem("selectedProductId");

// Sample products if localStorage is empty
const sampleProducts = [
    {
        id: 1,
        title: "Nursing Bra (Comfort Plus)",
        category: "Maternity Wear",
        price: 1299,
        originalPrice: 1999,
        mainImageUrl: "https://images.unsplash.com/photo-1584974292709-0b0f0b9c9b1f?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=500&q=80",
        rating: 4.5,
        reviewCount: 128,
        description: "Comfortable nursing bra with easy clip access.",
        brand: "Mother Comfort",
        isNew: true
    },
    {
        id: 2,
        title: "Maternity Dress (Elegant Floral)",
        category: "Maternity Wear",
        price: 2499,
        originalPrice: 3299,
        mainImageUrl: "https://images.unsplash.com/photo-1523381210434-271e8be1f52b?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=500&q=80",
        rating: 4.7,
        reviewCount: 89,
        description: "Beautiful floral print maternity dress.",
        brand: "Elegant Mom",
        isNew: false
    },
    {
        id: 3,
        title: "Breast Pump (Electric)",
        category: "Breastfeeding",
        price: 3999,
        originalPrice: 4999,
        mainImageUrl: "https://images.unsplash.com/photo-1558618666-fcd25c85cd64?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=500&q=80",
        rating: 4.8,
        reviewCount: 234,
        description: "Electric breast pump with multiple settings.",
        brand: "Baby Comfort",
        isNew: true
    },
    {
        id: 4,
        title: "Maternity Pillow (C-Shaped)",
        category: "Pregnancy Comfort",
        price: 1799,
        originalPrice: 2499,
        mainImageUrl: "https://images.unsplash.com/photo-1588776814546-1ffcf47267a5?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=500&q=80",
        rating: 4.6,
        reviewCount: 156,
        description: "C-shaped maternity pillow for full body support.",
        brand: "SleepWell",
        isNew: false
    },
    {
        id: 5,
        title: "Nursing Cover (Multiprint)",
        category: "Breastfeeding",
        price: 899,
        originalPrice: 1299,
        mainImageUrl: "https://images.unsplash.com/photo-1595272564595-8f35d63df2d9?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=500&q=80",
        rating: 4.4,
        reviewCount: 78,
        description: "Stylish nursing cover with multiple prints.",
        brand: "Modest Mom",
        isNew: true
    },
    {
        id: 6,
        title: "Postpartum Girdle",
        category: "Postpartum Care",
        price: 1599,
        originalPrice: 2199,
        mainImageUrl: "https://images.unsplash.com/photo-1556909114-f6e7ad7d3136?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=500&q=80",
        rating: 4.3,
        reviewCount: 112,
        description: "Postpartum abdominal support girdle.",
        brand: "Recovery Plus",
        isNew: false
    }
];

// Initialize products if localStorage is empty
if (allProducts.length === 0) {
    localStorage.setItem("allProducts", JSON.stringify(sampleProducts));
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

    currentPriceEl.textContent = `₹${selectedVariant.price}`;
    originalPriceEl.textContent = selectedVariant.originalPrice ? `₹${selectedVariant.originalPrice}` : '';
    originalPriceEl.classList.toggle('hidden', !selectedVariant.originalPrice);

    if (selectedVariant.originalPrice && selectedVariant.originalPrice > selectedVariant.price) {
        const discount = Math.round(((selectedVariant.originalPrice - selectedVariant.price) / selectedVariant.originalPrice) * 100);
        discountBadgeEl.textContent = `${discount}% OFF`;
        discountBadgeEl.classList.remove('hidden');
    } else {
        discountBadgeEl.classList.add('hidden');
    }
}

function selectSize(btn, variant) {
    // Remove selected from all
    document.querySelectorAll('.size-btn').forEach(b => b.classList.remove('selected'));
    // Add selected to clicked
    btn.classList.add('selected');

    selectedVariant = variant;
    updatePriceDisplay();

    // Enable Add to Cart
    const cartBtn = document.getElementById('addToCartBtn');
    cartBtn.disabled = false;
    cartBtn.classList.remove('opacity-50', 'bg-gray-400', 'cursor-not-allowed');
    cartBtn.classList.add('bg-[#CD2C58]', 'hover:bg-[#850E35]');
    cartBtn.innerHTML = `<i class="fas fa-shopping-cart mr-3"></i> Add to Cart`;
}

function loadRelatedProducts() {
    const container = document.getElementById('relatedProductsContainer');
    container.innerHTML = '';
    
    // Get fresh products from localStorage
    const products = JSON.parse(localStorage.getItem("allProducts") || "[]");
    
    // Filter related products (same category, exclude current product)
    let relatedProducts = [];
    
    if (currentProduct && currentProduct.category) {
        relatedProducts = products
            .filter(product => 
                product.id !== currentProduct.id && 
                product.category === currentProduct.category
            )
            .slice(0, 6); // Limit to 6 related products
    }
    
    // If no same category products, show other products
    if (relatedProducts.length === 0) {
        relatedProducts = products
            .filter(product => product.id !== currentProduct.id)
            .slice(0, 6);
    }
    
    if (relatedProducts.length === 0) {
        container.innerHTML = `
            <div class="text-center text-gray-500 py-8 w-full">
                <p class="text-lg">No related products found</p>
            </div>
        `;
        return;
    }
    
    relatedProducts.forEach(product => {
        const price = product.price || 999;
        const originalPrice = product.originalPrice || null;
        const discount = originalPrice ? Math.round(((originalPrice - price) / originalPrice) * 100) : 0;
        
        const card = document.createElement('div');
        card.className = 'related-product-card bg-white rounded-xl shadow-md overflow-hidden cursor-pointer';
        card.style.minWidth = '250px';
        card.style.maxWidth = '250px';
        
        card.innerHTML = `
            <!-- Image Section -->
            <div class="related-image-container">
                <img src="${product.mainImageUrl || 'https://images.unsplash.com/photo-1556909114-f6e7ad7d3136?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=500&q=80'}" 
                     alt="${product.title}" 
                     class="w-full h-48 object-cover">
                ${product.isNew ? 
                    '<span class="absolute top-2 left-2 bg-green-500 text-white px-2 py-1 rounded text-xs font-bold">NEW</span>' : 
                    ''}
                ${discount > 0 ? 
                    `<span class="absolute top-3 mr-40 right-2 bg-red-500 text-white px-2 py-1 rounded text-xs font-bold">${discount}% OFF</span>` : 
                    ''}
                
                <!-- Wishlist Button -->
                <button class="absolute top-2 right-2 w-10 h-10 bg-white rounded-full shadow-md flex items-center justify-center hover:bg-gray-100 wishlist-btn"
                        data-id="${product.id}">
                    <i class="far fa-heart text-pink-600"></i>
                </button>
            </div>
            
            <!-- Content Section -->
            <div class="related-content-container">
                <h3 class="font-semibold text-gray-800 text-sm mb-1 truncate">${product.title.split(' (')[0]}</h3>
                <p class="text-gray-500 text-xs mb-2">${product.category || 'Mother Care'}</p>
                <div class="flex items-center justify-between mt-2">
                    <div>
                        <span class="font-bold text-md text-green-600">₹${price}</span>
                        ${originalPrice ? 
                            `<span class="text-gray-500 text-sm line-through">₹${originalPrice}</span>` : 
                            ''}
                            <span class=" font-bold text-sm text-red-500 ml-1">(₹${product.discount}% OFF)</span>
                    </div>
                    
                </div>
            </div>
            
            <!-- View Details Button - ALWAYS VISIBLE AT BOTTOM -->
            <button class="view-details-btn view-details-button" data-id="${product.id}">
                <i class="fas fa-eye mr-2"></i> View Details
            </button>
        `;
        
        container.appendChild(card);
        
        // Add click event for the entire card (excluding buttons)
        card.onclick = (e) => {
            // Don't navigate if clicking on wishlist or view details button
            if (e.target.closest('.wishlist-btn') || e.target.closest('.view-details-button')) {
                return;
            }
            navigateToProduct(product.id);
        };
    });
    
    // Add click event for View Details buttons
    document.querySelectorAll('.view-details-button').forEach(btn => {
        btn.onclick = (e) => {
            e.stopPropagation();
            const productId = btn.getAttribute('data-id');
            navigateToProduct(productId);
        };
    });
    
    // Add wishlist functionality to related products
    document.querySelectorAll('.wishlist-btn').forEach(btn => {
        btn.onclick = (e) => {
            e.stopPropagation();
            const productId = btn.getAttribute('data-id');
            const products = JSON.parse(localStorage.getItem("allProducts") || "[]");
            const product = products.find(p => p.id == productId);
            if (product) {
                toggleProductWishlist(product, btn);
            }
        };
    });
}

// Function to navigate to product details
function navigateToProduct(productId) {
    localStorage.setItem('selectedProductId', productId);
    window.location.reload();
}

function toggleProductWishlist(product, btn) {
    let wishlist = JSON.parse(localStorage.getItem("wishlist") || "[]");
    const index = wishlist.findIndex(p => p.id === product.id);
    
    const icon = btn.querySelector('i');
    
    if (index > -1) {
        wishlist.splice(index, 1);
        icon.className = "far fa-heart text-pink-600";
        showToast("Removed from Wishlist");
    } else {
        const item = {
            id: product.id,
            name: product.title.split(' (')[0],
            price: product.price,
            originalPrice: product.originalPrice || null,
            image: product.mainImageUrl,
            size: "Standard"
        };
        wishlist.push(item);
        icon.className = "fas fa-heart text-pink-600";
        showToast("Added to Wishlist");
    }
    
    localStorage.setItem("wishlist", JSON.stringify(wishlist));
    updateWishlistCount();
}

function updateProductPage() {
    if (!currentProduct) return;

    document.getElementById('product-title').textContent = currentProduct.title;
    document.getElementById('breadcrumb-name').textContent = currentProduct.title.split(' (')[0];
    document.getElementById('mainImage').src = currentProduct.mainImageUrl;
    document.getElementById('product-description').textContent = currentProduct.description || "Premium quality product for mother care.";

    // Rating
    document.getElementById('stars-small').innerHTML = getStars(currentProduct.rating || 4.5);
    document.getElementById('reviews-count').textContent = `(${currentProduct.reviewCount || 0} reviews)`;

    // Size Variants
    const sizeContainer = document.getElementById('sizeButtons');
    sizeContainer.innerHTML = '';

    const variants = currentProduct.variants || [
        { size: "S", price: currentProduct.price - 100, originalPrice: currentProduct.originalPrice ? currentProduct.originalPrice - 200 : null, inStock: true },
        { size: "M", price: currentProduct.price, originalPrice: currentProduct.originalPrice || null, inStock: true },
        { size: "L", price: currentProduct.price + 100, originalPrice: currentProduct.originalPrice ? currentProduct.originalPrice + 100 : null, inStock: true },
        { size: "XL", price: currentProduct.price + 200, originalPrice: currentProduct.originalPrice ? currentProduct.originalPrice + 200 : null, inStock: true },
        { size: "XXL", price: currentProduct.price + 300, originalPrice: currentProduct.originalPrice ? currentProduct.originalPrice + 300 : null, inStock: false }
    ];

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

    // Default: Select M if available
    const defaultBtn = sizeContainer.querySelector('.size-btn:not(.disabled)');
    if (defaultBtn) {
        defaultBtn.click();
    }

    // Thumbnails, Specs, Reviews
    const thumbContainer = document.getElementById('thumbnailContainer');
    thumbContainer.innerHTML = '';
    [currentProduct.mainImageUrl, currentProduct.mainImageUrl, currentProduct.mainImageUrl].forEach((src, i) => {
        const img = document.createElement('img');
        img.src = src; img.className = 'thumbnail' + (i === 0 ? ' thumbnail-active' : '');
        img.onclick = () => {
            document.getElementById('mainImage').src = src;
            thumbContainer.querySelectorAll('.thumbnail').forEach(t => t.classList.remove('thumbnail-active'));
            img.classList.add('thumbnail-active');
        };
        thumbContainer.appendChild(img);
    });

    const specs = currentProduct.specifications || {
        "Brand": currentProduct.brand || "Premium Brand",
        "Category": currentProduct.category,
        "Description": currentProduct.description,
        "Suitable For": "Pregnant & New Mothers",
        "Country of Origin": "India"
    };
    document.getElementById('specifications-list').innerHTML = Object.entries(specs).map(([k, v]) =>
        `<div class="flex justify-between py-3 ${k !== Object.keys(specs)[Object.keys(specs).length-1] ? 'border-b' : ''}">
            <span class="font-medium">${k}</span><span>${v}</span>
        </div>`).join('');

    document.getElementById('overall-rating').textContent = currentProduct.rating || 4.7;
    document.getElementById('stars-large').innerHTML = getStars(currentProduct.rating || 4.7);
    document.getElementById('review-summary').textContent = `Based on ${currentProduct.reviewCount || 342} reviews`;
    
    // Load related products
    loadRelatedProducts();
}

function addToCart() {
    if (!selectedVariant) {
        showToast("Please select a size");
        return;
    }

    const qty = parseInt(document.getElementById("quantity").textContent);
    let cart = JSON.parse(localStorage.getItem("cart") || "[]");

    const cartItem = {
        id: currentProduct.id,
        name: currentProduct.title.split(' (')[0],
        size: selectedVariant.size,
        price: selectedVariant.price,
        originalPrice: selectedVariant.originalPrice || null,
        image: currentProduct.mainImageUrl,
        quantity: qty
    };

    const existing = cart.find(item => item.id === cartItem.id && item.size === cartItem.size);
    if (existing) existing.quantity += qty;
    else cart.push(cartItem);

    localStorage.setItem("cart", JSON.stringify(cart));
    updateCartCount();
    showToast(`Added ${qty} × Size ${selectedVariant.size} to cart`);

    const btn = document.getElementById("addToCartBtn");
    btn.innerHTML = `<i class="fas fa-check mr-3"></i> Go to Bag`;
    btn.className = "flex-1 bg-green-600 hover:bg-[#3A6F43] text-white py-2 px-8 rounded-lg font-bold text-lg shadow-lg flex items-center justify-center top-0 p-0";
    btn.onclick = () => window.location.href = "../cart.html";
}

function toggleWishlist() {
    if (!currentProduct) return;

    let wishlist = JSON.parse(localStorage.getItem("wishlist") || "[]");
    const index = wishlist.findIndex(p => p.id === currentProduct.id);

    if (index > -1) {
        wishlist.splice(index, 1);
        document.querySelector("#addToWishlistBtn i").className = "far fa-heart";
        showToast("Removed from Wishlist");
    } else {
        const item = {
            id: currentProduct.id,
            name: currentProduct.title.split(' (')[0],
            price: selectedVariant?.price || currentProduct.price,
            originalPrice: selectedVariant?.originalPrice || currentProduct.originalPrice || null,
            image: currentProduct.mainImageUrl,
            size: selectedVariant?.size || "Standard"
        };
        wishlist.push(item);
        document.querySelector("#addToWishlistBtn i").className = "fas fa-heart text-pink-600";
        showToast("Added to Wishlist");
    }

    localStorage.setItem("wishlist", JSON.stringify(wishlist));
    updateWishlistCount();
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

document.addEventListener("DOMContentLoaded", () => {
    if (!selectedId) {
        // If no product selected, show first product as default
        const products = JSON.parse(localStorage.getItem("allProducts") || "[]");
        if (products.length > 0) {
            localStorage.setItem('selectedProductId', products[0].id);
            window.location.reload();
        }
        return;
    }

    const products = JSON.parse(localStorage.getItem("allProducts") || "[]");
    currentProduct = products.find(p => p.id == selectedId);
    
    if (!currentProduct && products.length > 0) {
        // If selected product not found, use first product
        currentProduct = products[0];
        localStorage.setItem('selectedProductId', currentProduct.id);
    }

    if (!currentProduct) {
        document.getElementById('relatedProductsContainer').innerHTML = `
            <div class="text-center text-gray-500 py-8 w-full">
                <p class="text-lg">No products found. Please add products first.</p>
            </div>
        `;
        return;
    }

    updateProductPage();

    document.getElementById("increaseQty").onclick = () => { quantity++; document.getElementById("quantity").textContent = quantity; };
    document.getElementById("decreaseQty").onclick = () => { if (quantity > 1) { quantity--; document.getElementById("quantity").textContent = quantity; }};
    document.getElementById("addToCartBtn").onclick = addToCart;
    document.getElementById("addToWishlistBtn").onclick = toggleWishlist;

    document.querySelectorAll('.tab-button').forEach(btn => {
        btn.onclick = () => {
            document.querySelectorAll('.tab-button').forEach(b => b.classList.remove('active'));
            document.querySelectorAll('[id$="Content"]').forEach(c => c.classList.add('hidden'));
            btn.classList.add('active');
            document.getElementById(btn.dataset.tab + 'Content').classList.remove('hidden');
        };
    });

    document.querySelectorAll('.accordion-header').forEach(h => {
        h.onclick = () => {
            h.nextElementSibling.classList.toggle('active');
            h.querySelector('i').classList.toggle('rotate-180');
        };
    });

    const wishlist = JSON.parse(localStorage.getItem("wishlist") || "[]");
    if (wishlist.some(p => p.id === currentProduct.id)) {
        document.querySelector("#addToWishlistBtn i").className = "fas fa-heart text-pink-600";
    }
});