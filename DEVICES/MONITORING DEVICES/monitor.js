// =============== HEALTH MONITORING DEVICES PRODUCTS ===============
const fakeProducts = [
  { id: 1, name: "Digital BP Monitor", brand: "Omron", price: 2200, originalPrice: 3000, discount: 27, category: "bp-monitor", image: "https://images.unsplash.com/photo-1559757148-5c350d0d3c56?w=400&h=400&fit=crop", prescription: false, description: "Fully automatic digital blood pressure monitor with intelligent inflation", quantity: 15, rating: 4.6 },
  { id: 2, name: "Glucometer with Strips", brand: "Accu-Chek", price: 1500, originalPrice: 2200, discount: 32, category: "glucometer", image: "https://images.unsplash.com/photo-1584017911766-d451b3d0e843?w=400&h=400&fit=crop", prescription: false, description: "Blood glucose monitor with 50 test strips and lancets", quantity: 25, rating: 4.5 },
  { id: 3, name: "Infrared Thermometer", brand: "Dr. Morepen", price: 950, originalPrice: 1400, discount: 32, category: "thermometer", image: "https://images.unsplash.com/photo-1584622650111-993a426fbf0a?w=400&h=400&fit=crop", prescription: false, description: "Contactless infrared forehead thermometer with instant reading", quantity: 0, rating: 4.7 },
  { id: 4, name: "Finger Tip Pulse Oximeter", brand: "Rossmax", price: 1200, originalPrice: 1800, discount: 33, category: "oximeter", image: "https://images.unsplash.com/photo-1559757148-5c350d0d3c56?w=400&h=400&fit=crop", prescription: false, description: "Portable pulse oximeter for measuring oxygen saturation and pulse rate", quantity: 18, rating: 4.4 },
  { id: 5, name: "Wrist BP Monitor", brand: "Omron", price: 2800, originalPrice: 3800, discount: 26, category: "bp-monitor", image: "https://images.unsplash.com/photo-1559757148-5c350d0d3c56?w=400&h=400&fit=crop", prescription: false, description: "Compact wrist type blood pressure monitor with irregular heartbeat detector", quantity: 12, rating: 4.3 },
  { id: 6, name: "Digital Thermometer", brand: "BPL", price: 350, originalPrice: 550, discount: 36, category: "thermometer", image: "https://images.unsplash.com/photo-1584622650111-993a426fbf0a?w=400&h=400&fit=crop", prescription: false, description: "Fast reading digital oral/underarm thermometer with fever alarm", quantity: 0, rating: 4.2 },
  { id: 7, name: "Blood Glucose Test Strips", brand: "Accu-Chek", price: 850, originalPrice: 1200, discount: 29, category: "glucometer", image: "https://images.unsplash.com/photo-1584017911766-d451b3d0e843?w=400&h=400&fit=crop", prescription: false, description: "Pack of 50 test strips for accurate blood glucose monitoring", quantity: 30, rating: 4.6 },
  { id: 8, name: "Professional Pulse Oximeter", brand: "Dr. Morepen", price: 1800, originalPrice: 2500, discount: 28, category: "oximeter", image: "https://images.unsplash.com/photo-1559757148-5c350d0d3c56?w=400&h=400&fit=crop", prescription: false, description: "Professional grade pulse oximeter with OLED display and pleth graph", quantity: 8, rating: 4.8 },
  { id: 9, name: "Upper Arm BP Monitor", brand: "Rossmax", price: 2600, originalPrice: 3500, discount: 26, category: "bp-monitor", image: "https://images.unsplash.com/photo-1559757148-5c350d0d3c56?w=400&h=400&fit=crop", prescription: false, description: "Upper arm blood pressure monitor with large display and memory function", quantity: 10, rating: 4.5 },
  { id: 10, name: "Ear Thermometer", brand: "Omron", price: 2200, originalPrice: 3200, discount: 31, category: "thermometer", image: "https://images.unsplash.com/photo-1584622650111-993a426fbf0a?w=400&h=400&fit=crop", prescription: false, description: "Infrared ear thermometer with 20 memory recall and fever indicator", quantity: 6, rating: 4.7 },
  { id: 11, name: "Glucometer Device", brand: "Dr. Morepen", price: 650, originalPrice: 950, discount: 32, category: "glucometer", image: "https://images.unsplash.com/photo-1584017911766-d451b3d0e843?w=400&h=400&fit=crop", prescription: false, description: "Compact glucometer device with 10 second reading time", quantity: 0, rating: 4.3 },
  { id: 12, name: "Pediatric Pulse Oximeter", brand: "BPL", price: 1400, originalPrice: 2000, discount: 30, category: "oximeter", image: "https://images.unsplash.com/photo-1559757148-5c350d0d3c56?w=400&h=400&fit=crop", prescription: false, description: "Child-friendly pulse oximeter with soft silicone finger clip", quantity: 15, rating: 4.4 },
  { id: 13, name: "BP Monitor with Bluetooth", brand: "Omron", price: 4200, originalPrice: 5800, discount: 28, category: "bp-monitor", image: "https://images.unsplash.com/photo-1559757148-5c350d0d3c56?w=400&h=400&fit=crop", prescription: false, description: "Smart blood pressure monitor with Bluetooth connectivity and app sync", quantity: 7, rating: 4.8 },
  { id: 14, name: "Basal Thermometer", brand: "Rossmax", price: 450, originalPrice: 700, discount: 36, category: "thermometer", image: "https://images.unsplash.com/photo-1584622650111-993a426fbf0a?w=400&h=400&fit=crop", prescription: false, description: "High precision basal thermometer for fertility tracking", quantity: 20, rating: 4.2 },
  { id: 15, name: "Glucometer Combo Pack", brand: "Accu-Chek", price: 2800, originalPrice: 4000, discount: 30, category: "glucometer", image: "https://images.unsplash.com/photo-1584017911766-d451b3d0e843?w=400&h=400&fit=crop", prescription: false, description: "Complete kit with glucometer, 100 strips, lancets and control solution", quantity: 5, rating: 4.7 },
  { id: 16, name: "Hospital Grade Oximeter", brand: "Dr. Morepen", price: 3200, originalPrice: 4500, discount: 29, category: "oximeter", image: "https://images.unsplash.com/photo-1559757148-5c350d0d3c56?w=400&h=400&fit=crop", prescription: false, description: "Medical grade pulse oximeter with adjustable brightness and alarm", quantity: 12, rating: 4.9 },
  { id: 17, name: "Portable BP Monitor", brand: "BPL", price: 1900, originalPrice: 2800, discount: 32, category: "bp-monitor", image: "https://images.unsplash.com/photo-1559757148-5c350d0d3c56?w=400&h=400&fit=crop", prescription: false, description: "Compact portable blood pressure monitor for travel", quantity: 25, rating: 4.3 },
  { id: 18, name: "Smart Thermometer", brand: "Omron", price: 2800, originalPrice: 4000, discount: 30, category: "thermometer", image: "https://images.unsplash.com/photo-1584622650111-993a426fbf0a?w=400&h=400&fit=crop", prescription: false, description: "Bluetooth enabled smart thermometer with mobile app connectivity", quantity: 9, rating: 4.6 },
  { id: 19, name: "Blood Glucose Lancets", brand: "Accu-Chek", price: 280, originalPrice: 450, discount: 38, category: "glucometer", image: "https://images.unsplash.com/photo-1584017911766-d451b3d0e843?w=400&h=400&fit=crop", prescription: false, description: "Box of 200 lancets for pain-free blood sampling", quantity: 40, rating: 4.4 },
  { id: 20, name: "Pocket Pulse Oximeter", brand: "Rossmax", price: 850, originalPrice: 1300, discount: 35, category: "oximeter", image: "https://images.unsplash.com/photo-1559757148-5c350d0d3c56?w=400&h=400&fit=crop", prescription: false, description: "Ultra compact pocket-sized pulse oximeter with carrying case", quantity: 0, rating: 4.5 }
];

let products = [...fakeProducts];
let filteredProducts = [...fakeProducts];
let productGrid, sortSelect, showMoreBtn;

let currentFilters = {
  category: 'all',
  brand: 'all',
  discount: 'all',
  minPrice: 0,
  maxPrice: 10000
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
              class="mt-4 w-full ${isOutOfStock ? 'out-of-stock-btn bg-gray-400' : 'bg-[#10b981] hover:bg-[#0da271]'} text-white py-2 rounded-lg font-bold transition"
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
    'all': 'Health Monitoring Devices',
    'bp-monitor': 'Blood Pressure Monitors',
    'glucometer': 'Glucometers & Test Strips',
    'thermometer': 'Thermometers',
    'oximeter': 'Pulse Oximeters'
  };

  let title = categoryNames[currentFilters.category] || 'Health Monitoring Devices';

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
        maxPrice: 10000
      };

      // Reset price sliders
      if (document.getElementById('minThumb')) document.getElementById('minThumb').value = 0;
      if (document.getElementById('maxThumb')) document.getElementById('maxThumb').value = 10000;
      if (document.getElementById('mobileMinThumb')) document.getElementById('mobileMinThumb').value = 0;
      if (document.getElementById('mobileMaxThumb')) document.getElementById('mobileMaxThumb').value = 10000;
      
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
  const currentPageName = document.title || 'Health Monitoring Devices';
  
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
      fill.style.left = (minVal / 10000) * 100 + '%';
      fill.style.width = ((maxVal - minVal) / 10000) * 100 + '%';
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
      fill.style.left = (minVal / 10000) * 100 + '%';
      fill.style.width = ((maxVal - minVal) / 10000) * 100 + '%';
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