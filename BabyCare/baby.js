// baby.js - 100% FIXED FINAL VERSION (No Syntax Errors, Mobile Apply Button Works Perfectly)
(function() {
  'use strict';
  
  if (window.babyFinal) return;
  window.babyFinal = true;

  let products = [];
  let filteredProducts = [];
  let currentPage = 1;
  const itemsPerPage = 12;

  const $ = id => document.getElementById(id);

  const loadProducts = () => {
    // baby.js - FULL FINAL VERSION (17 Products – No Missing)

products = [
  // ==================== DIAPERS & HYGIENE ====================
  {
    id: 1,
    title: "Pampers Premium Care Pants - Newborn (78 Count)",
    price: 1299,
    discount: 35,
    rating: 4.6,
    brand: "Pampers",
    category: "diapers-hygiene",
    mainImageUrl: "https://m.media-amazon.com/images/I/71N3kZZyZAL._SL1500_.jpg",
    description: "India's softest diaper with magic gel. 12-hour leak-lock. Wetness indicator. Ideal for 0-5 kg babies.",
    availableSizes: ["Newborn", "Small (S)", "Medium (M)", "Large (L)", "XL", "XXL"]
  },
  {
    id: 4,
    title: "Huggies Wonder Pants - Large (64 Count)",
    price: 999,
    discount: 30,
    rating: 4.7,
    brand: "Huggies",
    category: "diapers-hygiene",
    mainImageUrl: "https://m.media-amazon.com/images/I/81fF2n7kMGL._SL1500_.jpg",
    description: "Bubble bed technology. Double leak guard. Overnight protection up to 12 hours.",
    availableSizes: ["Small (S)", "Medium (M)", "Large (L)", "XL", "XXL"]
  },
  {
    id: 7,
    title: "MamyPoko Pants Extra Absorb - XL (56 Count)",
    price: 1099,
    discount: 28,
    rating: 4.5,
    brand: "MamyPoko",
    category: "diapers-hygiene",
    mainImageUrl: "https://m.media-amazon.com/images/I/81X5o2d2KZL._SL1500_.jpg",
    description: "Crisscross sheet absorbs 12 hours. Prevents redness. Easy to wear & remove.",
    availableSizes: ["Small (S)", "Medium (M)", "Large (L)", "XL", "XXL", "XXXL"]
  },
  {
    id: 10,
    title: "Pampers Fresh Clean Baby Wipes (72 × 4 Packs)",
    price: 399,
    discount: 20,
    rating: 4.5,
    brand: "Pampers",
    category: "diapers-hygiene",
    mainImageUrl: "https://m.media-amazon.com/images/I/81s7K9m1JUL._SL1500_.jpg",
    description: "Gentle on skin. Refreshing scent. Alcohol-free. Dermatologically tested.",
    availableSizes: ["72×2 Pack", "72×4 Pack", "72×6 Pack", "72×8 Pack"]
  },
  {
    id: 12,
    title: "Mee Mee Caring Baby Wet Wipes (72 × 3)",
    price: 249,
    discount: 35,
    rating: 4.3,
    brand: "MeeMee",
    category: "diapers-hygiene",
    mainImageUrl: "https://m.media-amazon.com/images/I/81Q4QbA8kUL._SL1500_.jpg",
    description: "99% purified water. Aloe vera & vitamin E. Extra thick. Paraben free.",
    availableSizes: ["72×1 Pack", "72×3 Pack", "72×5 Pack"]
  },

  // ==================== BATH & BODY ====================
  {
    id: 2,
    title: "Himalaya Gentle Baby Shampoo 400ml",
    price: 349,
    discount: 25,
    rating: 4.3,
    brand: "Himalaya",
    category: "bath-body",
    mainImageUrl: "https://m.media-amazon.com/images/I/71pIlb8rKUL._SL1500_.jpg",
    description: "Tear-free formula. Natural proteins. Chickpea & fenugreek extract. No parabens.",
    availableSizes: ["200 ml", "400 ml", "700 ml"]
  },
  {
    id: 5,
    title: "Johnson's Baby Oil 500ml",
    price: 499,
    discount: 22,
    rating: 4.6,
    brand: "Johnson's",
    category: "bath-body",
    image: "https://m.media-amazon.com/images/I/61o2hL8T6GL._SL1000_.jpg",
    description: "Locks in 10x more moisture. Clinically proven mild. Ideal for baby massage.",
    availableSizes: ["100 ml", "200 ml", "500 ml"]
  },
  {
    id: 8,
    title: "Himalaya Baby Lotion 400ml",
    price: 299,
    discount: 15,
    rating: 4.4,
    brand: "Himalaya",
    category: "bath-body",
    image: "https://m.media-amazon.com/images/I/71dXt+2fKLL._SL1500_.jpg",
    description: "24-hour moisturization. Almond & olive oil. Hypoallergenic. No mineral oil.",
    availableSizes: ["200 ml", "400 ml", "700 ml"]
  },
  {
    id: 11,
    title: "Himalaya Baby Powder 400g",
    price: 285,
    discount: 18,
    rating: 4.5,
    brand: "Himalaya",
    category: "bath-body",
    image: "https://m.media-amazon.com/images/I/71a9Z7Z7Z7L._SL1500_.jpg",
    description: "Keeps baby fresh & cool. Yashada bhasma protects skin. No talc.",
    availableSizes: ["100g", "200g", "400g"]
  },
  {
    id: 14,
    title: "Sebamed Baby Cleansing Bar 100g (Pack of 3)",
    price: 699,
    discount: 12,
    rating: 4.7,
    brand: "Sebamed",
    category: "bath-body",
    image: "https://m.media-amazon.com/images/I/71K5Z7Z7Z7L._SL1500_.jpg",
    description: "pH 5.5. Tear-free. 100% soap-free. Clinically proven.",
    availableSizes: ["100g × 1", "100g × 3", "100g × 5"]
  },

  // ==================== NUTRITION & FEEDING ====================
  {
    id: 3,
    title: "Babyhug Feeding Bottle 250ml - Anti Colic",
    price: 499,
    discount: 0,
    rating: 4.7,
    brand: "BabyHug",
    category: "nutrition-feeding",
    image: "https://m.media-amazon.com/images/I/61fF9vJ2KHL._SL1000_.jpg",
    description: "BPA-free. Wide neck. Slow flow silicone nipple. Easy to clean.",
    availableSizes: ["125 ml", "250 ml", "330 ml"]
  },
  {
    id: 6,
    title: "Chicco Natural Feeling Feeding Bottle 250ml",
    price: 799,
    discount: 10,
    rating: 4.6,
    brand: "Chicco",
    category: "nutrition-feeding",
    image: "https://m.media-amazon.com/images/I/71gG9vJ2KHL._SL1500_.jpg",
    description: "Angled nipple for natural latch. Anti-colic valve. Soft silicone.",
    availableSizes: ["150 ml", "250 ml", "330 ml"]
  },
  {
    id: 9,
    title: "Pigeon Peristaltic Nipple - Medium Flow",
    price: 299,
    discount: 15,
    rating: 4.5,
    brand: "Pigeon",
    category: "nutrition-feeding",
    image: "https://m.media-amazon.com/images/I/71hH9vJ2KHL._SL1200_.jpg",
    description: "Promotes natural tongue movement. Super stretchable. Pack of 2.",
    availableSizes: ["Slow Flow", "Medium Flow", "Fast Flow", "Y-Cut"]
  },
  {
    id: 15,
    title: "Babyhug Stainless Steel Sipper 300ml",
    price: 649,
    discount: 20,
    rating: 4.4,
    brand: "BabyHug",
    category: "nutrition-feeding",
    image: "https://m.media-amazon.com/images/I/81jJ9vJ2KHL._SL1500_.jpg",
    description: "Leak-proof. Double wall insulated. Keeps liquid warm/cool.",
    availableSizes: ["200 ml", "300 ml", "400 ml"]
  },
  {
    id: 16,
    title: "Mee Mee Silicone Fruit Feeder",
    price: 349,
    discount: 25,
    rating: 4.3,
    brand: "MeeMee",
    category: "nutrition-feeding",
    image: "https://m.media-amazon.com/images/I/71kK9vJ2KHL._SL1200_.jpg",
    description: "Safe way to introduce solids. BPA-free. Easy grip handle.",
    availableSizes: ["Small", "Medium", "Large"]
  },

  // ==================== GIFT HAMPERS ====================
  {
    id: 13,
    title: "BabyHug Premium Newborn Gift Hamper (15 Items)",
    price: 2999,
    discount: 20,
    rating: 4.9,
    brand: "BabyHug",
    category: "gift-hampers",
    image: "https://m.media-amazon.com/images/I/81eWvP0XhGL._SL1500_.jpg",
    description: "Complete newborn kit: Rompers, blanket, bottle, toys, bibs, mittens & more.",
    availableSizes: ["0-3 Months", "3-6 Months", "6-12 Months"]
  },
  {
    id: 17,
    title: "Himalaya Baby Care Complete Gift Pack",
    price: 1499,
    discount: 30,
    rating: 4.6,
    brand: "Himalaya",
    category: "gift-hampers",
    image: "https://m.media-amazon.com/images/I/81X5o0d2KZL._SL1500_.jpg",
    description: "Shampoo, lotion, powder, oil, soap, cream & wipes – full combo.",
    availableSizes: ["Standard Pack", "Deluxe Pack"]
  }
];
    filteredProducts = [...products];
    render();
  };

  const render = () => {
    const start = (currentPage - 1) * itemsPerPage;
    const items = filteredProducts.slice(start, start + itemsPerPage);
    const grid = $("productsGrid");

    

    grid.innerHTML = items.map(p => `
  <div class="product-card bg-white rounded-lg  shadow-lg overflow-hidden transition-all duration-300 cursor-pointer"
       onclick="openProductDetails(${p.id})">
    <div class="cursor-pointer relative bg-gray-50 aspect-[9/6] overflow-hidden">

     <img src="${p.mainImageUrl}" alt="${p.title}"
             class="w-full h-full object-contain p-5 transition-transform duration-500 group-hover:scale-110">

        ${p.discount ? `<div class="absolute top-2 left-2 bg-[#00809D] text-white text-xs font-bold px-2 py-1 rounded">${p.discount}% OFF</div>` : ''}
    </div>
    <button 
  class="absolute top-3 left-64 bg-white/90 backdrop-blur hover:bg-white p-3 rounded-full shadow-lg transition-all duration-300 z-10"
  onclick="event.stopPropagation(); addToWishlist(${p.id}); 
           this.classList.toggle('active-wish');
           this.querySelector('i').classList.toggle('fas');
           this.querySelector('i').classList.toggle('far');
           this.querySelector('i').classList.toggle('text-red-600');">
  <i class="far fa-heart text-xl ${JSON.parse(localStorage.getItem('wishlist')||'[]').some(w => w.id === p.id) ? 'fas text-red-600' : 'text-gray-600'}"></i>
</button>
    <div class="p-3">
      <h3 class="font-bold text-md mb-2  text-gray-800">${p.title}</h3>
      <div class="flex items-center gap-1 mb-2">
        <span class="text-yellow-500">★</span>
        <span class="text-sm font-medium text-gray-700">${p.rating}</span>
      </div>
      <div class="flex items-baseline gap-2">
        <p class="text-xl font-bold text-green-600">₹${p.price}</p>
        ${p.discount ? `<p class="text-sm text-gray-400 line-through">₹${Math.round(p.price/(1-p.discount/100))}</p>` : ''}
      </div>
      <button class="mt-4 w-full bg-[#239BA7] hover:bg-[#00809D] text-white font-bold py-3 rounded-xl transition prevent-click"
              onclick="event.stopPropagation(); addToCart(${p.id})">
        Add to Cart
      </button>
    </div>
  </div>
`).join('');

    $("resultsCount").textContent = 
      `Showing ${start + 1}–${Math.min(start + itemsPerPage, filteredProducts.length)} of ${filteredProducts.length} products`;
    
    renderPagination();
  };

  const renderPagination = () => {
    const totalPages = Math.ceil(filteredProducts.length / itemsPerPage);
    const pag = $("pagination");
    if (totalPages <= 1) { pag.innerHTML = ''; return; }

    let html = '';
    if (currentPage > 1) html += `<button class="px-4 py-2 bg-white rounded-lg font-bold text-pink-600" onclick="window.changePage(${currentPage-1})">← Prev</button>`;
    
    for (let i = 1; i <= totalPages; i++) {
      if (i === 1 || i === totalPages || (i >= currentPage - 1 && i <= currentPage + 1)) {
        html += `<button class="px-4 py-2 ${i === currentPage ? 'bg-pink-600 text-white' : 'bg-white text-pink-600'} rounded-lg font-bold" onclick="window.changePage(${i})">${i}</button>`;
      } else if (i === currentPage - 2 || i === currentPage + 2) {
        html += `<span class="px-2">...</span>`;
      }
    }
    if (currentPage < totalPages) html += `<button class="px-4 py-2 bg-white rounded-lg font-bold text-pink-600" onclick="window.changePage(${currentPage+1})">Next →</button>`;
    
    pag.innerHTML = html;
  };

  window.changePage = (page) => {
    currentPage = page;
    render();
    window.scrollTo({top: 0, behavior: 'smooth'});
  };

  // Get current active filters from both desktop & mobile
 const getActiveFilters = () => {
  // Category
  const category = document.querySelector('input[name="category"]:checked, input[name="mobileCategory"]:checked')?.value || 'all';

  // Brand
  const brand = document.querySelector('input[name="brand"]:checked, input[name="mobileBrand"]:checked')?.value || 'all';

  // Discount
  const discountEl = document.querySelector('input[name="discount"]:checked, input[name="mobileDiscount"]:checked');
  const discount = discountEl?.value === 'all' ? null : parseInt(discountEl?.value || '0');

  // ───── PRICE RANGE – ALWAYS READ FROM THE VISIBLE SLIDERS ─────
  let minPrice = 0;
  let maxPrice = 10000;

  // Desktop sliders exist → use them
  const desktopMin = $("minThumb");
  const desktopMax = $("maxThumb");
  if (desktopMin && desktopMax) {
    minPrice = Number(desktopMin.value);
    maxPrice = Number(desktopMax.value);
  } 
  // Mobile sliders exist → use them (fallback)
  else {
    const mobileMin = $("mobileMinThumb");
    const mobileMax = $("mobileMaxThumb");
    if (mobileMin) minPrice = Number(mobileMin.value);
    if (mobileMax) maxPrice = Number(mobileMax.value);
  }

  return { category, brand, discount, minPrice, maxPrice };
};

  const applyFilters = () => {
    const { category, brand, discount, minPrice, maxPrice } = getActiveFilters();

    let list = [...products];

    if (category !== 'all') list = list.filter(p => p.category === category);
    if (brand !== 'all') list = list.filter(p => p.brand === brand);
    if (discount !== null) list = list.filter(p => (p.discount || 0) >= discount);
    list = list.filter(p => p.price >= minPrice && p.price <= maxPrice);

    filteredProducts = list;
    currentPage = 1;
    applySorting();
  };

  const applySorting = () => {
    const sortValue = $("sortSelect")?.value || document.querySelector('input[name="mobileSort"]:checked')?.value || 'default';

    if (sortValue === 'price-low') filteredProducts.sort((a,b) => a.price - b.price);
    else if (sortValue === 'price-high') filteredProducts.sort((a,b) => b.price - a.price);
    else if (sortValue === 'rating') filteredProducts.sort((a,b) => b.rating - a.rating);
    else if (sortValue === 'newest') filteredProducts.sort((a,b) => b.id - a.id);

    render();
  };

 const syncAndUpdateSliders = () => {
  let min = 0;
  let max = 10000;

  // Take the current values from whichever slider is available
  if ($("minThumb")) min = Number($("minThumb").value);
  else if ($("mobileMinThumb")) min = Number($("mobileMinThumb").value);

  if ($("maxThumb")) max = Number($("maxThumb").value);
  else if ($("mobileMaxThumb")) max = Number($("mobileMaxThumb").value);

  // Make sure min ≤ max
  if (min > max) [min, max] = [max, min];

  // ───── WRITE THE SAME VALUES TO ALL FOUR THUMBS ─────
  const thumbs = ["minThumb", "mobileMinThumb", "maxThumb", "mobileMaxThumb"];
  thumbs.forEach(id => {
    const el = $(id);
    if (el) {
      el.value = (id.includes("min")) ? min : max;
    }
  });

  // Update visual fill
  document.querySelectorAll('.slider-fill').forEach(fill => {
    fill.style.left = (min / 10000 * 100) + '%';
    fill.style.width = ((max - min) / 10000 * 100) + '%';
  });

  // Update text
  document.querySelectorAll('#minValue, #mobileMinValue').forEach(el => el && (el.textContent = '₹' + min));
  document.querySelectorAll('#maxValue, #mobileMaxValue').forEach(el => el && (el.textContent = '₹' + max));
};

  // NEW: Sync mobile radio selections to desktop ones so filtering works perfectly
  const syncMobileFiltersToDesktop = () => {
    // Category
    const mobileCat = document.querySelector('input[name="mobileCategory"]:checked');
    if (mobileCat) {
      const desktopCat = document.querySelector(`input[name="category"][value="${mobileCat.value}"]`);
      if (desktopCat) desktopCat.checked = true;
    }

    // Brand
    const mobileBrand = document.querySelector('input[name="mobileBrand"]:checked');
    if (mobileBrand) {
      const desktopBrand = document.querySelector(`input[name="brand"][value="${mobileBrand.value}"]`);
      if (desktopBrand) desktopBrand.checked = true;
    }

    // Discount
    const mobileDisc = document.querySelector('input[name="mobileDiscount"]:checked');
    if (mobileDisc) {
      const desktopDisc = document.querySelector(`input[name="discount"][value="${mobileDisc.value}"]`);
      if (desktopDisc) desktopDisc.checked = true;
    }
  };

  const clearAllFilters = () => {
    // Reset ALL radios (both mobile & desktop)
    document.querySelectorAll('input[type="radio"]').forEach(radio => {
      if (radio.value === 'all') radio.checked = true;
    });

    // Reset sliders
    [$("minThumb"), $("mobileMinThumb")].forEach(el => el && (el.value = 0));
    [$("maxThumb"), $("mobileMaxThumb")].forEach(el => el && (el.value = 10000));

    syncAndUpdateSliders();
    applyFilters();
  };

  const initBannerCarousel = () => {
    const slides = document.querySelectorAll('.banner-slide');
    const dots = document.querySelectorAll('.banner-dot');
    let idx = 0;
    const show = (i) => {
      slides.forEach(s => s.classList.remove('active'));
      dots.forEach(d => d.classList.remove('active'));
      slides[i].classList.add('active');
      dots[i].classList.add('active');
    };
    dots.forEach((d, i) => d.onclick = () => show(idx = i));
    setInterval(() => show(idx = (idx + 1) % slides.length), 4000);
    show(0);
  };

  const initMobileSheets = () => {
    const filterSheet = $("filterSheet");
    const sortSheet = $("sortSheet");
    const backdrop = $("mobileSheetBackdrop");

    const close = () => {
      filterSheet?.classList.add('translate-y-full');
      sortSheet?.classList.add('translate-y-full');
      backdrop?.classList.add('hidden');
    };

    $("openFilterSheet")?.addEventListener('click', () => {
      filterSheet?.classList.remove('translate-y-full');
      backdrop?.classList.remove('hidden');
    });

    $("openSortSheet")?.addEventListener('click', () => {
      sortSheet?.classList.remove('translate-y-full');
      backdrop?.classList.remove('hidden');
    });

    $("closeFilterSheet")?.addEventListener('click', close);
    $("closeSortSheet")?.addEventListener('click', close);
    backdrop?.addEventListener('click', close);

    // FIXED: Apply Filters from Mobile (now syncs + applies perfectly)
    $("applyMobileFilters")?.addEventListener('click', () => {
      syncMobileFiltersToDesktop();  // Sync mobile choices to desktop
      applyFilters();                // Now it WILL work correctly
      close();
    });

    // Apply Sort from Mobile
    $("applySortBtn")?.addEventListener('click', () => {
      const val = document.querySelector('input[name="mobileSort"]:checked')?.value || 'default';
      if ($("sortSelect")) $("sortSelect").value = val;
      applySorting();
      close();
    });

    $("clearMobileFilters")?.addEventListener('click', clearAllFilters);
  };


  // Open product details page
window.openProductDetails = (id) => {
  const product = products.find(p => p.id === id);
  if (!product) return;

  // Save product to sessionStorage so details page can read it
  sessionStorage.setItem('currentProduct', JSON.stringify(product));
  sessionStorage.setItem('allProducts', JSON.stringify(products)); // optional, for related products

  // Open product details page
  window.location.href = 'baby-product-details.html';
};

// Add to Cart (shared function)
window.addToCart = (id) => {
  const product = products.find(p => p.id === id);
  if (!product) return;

  let cart = JSON.parse(localStorage.getItem('cart') || '[]');
  
  const existing = cart.find(item => item.id === id);
  if (existing) {
    existing.quantity += 1;
  } else {
    cart.push({ ...product, quantity: 1 });
  }

  localStorage.setItem('cart', JSON.stringify(cart));
  updateCartCount();

  // Optional: Show toast/notification
  showToast(`${product.title} added to cart!`);
};

// Update cart count in header (assumes your header has #cartCount)
function updateCartCount() {
  const cart = JSON.parse(localStorage.getItem('cart') || '[]');
  const total = cart.reduce((sum, item) => sum + item.quantity, 0);
  const countEl = document.querySelector('#cartCount');
  if (countEl) {
    countEl.textContent = total;
    countEl.style.display = total > 0 ? 'flex' : 'none';
  }
}

// Simple toast notification
function showToast(message) {
  const toast = document.createElement('div');
  toast.textContent = message;
  toast.style.cssText = `
    position: fixed; bottom: 100px; left: 50%; transform: translateX(-50%);
    background: #10b981; color: white; padding: 1rem 2rem; border-radius: 50px;
    font-weight: bold; z-index: 10000; animation: toast 3s ease forwards;
  `;
  document.body.appendChild(toast);
  setTimeout(() => toast.remove(), 3000);
}

// Replace your current addToWishlist with this FIXED version
window.addToWishlist = (id) => {
  const product = products.find(p => p.id === id);
  if (!product) return;

  let wishlist = JSON.parse(localStorage.getItem('wishlist') || '[]');

  const exists = wishlist.find(item => item.id === id);
  if (exists) {
    wishlist = wishlist.filter(item => item.id !== id);
    showToast('Removed from Wishlist');
  } else {
    // YE LINE SABSE ZAROORI HAI – name & image add kar rahe hain
    wishlist.push({
      id: product.id,
      name: product.title,                    // ← yeh add karo
      price: product.price,
      originalPrice: product.discount 
        ? Math.round(product.price / (1 - product.discount/100)) 
        : product.price,
      discount: product.discount || 0,
      image: product.image || `https://via.placeholder.com/300/ ec4899/white?text=${product.title.slice(0,2)}`, // optional real image
      title: product.title,                   // backup
      brand: product.brand,
      rating: product.rating
    });
    showToast('Added to Wishlist');
  }

  localStorage.setItem('wishlist', JSON.stringify(wishlist));
  updateWishlistCount();

  // Update heart icon instantly
  const btn = event?.target?.closest('button');
  if (btn) {
    btn.classList.toggle('active-wish');
    const icon = btn.querySelector('i');
    icon.classList.toggle('far');
    icon.classList.toggle('fas');
    icon.classList.toggle('text-red-600');
  }
};

// Update Wishlist Count in Header (Desktop + Mobile)
function updateWishlistCount() {
  const wishlist = JSON.parse(localStorage.getItem('wishlist') || '[]');
  const total = wishlist.length;

  // Desktop count
  const desktopCount = document.querySelector('#wishlistCount');
  if (desktopCount) {
    desktopCount.textContent = total;
    desktopCount.style.display = total > 0 ? 'flex' : 'none';
  }

  // Mobile count (agar header mein hai toh)
  const mobileCount = document.querySelector('#mobileWishlistCount');
  if (mobileCount) {
    mobileCount.textContent = total;
    mobileCount.style.display = total > 0 ? 'flex' : 'none';
  }
}

// Add toast animation
if (!document.querySelector('#toastStyle')) {
  const style = document.createElement('style');
  style.id = 'toastStyle';
  style.textContent = `
    @keyframes toast {
      0%, 100% { opacity: 0; transform: translateX(-50%) translateY(20px); }
      10%, 90% { opacity: 1; transform: translateX(-50%) translateY(0); }
    }
  `;
  document.head.appendChild(style);
}


  const init = () => {
    loadProducts();
    syncAndUpdateSliders();
    initBannerCarousel();
    initMobileSheets();

    // Apply filters when any radio changes (desktop + mobile)
    document.addEventListener('change', (e) => {
      if (e.target.matches('input[name="category"], input[name="brand"], input[name="discount"], input[name="mobileCategory"], input[name="mobileBrand"], input[name="mobileDiscount"]')) {
        applyFilters();
      }
      if (e.target.matches('input[name="mobileSort"]')) {
        const val = e.target.value;
        if ($("sortSelect")) $("sortSelect").value = val;
      }
    });

    $("sortSelect")?.addEventListener('change', applySorting);

   // Inside init() → replace the old input listener with this:
document.addEventListener('input', e => {
  if (e.target.matches('input[type="range"]')) {
    syncAndUpdateSliders();
    clearTimeout(window._sliderTO);
    window._sliderTO = setTimeout(applyFilters, 200);
  }
});

    $("filterForm")?.addEventListener('submit', e => {
      e.preventDefault();
      applyFilters();
    });
  };

  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', init);
  } else {
    init();
  }
})();