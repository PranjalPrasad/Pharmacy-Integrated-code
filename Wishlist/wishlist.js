// ==================== ENHANCED WISHLIST PAGE SCRIPT ====================

// Utility: Show toast notification
function showToast(message, type = 'success') {
    const toast = document.getElementById('toast');
    if (!toast) return;
    
    const icon = type === 'success' ? '<i class="fas fa-check-circle"></i>' : '<i class="fas fa-exclamation-circle"></i>';
    toast.innerHTML = `${icon} ${message}`;
    toast.className = `toast ${type} show`;
    
    setTimeout(() => {
        toast.classList.remove('show');
    }, 3000);
}

// Get wishlist from localStorage
function getWishlist() {
    try {
        return JSON.parse(localStorage.getItem('wishlist') || '[]');
    } catch (e) {
        console.error('Error reading wishlist:', e);
        localStorage.removeItem('wishlist');
        return [];
    }
}

// Save wishlist to localStorage
function saveWishlist(wishlist) {
    try {
        localStorage.setItem('wishlist', JSON.stringify(wishlist));
    } catch (e) {
        console.error('Error saving wishlist:', e);
    }
}

// Calculate discount percentage
function calculateDiscount(originalPrice, currentPrice) {
    if (!originalPrice || originalPrice === currentPrice) return 0;
    const discount = ((parseFloat(originalPrice) - parseFloat(currentPrice)) / parseFloat(originalPrice)) * 100;
    return Math.round(discount);
}

// Remove item from wishlist
function removeFromWishlist(productId) {
    let wishlist = getWishlist();
    const itemToRemove = wishlist.find(item => item.id == productId);
    
    if (!itemToRemove) return;
    
    wishlist = wishlist.filter(item => item.id != productId);
    saveWishlist(wishlist);
    
    showToast('Item removed from wishlist', 'error');
    renderWishlist(); // Re-render the wishlist
    updateWishlistCount();
    
    // Trigger storage event for other tabs
    window.dispatchEvent(new Event('storage'));
}

// Move item to cart
function moveToCart(productId) {
    const wishlist = getWishlist();
    const item = wishlist.find(i => i.id == productId);
    
    if (!item) return;
    
    // Add to cart
    let cart = [];
    try {
        cart = JSON.parse(localStorage.getItem('cart') || '[]');
    } catch (e) {
        cart = [];
    }
    
    const existingInCart = cart.find(c => c.id == item.id);
    
    if (existingInCart) {
        existingInCart.quantity = (existingInCart.quantity || 1) + 1;
    } else {
        cart.push({
            id: item.id,
            name: item.name,
            price: parseFloat(item.price),
            image: item.image,
            quantity: 1
        });
    }
    
    localStorage.setItem('cart', JSON.stringify(cart));
    
    // Remove from wishlist
    removeFromWishlist(productId);
    
    showToast('Item moved to cart!', 'success');
    
    // Update cart count if function exists
    if (typeof updateCartCount === 'function') {
        updateCartCount();
    }
}

// Update wishlist count in header
function updateWishlistCount() {
    const count = getWishlist().length;
    
    document.querySelectorAll('#desktop-wishlist-count, #mobile-wishlist-count, .wishlist-count, [class*="wishlist-count"]').forEach(el => {
        if (el) {
            el.textContent = count;
            el.style.display = count > 0 ? 'flex' : 'none';
        }
    });
}

// Calculate and display wishlist statistics
function updateWishlistStats(wishlist) {
    const statsContainer = document.getElementById('wishlist-stats');
    if (!statsContainer) return;

    if (wishlist.length === 0) {
        statsContainer.classList.add('hidden');
        return;
    }

    statsContainer.classList.remove('hidden');

    // Calculate totals
    let totalValue = 0;
    let totalSavings = 0;

    wishlist.forEach(item => {
        const currentPrice = parseFloat(item.price) || 0;
        const originalPrice = parseFloat(item.originalPrice) || currentPrice;
        
        totalValue += currentPrice;
        totalSavings += (originalPrice - currentPrice);
    });

    // Update DOM
    document.getElementById('total-items').textContent = wishlist.length;
    document.getElementById('total-value').textContent = `₹${totalValue.toFixed(0)}`;
    document.getElementById('total-savings').textContent = `₹${totalSavings.toFixed(0)}`;
}

// Create wishlist item card HTML
function createWishlistCard(item, index) {
    const currentPrice = parseFloat(item.price) || 0;
    const originalPrice = parseFloat(item.originalPrice) || currentPrice;
    const discount = calculateDiscount(originalPrice, currentPrice);
    const savings = originalPrice - currentPrice;

    return `
        <div class="wishlist-item fade-in h-40" style="animation-delay: ${index * 0.1}s">
            <!-- Image Container -->
            <div class="item-image-container">
                <img src="${item.image || 'https://via.placeholder.com/300'}" 
                     alt="${item.name}" 
                     class="item-image">
                
                <!-- Discount Badge -->
                ${discount > 0 ? `<div class="discount-badge">${discount}% OFF</div>` : ''}
                
                <!-- Remove Button -->
                <button onclick="removeFromWishlist(${item.id})" 
                        class="remove-btn"
                        title="Remove from wishlist">
                    <i class="fas fa-times"></i>
                </button>
            </div>
            
            <!-- Card Content -->
            <div class="item-content">
                <h3 class="item-name" title="${item.name}">
                    ${item.name || 'Product Name'}
                </h3>
                
                <!-- Price Container -->
                <div class="price-container">
                    <span class="current-price text-green-600 text-xl font-bold">₹${currentPrice}</span>
                    ${originalPrice > currentPrice ? `
                        <span class="original-price">₹${originalPrice}</span>
                        <span class="savings-badge">Save ₹${savings.toFixed(0)}</span>
                    ` : ''}
                </div>
                
                <!-- Action Buttons -->
                <div class="action-buttons">
                    <button onclick="moveToCart(${item.id})" 
                            class="btn-add-cart bg-blue-600"
                            title="Move to cart">
                        <i class="fas fa-shopping-cart"></i>
                        Add to Cart
                    </button>
                    
                    <button onclick="removeFromWishlist(${item.id})" 
                            class="btn-delete"
                            title="Remove">
                        <i class="fas fa-trash"></i>
                    </button>
                </div>
            </div>
        </div>
    `;
}

// Main function to render wishlist
function renderWishlist() {
    const loadingState = document.getElementById('loading-state');
    const emptyState = document.getElementById('empty-state');
    const wishlistItems = document.getElementById('wishlist-items');
    
    // Hide loading state
    if (loadingState) loadingState.classList.add('hidden');
    
    // Get wishlist data
    const wishlist = getWishlist();
    
    console.log('Rendering wishlist with', wishlist.length, 'items:', wishlist);
    
    // Update statistics
    updateWishlistStats(wishlist);
    
    // Show empty state if no items
    if (wishlist.length === 0) {
        if (emptyState) emptyState.classList.remove('hidden');
        if (wishlistItems) wishlistItems.classList.add('hidden');
        return;
    }
    
    // Show wishlist items
    if (emptyState) emptyState.classList.add('hidden');
    if (wishlistItems) {
        wishlistItems.classList.remove('hidden');
        wishlistItems.innerHTML = wishlist.map((item, index) => createWishlistCard(item, index)).join('');
    }
}

// Clear entire wishlist
function clearWishlist() {
    if (!confirm('Are you sure you want to clear your entire wishlist?')) return;
    
    localStorage.removeItem('wishlist');
    showToast('Wishlist cleared', 'error');
    renderWishlist();
    updateWishlistCount();
}

// Initialize on page load
document.addEventListener('DOMContentLoaded', () => {
    console.log('Wishlist page loaded');
    
    // Small delay to ensure localStorage is accessible
    setTimeout(() => {
        renderWishlist();
        updateWishlistCount();
    }, 100);
});

// Listen for storage changes (from other tabs)
window.addEventListener('storage', (e) => {
    if (e.key === 'wishlist') {
        console.log('Wishlist updated in another tab');
        renderWishlist();
        updateWishlistCount();
    }
});

// Make functions globally accessible
window.removeFromWishlist = removeFromWishlist;
window.moveToCart = moveToCart;
window.clearWishlist = clearWishlist;
window.renderWishlist = renderWishlist;