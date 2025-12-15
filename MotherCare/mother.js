// Global State
let allProducts = [];
let filteredProducts = [];
let wishlist = [];
let cart = JSON.parse(localStorage.getItem("cart") || "[]");
let currentPage = 1;
const pageSize = 12;
let filterState = {
  category: 'all',
  brand: 'all',
  discount: 0,
  minPrice: 0,
  maxPrice: 10000,
  sort: 'default'
};

// ==================== API BASE URLs ====================
const API_BASE = "http://localhost:8083/api/mb/products";
const WISHLIST_API_BASE = "http://localhost:8083/api/wishlist";
const IMAGE_BASE = "http://localhost:8083";
const CURRENT_USER_ID = 1;

console.log("🔧 Script loaded. API_BASE:", API_BASE);
console.log("🔧 WISHLIST_API_BASE:", WISHLIST_API_BASE);
console.log("🔧 IMAGE_BASE:", IMAGE_BASE);

function setText(id, text) {
  const el = document.getElementById(id);
  if (el) el.textContent = text;
}

// ==================== Backend Wishlist Sync Functions ====================
async function addToWishlistBackend(productId, productType = "MOTHER") {
  try {
    const response = await fetch(`${WISHLIST_API_BASE}/add-wishlist-items`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        userId: CURRENT_USER_ID,
        productId: productId,
        productType: productType
      })
    });
    if (response.ok) {
      const data = await response.json();
      console.log("✅ Backend: Added/Updated in wishlist", data);
      return data;
    } else {
      const err = await response.text();
      console.warn("⚠️ Backend add wishlist failed:", err);
    }
  } catch (err) {
    console.error("❌ Error calling add wishlist backend:", err);
  }
  return null;
}

async function removeFromWishlistBackend(productId, productType = "MOTHER") {
  try {
    const response = await fetch(`${WISHLIST_API_BASE}/remove-wishlist-items`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        userId: CURRENT_USER_ID,
        productId: productId,
        productType: productType
      })
    });
    if (response.ok) {
      console.log("✅ Backend: Removed from wishlist");
      return true;
    } else {
      console.warn("⚠️ Backend remove failed");
    }
  } catch (err) {
    console.error("❌ Error calling remove wishlist backend:", err);
  }
  return false;
}

async function loadWishlistFromBackend() {
  try {
    const response = await fetch(`${WISHLIST_API_BASE}/get-wishlist-items?userId=${CURRENT_USER_ID}`);
    if (response.ok) {
      const backendItems = await response.json();
      console.log("✅ Loaded wishlist from backend:", backendItems.length, "items");
     
      wishlist = [];
      backendItems.forEach(item => {
        wishlist.push({
          id: item.productId,
          name: item.title,
          price: item.price,
          originalPrice: item.originalPrice,
          image: item.imageUrl,
          productType: item.productType || "MOTHER"
        });
      });
     
      updateHeaderCounts();
      renderProducts();
    }
  } catch (err) {
    console.error("❌ Failed to load wishlist from backend:", err);
  }
}

// ==================== FETCH PRODUCTS FROM BACKEND ====================
async function loadProductsBySubcategories() {
  console.log("📦 Starting loadProductsBySubcategories...");
  const subcategories = [
    "Test Kits",
    "Skin Care",
    "Vitamins & Supplements",
    "Personal Care & Hygiene",
    "Trimester Kits",
    "Garbhsanskar Essentials & Ayurvedic Medicines",
    "Accessories & Maternity Wear",
    "Delivery Kits",
    "Post delivery recovery",
    "Breastfeeding Essentials",
    "Postpartum Hygiene",
    "Postpartum Nutrition",
    "Pain & Healing Support",
    "Uterine Health",
    "Menstruation Essentials and Hygiene",
    "PCOS and Preconception",
    "MenoPausal Medicines"
  ];
  console.log("📋 Subcategories to fetch:", subcategories.length);

  try {
    const requests = subcategories.map(sub => {
      const url = `${API_BASE}/subcategory/exact/${encodeURIComponent(sub)}`;
      console.log(`🌐 Fetching: ${url}`);
      return fetch(url)
        .then(res => {
          console.log(`✅ Response for "${sub}":`, res.ok ? 'OK' : 'FAILED', res.status);
          return res.ok ? res.json() : [];
        })
        .catch(err => {
          console.error(`❌ Error fetching "${sub}":`, err);
          return [];
        });
    });

    const results = await Promise.all(requests);
    console.log("📊 All fetch results:", results);
  
    const productsFromApi = results.flat();
    console.log("📦 Total products after flatten:", productsFromApi.length);
    console.log("=== 🔍 DETAILED API RESPONSE INSPECTION ===");
    console.log("Full API response array:", productsFromApi);
    console.log("First product object:", productsFromApi[0]);
  
    if (productsFromApi[0]) {
      console.log("📋 Keys in first product:", Object.keys(productsFromApi[0]));
      console.log("🔑 All field values in first product:");
      Object.keys(productsFromApi[0]).forEach(key => {
        console.log(` - ${key}:`, productsFromApi[0][key]);
      });
    }

    allProducts = productsFromApi.map((p, index) => {
      console.log(`\n🔄 Processing product ${index + 1}/${productsFromApi.length}`);
      console.log("Raw product data:", p);
    
      const title = p.productName || p.product_name || p.ProductName || p.title || p.Title || "Untitled Product";
      const price = Number(p.sellingPrice || p.selling_price || p.SellingPrice || p.price || p.Price) || 0;
      const originalPrice = Number(p.mrp || p.MRP || p.Mrp || p.originalPrice || p.original_price || p.OriginalPrice) || price || 0;
    
      const mrp = Number(p.mrp || p.MRP || p.Mrp || p.originalPrice || p.original_price) || 0;
      const sp = Number(p.sellingPrice || p.selling_price || p.SellingPrice || p.price) || 0;
      const discount = (mrp > 0 && sp > 0 && mrp > sp) ? Math.round(((mrp - sp) / mrp) * 100) : 0;
    
      const longDesc = p.longDescription || p.long_description || p.LongDescription || "";
      const shortDesc = p.shortDescription || p.short_description || p.ShortDescription || "";
      const description = longDesc || shortDesc || (Array.isArray(p.description) ? p.description.join(". ") : "No description available");
    
      const brand = p.brand || p.Brand || "Brand";
      const category = p.category || p.Category || "Uncategorized";
      const subcategory = p.subcategory || p.sub_category || p.Subcategory || category || "";
    
      const isActive = p.isActive !== undefined ? p.isActive : (p.is_active !== undefined ? p.is_active : true);
      const stockQty = p.stockQuantity !== undefined ? p.stockQuantity : (p.stock_quantity !== undefined ? p.stock_quantity : null);
      const inStock = isActive && (stockQty === null || Number(stockQty) > 0);
    
      console.log(" ✓ Mapped title:", title);
      console.log(" ✓ Mapped price:", price);
      console.log(" ✓ Mapped originalPrice:", originalPrice);
      console.log(" ✓ Mapped discount:", discount + "%");
      console.log(" ✓ Mapped brand:", brand);
      console.log(" ✓ Mapped category:", category);
      console.log(" ✓ Mapped inStock:", inStock);
    
      const mappedProduct = {
        id: p.id || p.Id || p.ID,
        title: title,
        price: price,
        originalPrice: originalPrice,
        discount: discount,
        rating: Number(p.rating || p.Rating) || 4.5,
        reviewCount: Number(p.reviewCount || p.review_count || p.ReviewCount) || 0,
        mainImageUrl: `${IMAGE_BASE}/api/mb/products/${p.id || p.Id || p.ID}/image`,
        description: description,
        category: category,
        subcategory: subcategory,
        brand: brand,
        inStock: inStock,
        productType: "MOTHER"
      };
    
      console.log(" ✅ Final mapped product:", mappedProduct);
      return mappedProduct;
    });

    console.log("\n=== ✅ MAPPING COMPLETE ===");
    console.log("Total mapped products:", allProducts.length);
    console.log("All mapped products:", allProducts);
    console.log("First mapped product:", allProducts[0]);

    filteredProducts = [...allProducts];
    console.log("📋 Filtered products initialized:", filteredProducts.length);
  
    console.log("🎨 Calling renderProducts...");
    renderProducts();
  
    setText("resultsCount", `Showing ${filteredProducts.length} products`);
    console.log("✅ loadProductsBySubcategories complete!");
    
    await loadWishlistFromBackend();
  } catch (err) {
    console.error("❌ FATAL ERROR in loadProductsBySubcategories:", err);
    console.error("Error stack:", err.stack);
    setText("resultsCount", "Failed to load products");
  }
}

// ==================== REST OF YOUR CODE ====================
function updateHeaderCounts() {
  console.log("🔢 Updating header counts...");
  const updateBadge = (id, count) => {
    const el = document.getElementById(id);
    if (el) {
      el.textContent = count;
      el.classList.toggle("hidden", count === 0);
    }
  };
  const cartTotal = cart.reduce((sum, item) => sum + (item.quantity || 1), 0);
  updateBadge("cartCount", cartTotal);
  updateBadge("wishlistCount", wishlist.length);
  console.log(" Cart total:", cartTotal);
  console.log(" Wishlist count:", wishlist.length);
}

async function toggleWishlist(id) {
  console.log("❤️ Toggle wishlist for product ID:", id);
  const product = allProducts.find(p => p.id === id);
  if (!product) {
    console.error("Product not found in allProducts:", id);
    return;
  }
  
  const index = wishlist.findIndex(item => item.id === id);
  const productType = product.productType || "MOTHER";
  
  if (index > -1) {
    const success = await removeFromWishlistBackend(id, productType);
    if (success) {
      wishlist.splice(index, 1);
      console.log(" Removed from wishlist");
      showToast("Removed from wishlist");
    }
  } else {
    const result = await addToWishlistBackend(id, productType);
    if (result) {
      const wishlistItem = {
        id: product.id,
        name: product.title.split(' (')[0].trim(),
        price: product.price,
        originalPrice: product.originalPrice || null,
        image: product.mainImageUrl,
        productType: productType
      };
      wishlist.push(wishlistItem);
      console.log(" Added to wishlist:", wishlistItem);
      showToast("Added to wishlist");
    }
  }
  
  updateHeaderCounts();
  renderProducts();
}

function showToast(msg) {
  console.log("🍞 Toast:", msg);
  const toast = document.createElement("div");
  toast.textContent = msg;
  toast.className = "fixed bottom-20 left-1/2 -translate-x-1/2 bg-black text-white px-6 py-3 rounded-full z-50 shadow-lg";
  document.body.appendChild(toast);
  setTimeout(() => toast.remove(), 2000);
}

function createProductCard(p) {
  console.log("🎴 Creating card for product:", p.id, p.title);
  const inWishlist = wishlist.some(x => x.id === p.id);
  const isOutOfStock = !p.inStock;
  
  return `
    <div class="group relative bg-white rounded-lg overflow-hidden shadow-sm hover:shadow-lg transition-all duration-300 border border-gray-100
                ${isOutOfStock ? 'opacity-60 grayscale cursor-not-allowed' : ''}"
         ${!isOutOfStock ? `onclick="event.stopPropagation(); viewProductDetails(${p.id})"` : ''}
         style="${isOutOfStock ? 'pointer-events: none;' : ''}">
      <div class="relative bg-gray-50 aspect-[6/4] overflow-hidden">
        <img src="${p.mainImageUrl}" alt="${p.title}"
             class="w-full h-full object-contain p-5 transition-transform duration-500 ${!isOutOfStock ? 'group-hover:scale-110' : ''}"
             onerror="this.onerror=null; this.src='https://i.imgur.com/8Rm9x2J.png'">
        <div class="absolute top-2 left-2 text-white text-xs font-bold px-3 py-1.5 rounded-full shadow-md z-10
                    ${isOutOfStock ? 'bg-red-600' : 'bg-green-600'}">
          ${isOutOfStock ? 'Out of Stock' : 'In Stock'}
        </div>
        <button onclick="event.stopPropagation(); toggleWishlist(${p.id})"
                class="absolute top-2 right-2 w-9 h-9 bg-white rounded-full shadow-lg flex items-center justify-center
                       ${isOutOfStock ? 'opacity-50' : 'opacity-0 group-hover:opacity-100'} transition-opacity z-10"
                ${isOutOfStock ? 'disabled' : ''}>
          <i class="${inWishlist ? 'fas fa-heart text-pink-600' : 'far fa-heart text-gray-600'} text-lg"></i>
        </button>
      </div>
      <div class="p-3">
        <p class="text-xs text-gray-500 uppercase font-medium truncate">${p.brand || 'Brand'}</p>
        <h3 class="text-sm font-medium text-gray-800 line-clamp-2 mt-1">${p.title}</h3>
        <div class="mt-2 flex items-center gap-2">
          <span class="text-lg font-bold text-gray-900">₹${p.price.toLocaleString()}</span>
          ${p.originalPrice > p.price ? `
            <span class="text-sm text-gray-500 line-through">₹${p.originalPrice.toLocaleString()}</span>
            <span class="text-xs bg-red-100 text-red-600 px-2 py-1 rounded">${p.discount}% OFF</span>
          ` : ''}
        </div>
        <button onclick="event.stopPropagation(); viewProductDetails(${p.id})"
                class="mt-3 w-full font-medium text-sm py-2.5 rounded-lg transition
                        ${isOutOfStock
                          ? 'bg-gray-300 text-gray-600 cursor-not-allowed'
                          : 'bg-[#CD2C58] hover:bg-[#AB886D] text-white'}">
          ${isOutOfStock ? 'Out of Stock' : 'View Details'}
        </button>
      </div>
    </div>
  `;
}

function renderProducts() {
  console.log("🎨 Rendering products...");
  console.log(" Current page:", currentPage);
  console.log(" Page size:", pageSize);
  console.log(" Total filtered products:", filteredProducts.length);
  
  const start = (currentPage - 1) * pageSize;
  const paginated = filteredProducts.slice(start, start + pageSize);
  console.log(" Rendering products from index", start, "to", start + pageSize);
  console.log(" Paginated products count:", paginated.length);
  
  const grid = document.getElementById("productsGrid");
  if (!grid) {
    console.error("❌ productsGrid element not found!");
    return;
  }
  
  if (grid) {
    grid.innerHTML = paginated.length
      ? paginated.map(createProductCard).join("")
      : `<p class="col-span-full text-center text-gray-500 py-10">No products found</p>`;
    console.log(" ✅ Grid HTML updated");
  }
  
  setText("resultsCount", `Showing ${filteredProducts.length} products`);
  renderPagination();
}

function renderPagination() {
  console.log("📄 Rendering pagination...");
  const container = document.getElementById("pagination");
  if (!container) {
    console.log(" Pagination container not found");
    return;
  }
  
  const totalPages = Math.ceil(filteredProducts.length / pageSize);
  console.log(" Total pages:", totalPages);
  
  container.innerHTML = "";
  for (let i = 1; i <= totalPages; i++) {
    const btn = document.createElement("button");
    btn.textContent = i;
    btn.className = `px-4 py-2 rounded border mx-1 ${i === currentPage ? 'bg-[#9A3F3F] text-white' : 'bg-white text-pink-600 border-pink-300'}`;
    btn.onclick = () => { currentPage = i; renderProducts(); };
    container.appendChild(btn);
  }
}

function applyFilters() {
  console.log("🔍 Applying filters...");
  console.log(" Filter state:", filterState);
  
  filteredProducts = allProducts.filter(p => {
    const catMatch = filterState.category === 'all' || p.category === filterState.category;
    const brandMatch = filterState.brand === 'all' || p.brand === filterState.brand;
    const discMatch = p.discount >= filterState.discount;
    const priceMatch = p.price >= filterState.minPrice && p.price <= filterState.maxPrice;
    return catMatch && brandMatch && discMatch && priceMatch;
  });
  
  console.log("Filtered products count:", filteredProducts.length);
  sortProducts(filterState.sort);
  currentPage = 1;
  renderProducts();
  saveFiltersToStorage();
}

function sortProducts(type) {
  console.log("📊 Sorting products by:", type);
  switch (type) {
    case 'prize-low': filteredProducts.sort((a, b) => a.price - b.price); break;
    case 'prize-high': filteredProducts.sort((a, b) => b.price - a.price); break;
    case 'rating': filteredProducts.sort((a, b) => b.rating - a.rating); break;
    case 'newest': filteredProducts.sort((a, b) => b.id - a.id); break;
    default: break;
  }
}

function loadFiltersFromStorage() {
  console.log("💾 Loading filters from storage...");
  try {
    const saved = localStorage.getItem('motherCareFilters');
    if (saved) {
      filterState = { ...filterState, ...JSON.parse(saved) };
      console.log(" Loaded filter state:", filterState);
    }
  } catch (e) {
    console.error(" Failed to load filters", e);
  }
}

function saveFiltersToStorage() {
  console.log("💾 Saving filters to storage:", filterState);
  localStorage.setItem('motherCareFilters', JSON.stringify(filterState));
}

function initPriceSliders() {
  console.log("💰 Initializing price sliders...");
  const sliders = document.querySelectorAll(".price-slider-container");
  const maxRange = 10000;
  
  sliders.forEach(container => {
    const minThumb = container.querySelector('input[type="range"]:first-of-type');
    const maxThumb = container.querySelector('input[type="range"]:last-of-type');
    const fill = container.querySelector(".slider-fill") || container.querySelector("#desktopFill");
    const minVal = container.querySelector("#minValue") || container.querySelector(".price-values span:first-child");
    const maxVal = container.querySelector("#maxValue") || container.querySelector(".price-values span:last-child");
    
    const update = (minP, maxP) => {
      const minPct = (minP / maxRange) * 100;
      const maxPct = (maxP / maxRange) * 100;
      if (fill) {
        fill.style.left = minPct + "%";
        fill.style.width = (maxPct - minPct) + "%";
      }
      minVal.textContent = `₹${minP.toLocaleString()}`;
      maxVal.textContent = `₹${maxP.toLocaleString()}`;
      filterState.minPrice = minP;
      filterState.maxPrice = maxP;
    };
    
    minThumb.addEventListener("input", () => {
      let val = parseInt(minThumb.value);
      if (val > parseInt(maxThumb.value)) val = parseInt(maxThumb.value);
      update(val, parseInt(maxThumb.value));
      applyFilters();
    });
    
    maxThumb.addEventListener("input", () => {
      let val = parseInt(maxThumb.value);
      if (val < parseInt(minThumb.value)) val = parseInt(minThumb.value);
      update(parseInt(minThumb.value), val);
      applyFilters();
    });
    
    update(filterState.minPrice, filterState.maxPrice);
  });
}

function initFiltersAndUI() {
  console.log("🎛️ Initializing filters and UI...");
  loadFiltersFromStorage();
  
  document.querySelectorAll('input[name="category"], input[name="brand"], input[name="discount"]').forEach(input => {
    if ((input.name === "category" && input.value === filterState.category) ||
        (input.name === "brand" && input.value === filterState.brand) ||
        (input.name === "discount" && parseInt(input.value) === filterState.discount)) {
      input.checked = true;
    }
    input.addEventListener('change', () => {
      if (input.name === "category") filterState.category = input.value;
      if (input.name === "brand") filterState.brand = input.value;
      if (input.name === "discount") filterState.discount = parseInt(input.value);
      applyFilters();
    });
  });
  
  const sortSelect = document.getElementById("sortSelect");
  if (sortSelect) {
    sortSelect.value = filterState.sort;
    sortSelect.addEventListener("change", (e) => {
      filterState.sort = e.target.value;
      sortProducts(filterState.sort);
      renderProducts();
      saveFiltersToStorage();
    });
  }
  
  document.getElementById("applyMobileFilters")?.addEventListener("click", () => {
    const cat = document.querySelector('#filterSheet input[name="category"]:checked')?.value || 'all';
    const brd = document.querySelector('#filterSheet input[name="brand"]:checked')?.value || 'all';
    const disc = parseInt(document.querySelector('#filterSheet input[name="discount"]:checked')?.value || 0);
    filterState.category = cat; filterState.brand = brd; filterState.discount = disc;
    applyFilters();
    document.getElementById("filterSheet").classList.add("translate-y-full");
    document.getElementById("mobileSheetBackdrop").classList.add("hidden");
  });
  
  document.getElementById("clearMobileFilters")?.addEventListener("click", () => {
    filterState = { category: 'all', brand: 'all', discount: 0, minPrice: 0, maxPrice: 10000, sort: 'default' };
    localStorage.removeItem("motherCareFilters");
    document.querySelectorAll('input[type="radio"]').forEach(r => r.checked = (r.value === 'all' || r.value === '0'));
    if (sortSelect) sortSelect.value = 'default';
    initPriceSliders();
    applyFilters();
  });
  
  applyFilters();
}

function viewProductDetails(id) {
  console.log("👁️ Viewing product details for ID:", id);
  const product = allProducts.find(p => p.id === id);
  if (!product) {
    console.error("Product not found!");
    alert("Product not found!");
    return;
  }
  console.log(" Product found:", product);
  localStorage.setItem("currentProductDetail", JSON.stringify(product));
  localStorage.setItem("selectedProductId", id);
  window.location.href = "mother-product-details.html";
}

function initBanner() {
  console.log("🎭 Initializing banner...");
  const slides = document.querySelectorAll('.banner-slide');
  const dots = document.querySelectorAll('.banner-dot');
  let i = 0;
  
  const go = (n) => {
    slides.forEach(s => s.classList.remove('active'));
    dots.forEach(d => d.classList.remove('active'));
    i = (n + slides.length) % slides.length;
    slides[i].classList.add('active');
    dots[i].classList.add('active');
  };
  
  dots.forEach((d, idx) => d.onclick = () => go(idx));
  setInterval(() => go(i + 1), 5000);
}

function initMobileSheets() {
  console.log("📱 Initializing mobile sheets...");
  const backdrop = document.getElementById("mobileSheetBackdrop");
  
  document.getElementById("openFilterSheet")?.addEventListener("click", () => {
    document.getElementById("filterSheet").classList.remove("translate-y-full");
    backdrop.classList.remove("hidden");
  });
  
  document.getElementById("openSortSheet")?.addEventListener("click", () => {
    document.getElementById("sortSheet").classList.remove("translate-y-full");
    backdrop.classList.remove("hidden");
  });
  
  document.querySelectorAll("#closeFilterSheet, #closeSortSheet, #mobileSheetBackdrop").forEach(el => {
    el?.addEventListener("click", () => {
      document.getElementById("filterSheet").classList.add("translate-y-full");
      document.getElementById("sortSheet").classList.add("translate-y-full");
      backdrop.classList.add("hidden");
    });
  });
}

document.addEventListener("DOMContentLoaded", () => {
  console.log("🚀 DOM Content Loaded!");
  loadHeader();
  loadFooter();
  initBanner();
  initMobileSheets();
  initPriceSliders();
  initFiltersAndUI();
  updateHeaderCounts();
  loadProductsBySubcategories();
});