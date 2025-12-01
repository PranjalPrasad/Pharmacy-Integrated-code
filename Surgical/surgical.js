// surgical-kits.js → FULL WORKING VERSION (Copy-Paste Ready)

const SUBCATEGORIES = {
  "dressings-and-bandages": {
    title: "Dressings and Bandages",
    products: [
      { id: 101, title: "Sterile Gauze Pad 10x10cm (Pack of 100)", price: 449, image: "https://placehold.co/400x400/10B981/white?text=Sterile+Gauze" },
      { id: 102, title: "Adhesive Bandage Strips (100 pcs)", price: 179, image: "https://placehold.co/400x400/3B82F6/white?text=Band+Aid" },
      { id: 103, title: "Non-Woven Adhesive Tape 2.5cm x 9m", price: 89, image: "https://placehold.co/400x400/6366F1/white?text=Adhesive+Tape" },
      { id: 104, title: "Absorbent Cotton Roll 500g", price: 320, image: "https://placehold.co/400x400/EC4899/white?text=Cotton+Roll" },
      { id: 105, title: "Crepe Bandage 15cm x 4m", price: 145, image: "https://placehold.co/400x400/F59E0B/white?text=Crepe+Bandage" },
      { id: 106, title: "Triangular Bandage (Calico)", price: 95, image: "https://placehold.co/400x400/8B5CF6/white?text=Triangular" }
    ]
  },
  "surgical-consumables": {
    title: "Surgical Consumables",
    products: [
      { id: 201, title: "Latex Surgical Gloves Powder-Free (Box of 50)", price: 649, image: "https://placehold.co/400x400/14B8A6/white?text=Surgical+Gloves" },
      { id: 202, title: "Nitrile Examination Gloves (100 pcs)", price: 499, image: "https://placehold.co/400x400/06B6D4/white?text=Nitrile+Gloves" },
      { id: 203, title: "3-Ply Face Mask with Nose Pin (50 pcs)", price: 149, image: "https://placehold.co/400x400/8B5CF6/white?text=Face+Mask" },
      { id: 204, title: "Disposable Surgeon Cap (100 pcs)", price: 299, image: "https://placehold.co/400x400/10B981/white?text=Surgeon+Cap" },
      { id: 205, title: "Shoe Cover Non-Woven (100 pcs)", price: 399, image: "https://placehold.co/400x400/F472B6/white?text=Shoe+Cover" },
      { id: 206, title: "Alcohol Swabs (Box of 100)", price: 189, image: "https://placehold.co/400x400/3B82F6/white?text=Alcohol+Swab" }
    ]
  },
  "iv-and-infusion-items": {
    title: "IV and Infusion Items",
    products: [
      { id: 301, title: "IV Cannula 20G (Pink)", price: 68, image: "https://placehold.co/400x400/F59E0B/white?text=IV+Cannula+20G" },
      { id: 302, title: "IV Cannula 22G (Blue)", price: 65, image: "https://placehold.co/400x400/3B82F6/white?text=IV+Cannula+22G" },
      { id: 303, title: "IV Infusion Set with Airvent", price: 42, image: "https://placehold.co/400x400/10B981/white?text=Infusion+Set" },
      { id: 304, title: "Scalp Vein Set 23G (Butterfly)", price: 28, image: "https://placehold.co/400x400/EC4899/white?text=Butterfly+Needle" },
      { id: 305, title: "Three-Way Stopcock", price: 55, image: "https://placehold.co/400x400/8B5CF6/white?text=3-Way+Stopcock" },
      { id: 306, title: "Extension Line 100cm", price: 85, image: "https://placehold.co/400x400/FBBF24/white?text=Extension+Line" }
    ]
  },
  "catheters-and-tubes": {
    title: "Catheters and Tubes",
    products: [
      { id: 401, title: "Foley Catheter 2-Way 16Fr (Silicone)", price: 385, image: "https://placehold.co/400x400/06B6D4/white?text=Foley+Catheter" },
      { id: 402, title: "Nelaton Catheter 14Fr", price: 48, image: "https://placehold.co/400x400/10B981/white?text=Nelaton" },
      { id: 403, title: "Ryles Tube 16Fr (PVC)", price: 65, image: "https://placehold.co/400x400/F59E0B/white?text=Ryles+Tube" },
      { id: 404, title: "Suction Catheter 12Fr", price: 38, image: "https://placehold.co/400x400/8B5CF6/white?text=Suction+Catheter" },
      { id: 405, title: "Yankauer Suction Handle", price: 125, image: "https://placehold.co/400x400/EC4899/white?text=Yankauer" }
    ]
  },
  "wound-care": {
    title: "Wound Care",
    products: [
      { id: 501, title: "Hydrocolloid Dressing 10x10cm", price: 285, image: "https://placehold.co/400x400/14B8A6/white?text=Hydrocolloid" },
      { id: 502, title: "Silver Alginate Dressing", price: 680, image: "https://placehold.co/400x400/3B82F6/white?text=Silver+Alginate" },
      { id: 503, title: "Povidone Iodine Ointment 20g", price: 89, image: "https://placehold.co/400x400/F59E0B/white?text=Betadine" },
      { id: 504, title: "Collagen Dressing Sheet", price: 980, image: "https://placehold.co/400x400/10B981/white?text=Collagen" },
      { id: 505, title: "Transparent Film Dressing", price: 68, image: "https://placehold.co/400x400/8B5CF6/white?text=Film+Dressing" }
    ]
  },
  "orthopedic-support": {
    title: "Orthopedic Support",
    products: [
      { id: 601, title: "Knee Brace with Hinges (Large)", price: 1249, image: "https://placehold.co/400x400/EC4899/white?text=Knee+Brace" },
      { id: 602, title: "Lumbar Sacral Belt (L.S. Belt)", price: 899, image: "https://placehold.co/400x400/06B6D4/white?text=LS+Belt" },
      { id: 603, title: "Cervical Collar Soft", price: 349, image: "https://placehold.co/400x400/3B82F6/white?text=Cervical+Collar" },
      { id: 604, title: "Ankle Support Neoprene", price: 499, image: "https://placehold.co/400x400/F59E0B/white?text=Ankle+Brace" }
    ]
  },
  "iv-fluids-and-injectables": {
    title: "IV Fluids and Injectables",
    products: [
      { id: 701, title: "Normal Saline 0.9% 500ml", price: 38, image: "https://placehold.co/400x400/10B981/white?text=NS+500ml" },
      { id: 702, title: "Dextrose 5% 500ml", price: 42, image: "https://placehold.co/400x400/3B82F6/white?text=D5+500ml" },
      { id: 703, title: "Ringer Lactate 500ml", price: 48, image: "https://placehold.co/400x400/FBBF24/white?text=RL+500ml" },
      { id: 704, title: "Metronidazole IV 100ml", price: 78, image: "https://placehold.co/400x400/8B5CF6/white?text=Metronidazole" },
      { id: 705, title: "Paracetamol IV 100ml", price: 125, image: "https://placehold.co/400x400/EC4899/white?text=Paracetamol+IV" }
    ]
  },
  "surgical-kits": {
    title: "Surgical Kits",
    products: [
      { id: 801, title: "Minor OT Dressing Kit", price: 680, image: "https://placehold.co/400x400/F59E0B/white?text=Minor+OT+Kit" },
      { id: 802, title: "Suture Removal Kit", price: 380, image: "https://placehold.co/400x400/10B981/white?text=Suture+Removal" },
      { id: 803, title: "IV Start Kit", price: 450, image: "https://placehold.co/400x400/3B82F6/white?text=IV+Start+Kit" },
      { id: 804, title: "Catheterization Kit (Foley)", price: 890, image: "https://placehold.co/400x400/EC4899/white?text=Foley+Kit" }
    ]
  }
};

document.addEventListener("DOMContentLoaded", function () {
  const productsGrid = document.getElementById("productsGrid");
  const categoryTitle = document.getElementById("categoryTitle");
  const resultsCount = document.getElementById("resultsCount");

  function renderSubcategory(key) {
    if (!SUBCATEGORIES[key]) key = "dressings-and-bandages";
    const data = SUBCATEGORIES[key];

    categoryTitle.textContent = data.title;
    resultsCount.textContent = `Showing ${data.products.length} products`;
    history.pushState({ sub: key }, "", `?sub=${key}`);

    productsGrid.innerHTML = data.products.map(p => `
      <div class="product-card group">
        <div class="relative overflow-hidden rounded-t-lg">
          <img src="${p.image}" alt="${p.title}" class="w-full h-64 object-cover image-zoom">
        </div>
        <div class="content p-4">
          <h3 class="text-lg font-semibold text-gray-900 line-clamp-2">${p.title}</h3>
          <div class="mt-3">
            <span class="text-xl font-bold text-pink-600">₹${p.price}</span>
          </div>
          <div class="mt-3">
            <button class="view-details w-full bg-blue-600 hover:bg-blue-700 text-white font-bold py-3 rounded-lg transition"
                    onclick="goToProduct('${encodeURIComponent(p.title)}', ${p.price}, '${p.image}')">
              View Details
            </button>
          </div>
        </div>
      </div>
    `).join("");
  }

  // Yeh function sabse important hai
  window.goToProduct = function(encodedTitle, price, image) {
    const title = decodeURIComponent(encodedTitle);
    const url = `../productdetails.html?name=${encodeURIComponent(title)}&price=${price}&image=${encodeURIComponent(image)}`;
    window.location.href = url;
  };

  // Load from URL
  let currentKey = new URLSearchParams(window.location.search).get("sub") || "dressings-and-bandages";
  renderSubcategory(currentKey);
  document.querySelector(`input[value="${currentKey}"]`)?.setAttribute("checked", true);

  // Radio change
  document.querySelectorAll('input[name="surgical_subcat"]').forEach(radio => {
    radio.addEventListener("change", function () {
      if (this.checked) renderSubcategory(this.value);
    });
  });

  // Back/forward support
  window.addEventListener("popstate", e => {
    if (e.state?.sub && SUBCATEGORIES[e.state.sub]) {
      renderSubcategory(e.state.sub);
      document.querySelector(`input[value="${e.state.sub}"]`).checked = true;
    }
  });

  // Price sliders (unchanged)
  function initSlider(minId, maxId, fillId, minDispId, maxDispId) {
    const minThumb = document.getElementById(minId);
    const maxThumb = document.getElementById(maxId);
    const fill = document.getElementById(fillId);
    const minDisp = document.getElementById(minDispId);
    const maxDisp = document.getElementById(maxDispId);

    const update = () => {
      let minVal = parseInt(minThumb.value);
      let maxVal = parseInt(maxThumb.value);
      if (minVal > maxVal) [minVal, maxVal] = [maxVal, minVal];
      const pMin = (minVal / 10000) * 100;
      const pMax = (maxVal / 10000) * 100;
      fill.style.left = pMin + '%';
      fill.style.width = (pMax - pMin) + '%';
      minDisp.textContent = '₹' + minVal.toLocaleString('en-IN');
      maxDisp.textContent = '₹' + maxVal.toLocaleString('en-IN');
    };
    minThumb.addEventListener('input', update);
    maxThumb.addEventListener('input', update);
    update();
  }
  initSlider('minThumb', 'maxThumb', 'desktopFill', 'minValue', 'maxValue');
  initSlider('mobileMinThumb', 'mobileMaxThumb', 'mobileFill', 'mobileMinValue', 'mobileMaxValue');

  // Mobile sheets (unchanged)
  const backdrop = document.getElementById('mobileSheetBackdrop');
  document.getElementById('openSortSheet')?.addEventListener('click', () => { backdrop.classList.remove('hidden'); document.getElementById('sortSheet').classList.remove('translate-y-full'); });
  document.getElementById('openFilterSheet')?.addEventListener('click', () => { backdrop.classList.remove('hidden'); document.getElementById('filterSheet').classList.remove('translate-y-full'); });
  backdrop.onclick = () => { backdrop.classList.add('hidden'); document.getElementById('sortSheet').classList.add('translate-y-full'); document.getElementById('filterSheet').classList.add('translate-y-full'); };

  // Header/Footer
  fetch('../Header/header.html').then(r => r.text()).then(html => document.getElementById('header-placeholder').innerHTML = html);
  fetch('../Footer/footer.html').then(r => r.text()).then(html => document.getElementById('footer-placeholder').innerHTML = html);
});

// Collapse toggle
function toggleCollapse(el) {
  el.nextElementSibling.classList.toggle('hidden');
  el.querySelector('i').classList.toggle('rotate-180');
}