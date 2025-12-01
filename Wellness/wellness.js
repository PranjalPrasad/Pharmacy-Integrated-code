// wellness.js – All Categories with Full 10+ Dummy Products

const WELLNESS_DATA = {
  "vitamins-supplements": {
    title: "Vitamins and Supplements",
    count: 12,
    products: [
      { id: 101, title: "Vitamin C 1000mg Effervescent", price: 399, image: "https://via.placeholder.com/400x400/10B981/white?text=Vitamin+C" },
      { id: 102, title: "Vitamin D3 60,000 IU", price: 449, image: "https://via.placeholder.com/400x400/F59E0B/white?text=Vitamin+D3" },
      { id: 103, title: "Multivitamin for Men", price: 599, image: "https://via.placeholder.com/400x400/3B82F6/white?text=Men+Multi" },
      
      { id: 104, title: "Omega-3 Fish Oil 1000mg", price: 749, image: "https://via.placeholder.com/400x400/8B5CF6/white?text=Omega-3" },
      { id: 105, title: "Biotin 10,000mcg for Hair", price: 499, image: "https://via.placeholder.com/400x400/EC4899/white?text=Biotin" },
      { id: 106, title: "Calcium + Vitamin D3", price: 379, image: "https://via.placeholder.com/400x400/6B7280/white?text=Calcium" },
      { id: 107, title: "Zinc + Vitamin C", price: 299, image: "https://via.placeholder.com/400x400/E11D48/white?text=Zinc+C" },
      { id: 108, title: "Magnesium Glycinate", price: 699, image: "https://via.placeholder.com/400x400/7C3AED/white?text=Magnesium" },
      { id: 109, title: "Iron + Folic Acid", price: 249, image: "https://via.placeholder.com/400x400/F43F5E/white?text=Iron" },
      { id: 110, title: "Probiotics 50 Billion CFU", price: 899, image: "https://via.placeholder.com/400x400/14B8A6/white?text=Probiotics" },
      { id: 111, title: "Ashwagandha 500mg", price: 459, image: "https://via.placeholder.com/400x400/92400E/white?text=Ashwagandha" },
      { id: 112, title: "Collagen Peptides Powder", price: 1299, image: "https://via.placeholder.com/400x400/FBBF24/white?text=Collagen" },
    ]
  },

  "hair-skin-care": {
    title: "Hair & Skin Care",
    count: 15,
    products: [
      { id: 201, title: "Anti Hair Fall Shampoo 300ml", price: 399, image: "https://placehold.co/400x400/3B82F6/white?text=Shampoo" },
      { id: 202, title: "Onion Hair Oil 200ml", price: 499, image: "https://placehold.co/400x400/7C2D12/white?text=Onion+Oil" },
      { id: 203, title: "Vitamin C Glow Face Serum", price: 899, image: "https://placehold.co/400x400/EC4899/white?text=Face+Serum" },
      { id: 204, title: "Hyaluronic Acid Moisturizer", price: 649, image: "https://placehold.co/400x400/06B6D4/white?text=Hyaluronic" },
      { id: 205, title: "Retinol Night Cream", price: 799, image: "https://placehold.co/400x400/7C3AED/white?text=Retinol" },
      { id: 206, title: "Aloe Vera Gel 99% Pure", price: 249, image: "https://placehold.co/400x400/22C55E/white?text=Aloe+Vera" },
      { id: 207, title: "Hair Growth Serum", price: 1199, image: "https://placehold.co/400x400/1E293B/white?text=Growth+Serum" },
      { id: 208, title: "Sunscreen SPF 50 PA++++", price: 549, image: "https://placehold.co/400x400/F59E0B/white?text=SPF+50" },
    ]
  },

  "oral-care": {
    title: "Oral Care",
    count: 12,
    products: [
      { id: 301, title: "Herbal Toothpaste 150g", price: 119, image: "https://via.placeholder.com/400x400/16A34A/white?text=Toothpaste" },
      { id: 302, title: "Sensitive Toothpaste", price: 149, image: "https://via.placeholder.com/400x400/60A5FA/white?text=Sensitive" },
      { id: 303, title: "Charcoal Toothbrush (Pack of 4)", price: 199, image: "https://via.placeholder.com/400x400/1F2937/white?text=Brush" },
      { id: 304, title: "Mouthwash Alcohol Free 500ml", price: 249, image: "https://via.placeholder.com/400x400/3B82F6/white?text=Mouthwash" },
      { id: 305, title: "Teeth Whitening Powder", price: 399, image: "https://via.placeholder.com/400x400/FBBF24/white?text=Whitening" },
      { id: 306, title: "Tongue Cleaner (Copper)", price: 149, image: "https://via.placeholder.com/400x400/F97316/white?text=Tongue+Cleaner" },
      { id: 307, title: "Kids Strawberry Toothpaste", price: 89, image: "https://via.placeholder.com/400x400/EC4899/white?text=Kids+Paste" },
      { id: 308, title: "Dental Floss 50m", price: 99, image: "https://via.placeholder.com/400x400/64748B/white?text=Floss" },
    ]
  },

  "menstrual-care": {
    title: "Menstrual Care",
    count: 14,
    products: [
      { id: 401, title: "Ultra Thin Sanitary Pads XL (40 pads)", price: 299, image: "https://via.placeholder.com/400x400/EC4899/white?text=Pads+XL" },
      { id: 402, title: "Organic Cotton Tampons (32 pcs)", price: 399, image: "https://via.placeholder.com/400x400/F472B6/white?text=Tampons" },
      { id: 403, title: "Reusable Menstrual Cup (Large)", price: 499, image: "https://via.placeholder.com/400x400/DB2777/white?text=Menstrual+Cup" },
      { id: 404, title: "Period Pain Relief Patches (5 pcs)", price: 349, image: "https://via.placeholder.com/400x400/F97316/white?text=Pain+Patch" },
      { id: 405, title: "Pantyliners Daily Use (60 pcs)", price: 199, image: "https://via.placeholder.com/400x400/FDA4AF/white?text=Pantyliners" },
      { id: 406, title: "Cramps Relief Herbal Tea", price: 249, image: "https://via.placeholder.com/400x400/16A34A/white?text=Herbal+Tea" },
      { id: 407, title: "Period Cramp Roll-On Oil", price: 299, image: "https://via.placeholder.com/400x400/7C3AED/white?text=Roll-On" },
    ]
  },

  "fitness-weight": {
    title: "Fitness & Weight Management",
    count: 15,
    products: [
      { id: 501, title: "Whey Protein Isolate 1kg (Chocolate)", price: 2199, image: "https://via.placeholder.com/400x400/7C2D12/white?text=Whey+Protein" },
      { id: 502, title: "Mass Gainer 3kg (Vanilla)", price: 2499, image: "https://via.placeholder.com/400x400/FBBF24/white?text=Mass+Gainer" },
      { id: 503, title: "L-Carnitine Fat Burner", price: 899, image: "https://via.placeholder.com/400x400/E11D48/white?text=L-Carnitine" },
      { id: 504, title: "BCAA 2:1:1 Powder (Cola)", price: 1299, image: "https://via.placeholder.com/400x400/1F2937/white?text=BCAA" },
      { id: 505, title: "Green Coffee Bean Extract", price: 599, image: "https://via.placeholder.com/400x400/16A34A/white?text=Green+Coffee" },
      { id: 506, title: "Protein Bars (Pack of 12)", price: 899, image: "https://via.placeholder.com/400x400/92400E/white?text=Protein+Bar" },
      { id: 507, title: "Creatine Monohydrate 300g", price: 799, image: "https://via.placeholder.com/400x400/64748B/white?text=Creatine" },
    ]
  },

  "senior-care": {
    title: "Senior Care",
    count: 12,
    products: [
      { id: 601, title: "Adult Diapers Large (10 pcs)", price: 599, image: "https://via.placeholder.com/400x400/6B7280/white?text=Adult+Diapers" },
      { id: 602, title: "Foldable Walking Stick", price: 899, image: "https://via.placeholder.com/400x400/92400E/white?text=Walking+Stick" },
      { id: 603, title: "Joint Pain Relief Spray", price: 349, image: "https://via.placeholder.com/400x400/F97316/white?text=Joint+Spray" },
      { id: 604, title: "Digital BP Monitor", price: 1799, image: "https://via.placeholder.com/400x400/1E293B/white?text=BP+Monitor" },
      { id: 605, title: "Glucose Test Strips (50)", price: 799, image: "https://via.placeholder.com/400x400/E11D48/white?text=Glucose+Strips" },
      { id: 606, title: "Memory Booster Capsules", price: 649, image: "https://via.placeholder.com/400x400/7C3AED/white?text=Memory" },
      { id: 607, title: "Back Support Belt", price: 549, image: "https://via.placeholder.com/400x400/475569/white?text=Back+Belt" },
    ]
  },

  "immunity-booster": {
    title: "Immunity Booster",
    count: 16,
    products: [
      { id: 701, title: "Chyawanprash 1kg", price: 399, image: "https://via.placeholder.com/400x400/92400E/white?text=Chyawanprash" },
      { id: 702, title: "Giloy Tulsi Juice 1L", price: 299, image: "https://via.placeholder.com/400x400/16A34A/white?text=Giloy+Juice" },
      { id: 703, title: "Vitamin C + Zinc Chewable", price: 249, image: "https://via.placeholder.com/400x400/F97316/white?text=Vitamin+C+Zinc" },
      { id: 704, title: "Turmeric Milk Mix", price: 279, image: "https://via.placeholder.com/400x400/F59E0B/white?text=Turmeric+Milk" },
      { id: 705, title: "Amla Candy 500g", price: 199, image: "https://via.placeholder.com/400x400/22C55E/white?text=Amla+Candy" },
      { id: 706, title: "Kadha Mix (Immunity)", price: 179, image: "https://via.placeholder.com/400x400/7C2D12/white?text=Kadha" },
      { id: 707, title: "Shilajit Resin 20g", price: 999, image: "https://via.placeholder.com/400x400/1F2937/white?text=Shilajit" },
      { id: 708, title: "Herbal Immunity Tea", price: 229, image: "https://via.placeholder.com/400x400/14B8A6/white?text=Immunity+Tea" },
    ]
  }
};

let currentSub = "vitamins-supplements";


// Price Slider
function initPriceSlider() {
  const min = document.getElementById('minThumb');
  const max = document.getElementById('maxThumb');
  const fill = document.getElementById('desktopFill');

  const update = () => {
    let mn = parseInt(min.value), mx = parseInt(max.value);
    if (mn > mx) [mn, mx] = [mx, mn];
    fill.style.left = (mn / 10000) * 100 + '%';
    fill.style.width = ((mx - mn) / 10000) * 100 + '%';
    document.getElementById('minValue').textContent = '₹' + mn.toLocaleString('en-IN');
    document.getElementById('maxValue').textContent = '₹' + mx.toLocaleString('en-IN');
  };
  min.oninput = max.oninput = update;
  update();
}

function renderProducts(key = currentSub) {
  const data = WELLNESS_DATA[key] || WELLNESS_DATA["vitamins-supplements"];
  currentSub = key;

  document.getElementById("categoryTitle").textContent = data.title;
  document.getElementById("resultsCount").textContent = `Showing ${data.products.length} products`;

  const grid = document.getElementById("productsGrid");
  grid.innerHTML = data.products.map(p => `
    <div onclick="goToProduct(${p.id})" 
         class="product-card group cursor-pointer relative">
      
      <!-- Full card clickable ho gaya -->
      <div class="relative overflow-hidden rounded-t-lg bg-gray-100">
        <img loading="lazy" 
             src="${p.image}" 
             alt="${p.title}" 
             class="w-full h-64 object-cover transition-transform duration-300 group-hover:scale-105">
      </div>
      
      <div class="p-5">
        <h3 class="text-lg font-semibold text-gray-900 line-clamp-2">${p.title}</h3>
        <div class="mt-4">
          <span class="text-2xl font-bold text-pink-600">₹${p.price}</span>
        </div>
        
     
        <div class="mt-5 w-full bg-blue-600 hover:bg-blue-700 text-white text-center py-3 rounded-lg font-medium transition">
          View Details
        </div>
      </div>
    </div>
  `).join("");
}

// YE PURA FUNCTION REPLACE KAR DO (dono files me)
window.goToProduct = function(id) {
  const allProducts = Object.values(WELLNESS_DATA).flatMap(cat => cat.products);
  const product = allProducts.find(p => p.id === id);
  
  if (!product) {
    alert("Product not found!");
    return;
  }

  // Save products for "Frequently Bought Together"
  sessionStorage.setItem('currentPageProducts', JSON.stringify(allProducts));

  // YE LINE SABSE ZAROORI – root me hai productdetails.html
  const params = new URLSearchParams({
    id: product.id,
    name: encodeURIComponent(product.title || product.name),
    price: product.price,
    image: encodeURIComponent(product.image),
    description: "Premium wellness product for your daily health needs.",
    brand: "Goodneews",
    category: currentSub || "wellness"
  });

  // Correct path – root me hai file
  window.location.href = `/productdetails.html?${params.toString()}`;
};

// Handle Category Change
document.querySelectorAll('input[name="wellness_subcat"]').forEach(radio => {
  radio.addEventListener('change', () => {
    if (radio.checked) {
      renderProducts(radio.value);
      history.pushState({ sub: radio.value }, "", `?sub=${radio.value}`);
    }
  });
});

// URL Parameter Support (Direct Link)
const urlParams = new URLSearchParams(window.location.search);
const subFromUrl = urlParams.get('sub');
if (subFromUrl && WELLNESS_DATA[subFromUrl]) {
  document.querySelector(`input[value="${subFromUrl}"]`).checked = true;
  renderProducts(subFromUrl);
} else {
  renderProducts();
}

// Browser Back/Forward Support
window.addEventListener('popstate', (e) => {
  if (e.state?.sub && WELLNESS_DATA[e.state.sub]) {
    document.querySelector(`input[value="${e.state.sub}"]`).checked = true;
    renderProducts(e.state.sub);
  }
});

// Initialize Everything
document.addEventListener('DOMContentLoaded', () => {
  loadHeaderFooter();
  initPriceSlider();
  renderProducts();
});