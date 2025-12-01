// FAKE PRODUCTS – 100% FRONTEND ONLY (Updated with real images)
const fakeProducts = [
  { id: 1, name: "Dolo 650 Tablet", brand: "Micro Labs", price: 32, originalPrice: 45, discount: 29, category: "fever", image: "https://images.unsplash.com/photo-1584308666744-24d5c474f2ae?w=400&h=400&fit=crop", prescription: false, description: "Paracetamol 650mg for fever and pain relief. Trusted by millions." },
  { id: 2, name: "Saridon Tablet", brand: "Piramal", price: 42, originalPrice: 55, discount: 24, category: "pain", image: "https://images.unsplash.com/photo-1471864190281-a93a3070b6de?w=400&h=400&fit=crop", prescription: false, description: "Fast-acting headache relief with Propyphenazone, Paracetamol & Caffeine." },
  { id: 3, name: "Crocin Advance", brand: "GSK", price: 28, originalPrice: 40, discount: 30, category: "fever", image: "https://images.unsplash.com/photo-1587854692152-cbe660dbde88?w=400&h=400&fit=crop", prescription: false, description: "Optizorb technology for faster pain relief." },
  { id: 4, name: "Eno Lemon 5g x30", brand: "GSK", price: 135, originalPrice: 180, discount: 25, category: "allergy", image: "https://images.unsplash.com/photo-1631549916768-4119b2e5f926?w=400&h=400&fit=crop", prescription: false, description: "Instant relief from acidity & heartburn." },
  { id: 5, name: "Volini Gel 30g", brand: "Sun Pharma", price: 115, originalPrice: 150, discount: 23, category: "ointments", image: "https://images.unsplash.com/photo-1608571423902-eed4a5ad8108?w=400&h=400&fit=crop", prescription: false, description: "Pain relief gel for sprains, muscle pain & joint pain." },
  { id: 6, name: "Vicks VapoRub 25ml", brand: "P&G", price: 98, originalPrice: 125, discount: 22, category: "ointments", image: "https://images.unsplash.com/photo-1607619056574-7b8d3ee536b2?w=400&h=400&fit=crop", prescription: false, description: "Relief from cold, cough, blocked nose & body ache." },
  { id: 7, name: "Himalaya Liv.52", brand: "Himalaya", price: 135, originalPrice: 180, discount: 25, category: "health-supp", image: "https://images.unsplash.com/photo-1550572017-4876b7788da6?w=400&h=400&fit=crop", prescription: false, description: "Protects liver & improves appetite." },
  { id: 8, name: "Moov Cream 35g", brand: "Paras", price: 105, originalPrice: 140, discount: 25, category: "pain", image: "https://images.unsplash.com/photo-1585435557343-3b092031a831?w=400&h=400&fit=crop", prescription: false, description: "Instant relief from back pain, joint pain & inflammation." },
  { id: 9, name: "Ayurvedic Tablets", brand: "Himalaya", price: 250, originalPrice: 350, discount: 29, category: "ayurvedic", image: "https://images.unsplash.com/photo-1599932887768-d6cb80133949?w=400&h=400&fit=crop", prescription: false, description: "Natural ayurvedic supplement for overall wellness." },
  { id: 10, name: "Cetrizine 10mg", brand: "BabyHug", price: 45, originalPrice: 60, discount: 25, category: "allergy", image: "https://images.unsplash.com/photo-1628771065518-0d82f1938462?w=400&h=400&fit=crop", prescription: false, description: "Fast relief from allergic reactions and symptoms." },
  { id: 11, name: "Baby Diaper Cream", brand: "Pampers", price: 180, originalPrice: 250, discount: 28, category: "ointments", image: "https://images.unsplash.com/photo-1620485843666-c561c49f1c17?w=400&h=400&fit=crop", prescription: false, description: "Gentle cream for baby's sensitive skin." },
  { id: 12, name: "Multivitamin Tablets", brand: "MeeMee", price: 320, originalPrice: 450, discount: 29, category: "health-supp", image: "https://images.unsplash.com/photo-1584017911766-d451b3d0e843?w=400&h=400&fit=crop", prescription: false, description: "Complete daily nutrition supplement." }
];

let products = [...fakeProducts];
let filteredProducts = [...fakeProducts];
let productGrid, sortSelect;

// Filter state
let currentFilters = {
  category: 'all',
  brand: 'all',
  discount: 'all',
  minPrice: 0,
  maxPrice: 2000
};

document.addEventListener('DOMContentLoaded', () => {
  productGrid = document.getElementById('productGrid');
  sortSelect = document.getElementById('sortSelect');
  
  // Store products in sessionStorage with unique identifier
  // This will be used by product details page to show related items
  sessionStorage.setItem('currentPageProducts', JSON.stringify(fakeProducts));
  
  render(filteredProducts);
  updateResultsCount();
  initSlider();
  initSorting();
  initMobileSheets();
  initFilters();
});

function createCard(p) {
  const div = document.createElement('div');
  div.className = 'bg-white rounded-xl shadow-md overflow-hidden hover:shadow-xl transition cursor-pointer';
  
  const priceLine = p.originalPrice 
    ? `₹${p.price} <s class="text-gray-400 text-sm">₹${p.originalPrice}</s> <span class="text-green-600 text-sm font-bold">${p.discount}% off</span>`
    : `₹${p.price}`;

  div.innerHTML = `
    <img src="${p.image}" alt="${p.name}" class="w-full h-48 object-cover">
    <div class="p-4">
      <h3 class="font-semibold text-sm">${p.name}</h3>
      <p class="text-xs text-gray-500 mt-1">${p.brand}</p>
      <div class="mt-2 font-bold text-lg text-green-600">${priceLine}</div>
      <button onclick="navigateToProductDetails(${p.id})" class="view-details-btn mt-4 w-full bg-blue-600 hover:bg-blue-700 text-white py-3 rounded-lg font-bold transition">
        View Details
      </button>
    </div>
  `;
  return div;
}

function render(list) {
  productGrid.innerHTML = '';
  if (list.length === 0) {
    productGrid.innerHTML = '<div class="col-span-full text-center py-20 text-gray-500 text-xl">No products found matching your filters</div>';
    return;
  }
  list.forEach(p => productGrid.appendChild(createCard(p)));
}

function updateResultsCount() {
  const countEl = document.getElementById('resultsCount');
  if (countEl) {
    countEl.textContent = `${filteredProducts.length} products found`;
  }
  updateTitle();
}

function updateTitle() {
  const titleEl = document.querySelector('h2.text-3xl');
  if (!titleEl) return;

  const categoryNames = {
    'all': 'All OTC Products',
    'ayurvedic': 'Ayurvedic Medicines',
    'allergy': 'Allergy Relief Products',
    'fever': 'Fever & Flu Medicine',
    'pain': 'Pain Relief Products',
    'ointments': 'Ointments & Creams',
    'health-supp': 'Health Supplements'
  };

  let title = categoryNames[currentFilters.category] || 'All OTC Products';

  // Add brand to title if selected
  if (currentFilters.brand !== 'all') {
    title += ` - ${currentFilters.brand}`;
  }

  titleEl.textContent = title;
}

// Apply Filters Function
function applyFilters() {
  filteredProducts = products.filter(product => {
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
      if (product.discount < requiredDiscount) {
        return false;
      }
    }

    return true;
  });

  render(filteredProducts);
  updateResultsCount();
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
        maxPrice: 2000
      };

      // Reset price sliders
      document.getElementById('minThumb').value = 0;
      document.getElementById('maxThumb').value = 2000;
      document.getElementById('mobileMinThumb').value = 0;
      document.getElementById('mobileMaxThumb').value = 2000;
      updateDesktopSlider();
      updateMobileSlider();

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
  const currentPageName = document.title || 'OTC';
  
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
    sourcePage: currentPageName
  });

  window.location.href = `/productdetails.html?${params.toString()}`;
}

function initSorting() {
  sortSelect.addEventListener('change', () => {
    const val = sortSelect.value;
    let sorted = [...filteredProducts];
    if (val === 'price-low') sorted.sort((a,b) => a.price - b.price);
    if (val === 'price-high') sorted.sort((a,b) => b.price - a.price);
    if (val === 'rating') sorted.sort((a,b) => (b.rating || 0) - (a.rating || 0));
    if (val === 'newest') sorted.sort((a,b) => b.id - a.id);
    render(sorted);
  });

  // Mobile sort apply
  const applySortBtn = document.getElementById('applySortBtn');
  if (applySortBtn) {
    applySortBtn.addEventListener('click', () => {
      const selectedSort = document.querySelector('input[name="mobileSort"]:checked')?.value || 'default';
      sortSelect.value = selectedSort;
      sortSelect.dispatchEvent(new Event('change'));
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
    
    if (minVal > maxVal - 50) {
      minThumb.value = maxVal - 50;
    }
    
    const fill = document.getElementById('desktopFill');
    if (fill) {
      fill.style.left = (minVal / 2000) * 100 + '%';
      fill.style.width = ((maxVal - minVal) / 2000) * 100 + '%';
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
    
    if (minVal > maxVal - 50) {
      mobileMinThumb.value = maxVal - 50;
    }
    
    const fill = document.getElementById('mobileFill');
    if (fill) {
      fill.style.left = (minVal / 2000) * 100 + '%';
      fill.style.width = ((maxVal - minVal) / 2000) * 100 + '%';
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
  document.getElementById('openFilterSheet')?.addEventListener('click', () => {
    backdrop.classList.remove('hidden');
    filterSheet.classList.remove('translate-y-full');
  });

  // Close Filter Sheet
  const closeFilterSheet = () => {
    backdrop.classList.add('hidden');
    filterSheet.classList.add('translate-y-full');
  };

  document.getElementById('closeFilterSheet')?.addEventListener('click', closeFilterSheet);
  window.closeFilterSheet = closeFilterSheet;

  // Open Sort Sheet
  document.getElementById('openSortSheet')?.addEventListener('click', () => {
    backdrop.classList.remove('hidden');
    sortSheet.classList.remove('translate-y-full');
  });

  // Close Sort Sheet
  const closeSortSheet = () => {
    backdrop.classList.add('hidden');
    sortSheet.classList.add('translate-y-full');
  };

  document.getElementById('closeSortSheet')?.addEventListener('click', closeSortSheet);
  window.closeSortSheet = closeSortSheet;

  // Click backdrop to close
  backdrop.addEventListener('click', () => {
    closeFilterSheet();
    closeSortSheet();
  });
}

window.sortProducts = function(type) {
  sortSelect.value = type;
  sortSelect.dispatchEvent(new Event('change'));
  document.getElementById('mobileSheetBackdrop')?.click();
};