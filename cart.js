/* ==============================
   cart.js – FINAL 100% WORKING VERSION
   Size + Quantity + Delete + Multi-tab Support
   ============================== */

console.log("cart.js loaded – FINAL VERSION");

// ALWAYS GET FRESH DATA FROM LOCALSTORAGE
function getCart() {
    return JSON.parse(localStorage.getItem('medcare_cart') || '[]');
}
function saveCart(data) {
    localStorage.setItem('medcare_cart', JSON.stringify(data));
}
// DOM Elements
const cartItemsContainer = document.getElementById('cart-items-container');
const subtotalEl = document.getElementById('subtotal');
const totalEl = document.getElementById('total');
const itemCountEl = document.getElementById('item-count');
const emptyCartScreen = document.getElementById('empty-cart-fullscreen');
const cartWithItems = document.getElementById('cart-with-items');
const shippingText = document.getElementById('shipping-text');

function updateCartCount() {
    const cart = getCart();
    const totalItems = cart.reduce((sum, item) => sum + (item.quantity || 1), 0);

    // Update ALL cart count badges
    document.querySelectorAll('#desktop-cart-count, #mobile-cart-count, #cart-count, #cartItemsCount, .cart-count').forEach(el => {
        if (el) {
            el.textContent = totalItems;
            el.style.display = totalItems > 0 ? 'inline-flex' : 'none';
        }
    });

    // Badge visibility
    const badge = document.getElementById('cart-count-badge');
    if (badge) {
        badge.classList.toggle('hidden', totalItems === 0);
        const countSpan = badge.querySelector('#cart-count');
        if (countSpan) countSpan.textContent = totalItems;
    }
}

function updateCartUI() {
    if (!cartItemsContainer) return;

    const cart = getCart();  // ← Hamesha fresh data
    const totalItems = cart.reduce((sum, item) => sum + (item.quantity || 1), 0);

    if (itemCountEl) {
        itemCountEl.textContent = totalItems + ' item' + (totalItems !== 1 ? 's' : '');
    }

    if (cart.length === 0) {
        emptyCartScreen?.classList.remove('hidden');
        cartWithItems?.classList.add('hidden');
        cartItemsContainer.innerHTML = '';
        subtotalEl && (subtotalEl.textContent = '₹0.00');
        totalEl && (totalEl.textContent = '₹0.00');
        shippingText && (shippingText.textContent = '₹49.00');
        updateCartCount();
        return;
    }

    emptyCartScreen?.classList.add('hidden');
    cartWithItems?.classList.remove('hidden');

    cartItemsContainer.innerHTML = cart.map((item, index) => `
        <div class="cart-item bg-white border rounded-lg p-5 flex flex-col md:flex-row gap-5 items-center hover:shadow-lg transition-all">
            <img src="${item.image || 'https://via.placeholder.com/80/3B82F6/white?text=Product'}" 
                 alt="${item.title}" class="w-20 h-20 object-cover rounded-lg border">
            <div class="flex-1 text-center md:text-left">
                <h3 class="font-bold text-lg">${item.title || 'Unknown Product'}</h3>
                ${item.size ? `<p class="text-sm font-medium text-blue-600 mt-1">Pack Size: ${item.size} Pieces</p>` : ''}
                <p class="text-gray-600">₹${Number(item.price).toFixed(2)} each</p>
            </div>
            <div class="flex items-center gap-3">
                <button onclick="updateQty(${index}, ${item.quantity - 1})" 
                        class="w-10 h-10 rounded-lg border hover:bg-gray-100 text-lg font-bold transition">-</button>
                <span class="w-16 text-center font-bold text-xl">${item.quantity}</span>
                <button onclick="updateQty(${index}, ${item.quantity + 1})" 
                        class="w-10 h-10 rounded-lg border hover:bg-gray-100 text-lg font-bold transition">+</button>
            </div>
            <div class="text-center md:text-right">
                <p class="font-bold text-xl text-green-600">₹${(Number(item.price) * item.quantity).toFixed(2)}</p>
                <button onclick="removeItem(${index})" class="text-red-600 text-sm hover:underline mt-2">Remove</button>
            </div>
        </div>
    `).join('');

    // Calculate totals
    const subtotal = cart.reduce((sum, item) => sum + Number(item.price) * item.quantity, 0);
    const shipping = subtotal >= 799 ? 0 : 49;
    const total = subtotal + shipping;

    if (subtotalEl) subtotalEl.textContent = `₹${subtotal.toFixed(2)}`;
    if (shippingText) shippingText.textContent = shipping === 0 ? 'Free' : '₹49.00';
    if (totalEl) totalEl.textContent = `₹${total.toFixed(2)}`;

    updateCartCount();
}

// GLOBAL FUNCTIONS – Hamesha fresh cart use karo!
window.updateQty = function(index, newQty) {
    const cart = getCart();  // ← Fresh data
    if (newQty < 1) {
        removeItem(index);
        return;
    }
    cart[index].quantity = newQty;
    saveCart(cart);
    updateCartUI();
};

window.removeItem = function(index) {
    if (confirm('Remove this item from cart?')) {
        const cart = getCart();  // ← Fresh data
        cart.splice(index, 1);
        saveCart(cart);
        updateCartUI();
    }
};

window.proceedToCheckout = function() {
    if (getCart().length === 0) {
        alert('Your cart is empty!');
        return;
    }
    location.href = 'checkout.html';
};

// Run on load
document.addEventListener('DOMContentLoaded', () => {
    updateCartUI();
    updateCartCount();
});

// Multi-tab support
window.addEventListener('storage', (e) => {
    if (e.key === 'medcare_cart') {
        updateCartUI();
        updateCartCount();
    }
});

// Immediate update on script load
updateCartCount();