// ==================== productdetails.js – FULL WORKING VERSION ====================

function removeSkeleton() {
    document.querySelectorAll('.skeleton').forEach(el => {
        el.classList.remove('skeleton');
        el.style.background = '';
        el.style.backgroundImage = '';
        el.style.animation = '';
    });
}

// Global variables
let cart = JSON.parse(localStorage.getItem('cart') || '[]');
let currentProduct = null;

// Update cart count in header (both desktop & mobile)
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

// Add to cart – 100% safe, name kabhi undefined nahi hoga
function addToCart(product) {
    const cartItem = {
        id: product.id || Date.now(),
        name: product.name || 'Unknown Product',
        price: Number(product.price) || 0,
        image: product.image || 'https://via.placeholder.com/150',
        quantity: 1
    };

    const existing = cart.find(item => item.id == cartItem.id);
    if (existing) {
        existing.quantity += 1;
    } else {
        cart.push(cartItem);
    }

    localStorage.setItem('cart', JSON.stringify(cart));
    updateCartCount();
    updateRightCartPanel();
}

// Right side live cart panel update (Product Details Page)
function updateRightCartPanel() {
    const items = cart.reduce((sum, i) => sum + (i.quantity || 1), 0);
    const totalPrice = cart.reduce((sum, i) => sum + i.price * (i.quantity || 1), 0);

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

// Safe URL parameter reading
function getUrlParams() {
    const params = {};
    const searchParams = new URLSearchParams(location.search);
    for (const [key, value] of searchParams) {
        try {
            params[key] = decodeURIComponent(value);
        } catch {
            params[key] = value;
        }
    }
    return params;
}

// Render thumbnails
function renderThumbnails(src) {
    const container = document.getElementById('thumbnail-container');
    if (!container || !src) return;
    container.innerHTML = '';
    [src, src, src].forEach(s => {
        const img = document.createElement('img');
        img.src = s;
        img.className = 'w-20 h-20 object-contain border-2 rounded-lg cursor-pointer hover:border-pharmeasy-green transition';
        img.onclick = () => {
            document.getElementById('main-product-image').src = s;
            container.querySelectorAll('img').forEach(t => t.classList.remove('border-pharmeasy-green'));
            img.classList.add('border-pharmeasy-green');
        };
        container.appendChild(img);
    });
    container.children[0].classList.add('border-pharmeasy-green');
}

// Load Frequently Bought Together from sessionStorage (OTC page products)
function loadFrequentlyBoughtItems(category, currentId) {
    try {
        const allProducts = JSON.parse(sessionStorage.getItem('currentPageProducts') || '[]');
        let related = allProducts.filter(p => p.category === category && p.id != currentId);

        if (related.length < 4) {
            related = allProducts.filter(p => p.id != currentId);
        }

        related = related.sort(() => Math.random() - 0.5).slice(0, 4);
        renderFrequentlyBought(related);
    } catch (e) {
        console.log('No related products found');
    }
}

function renderFrequentlyBought(products) {
    const container = document.getElementById('frequently-bought-container');
    if (!container) return;

    container.innerHTML = products.length === 0
        ? '<p class="col-span-full text-center text-gray-500 py-8">No related products</p>'
        : '';

    products.forEach(p => {
        const discount = p.originalPrice
            ? Math.round(((p.originalPrice - p.price) / p.originalPrice) * 100)
            : 0;

        const card = document.createElement('div');
        card.className = 'bg-white rounded-xl shadow-md p-4 hover:shadow-lg transition cursor-pointer';
        card.innerHTML = `
            <img src="${p.image}" class="w-full h-40 object-cover rounded-lg mb-3">
            <h4 class="font-medium text-sm line-clamp-2 mb-1">${p.name}</h4>
            <p class="text-xs text-gray-500">${p.brand || 'Generic'}</p>
            <div class="mt-2 flex items-center gap-2">
                <span class="text-lg font-bold text-green-600">₹${p.price}</span>
                ${p.originalPrice ? `
                    <span class="text-sm text-gray-400 line-through">₹${p.originalPrice}</span>
                    <span class="text-xs text-green-600 font-bold">${discount}% off</span>
                ` : ''}
            </div>
            <button onclick="navigateToProductDetails(${p.id})"
                class="w-full mt-3 bg-blue-600 hover:bg-blue-700 text-white py-2 rounded-lg text-sm font-medium">
                View Details
            </button>
        `;
        container.appendChild(card);
    });
}

// Navigate to another product (used in Frequently Bought)
window.navigateToProductDetails = function(id) {
    const product = JSON.parse(sessionStorage.getItem('currentPageProducts') || '[]').find(p => p.id == id);
    if (!product) return;

    const params = new URLSearchParams({
        id: product.id,
        name: encodeURIComponent(product.name),
        brand: encodeURIComponent(product.brand || 'Generic'),
        price: product.price,
        originalPrice: product.originalPrice || '',
        discount: product.discount || 0,
        image: encodeURIComponent(product.image),
        description: encodeURIComponent(product.description || ''),
        category: product.category || 'all'
    });

    window.location.href = `productdetails.html?${params.toString()}`;
};

// Load product from URL parameters
function loadFromUrlParams() {
    const p = getUrlParams();

    if (!p.name || !p.price) return false;

    currentProduct = {
        id: p.id || Date.now(),
        name: p.name,
        brand: p.brand || 'Generic',
        price: parseFloat(p.price),
        originalPrice: p.originalPrice ? parseFloat(p.originalPrice) : null,
        discount: p.discount ? parseInt(p.discount) : 0,
        image: p.image || 'https://via.placeholder.com/600',
        description: p.description || 'No description available.',
        category: p.category || 'all'
    };

    // Update all UI elements
    document.getElementById('product-name').textContent = currentProduct.name;
    document.getElementById('selling-price').textContent = '₹' + currentProduct.price.toFixed(0);

    if (currentProduct.originalPrice) {
        document.getElementById('mrp-price').textContent = '₹' + currentProduct.originalPrice;
        document.getElementById('discount-badge').textContent = currentProduct.discount + '% OFF';
        document.getElementById('discount-badge').classList.remove('hidden');
        document.querySelector('.line-through')?.classList.remove('hidden');
    } else {
        document.getElementById('discount-badge').classList.add('hidden');
        document.querySelector('.line-through')?.classList.add('hidden');
    }

    const mainImg = document.getElementById('main-product-image');
    if (mainImg && currentProduct.image) {
        mainImg.src = currentProduct.image;
        renderThumbnails(currentProduct.image);
    }

    removeSkeleton();
    updateCartCount();
    loadFrequentlyBoughtItems(currentProduct.category, currentProduct.id);
    return true;
}

function showNotFound() {
    document.getElementById('product-name').textContent = 'Product Not Found';
    document.getElementById('main-product-image').src = 'https://via.placeholder.com/600?text=Not+Found';
    removeSkeleton();
}

// Initialize Add to Cart & Buy Now buttons
function initCartButtons() {
    const addBtn = document.querySelector('button.bg-pharmeasy-green');
    const buyBtn = document.querySelector('button.bg-orange-500');

    if (addBtn && currentProduct) {
        addBtn.onclick = () => {
            addToCart(currentProduct);

            // Change button to "Go to Bag" after adding
            addBtn.textContent = 'Go to Bag';
            addBtn.classList.remove('bg-pharmeasy-green', 'hover:bg-green-700');
            addBtn.classList.add('bg-orange-500', 'hover:bg-orange-600');
            addBtn.onclick = () => window.location.href = '/cart.html';
        };
    }

    if (buyBtn && currentProduct) {
        buyBtn.onclick = () => {
            addToCart(currentProduct);
            setTimeout(() => window.location.href = '/cart.html', 300);
        };
    }
}

// Main init
function init() {
    if (!loadFromUrlParams()) {
        showNotFound();
    }
    initCartButtons();
    updateRightCartPanel(); // right side cart count
}

// Start everything when page loads
document.addEventListener('DOMContentLoaded', () => {
    init();
    updateCartCount(); // header cart count
});