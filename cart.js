  function getCart() {
        return JSON.parse(localStorage.getItem('medcare_cart') || '[]');
    }
    function saveCart(data) {
        localStorage.setItem('medcare_cart', JSON.stringify(data));
    }

    const cartItemsContainer = document.getElementById('cart-items-container');
    const mrpTotalEl = document.getElementById('mrp-total');
    const discountAmountEl = document.getElementById('discount-amount');
    const totalEl = document.getElementById('total');
    const emptyCartScreen = document.getElementById('empty-cart-fullscreen');
    const cartWithItems = document.getElementById('cart-with-items');
    const shippingText = document.getElementById('shipping-text');
    const shippingStriked = document.getElementById('shipping-striked');

    function updateCartCount() {
        const cart = getCart();
        const totalItems = cart.reduce((sum, item) => sum + (item.quantity || 1), 0);

        document.querySelectorAll('#desktop-cart-count, #mobile-cart-count, #cart-count, #cartItemsCount, .cart-count').forEach(el => {
            if (el) {
                el.textContent = totalItems;
                el.style.display = totalItems > 0 ? 'inline-flex' : 'none';
            }
        });

        const badge = document.getElementById('cart-count-badge');
        if (badge) {
            badge.classList.toggle('hidden', totalItems === 0);
            const countSpan = badge.querySelector('#cart-count');
            if (countSpan) countSpan.textContent = totalItems;
        }
    }

    function updateCartUI() {
        if (!cartItemsContainer) return;

        const cart = getCart();
        const totalItems = cart.reduce((sum, item) => sum + (item.quantity || 1), 0);

        // Update item count headers
        const itemCountHeader = document.getElementById('item-count-header');
        const itemCountPrice = document.getElementById('item-count-price');
        if (itemCountHeader) {
            itemCountHeader.textContent = totalItems + ' Item' + (totalItems !== 1 ? 's' : '');
        }
        if (itemCountPrice) {
            itemCountPrice.textContent = '(' + totalItems + ' Item' + (totalItems !== 1 ? 's' : '') + ')';
        }

        if (cart.length === 0) {
            emptyCartScreen?.classList.remove('hidden');
            cartWithItems?.classList.add('hidden');
            cartItemsContainer.innerHTML = '';
            if (mrpTotalEl) mrpTotalEl.textContent = '₹0';
            if (discountAmountEl) discountAmountEl.textContent = '-₹0';
            if (totalEl) totalEl.textContent = '₹0';
            updateCartCount();
            return;
        }

        emptyCartScreen?.classList.add('hidden');
        cartWithItems?.classList.remove('hidden');

        // Calculate prices (Myntra style with MRP and discount)
        let totalMRP = 0;
        let totalPrice = 0;

        cartItemsContainer.innerHTML = cart.map((item, index) => {
            const itemMRP = Number(item.mrp || item.price * 1.2); // Assume 20% markup if no MRP
            const itemPrice = Number(item.price);
            const itemDiscount = itemMRP - itemPrice;
            const discountPercent = Math.round((itemDiscount / itemMRP) * 100);

            totalMRP += itemMRP * item.quantity;
            totalPrice += itemPrice * item.quantity;

            return `
            <div class="cart-item bg-white border-b p-5 flex gap-4 items-start">
                <div class="flex-shrink-0">
                    <img src="${item.mainImageUrl || 'https://via.placeholder.com/100/3B82F6/white?text=Product'}" 
                         alt="${item.title}" class="w-28 h-28 object-cover rounded-lg border">
                </div>
                <div class="flex-1">
                    <div class="flex justify-between">
                        <div class="flex-1">
                            <h3 class="font-semibold text-gray-800 text-base mb-1">${item.title || 'Unknown Product'}</h3>
                            ${item.size ? `<p class="text-xs text-gray-500 mb-2">Pack Size: ${item.size} Pieces</p>` : ''}
                            
                            <div class="flex items-center gap-3 mb-3">
                                <span class="font-bold text-green-600">₹${itemPrice.toFixed(0)}</span>
                                <span class="text-gray-400 line-through text-sm">₹${itemMRP.toFixed(0)}</span>
                                <span class="text-red-500 font-semibold text-sm">(${discountPercent}% OFF)</span>
                            </div>

                            <div class="flex items-center gap-6">
                                <div class="flex items-center border rounded">
                                    <button onclick="updateQty(${index}, ${item.quantity - 1})" 
                                            class="w-8 h-8 hover:bg-gray-100 text-gray-600 font-bold transition">-</button>
                                    <span class="w-12 text-center font-semibold text-gray-800 border-x">${item.quantity}</span>
                                    <button onclick="updateQty(${index}, ${item.quantity + 1})" 
                                            class="w-8 h-8 hover:bg-gray-100 text-gray-600 font-bold transition">+</button>
                                </div>
                            </div>
                        </div>
                        <button onclick="removeItem(${index})" class="text-gray-400 hover:text-red-600 transition">
                            <i class="far fa-trash-alt text-xl"></i>
                        </button>
                    </div>

                   
                </div>
            </div>
            `;
        }).join('');

        // Calculate totals
        const totalDiscount = totalMRP - totalPrice;
        const shipping = totalPrice >= 799 ? 0 : 49;
        const finalTotal = totalPrice + shipping;

        if (mrpTotalEl) mrpTotalEl.textContent = '₹' + totalMRP.toFixed(0);
        if (discountAmountEl) discountAmountEl.textContent = '-₹' + totalDiscount.toFixed(0);
        if (totalEl) totalEl.textContent = '₹' + finalTotal.toFixed(0);
        
        if (shippingText && shippingStriked) {
            if (shipping === 0) {
                shippingStriked.style.display = 'inline';
                shippingText.textContent = 'FREE';
                shippingText.classList.add('text-green-600');
                shippingText.classList.remove('text-gray-700');
            } else {
                shippingStriked.style.display = 'none';
                shippingText.textContent = '₹49';
                shippingText.classList.remove('text-green-600');
                shippingText.classList.add('text-gray-700');
            }
        }

        updateCartCount();
    }

    window.updateQty = function(index, newQty) {
        const cart = getCart();
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
            const cart = getCart();
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

    document.addEventListener('DOMContentLoaded', () => {
        updateCartUI();
        updateCartCount();
    });

    window.addEventListener('storage', (e) => {
        if (e.key === 'medcare_cart') {
            updateCartUI();
            updateCartCount();
        }
    });

    updateCartCount();