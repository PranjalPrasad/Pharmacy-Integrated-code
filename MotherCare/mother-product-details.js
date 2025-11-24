let currentProduct = null;
// Generate star icons
  function generateStars(rating) {
      const full = Math.floor(rating);
      const half = rating % 1 >= 0.5 ? 1 : 0;
      const empty = 5 - full - half;
      return '<i class="fas fa-star"></i>'.repeat(full) +
             (half ? '<i class="fas fa-star-half-alt"></i>' : '') +
             '<i class="far fa-star"></i>'.repeat(empty);
  }

  // Main function: Load product from localStorage and fill page
  function loadProductDetails() {
      const productId = localStorage.getItem("selectedProductId");
      if (!productId) {
          document.body.innerHTML = "<h1 class='text-center py-20'>Product not found!</h1>";
          return;
      }

      // Get product from the global products array (passed from mother page)
      const allProducts = JSON.parse(localStorage.getItem("allProducts") || "[]");
      currentProduct = allProducts.find(p => p.id == productId);

      if (!currentProduct) {
          document.body.innerHTML = "<h1 class='text-center py-20'>Product not found!</h1>";
          return;
      }

      // Fill all dynamic content
      document.querySelector("h1").textContent = currentProduct.title;
      document.getElementById("mainImage").src = currentProduct.mainImageUrl || currentProduct.images[0];
      document.getElementById("mainImage").alt = currentProduct.title;

      // Thumbnails
      const thumbnailContainer = document.getElementById("thumbnailContainer");
      thumbnailContainer.innerHTML = "";
      currentProduct.images.forEach((img, i) => {
          const thumb = document.createElement("img");
          thumb.src = img;
          thumb.className = "thumbnail" + (i === 0 ? " thumbnail-active" : "");
          thumb.onclick = () => {
              document.getElementById("mainImage").src = img;
              document.querySelectorAll(".thumbnail").forEach(t => t.classList.remove("thumbnail-active"));
              thumb.classList.add("thumbnail-active");
          };
          thumbnailContainer.appendChild(thumb);
      });

      // Rating
      document.querySelector(".flex.text-yellow-400.text-lg").innerHTML = generateStars(currentProduct.rating || 4.5);
      document.querySelector(".text-gray-600.font-medium").textContent = `(${currentProduct.reviewCount || 0} reviews)`;

      // Price
      document.querySelector(".text-pink-600").textContent = `₹${currentProduct.price.toFixed(2)}`;
      const originalPriceEl = document.querySelector(".line-through");
      const discountEl = document.querySelector(".bg-red-500");
      if (currentProduct.originalPrice > currentProduct.price) {
          originalPriceEl.textContent = `₹${currentProduct.originalPrice.toFixed(2)}`;
          originalPriceEl.classList.remove("hidden");
          const discount = Math.round(((currentProduct.originalPrice - currentProduct.price) / currentProduct.originalPrice) * 100);
          discountEl.textContent = `${discount}% OFF`;
          discountEl.classList.remove("hidden");
      } else {
          originalPriceEl.classList.add("hidden");
          discountEl.classList.add("hidden");
      }

      // Description
      document.querySelector("#productDescription p").innerHTML = currentProduct.description || "No description available.";

      // Stock
      document.querySelector("#stockStatus").textContent = currentProduct.inStock ? 
          `In Stock (${currentProduct.stockQuantity || 50}+ left)` : "Out of Stock";

      // Specifications
      let specsHTML = "";
      if (currentProduct.specifications && typeof currentProduct.specifications === "object") {
          Object.entries(currentProduct.specifications).forEach(([key, value]) => {
              specsHTML += `<div class="flex justify-between py-3 border-b"><span class="font-medium">${key}</span><span>${value}</span></div>`;
          });
      } else {
          specsHTML = "<p>No specifications available.</p>";
      }
      document.querySelector("#specificationsContent .bg-gray-50").innerHTML = specsHTML;

      // Add to Cart & Wishlist Buttons
      document.getElementById("addToCartBtn").onclick = () => addToCart(currentProduct.id);
      document.getElementById("addToWishlistBtn").onclick = () => toggleWishlist(currentProduct.id);

      // Quantity
      let qty = 1;
      document.getElementById("quantity").textContent = qty;
      document.getElementById("increaseQty").onclick = () => document.getElementById("quantity").textContent = ++qty;
      document.getElementById("decreaseQty").onclick = () => { if (qty > 1) document.getElementById("quantity").textContent = --qty; };
  }

  // Reuse cart/wishlist functions from main script (simplified)
  function addToCart(id) {
      let cart = JSON.parse(localStorage.getItem("cart") || "[]");
      const product = currentProduct;
      const existing = cart.find(item => item.id === id);
      if (existing) existing.quantity += 1;
      else cart.push({ ...product, quantity: 1 });
      localStorage.setItem("cart", JSON.stringify(cart));
      alert("Added to cart!");
  }

  function toggleWishlist(id) {
      let wishlist = JSON.parse(localStorage.getItem("wishlist") || "[]");
      if (wishlist.some(p => p.id === id)) {
          wishlist = wishlist.filter(p => p.id !== id);
          alert("Removed from wishlist");
      } else {
          wishlist.push(currentProduct);
          alert("Added to wishlist!");
      }
      localStorage.setItem("wishlist", JSON.stringify(wishlist));
  }

  // Run on page load
  document.addEventListener("DOMContentLoaded", () => {
      loadHeader();
      loadFooter();
      loadProductDetails();

      // Tab & Accordion functionality (same as before)
      document.querySelectorAll('.tab-button').forEach(btn => {
          btn.addEventListener('click', () => {
              document.querySelectorAll('.tab-button').forEach(b => b.classList.remove('active'));
              document.querySelectorAll('[id$="Content"]').forEach(c => c.classList.add('hidden'));
              btn.classList.add('active');
              document.getElementById(btn.id.replace('Tab', 'Content')).classList.remove('hidden');
          });
      });

      document.querySelectorAll('.accordion-header').forEach(header => {
          header.addEventListener('click', () => {
              const content = header.nextElementSibling;
              const icon = header.querySelector('i');
              content.classList.toggle('active');
              icon.classList.toggle('rotate-180');
          });
      });
  });