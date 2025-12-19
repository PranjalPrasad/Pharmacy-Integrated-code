// =============== MOBILITY AIDS PRODUCTS ===============
const fakeProducts = [
  { id: 1, name: "Foldable Wheelchair", brand: "Karma", price: 4500, originalPrice: 6000, discount: 25, category: "wheelchair", image: "https://images.unsplash.com/photo-1512299286776-52f85c5c3c6a?w=400&h=400&fit=crop", prescription: false, description: "Lightweight foldable wheelchair with adjustable armrests", quantity: 8, rating: 4.5 },
  { id: 2, name: "Aluminum Walking Stick", brand: "Nilkamal", price: 850, originalPrice: 1200, discount: 29, category: "walker", image: "https://images.unsplash.com/photo-1582555172866-f73bb12a2ab3?w=400&h=400&fit=crop", prescription: false, description: "Adjustable height aluminum walking stick with comfortable grip", quantity: 15, rating: 4.2 },
  { id: 3, name: "Underarm Crutches Pair", brand: "Arogya", price: 1200, originalPrice: 1800, discount: 33, category: "crutches", image: "https://images.unsplash.com/photo-1584820927498-cfe5211fd8bf?w=400&h=400&fit=crop", prescription: false, description: "Pair of underarm crutches with adjustable height", quantity: 0, rating: 4.7 },
  { id: 4, name: "Lumbar Support Belt", brand: "Medline", price: 950, originalPrice: 1300, discount: 27, category: "support", image: "https://images.unsplash.com/photo-1599901860904-17e6ed7083a0?w=400&h=400&fit=crop", prescription: false, description: "Adjustable lumbar support belt for back pain relief", quantity: 12, rating: 4.3 },
  { id: 5, name: "Rollator Walker with Seat", brand: "Drive", price: 3800, originalPrice: 5000, discount: 24, category: "walker", image: "https://images.unsplash.com/photo-1586773860418-dc22f8b874bc?w=400&h=400&fit=crop", prescription: false, description: "4-wheel rollator walker with comfortable seat and basket", quantity: 5, rating: 4.6 },
  { id: 6, name: "Folding Transport Chair", brand: "Karma", price: 5200, originalPrice: 7000, discount: 26, category: "wheelchair", image: "https://images.unsplash.com/photo-1512299286776-52f85c5c3c6a?w=400&h=400&fit=crop", prescription: false, description: "Lightweight transport wheelchair for caregivers", quantity: 0, rating: 4.4 },
  { id: 7, name: "Forearm Crutches", brand: "Arogya", price: 1800, originalPrice: 2500, discount: 28, category: "crutches", image: "https://images.unsplash.com/photo-1584820927498-cfe5211fd8bf?w=400&h=400&fit=crop", prescription: false, description: "Ergonomic forearm crutches with comfortable cuffs", quantity: 10, rating: 4.1 },
  { id: 8, name: "Knee Support Brace", brand: "Medline", price: 650, originalPrice: 900, discount: 28, category: "support", image: "https://images.unsplash.com/photo-1599901860904-17e6ed7083a0?w=400&h=400&fit=crop", prescription: false, description: "Adjustable knee support for stability and pain relief", quantity: 25, rating: 4.5 },
  { id: 9, name: "Electric Wheelchair", brand: "Drive", price: 12500, originalPrice: 16500, discount: 24, category: "wheelchair", image: "https://images.unsplash.com/photo-1512299286776-52f85c5c3c6a?w=400&h=400&fit=crop", prescription: false, description: "Battery operated electric wheelchair with joystick control", quantity: 3, rating: 4.8 },
  { id: 10, name: "Quad Cane Walking Stick", brand: "Nilkamal", price: 750, originalPrice: 1100, discount: 32, category: "walker", image: "https://images.unsplash.com/photo-1582555172866-f73bb12a2ab3?w=400&h=400&fit=crop", prescription: false, description: "Quad base cane for extra stability while walking", quantity: 18, rating: 4.3 },
  { id: 11, name: "Adjustable Elbow Crutches", brand: "Arogya", price: 1500, originalPrice: 2200, discount: 32, category: "crutches", image: "https://images.unsplash.com/photo-1584820927498-cfe5211fd8bf?w=400&h=400&fit=crop", prescription: false, description: "Adjustable elbow crutches with ergonomic handles", quantity: 0, rating: 4.0 },
  { id: 12, name: "Ankle Support Brace", brand: "Medline", price: 480, originalPrice: 700, discount: 31, category: "support", image: "https://images.unsplash.com/photo-1599901860904-17e6ed7083a0?w=400&h=400&fit=crop", prescription: false, description: "Ankle support brace for sprains and stability", quantity: 22, rating: 4.4 },
  { id: 13, name: "Commode Wheelchair", brand: "Karma", price: 6800, originalPrice: 9000, discount: 24, category: "wheelchair", image: "https://images.unsplash.com/photo-1512299286776-52f85c5c3c6a?w=400&h=400&fit=crop", prescription: false, description: "Wheelchair with commode facility for easy hygiene", quantity: 6, rating: 4.6 },
  { id: 14, name: "Folding Walking Frame", brand: "Drive", price: 2200, originalPrice: 3000, discount: 27, category: "walker", image: "https://images.unsplash.com/photo-1586773860418-dc22f8b874bc?w=400&h=400&fit=crop", prescription: false, description: "Lightweight folding walking frame with adjustable height", quantity: 0, rating: 4.2 },
  { id: 15, name: "Shoulder Support Brace", brand: "Medline", price: 850, originalPrice: 1200, discount: 29, category: "support", image: "https://images.unsplash.com/photo-1599901860904-17e6ed7083a0?w=400&h=400&fit=crop", prescription: false, description: "Adjustable shoulder support for injury recovery", quantity: 14, rating: 4.3 },
  { id: 16, name: "Heavy Duty Wheelchair", brand: "Karma", price: 7500, originalPrice: 10000, discount: 25, category: "wheelchair", image: "https://images.unsplash.com/photo-1512299286776-52f85c5c3c6a?w=400&h=400&fit=crop", prescription: false, description: "Heavy duty wheelchair for higher weight capacity", quantity: 9, rating: 4.7 },
  { id: 17, name: "Telescopic Walking Stick", brand: "Nilkamal", price: 600, originalPrice: 850, discount: 29, category: "walker", image: "https://images.unsplash.com/photo-1582555172866-f73bb12a2ab3?w=400&h=400&fit=crop", prescription: false, description: "Compact telescopic walking stick for travel", quantity: 20, rating: 4.1 },
  { id: 18, name: "Wrist Support Brace", brand: "Medline", price: 380, originalPrice: 550, discount: 31, category: "support", image: "https://images.unsplash.com/photo-1599901860904-17e6ed7083a0?w=400&h=400&fit=crop", prescription: false, description: "Wrist support brace for carpal tunnel relief", quantity: 30, rating: 4.5 },
  { id: 19, name: "Pediatric Wheelchair", brand: "Drive", price: 4200, originalPrice: 5800, discount: 28, category: "wheelchair", image: "https://images.unsplash.com/photo-1512299286776-52f85c5c3c6a?w=400&h=400&fit=crop", prescription: false, description: "Small size wheelchair designed for children", quantity: 4, rating: 4.8 },
  { id: 20, name: "Folding Crutches", brand: "Arogya", price: 1350, originalPrice: 1900, discount: 29, category: "crutches", image: "https://images.unsplash.com/photo-1584820927498-cfe5211fd8bf?w=400&h=400&fit=crop", prescription: false, description: "Compact folding crutches for easy storage", quantity: 12, rating: 4.2 }
];

let products = [...fakeProducts];
let filteredProducts = [...fakeProducts];
let productGrid, sortSelect, showMoreBtn;

let currentFilters = {
  category: 'all',
  brand: 'all',
  discount: 'all',
  minPrice: 0,
  maxPrice: 15000
};

let visibleProductsCount = 8;
let allFilteredProducts = [];

// ======================================================
document.addEventListener('DOMContentLoaded', () => {
  productGrid = document.getElementById('productGrid');
  sortSelect = document.getElementById('sortSelect');
  showMoreBtn = document.getElementById('showMoreBtn');

  // Initialize with all products
  allFilteredProducts = [...products];
  applySorting();
  renderInitialProducts();
  updateResultsCount();
  
  initSlider();
  initSorting();
  initMobileSheets();
  initFilters();
  initShowMore();

  sessionStorage.setItem('currentPageProducts', JSON.stringify(fakeProducts));

  // ONE single delegated listener for the whole grid – solves the duplicate-heart bug
  productGrid.addEventListener('click', (e) => {
    const btn = e.target.closest('.wishlist-btn');
    if (!btn) return;

    e.preventDefault();
    e.stopPropagation();

    const productId = Number(btn.dataset.id);
    toggleWishlist(productId, btn);
  });
});

// =============== CARD CREATION ===============
function createCard(p) {
  const div = document.createElement('div');
  
  // Check if product is out of stock
  const isOutOfStock = p.quantity <= 0;
  const stockStatus = isOutOfStock ? 'Out of Stock' : 'In Stock';
  const stockClass = isOutOfStock ? 'out-of-stock' : 'in-stock';
  const cardClass = isOutOfStock ? 'out-of-stock-card' : '';
  
  // Calculate accurate discount if not provided
  let discount = p.discount;
  if (!discount && p.originalPrice && p.price) {
    discount = Math.round(((p.originalPrice - p.price) / p.originalPrice) * 100);
  }
  
  // Calculate price if only originalPrice and discount are provided
  let displayPrice = p.price;
  let displayOriginalPrice = p.originalPrice;
  let displayDiscount = discount;
  
  if (!p.price && p.originalPrice && discount) {
    displayPrice = Math.round(p.originalPrice * (1 - discount/100));
    displayOriginalPrice = p.originalPrice;
    displayDiscount = discount;
  } else if (!p.originalPrice && p.price && discount) {
    displayPrice = p.price;
    displayOriginalPrice = Math.round(p.price / (1 - discount/100));
    displayDiscount = discount;
  }
  
  const priceLine = displayOriginalPrice
    ? `₹${displayPrice} <s class="text-gray-400 text-sm">₹${displayOriginalPrice}</s> <span class="text-green-600 text-sm font-bold">${displayDiscount}% off</span>`
    : `₹${displayPrice}`;

  // check current wishlist state
  const wishlist = JSON.parse(localStorage.getItem('wishlist') || '[]');
  const isWishlisted = wishlist.some(item => item.id === p.id);

  div.className = `bg-white rounded-xl shadow-md overflow-hidden hover:shadow-xl transition cursor-pointer relative ${cardClass}`;
  
  div.innerHTML = `
    <div class="relative">
      <img src="${p.image}" alt="${p.name}" class="w-full h-48 object-cover">
      
      <!-- Stock Status Badge -->
      <div class="stock-badge ${stockClass}">${stockStatus}</div>
      
      <!-- Wishlist button – data-id is the only thing we need -->
      <button class="wishlist-btn ${isWishlisted ? 'active' : ''}" data-id="${p.id}">
        <i class="fa-${isWishlisted ? 'solid' : 'regular'} fa-heart"></i>
      </button>
    </div>
    <div class="p-2">
      <h3 class="font-semibold text-sm">${p.name}</h3>
      <p class="text-xs text-gray-500 mt-1">${p.brand}</p>
      <div class="mt-2 font-bold text-lg text-green-600">${priceLine}</div>
      <button onclick="${isOutOfStock ? 'void(0)' : `navigateToProductDetails(${p.id})`}" 
              class="mt-4 w-full ${isOutOfStock ? 'out-of-stock-btn bg-gray-400' : 'bg-[#4A70A9] hover:bg-[#16476A]'} text-white py-2 rounded-lg font-bold transition"
              ${isOutOfStock ? 'disabled' : ''}>
        ${isOutOfStock ? 'Out of Stock' : 'View Details'}
      </button>
    </div>
  `;
  return div;
}

// =============== RENDER INITIAL PRODUCTS (8 products) ===============
function renderInitialProducts() {
  if (!productGrid) return;
  
  productGrid.innerHTML = ''; // clear
  
  if (allFilteredProducts.length === 0) {
    productGrid.innerHTML = '<div class="col-span-full text-center py-20 text-gray-500 text-xl">No products found</div>';
    if (showMoreBtn) showMoreBtn.classList.add('hidden');
    return;
  }
  
  // Show only first 8 products
  const productsToShow = allFilteredProducts.slice(0, visibleProductsCount);
  
  productsToShow.forEach(p => productGrid.appendChild(createCard(p)));
  
  // Show or hide "Show More" button
  if (showMoreBtn) {
    if (allFilteredProducts.length > visibleProductsCount) {
      showMoreBtn.classList.remove('hidden');
    } else {
      showMoreBtn.classList.add('hidden');
    }
  }
}

// =============== SHOW MORE FUNCTIONALITY ===============
function initShowMore() {
  if (!showMoreBtn) return;
  
  showMoreBtn.addEventListener('click', () => {
    // Increase visible products count by 8
    visibleProductsCount += 8;
    
    // Clear and re-render with new count
    renderInitialProducts();
    
    // Hide button if all products are shown
    if (visibleProductsCount >= allFilteredProducts.length && showMoreBtn) {
      showMoreBtn.classList.add('hidden');
    }
    
    // Update results count
    updateResultsCount();
  });
}

// =============== WISHLIST TOGGLE ===============
function toggleWishlist(productId, buttonElement) {
  let wishlist = JSON.parse(localStorage.getItem('wishlist') || '[]');
  const product = products.find(p => p.id === productId);

  const index = wishlist.findIndex(item => item.id === productId);

  if (index === -1) {
    // add
    wishlist.push(product);
    buttonElement.classList.add('active');
    buttonElement.innerHTML = '<i class="fa-solid fa-heart"></i>';
  } else {
    // remove
    wishlist.splice(index, 1);
    buttonElement.classList.remove('active');
    buttonElement.innerHTML = '<i class="fa-regular fa-heart"></i>';
  }

  localStorage.setItem('wishlist', JSON.stringify(wishlist));

  // let header badge know that wishlist changed
  window.dispatchEvent(new CustomEvent('wishlistUpdated'));
}

function updateResultsCount() {
  const countEl = document.getElementById('resultsCount');
  if (countEl) {
    const showingCount = Math.min(visibleProductsCount, allFilteredProducts.length);
    countEl.textContent = `Showing ${showingCount} of ${allFilteredProducts.length} products`;
  }
  updateTitle();
}

function updateTitle() {
  const titleEl = document.querySelector('h2.text-2xl');
  if (!titleEl) return;

  const categoryNames = {
    'all': 'Mobility Aids Products',
    'wheelchair': 'Wheelchairs',
    'walker': 'Walkers & Walking Sticks',
    'crutches': 'Crutches',
    'support': 'Support Belts & Braces'
  };

  let title = categoryNames[currentFilters.category] || 'Mobility Aids Products';

  // Add brand to title if selected
  if (currentFilters.brand !== 'all') {
    title += ` - ${currentFilters.brand}`;
  }

  titleEl.textContent = title;
}

// Apply Filters Function
function applyFilters() {
  allFilteredProducts = products.filter(product => {
    // Category filter
    if (currentFilters.category !== 'all' && product.category !== currentFilters.category) {
      return false;
    }

    // Brand filter
    if (currentFilters.brand !== 'all' && product.brand !== currentFilters.brand) {
      return false;
    }

    // Price filter
    if (product.price < currentFilters.minPrice || product.price > currentFilters.maxPrice) {
      return false;
    }

    // Discount filter
    if (currentFilters.discount !== 'all') {
      const requiredDiscount = parseInt(currentFilters.discount);
      // Calculate discount if not available
      let productDiscount = product.discount;
      if (!productDiscount && product.originalPrice && product.price) {
        productDiscount = Math.round(((product.originalPrice - product.price) / product.originalPrice) * 100);
      }
      if (productDiscount < requiredDiscount) {
        return false;
      }
    }

    return true;
  });

  // Reset visible products count when filters change
  visibleProductsCount = 8;
  
  // Apply sorting if any
  applySorting();
  
  renderInitialProducts();
  updateResultsCount();
}

// Apply Sorting Function
function applySorting() {
  if (!sortSelect) return;
  
  const val = sortSelect.value;
  if (val === 'price-low') {
    allFilteredProducts.sort((a,b) => a.price - b.price);
  } else if (val === 'price-high') {
    allFilteredProducts.sort((a,b) => b.price - a.price);
  } else if (val === 'rating') {
    allFilteredProducts.sort((a,b) => (b.rating || 0) - (a.rating || 0));
  } else if (val === 'newest') {
    allFilteredProducts.sort((a,b) => b.id - a.id);
  }
}

// Initialize Desktop Filters
function initFilters() {
  // Desktop form submit
  const desktopForm = document.getElementById('filterForm');
  if (desktopForm) {
    desktopForm.addEventListener('submit', (e) => {
      e.preventDefault();
      
      currentFilters.category = document.querySelector('input[name="category"]:checked')?.value || 'all';
      currentFilters.brand = document.querySelector('input[name="brand"]:checked')?.value || 'all';
      currentFilters.discount = document.querySelector('input[name="discount"]:checked')?.value || 'all';
      
      applyFilters();
    });

    // Live filter on radio change
    desktopForm.querySelectorAll('input[type="radio"]').forEach(radio => {
      radio.addEventListener('change', () => {
        currentFilters.category = document.querySelector('input[name="category"]:checked')?.value || 'all';
        currentFilters.brand = document.querySelector('input[name="brand"]:checked')?.value || 'all';
        currentFilters.discount = document.querySelector('input[name="discount"]:checked')?.value || 'all';
        applyFilters();
      });
    });
  }

  // Mobile filters apply button
  const applyMobileBtn = document.getElementById('applyMobileFilters');
  if (applyMobileBtn) {
    applyMobileBtn.addEventListener('click', () => {
      currentFilters.category = document.querySelector('input[name="mobileCategory"]:checked')?.value || 'all';
      currentFilters.brand = document.querySelector('input[name="mobileBrand"]:checked')?.value || 'all';
      currentFilters.discount = document.querySelector('input[name="mobileDiscount"]:checked')?.value || 'all';
      
      applyFilters();
      closeFilterSheet();
    });
  }

  // Mobile clear filters
  const clearMobileBtn = document.getElementById('clearMobileFilters');
  if (clearMobileBtn) {
    clearMobileBtn.addEventListener('click', () => {
      document.querySelectorAll('input[name="mobileCategory"], input[name="mobileBrand"], input[name="mobileDiscount"]').forEach(radio => {
        if (radio.value === 'all') radio.checked = true;
      });
      
      // Reset desktop filters too
      document.querySelectorAll('input[name="category"], input[name="brand"], input[name="discount"]').forEach(radio => {
        if (radio.value === 'all') radio.checked = true;
      });

      currentFilters = {
        category: 'all',
        brand: 'all',
        discount: 'all',
        minPrice: 0,
        maxPrice: 15000
      };

      // Reset price sliders
      if (document.getElementById('minThumb')) document.getElementById('minThumb').value = 0;
      if (document.getElementById('maxThumb')) document.getElementById('maxThumb').value = 15000;
      if (document.getElementById('mobileMinThumb')) document.getElementById('mobileMinThumb').value = 0;
      if (document.getElementById('mobileMaxThumb')) document.getElementById('mobileMaxThumb').value = 15000;
      
      if (typeof updateDesktopSlider === 'function') updateDesktopSlider();
      if (typeof updateMobileSlider === 'function') updateMobileSlider();

      applyFilters();
    });
  }
}

// Navigate to Product Details Page with URL parameters
window.navigateToProductDetails = function(id) {
  const product = products.find(p => p.id === id);
  if (!product) {
    console.error('Product not found with id:', id);
    return;
  }

  // Store current page name/category for reference
  const currentPageName = document.title || 'Mobility Aids';
  
  sessionStorage.setItem('selectedProduct', JSON.stringify(product));
  sessionStorage.setItem('currentPageProducts', JSON.stringify(products));
  sessionStorage.setItem('currentPageName', currentPageName);

  const params = new URLSearchParams({
    id: product.id,
    name: product.name,
    brand: product.brand,
    price: product.price,
    originalPrice: product.originalPrice || '',
    discount: product.discount || '',
    image: product.image,
    description: product.description || '',
    prescription: product.prescription,
    category: product.category || '',
    sourcePage: currentPageName,
    quantity: product.quantity || 0
  });

  window.location.href = `/productdetails.html?${params.toString()}`;
}

function initSorting() {
  if (!sortSelect) return;
  
  sortSelect.addEventListener('change', () => {
    applySorting();
    visibleProductsCount = 8; // Reset to initial view
    renderInitialProducts();
    updateResultsCount();
  });

  // Mobile sort apply
  const applySortBtn = document.getElementById('applySortBtn');
  if (applySortBtn) {
    applySortBtn.addEventListener('click', () => {
      const selectedSort = document.querySelector('input[name="mobileSort"]:checked')?.value || 'default';
      if (sortSelect) {
        sortSelect.value = selectedSort;
        sortSelect.dispatchEvent(new Event('change'));
      }
      closeSortSheet();
    });
  }
}

// Desktop Price Slider
function initSlider() {
  const minThumb = document.getElementById('minThumb');
  const maxThumb = document.getElementById('maxThumb');
  const mobileMinThumb = document.getElementById('mobileMinThumb');
  const mobileMaxThumb = document.getElementById('mobileMaxThumb');

  const updateDesktopSlider = () => {
    const minVal = parseInt(minThumb.value);
    const maxVal = parseInt(maxThumb.value);
    
    if (minVal > maxVal - 500) {
      minThumb.value = maxVal - 500;
    }
    
    const fill = document.getElementById('desktopFill');
    if (fill) {
      fill.style.left = (minVal / 15000) * 100 + '%';
      fill.style.width = ((maxVal - minVal) / 15000) * 100 + '%';
    }
    
    const minValue = document.getElementById('minValue');
    const maxValue = document.getElementById('maxValue');
    if (minValue) minValue.textContent = '₹' + minVal;
    if (maxValue) maxValue.textContent = '₹' + maxVal;
    
    currentFilters.minPrice = minVal;
    currentFilters.maxPrice = maxVal;
  };

  const updateMobileSlider = () => {
    const minVal = parseInt(mobileMinThumb.value);
    const maxVal = parseInt(mobileMaxThumb.value);
    
    if (minVal > maxVal - 500) {
      mobileMinThumb.value = maxVal - 500;
    }
    
    const fill = document.getElementById('mobileFill');
    if (fill) {
      fill.style.left = (minVal / 15000) * 100 + '%';
      fill.style.width = ((maxVal - minVal) / 15000) * 100 + '%';
    }
    
    const minValue = document.getElementById('mobileMinValue');
    const maxValue = document.getElementById('mobileMaxValue');
    if (minValue) minValue.textContent = '₹' + minVal;
    if (maxValue) maxValue.textContent = '₹' + maxVal;
    
    currentFilters.minPrice = minVal;
    currentFilters.maxPrice = maxVal;
  };

  if (minThumb && maxThumb) {
    minThumb.oninput = () => {
      updateDesktopSlider();
      applyFilters();
    };
    maxThumb.oninput = () => {
      updateDesktopSlider();
      applyFilters();
    };
    updateDesktopSlider();
  }

  if (mobileMinThumb && mobileMaxThumb) {
    mobileMinThumb.oninput = updateMobileSlider;
    mobileMaxThumb.oninput = updateMobileSlider;
    updateMobileSlider();
  }

  window.updateDesktopSlider = updateDesktopSlider;
  window.updateMobileSlider = updateMobileSlider;
}

// Mobile Sheets
function initMobileSheets() {
  const backdrop = document.getElementById('mobileSheetBackdrop');
  const filterSheet = document.getElementById('filterSheet');
  const sortSheet = document.getElementById('sortSheet');
  
  // Open Filter Sheet
  const openFilterSheetBtn = document.getElementById('openFilterSheet');
  if (openFilterSheetBtn) {
    openFilterSheetBtn.addEventListener('click', () => {
      if (backdrop) backdrop.classList.remove('hidden');
      if (filterSheet) filterSheet.classList.remove('translate-y-full');
    });
  }

  // Close Filter Sheet
  const closeFilterSheet = () => {
    if (backdrop) backdrop.classList.add('hidden');
    if (filterSheet) filterSheet.classList.add('translate-y-full');
  };

  const closeFilterSheetBtn = document.getElementById('closeFilterSheet');
  if (closeFilterSheetBtn) {
    closeFilterSheetBtn.addEventListener('click', closeFilterSheet);
  }
  window.closeFilterSheet = closeFilterSheet;

  // Open Sort Sheet
  const openSortSheetBtn = document.getElementById('openSortSheet');
  if (openSortSheetBtn) {
    openSortSheetBtn.addEventListener('click', () => {
      if (backdrop) backdrop.classList.remove('hidden');
      if (sortSheet) sortSheet.classList.remove('translate-y-full');
    });
  }

  // Close Sort Sheet
  const closeSortSheet = () => {
    if (backdrop) backdrop.classList.add('hidden');
    if (sortSheet) sortSheet.classList.add('translate-y-full');
  };

  const closeSortSheetBtn = document.getElementById('closeSortSheet');
  if (closeSortSheetBtn) {
    closeSortSheetBtn.addEventListener('click', closeSortSheet);
  }
  window.closeSortSheet = closeSortSheet;

  // Click backdrop to close
  if (backdrop) {
    backdrop.addEventListener('click', () => {
      closeFilterSheet();
      closeSortSheet();
    });
  }
}

window.sortProducts = function(type) {
  if (!sortSelect) return;
  
  sortSelect.value = type;
  sortSelect.dispatchEvent(new Event('change'));
  const backdrop = document.getElementById('mobileSheetBackdrop');
  if (backdrop) backdrop.click();
};