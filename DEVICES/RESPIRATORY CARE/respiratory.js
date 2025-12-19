// =============== RESPIRATORY CARE PRODUCTS ===============
const fakeProducts = [
  { id: 1, name: "Portable Mesh Nebulizer", brand: "Omron", price: 3200, originalPrice: 4500, discount: 29, category: "nebulizer", sku: "NEBP001", image: "https://images.unsplash.com/photo-1559757148-5c350d0d3c56?w=400&h=400&fit=crop", prescription: false, description: "Compact mesh nebulizer for asthma and respiratory treatments", quantity: 15, rating: 4.6 },
  { id: 2, name: "Steam Vaporizer", brand: "BPL", price: 1200, originalPrice: 1800, discount: 33, category: "vaporizer", sku: "VAP200", image: "https://images.unsplash.com/photo-1584017911766-d451b3d0e843?w=400&h=400&fit=crop", prescription: false, description: "Electric steam vaporizer for cold and congestion relief", quantity: 25, rating: 4.3 },
  { id: 3, name: "Portable Oxygen Concentrator", brand: "Philips", price: 45000, originalPrice: 58000, discount: 22, category: "oxygen", sku: "OXYC500", image: "https://images.unsplash.com/photo-1584622650111-993a426fbf0a?w=400&h=400&fit=crop", prescription: false, description: "Lightweight portable oxygen concentrator for home use", quantity: 0, rating: 4.8 },
  { id: 4, name: "Auto CPAP Machine", brand: "ResMed", price: 38000, originalPrice: 50000, discount: 24, category: "cpap", sku: "CPAP100", image: "https://images.unsplash.com/photo-1559757148-5c350d0d3c56?w=400&h=400&fit=crop", prescription: false, description: "Auto-adjusting CPAP machine for sleep apnea treatment", quantity: 8, rating: 4.7 },
  { id: 5, name: "Compressor Nebulizer Kit", brand: "Drive", price: 2500, originalPrice: 3500, discount: 29, category: "nebulizer", sku: "NEBK001", image: "https://images.unsplash.com/photo-1559757148-5c350d0d3c56?w=400&h=400&fit=crop", prescription: false, description: "Complete compressor nebulizer kit with mask and mouthpiece", quantity: 12, rating: 4.4 },
  { id: 6, name: "Personal Steam Inhaler", brand: "Omron", price: 1800, originalPrice: 2500, discount: 28, category: "vaporizer", sku: "VAP300", image: "https://images.unsplash.com/photo-1584017911766-d451b3d0e843?w=400&h=400&fit=crop", prescription: false, description: "Personal steam inhaler with adjustable steam control", quantity: 0, rating: 4.5 },
  { id: 7, name: "Medical Oxygen Cylinder 5L", brand: "BPL", price: 8000, originalPrice: 11000, discount: 27, category: "oxygen", sku: "OXYCYL5", image: "https://images.unsplash.com/photo-1584622650111-993a426fbf0a?w=400&h=400&fit=crop", prescription: true, description: "5-liter medical oxygen cylinder with regulator", quantity: 6, rating: 4.6 },
  { id: 8, name: "Travel BIPAP Machine", brand: "Philips", price: 52000, originalPrice: 68000, discount: 24, category: "cpap", sku: "BIPAP200", image: "https://images.unsplash.com/photo-1559757148-5c350d0d3c56?w=400&h=400&fit=crop", prescription: true, description: "Compact travel BIPAP machine with humidifier", quantity: 4, rating: 4.9 },
  { id: 9, name: "Ultrasonic Nebulizer", brand: "Omron", price: 4500, originalPrice: 6000, discount: 25, category: "nebulizer", sku: "NEBU001", image: "https://images.unsplash.com/photo-1559757148-5c350d0d3c56?w=400&h=400&fit=crop", prescription: false, description: "Quiet ultrasonic nebulizer for pediatric and adult use", quantity: 10, rating: 4.7 },
  { id: 10, name: "Hot & Cold Vaporizer", brand: "Drive", price: 1500, originalPrice: 2200, discount: 32, category: "vaporizer", sku: "VAPHC01", image: "https://images.unsplash.com/photo-1584017911766-d451b3d0e843?w=400&h=400&fit=crop", prescription: false, description: "Dual mode hot and cold steam vaporizer", quantity: 18, rating: 4.4 },
  { id: 11, name: "Home Oxygen Concentrator", brand: "Philips", price: 35000, originalPrice: 45000, discount: 22, category: "oxygen", sku: "OXYH001", image: "https://images.unsplash.com/photo-1584622650111-993a426fbf0a?w=400&h=400&fit=crop", prescription: true, description: "5-liter per minute home oxygen concentrator", quantity: 0, rating: 4.8 },
  { id: 12, name: "Standard CPAP Machine", brand: "ResMed", price: 28000, originalPrice: 38000, discount: 26, category: "cpap", sku: "CPAP300", image: "https://images.unsplash.com/photo-1559757148-5c350d0d3c56?w=400&h=400&fit=crop", prescription: true, description: "Standard CPAP machine with ramp feature", quantity: 15, rating: 4.6 },
  { id: 13, name: "Nebulizer Accessory Kit", brand: "Omron", price: 800, originalPrice: 1200, discount: 33, category: "nebulizer", sku: "NEBAK01", image: "https://images.unsplash.com/photo-1559757148-5c350d0d3c56?w=400&h=400&fit=crop", prescription: false, description: "Complete accessory kit with masks, tubing and filters", quantity: 30, rating: 4.3 },
  { id: 14, name: "Electric Steam Inhaler", brand: "BPL", price: 2200, originalPrice: 3200, discount: 31, category: "vaporizer", sku: "VAPE001", image: "https://images.unsplash.com/photo-1584017911766-d451b3d0e843?w=400&h=400&fit=crop", prescription: false, description: "Electric steam inhaler with medicine cup", quantity: 0, rating: 4.5 },
  { id: 15, name: "Portable Oxygen Cylinder 2L", brand: "Drive", price: 4500, originalPrice: 6500, discount: 31, category: "oxygen", sku: "OXYCYL2", image: "https://images.unsplash.com/photo-1584622650111-993a426fbf0a?w=400&h=400&fit=crop", prescription: true, description: "2-liter portable oxygen cylinder with carrying case", quantity: 12, rating: 4.4 },
  { id: 16, name: "Auto CPAP with Humidifier", brand: "ResMed", price: 42000, originalPrice: 55000, discount: 24, category: "cpap", sku: "CPAPH001", image: "https://images.unsplash.com/photo-1559757148-5c350d0d3c56?w=400&h=400&fit=crop", prescription: true, description: "Auto CPAP machine with integrated heated humidifier", quantity: 7, rating: 4.9 },
  { id: 17, name: "Pediatric Nebulizer", brand: "Omron", price: 2800, originalPrice: 4000, discount: 30, category: "nebulizer", sku: "NEBPED1", image: "https://images.unsplash.com/photo-1559757148-5c350d0d3c56?w=400&h=400&fit=crop", prescription: false, description: "Child-friendly nebulizer with animal designs", quantity: 20, rating: 4.6 },
  { id: 18, name: "Table Top Vaporizer", brand: "Drive", price: 1000, originalPrice: 1500, discount: 33, category: "vaporizer", sku: "VAPTT01", image: "https://images.unsplash.com/photo-1584017911766-d451b3d0e843?w=400&h=400&fit=crop", prescription: false, description: "Table top steam vaporizer with night light", quantity: 25, rating: 4.2 },
  { id: 19, name: "Oxygen Flow Meter", brand: "BPL", price: 1500, originalPrice: 2200, discount: 32, category: "oxygen", sku: "OXYFM01", image: "https://images.unsplash.com/photo-1584622650111-993a426fbf0a?w=400&h=400&fit=crop", prescription: false, description: "Precision oxygen flow meter with pressure gauge", quantity: 40, rating: 4.4 },
  { id: 20, name: "CPAP Mask & Tubing Set", brand: "ResMed", price: 3500, originalPrice: 5000, discount: 30, category: "cpap", sku: "CPAPMSK1", image: "https://images.unsplash.com/photo-1559757148-5c350d0d3c56?w=400&h=400&fit=crop", prescription: false, description: "Complete CPAP mask and tubing replacement set", quantity: 0, rating: 4.5 }
];

let products = [...fakeProducts];
let filteredProducts = [...fakeProducts];
let productGrid, sortSelect, showMoreBtn;

let currentFilters = {
  category: 'all',
  brand: 'all',
  discount: 'all',
  minPrice: 0,
  maxPrice: 50000
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
      <p class="text-xs text-gray-500 mt-1">${p.brand} | SKU: ${p.sku || 'N/A'}</p>
      <div class="mt-2 font-bold text-lg text-green-600">${priceLine}</div>
      <button onclick="${isOutOfStock ? 'void(0)' : `navigateToProductDetails(${p.id})`}" 
              class="mt-4 w-full ${isOutOfStock ? 'out-of-stock-btn bg-gray-400' : 'bg-[#3b82f6] hover:bg-[#2563eb]'} text-white py-2 rounded-lg font-bold transition"
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
    'all': 'Respiratory Care Devices',
    'nebulizer': 'Nebulizers & Accessories',
    'vaporizer': 'Vaporizers & Steam Inhalers',
    'oxygen': 'Oxygen Cylinders & Concentrators',
    'cpap': 'CPAP/BIPAP Machines'
  };

  let title = categoryNames[currentFilters.category] || 'Respiratory Care Devices';

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
        maxPrice: 50000
      };

      // Reset price sliders
      if (document.getElementById('minThumb')) document.getElementById('minThumb').value = 0;
      if (document.getElementById('maxThumb')) document.getElementById('maxThumb').value = 50000;
      if (document.getElementById('mobileMinThumb')) document.getElementById('mobileMinThumb').value = 0;
      if (document.getElementById('mobileMaxThumb')) document.getElementById('mobileMaxThumb').value = 50000;
      
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
  const currentPageName = document.title || 'Respiratory Care';
  
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
    quantity: product.quantity || 0,
    sku: product.sku || ''  // Added SKU to URL parameters
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
    
    if (minVal > maxVal - 1000) {
      minThumb.value = maxVal - 1000;
    }
    
    const fill = document.getElementById('desktopFill');
    if (fill) {
      fill.style.left = (minVal / 50000) * 100 + '%';
      fill.style.width = ((maxVal - minVal) / 50000) * 100 + '%';
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
    
    if (minVal > maxVal - 1000) {
      mobileMinThumb.value = maxVal - 1000;
    }
    
    const fill = document.getElementById('mobileFill');
    if (fill) {
      fill.style.left = (minVal / 50000) * 100 + '%';
      fill.style.width = ((maxVal - minVal) / 50000) * 100 + '%';
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