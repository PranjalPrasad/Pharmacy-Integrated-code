function removeSkeleton() {
    document.querySelectorAll('.skeleton').forEach(el => {
        el.classList.remove('skeleton');
        el.style.background = '';
        el.style.backgroundImage = '';
    });
}

const API_BASE_URL = 'http://localhost:8083/api/products';
let cart = JSON.parse(localStorage.getItem('cart')) || [];

function updateCartCount() {
    const total = cart.reduce((s, i) => s + (i.quantity || 1), 0);
    ['desktop-cart-count', 'mobile-cart-count'].forEach(id => {
        const el = document.getElementById(id);
        if (el) {
            el.textContent = total;
            el.style.display = total > 0 ? 'flex' : 'none';
        }
    });
}

function addToCart(product) {
    const existing = cart.find(i => i.id == product.id);
    if (existing) existing.quantity += 1;
    else cart.push({ ...product, quantity: 1 });
    localStorage.setItem('cart', JSON.stringify(cart));
    updateCartCount();
    updateRightCartPanel();
}

// SAFE URL PARAMS — Never crashes
function getUrlParams() {
    const params = {};
    try {
        new URLSearchParams(location.search).forEach((value, key) => {
            try {
                params[key] = decodeURIComponent(value.replace(/\+/g, ' '));
            } catch {
                params[key] = value.replace(/\+/g, ' ');
            }
        });
    } catch (e) {
        console.warn('Failed to parse URL params', e);
    }
    return params;
}

function renderThumbnails(src) {
    const container = document.getElementById('thumbnail-container');
    if (!container || !src) return;
    container.innerHTML = '';
    [src, src, src].forEach((s, i) => {
        const img = document.createElement('img');
        img.src = s;
        img.className = 'w-20 h-20 object-contain border-2 rounded-lg cursor-pointer transition hover:border-pharmeasy-green';
        if (i === 0) img.classList.add('border-pharmeasy-green');
        img.onclick = () => {
            const main = document.getElementById('main-product-image');
            if (main) main.src = s;
            container.querySelectorAll('img').forEach(t => t.classList.remove('border-pharmeasy-green'));
            img.classList.add('border-pharmeasy-green');
        };
        container.appendChild(img);
    });
}

// SAFE LOAD FROM URL PARAMS
function loadFromUrlParams() {
    const p = getUrlParams();
    if (!p.name || !p.price) return false;

    const nameEl = document.getElementById('product-name');
    const priceEl = document.getElementById('selling-price');
    const imgEl = document.getElementById('main-product-image');

    if (nameEl) nameEl.textContent = p.name;
    if (priceEl) priceEl.textContent = p.price;
    if (imgEl && p.image) {
        imgEl.src = p.image;
        renderThumbnails(p.image);
    }

    removeSkeleton();
    initCart();
    return true;
}

function showNotFound() {
    const nameEl = document.getElementById('product-name');
    const imgEl = document.getElementById('main-product-image');
    if (nameEl) nameEl.textContent = 'Product Not Found';
    if (imgEl) imgEl.src = 'https://via.placeholder.com/500x500?text=Not+Found';
    removeSkeleton();
}

async function loadProductData() {
    if (loadFromUrlParams()) return;

    const id = getUrlParams().id;
    if (!id) {
        showNotFound();
        return;
    }

    try {
        const res = await fetch(`${API_BASE_URL}/get-product/${id}`);
        if (!res.ok) throw new Error();
        const product = await res.json();

        const nameEl = document.getElementById('product-name');
        const priceEl = document.getElementById('selling-price');
        const imgEl = document.getElementById('main-product-image');

        if (nameEl) nameEl.textContent = product.productName || 'Unknown Product';
        if (priceEl) priceEl.textContent = `₹${product.productPrice || 0}`;

        const imgUrl = product.productMainImage 
            ? `${API_BASE_URL}/${id}/image`
            : 'https://via.placeholder.com/500x500?text=No+Image';

        if (imgEl) {
            imgEl.src = imgUrl;
            renderThumbnails(imgUrl);
        }

        removeSkeleton();
        initCart();

    } catch (e) {
        showNotFound();
    }
}

function initCart() {
    updateCartCount();

    const addBtn = document.querySelector('button.bg-pharmeasy-green');
    const buyBtn = document.querySelector('button.bg-orange-500');

    if (addBtn) {
        addBtn.onclick = () => {
            const name = document.getElementById('product-name')?.textContent || 'Product';
            const price = parseFloat(document.getElementById('selling-price')?.textContent?.replace('₹', '') || '0');
            const image = document.getElementById('main-product-image')?.src || '';

            addToCart({ id: getUrlParams().id || Date.now(), name, price, image, quantity: 1 });
            alert(name + ' added to cart!');
        };
    }

    if (buyBtn) {
        buyBtn.onclick = () => {
            addBtn?.click();
            setTimeout(() => location.href = 'checkout.html', 300);
        };
    }
}

function init() {
    loadProductData();
}

// =============================================
// LIVE CART COUNT FOR RIGHT PANEL (PRODUCT DETAILS PAGE)
// =============================================
function updateRightCartPanel() {
    let cart = JSON.parse(localStorage.getItem('cart') || '[]');

    // Count total items (with quantity)
    let totalItems = 0;
    let totalPrice = 0;

    cart.forEach(item => {
        const qty = item.quantity || 1;
        totalItems += qty;
        totalPrice += item.price * qty;
    });

    // Update the right panel
    const countDisplay = document.getElementById('cart-items-number');
    const textDisplay = document.getElementById('cart-items-text');
    const fullText = document.getElementById('cart-item-count-display');

    if (countDisplay) countDisplay.textContent = totalItems;
    if (textDisplay) textDisplay.textContent = totalItems === 1 ? '' : 's'; // "1 Item" or "5 Items"
    if (fullText) {
        if (totalItems === 0) {
            fullText.innerHTML = 'Your cart is empty';
        } else {
            fullText.innerHTML = `<span id="cart-items-number">${totalItems}</span> Item<span id="cart-items-text">${totalItems === 1 ? '' : 's'}</span> in Cart`;
        }
    }

    // Optional: Update total price (if you have these IDs)
    const totalEl = document.getElementById('cart-total');
    const savingsEl = document.getElementById('cart-savings');
    if (totalEl) totalEl.textContent = '₹' + totalPrice;
    if (savingsEl) savingsEl.textContent = '₹' + Math.round(totalPrice * 0.2); // dummy savings
}

// Run when page loads
document.addEventListener('DOMContentLoaded', function () {
    updateRightCartPanel();
});

// Run every time someone adds to cart (MOST IMPORTANT!)
function originalAddToCartFunction() {
    // Your existing add to cart code (keep it exactly as is)
    // Example:
    let cart = JSON.parse(localStorage.getItem('cart') || '[]');
    // ... your logic to add item
    localStorage.setItem('cart', JSON.stringify(cart));

    // THIS IS THE KEY LINE — ADD THIS AT THE END OF YOUR ADD TO CART FUNCTION
    updateRightCartPanel();
}

// START IMMEDIATELY
init();