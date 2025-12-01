// baby-product-details.js → 100% WORKING FINAL

let selectedSize = "30";
let quantity = 1;

document.addEventListener('DOMContentLoaded', () => {
    // Product data
    const product = {
        title: "Pampers Active Baby Diaper Pants - Large",
        price: 899,
        image: "https://via.placeholder.com/400x400/3B82F6/white?text=Pampers"
    };

    // Fill details
    document.getElementById('productTitle').textContent = product.title;
    document.getElementById('productPrice').textContent = `₹${product.price}`;
    document.getElementById('mainImage').innerHTML = `<img src="${product.image}" class="w-full h-full object-contain">`;

    // Size selection
    document.querySelectorAll('.size-option').forEach(el => {
        el.onclick = () => {
            document.querySelectorAll('.size-option').forEach(x => x.classList.remove('selected'));
            el.classList.add('selected');
            selectedSize = el.getAttribute('data-size');
        };
    });
    document.querySelector('.size-option').classList.add('selected');

    // Quantity
    document.getElementById('decreaseQty').onclick = () => { if (quantity > 1) quantity--, document.getElementById('quantity').textContent = quantity; };
    document.getElementById('increaseQty').onclick = () => { quantity++, document.getElementById('quantity').textContent = quantity; };


    
   // ADD TOH AB YEHI USE KARO — 100% GUARANTEED CLICK HOGA

const addToCartButton = document.getElementById('addToCart');

if (addToCartButton) {
    addToCartButton.addEventListener('click', function(e) {
        e.preventDefault(); // agar <a> tag me ho toh rokega

        if (!selectedSize) {
            alert("Please select a pack size first!");
            return;
        }

        let cart = JSON.parse(localStorage.getItem('medcare_cart') || '[]');

        const item = {
            title: product.title,
            price: product.price,
            image: product.image,
            size: selectedSize,        // "30", "60", "90"
            quantity: quantity
        };

        // Same product + same size = increase quantity
        const existingIndex = cart.findIndex(i => i.title === item.title && i.size === item.size);
        if (existingIndex > -1) {
            cart[existingIndex].quantity += quantity;
        } else {
            cart.push(item);
        }

        localStorage.setItem('medcare_cart', JSON.stringify(cart));

        // Success message
        alert(`Added to Cart!\n${item.title}\nSize: ${item.size} pcs × ${quantity}`);

        // Update cart count in header (works even if header loaded later)
        const totalItems = cart.reduce((sum, i) => sum + i.quantity, 0);
        document.querySelectorAll('#desktop-cart-count, #mobile-cart-count, #cart-count, .cart-count').forEach(el => {
            if (el) {
                el.textContent = totalItems;
                el.style.display = totalItems > 0 ? 'inline-flex' : 'none';
            }
        });

        // Optional: dispatch event so other scripts bhi update ho jaye
        window.dispatchEvent(new Event('cartUpdated'));
    });
}
});