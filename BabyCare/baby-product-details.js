
// baby-product-details.js - COMPLETE UPDATED VERSION

let selectedSize = "S";
let quantity = 1;
let basePrice = 0;
let product = null;
const API_BASE_URL = 'http://localhost:8083/api/mb/products';

document.addEventListener('DOMContentLoaded', async () => {
  const urlParams = new URLSearchParams(window.location.search);
  const productId = urlParams.get('id');
  
  // Check if we have productId in URL
  if (productId) {
    await loadProductById(productId);
  } else {
    // Fallback to sessionStorage
    const stored = sessionStorage.getItem('currentProduct');
    if (stored) {
      try {
        product = JSON.parse(stored);
        populateProductDetails();
      } catch (e) {
        console.error('Error parsing stored product:', e);
        alert("Product data corrupted. Redirecting to products page.");
        window.location.href = 'baby.html';
        return;
      }
    } else {
      alert("Product not found!");
      window.location.href = 'baby.html';
      return;
    }
  }
  
  // Initialize tab functionality
  initializeSpecsTabs();
});

async function loadProductById(id) {
  try {
    // Show loading state
    document.getElementById('productTitle').textContent = 'Loading...';
    document.getElementById('productPrice').textContent = '₹0.00';
    // document.getElementById('productSku').textContent = 'SKU: Loading...';
    
    const response = await fetch(`${API_BASE_URL}/${id}`);
    if (!response.ok) {
      if (response.status === 404) {
        throw new Error('Product not found');
      }
      throw new Error(`HTTP error! status: ${response.status}`);
    }
    
    const apiProduct = await response.json();
    
    // Transform API response
    product = {
      id: apiProduct.id,
      title: apiProduct.title || 'No Title',
      price: getDisplayPrice(apiProduct.price),
      originalPrice: getDisplayPrice(apiProduct.originalPrice) || getDisplayPrice(apiProduct.price) * 1.3,
      discount: calculateDiscount(apiProduct.price, apiProduct.originalPrice) || apiProduct.discount || 0,
      brand: apiProduct.brand || 'Unknown Brand',
      category: apiProduct.category || '',
      subCategory: apiProduct.subCategory || '',
      mainImageUrl: apiProduct.mainImageUrl ? `http://localhost:8083${apiProduct.mainImageUrl}` : 'https://via.placeholder.com/500x500/cccccc/ffffff?text=No+Image',
      subImageUrls: (apiProduct.subImageUrls || []).map(url => `http://localhost:8083${url}`),
      description: Array.isArray(apiProduct.description) ? apiProduct.description : (apiProduct.description ? [apiProduct.description] : []),
      inStock: apiProduct.inStock !== undefined ? apiProduct.inStock : true,
      // stockQuantity: apiProduct.stockQuantity || 0,
      rating: apiProduct.rating || 4.0,
      // reviewCount: apiProduct.reviewCount || 0,
      // sku: apiProduct.sku || `SKU-${apiProduct.id}`,
      sizes: Array.isArray(apiProduct.sizes) ? apiProduct.sizes : (apiProduct.sizes ? [apiProduct.sizes] : []),
      features: Array.isArray(apiProduct.features) ? apiProduct.features : (apiProduct.features ? [apiProduct.features] : []),
      specifications: apiProduct.specifications || {}
    };
    
    populateProductDetails();
    
  } catch (error) {
    console.error('Error loading product:', error);
    document.getElementById('mainImage').innerHTML = `
      <div class="text-center text-red-600 py-12">
        <i class="fas fa-exclamation-triangle text-6xl mb-4"></i>
        <h3 class="text-xl font-bold">Failed to load product</h3>
        <p class="mt-2">${error.message}</p>
        <button onclick="window.location.href='baby.html'" class="mt-4 px-6 py-2 bg-blue-600 text-white rounded-lg">
          Back to Products
        </button>
      </div>
    `;
  }
}

// Helper function to safely get price for display
function getDisplayPrice(priceArray) {
  if (!priceArray || priceArray.length === 0) return 0;
  // Return the first price for display
  return Array.isArray(priceArray) ? priceArray[0] : priceArray;
}

// Helper to calculate discount
function calculateDiscount(priceArray, originalPriceArray) {
  if (!priceArray || !originalPriceArray) return 0;
  
  const price = getDisplayPrice(priceArray);
  const originalPrice = getDisplayPrice(originalPriceArray);
  
  if (originalPrice > price) {
    return Math.round(((originalPrice - price) / originalPrice) * 100);
  }
  return 0;
}

function populateProductDetails() {
  quantity = 1;
  selectedSize = "S";
  basePrice = product.price;

  // Fill product info
  document.getElementById('productTitle').textContent = product.title || 'Unknown Product';
  document.getElementById('productPrice').textContent = `₹${basePrice.toLocaleString('en-IN')}`;
  document.getElementById('productBrand').textContent = product.brand || 'Unknown';
  document.getElementById('productCategory').textContent = (product.category || '').toUpperCase();
  // document.getElementById('productSku').textContent = `SKU: ${product.sku || 'N/A'}`;
  
  // Set breadcrumb
  document.getElementById('breadcrumbCategory').textContent = product.category || 'Product Details';

  // Load product rating
  loadProductRating();
  
  // Stock status
  const stockStatus = document.getElementById('stockStatus');
  if (product.inStock) {
    // stockStatus.textContent = `In Stock (${product.stockQuantity || 10} available)`;
    stockStatus.className = 'text-sm font-semibold in-stock';
  } else {
    stockStatus.textContent = 'Out of Stock';
    stockStatus.className = 'text-sm font-semibold text-red-600';
    document.getElementById('addToCart').disabled = true;
    document.getElementById('addToCart').classList.add('opacity-50', 'cursor-not-allowed');
  }

  // Discount
  if (product.discount > 0) {
    const original = product.originalPrice || Math.round(product.price / (1 - product.discount / 100));
    document.getElementById('originalPrice').textContent = `₹${original.toLocaleString('en-IN')}`;
    document.getElementById('discountBadge').textContent = `${product.discount}% OFF`;
    document.getElementById('discountBadge').classList.remove('hidden');
    document.getElementById('originalPrice').classList.remove('hidden');
  }

  // Main image
  const mainImage = document.getElementById('mainImage');
  mainImage.innerHTML = `
    <img id="mainProductImage" src="${product.mainImageUrl}" alt="${product.title}" 
         class="w-full h-full object-contain rounded-lg hover:scale-105 transition duration-500"
         onerror="this.src='https://via.placeholder.com/500x500/cccccc/ffffff?text=No+Image'">
  `;

  // Load thumbnails
  loadThumbnails(product);

  // Size selection
  const sizeOptions = document.querySelector('.flex.flex-wrap.gap-3');
  if (product.sizes && product.sizes.length > 0) {
    sizeOptions.innerHTML = product.sizes.map((size, index) => `
      <div class="size-option ${index === 0 ? 'selected' : ''}" 
           data-size="${size}" 
           data-price-multiplier="${1 + (index * 0.2)}">
        ${size}
      </div>
    `).join('');
  }

  document.querySelectorAll('.size-option').forEach(el => {
    el.onclick = () => {
      document.querySelectorAll('.size-option').forEach(x => x.classList.remove('selected'));
      el.classList.add('selected');
      selectedSize = el.getAttribute('data-size');
      const multiplier = parseFloat(el.getAttribute('data-price-multiplier'));
      const newPrice = Math.round(basePrice * multiplier);
      document.getElementById('productPrice').textContent = `₹${newPrice.toLocaleString('en-IN')}`;
      if (product.discount > 0) {
        const original = product.originalPrice || Math.round(newPrice / (1 - product.discount / 100));
        document.getElementById('originalPrice').textContent = `₹${original.toLocaleString('en-IN')}`;
      }
    };
  });

  // Quantity
  document.getElementById('decreaseQty').onclick = () => {
    if (quantity > 1) {
      quantity--;
      document.getElementById('quantity').textContent = quantity;
    }
  };
  document.getElementById('increaseQty').onclick = () => {
    quantity++;
    document.getElementById('quantity').textContent = quantity;
  };

  // Load Product Details Tab content
  loadProductDetailsTab();
  
  // Load Specifications Tab content
  loadSpecificationsTab();

  // ADD TO CART
  document.getElementById('addToCart')?.addEventListener('click', function(e) {
    e.preventDefault();

    if (!product.inStock) {
      alert("This product is currently out of stock!");
      return;
    }

    const selectedEl = document.querySelector('.size-option.selected');
    if (!selectedEl) {
      alert("Please select a size first!");
      return;
    }

    selectedSize = selectedEl.getAttribute('data-size');
    const multiplier = parseFloat(selectedEl.getAttribute('data-price-multiplier'));
    const currentPrice = Math.round(basePrice * multiplier);

    let cart = JSON.parse(localStorage.getItem('cart') || '[]');

    const item = {
      id: product.id,
      name: product.title,
      title: product.title,
      price: currentPrice,
      image: product.mainImageUrl,
      size: selectedSize,
      quantity: quantity,
      brand: product.brand || 'Unknown',
      // sku: product.sku || 'N/A',
      inStock: product.inStock,
      rating: product.rating || 4.0
    };

    const existing = cart.findIndex(i => i.id === item.id && i.size === item.size);
    if (existing > -1) {
      cart[existing].quantity += quantity;
    } else {
      cart.push(item);
    }

    localStorage.setItem('cart', JSON.stringify(cart));
    showToast(`Added to Cart!\n${item.name}\nSize: ${item.size} × ${quantity}`);
    updateCartCount();
    window.dispatchEvent(new Event('cartUpdated'));
  });

  // ADD TO WISHLIST
  document.getElementById('addToWishlist')?.addEventListener('click', function() {
    let wishlist = JSON.parse(localStorage.getItem('wishlist') || '[]');

    const selectedEl = document.querySelector('.size-option.selected') || document.querySelector('.size-option');
    const multiplier = parseFloat(selectedEl.getAttribute('data-price-multiplier') || 1);
    const currentPrice = Math.round(basePrice * multiplier);

    const item = {
      id: product.id,
      name: product.title,
      title: product.title,
      price: currentPrice,
      image: product.mainImageUrl,
      size: selectedSize,
      brand: product.brand,
      // sku: product.sku || 'N/A',
      rating: product.rating || 4.0
    };

    const exists = wishlist.some(i => i.id === item.id && i.size === item.size);
    if (exists) {
      wishlist = wishlist.filter(i => !(i.id === item.id && i.size === item.size));
      this.innerHTML = '<i class="far fa-heart mr-2"></i>Add to Wishlist';
      this.classList.remove('active');
      showToast("Removed from Wishlist");
    } else {
      wishlist.push(item);
      this.innerHTML = '<i class="fas fa-heart mr-2"></i>Added to Wishlist';
      this.classList.add('active');
      showToast("Added to Wishlist");
    }

    localStorage.setItem('wishlist', JSON.stringify(wishlist));
    window.dispatchEvent(new Event('wishlistUpdated'));
  });

  // Load related products
  loadRelatedProducts();
  updateCartCount(); // Initial count
  
  // Update wishlist button state
  updateWishlistButtonState();
}

function loadProductRating() {
  const ratingContainer = document.querySelector('.star-rating');
  // const reviewCountElement = document.getElementById('reviewCount');
  
  // Get rating from product
  const rating = product.rating || 0;
  // const reviewCount = product.reviewCount || 0;
  
  // Generate star HTML
  let starsHTML = '';
  const fullStars = Math.floor(rating);
  const hasHalfStar = rating % 1 >= 0.5;
  
  // Full stars
  for (let i = 0; i < fullStars; i++) {
    starsHTML += '<i class="fas fa-star text-yellow-400"></i>';
  }
  
  // Half star
  if (hasHalfStar) {
    starsHTML += '<i class="fas fa-star-half-alt text-yellow-400"></i>';
  }
  
  // Empty stars
  const emptyStars = 5 - fullStars - (hasHalfStar ? 1 : 0);
  for (let i = 0; i < emptyStars; i++) {
    starsHTML += '<i class="far fa-star text-yellow-400"></i>';
  }
  
  // Add stars to container
  ratingContainer.innerHTML = starsHTML;
  
  // Update review count
  // reviewCountElement.textContent = `(${reviewCount} ${reviewCount === 1 ? 'review' : 'reviews'})`;
  
  // If no reviews, show appropriate message
  // if (reviewCount === 0) {
  //   reviewCountElement.textContent = '(No reviews yet)';
  // }
}

function loadProductDetailsTab() {
  // Product Description
  const descriptionElement = document.getElementById('productDescription');
  if (product.description && product.description.length > 0) {
    if (Array.isArray(product.description)) {
      descriptionElement.innerHTML = product.description.map(desc => `<p class="mb-2">${desc}</p>`).join('');
    } else if (typeof product.description === 'string') {
      descriptionElement.innerHTML = `<p>${product.description}</p>`;
    } else {
      descriptionElement.innerHTML = '<p>No description available.</p>';
    }
  } else {
    descriptionElement.innerHTML = '<p>No description available.</p>';
  }

  // Product Features
  const featuresElement = document.getElementById('productFeatures');
  if (product.features && product.features.length > 0) {
    if (Array.isArray(product.features)) {
      featuresElement.innerHTML = product.features.map(feature => 
        `<div class="flex items-start mb-2">
          <i class="fas fa-check text-green-500 mt-1 mr-2"></i>
          <span>${feature}</span>
        </div>`
      ).join('');
    } else if (typeof product.features === 'string') {
      featuresElement.innerHTML = `
        <div class="flex items-start mb-2">
          <i class="fas fa-check text-green-500 mt-1 mr-2"></i>
          <span>${product.features}</span>
        </div>
      `;
    } else {
      featuresElement.innerHTML = `
        <div class="flex items-start mb-2">
          <i class="fas fa-check text-green-500 mt-1 mr-2"></i>
          <span>High-quality materials</span>
        </div>
        <div class="flex items-start mb-2">
          <i class="fas fa-check text-green-500 mt-1 mr-2"></i>
          <span>Safe for children</span>
        </div>
        <div class="flex items-start mb-2">
          <i class="fas fa-check text-green-500 mt-1 mr-2"></i>
          <span>Easy to clean</span>
        </div>
        <div class="flex items-start mb-2">
          <i class="fas fa-check text-green-500 mt-1 mr-2"></i>
          <span>Durable construction</span>
        </div>
      `;
    }
  } else {
    featuresElement.innerHTML = `
      <div class="flex items-start mb-2">
        <i class="fas fa-check text-green-500 mt-1 mr-2"></i>
        <span>High-quality materials</span>
      </div>
      <div class="flex items-start mb-2">
        <i class="fas fa-check text-green-500 mt-1 mr-2"></i>
        <span>Safe for children</span>
      </div>
      <div class="flex items-start mb-2">
        <i class="fas fa-check text-green-500 mt-1 mr-2"></i>
        <span>Easy to clean</span>
      </div>
      <div class="flex items-start mb-2">
        <i class="fas fa-check text-green-500 mt-1 mr-2"></i>
        <span>Durable construction</span>
      </div>
    `;
  }
}

function loadSpecificationsTab() {
  const specificationsTable = document.getElementById('specificationsTable');
  // const additionalDetails = document.getElementById('additionalDetails');
  
  // Clear existing content
  specificationsTable.innerHTML = '';
  // additionalDetails.innerHTML = '';
  
  // Check if we have specifications
  if (product.specifications) {
    try {
      let specsObj = {};
      
      // Check if specifications is already an object
      if (typeof product.specifications === 'object') {
        specsObj = product.specifications;
      } 
      // Check if specifications is a JSON string
      else if (typeof product.specifications === 'string') {
        try {
          // Try to parse as JSON
          specsObj = JSON.parse(product.specifications);
        } catch (parseError) {
          console.error('Error parsing specifications JSON:', parseError);
          // If it's not valid JSON, treat it as plain text
          specsObj = { 'Specifications': product.specifications };
        }
      }
      
      // Create table rows from specifications object
      let tableHTML = '';
      
      // Add basic product info that we know exists
      tableHTML += `
        <tr class="border-b">
          <td class="py-2 font-medium text-gray-700">Product Name</td>
          <td class="py-2 text-gray-900">${product.title || '-'}</td>
        </tr>
        <tr class="border-b">
          <td class="py-2 font-medium text-gray-700">Brand</td>
          <td class="py-2 text-gray-900">${product.brand || '-'}</td>
        </tr>
        <tr class="border-b">
          <td class="py-2 font-medium text-gray-700">Category</td>
          <td class="py-2 text-gray-900">${(product.category || '').toUpperCase()}</td>
        </tr>
       <tr class="border-b">
         <!-- <td class="py-2 font-medium text-gray-700">SKU</td>-->
         <!-- <td class="py-2 text-gray-900">${product.sku || '-'}</td> --> 
        </tr> 
      `;
      
      // Add other specifications from backend
      if (Object.keys(specsObj).length > 0) {
        Object.entries(specsObj).forEach(([key, value]) => {
          if (key.toLowerCase() !== 'title' && 
              key.toLowerCase() !== 'brand' && 
              key.toLowerCase() !== 'category' && 
              key.toLowerCase() !== 'sku') {
            
            // Format the key (convert camelCase to Title Case)
            const formattedKey = key
              .replace(/([A-Z])/g, ' $1')
              .replace(/^./, str => str.toUpperCase())
              .trim();
            
            tableHTML += `
              <tr class="border-b">
                <td class="py-2 font-medium text-gray-700">${formattedKey}</td>
                <td class="py-2 text-gray-900">${value || '-'}</td>
              </tr>
            `;
          }
        });
      }
      
      specificationsTable.innerHTML = tableHTML;
      
      // Add additional details
      // additionalDetails.innerHTML = `
      //   <div class="space-y-4">
      //     ${product.subCategory ? `
      //       <div class="flex items-start">
      //         <i class="fas fa-tags text-blue-500 mt-1 mr-3"></i>
      //         <div>
      //           <p class="font-medium text-gray-700">Sub-Category</p>
      //           <p class="text-gray-600">${product.subCategory}</p>
      //         </div>
      //       </div>
      //     ` : ''}
          
      //    <!-- ${product.stockQuantity !== undefined ? `
      //       <div class="flex items-start">
      //         <i class="fas fa-box text-green-500 mt-1 mr-3"></i>
      //         <div>
      //           <p class="font-medium text-gray-700">Stock Quantity</p>
      //           <p class="text-gray-600">${product.stockQuantity} units available</p>
      //         </div>
      //       </div>
      //     ` : ''} -->
          
      //     ${product.rating ? `
      //       <div class="flex items-start">
      //         <i class="fas fa-star text-yellow-500 mt-1 mr-3"></i>
      //         <div>
      //           <p class="font-medium text-gray-700">Rating</p>
      //          <!-- <p class="text-gray-600">${product.rating}/5 (${product.reviewCount || 0} reviews)</p> -->
      //         </div>
      //       </div>
      //     ` : ''}
          
      //     ${product.inStock !== undefined ? `
      //       <div class="flex items-start">
      //         <i class="fas ${product.inStock ? 'fa-check-circle text-green-500' : 'fa-times-circle text-red-500'} mt-1 mr-3"></i>
      //         <div>
      //           <p class="font-medium text-gray-700">Availability</p>
      //           <p class="text-gray-600">${product.inStock ? 'In Stock' : 'Out of Stock'}</p>
      //         </div>
      //       </div>
      //     ` : ''}
      //   </div>
      // `;
      
    } catch (error) {
      console.error('Error processing specifications:', error);
      showFallbackSpecifications();
    }
  } else {
    // Fallback to default specifications if none from backend
    showFallbackSpecifications();
  }
}

function showFallbackSpecifications() {
  const specificationsTable = document.getElementById('specificationsTable');
  // const additionalDetails = document.getElementById('additionalDetails');
  
  specificationsTable.innerHTML = `
    <tr class="border-b">
      <td class="py-2 font-medium text-gray-700">Product Name</td>
      <td class="py-2 text-gray-900">${product.title || '-'}</td>
    </tr>
    <tr class="border-b">
      <td class="py-2 font-medium text-gray-700">Brand</td>
      <td class="py-2 text-gray-900">${product.brand || '-'}</td>
    </tr>
    <tr class="border-b">
      <td class="py-2 font-medium text-gray-700">Category</td>
      <td class="py-2 text-gray-900">${(product.category || '').toUpperCase()}</td>
    </tr>
    <tr class="border-b">
      <td class="py-2 font-medium text-gray-700">SKU</td>
      <td class="py-2 text-gray-900">${product.sku || '-'}</td>
    </tr>
    <tr class="border-b">
      <td class="py-2 font-medium text-gray-700">Rating</td>
      <!-- <td class="py-2 text-gray-900">${product.rating || 4.0}/5 (${product.reviewCount || 0} reviews)</td> -->
    </tr>
    <tr class="border-b">
      <td class="py-2 font-medium text-gray-700">Product Type</td>
      <td class="py-2 text-gray-900">Baby Care Product</td>
    </tr>
    <tr class="border-b">
      <td class="py-2 font-medium text-gray-700">Age Group</td>
      <td class="py-2 text-gray-900">0-3 years</td>
    </tr>
    <tr class="border-b">
      <td class="py-2 font-medium text-gray-700">Material</td>
      <td class="py-2 text-gray-900">Baby-safe, non-toxic materials</td>
    </tr>
  `;
  
  additionalDetails.innerHTML = `
    <div class="space-y-3">
      <div class="p-4 bg-blue-50 border border-blue-200 rounded-lg">
        <p class="text-sm text-blue-800"><strong>Note:</strong> Product specifications are based on general baby care standards.</p>
      </div>
      <div class="p-4 bg-green-50 border border-green-200 rounded-lg">
        <p class="text-sm text-green-800"><strong>Safety:</strong> All products meet international baby safety standards.</p>
      </div>
    </div>
  `;
}

function loadThumbnails(product) {
  // Combine all image URLs
  const allImages = [product.mainImageUrl, ...(product.subImageUrls || [])].filter(Boolean);
  
  // Fill thumbnails
  document.querySelectorAll('.thumbnail').forEach((thumbnail, index) => {
    const img = thumbnail.querySelector('img');
    if (allImages[index]) {
      img.src = allImages[index];
      img.style.display = 'block';
      img.onerror = () => {
        img.src = 'https://via.placeholder.com/100x100/cccccc/ffffff?text=No+Image';
      };
      
      // Set click handler
      thumbnail.onclick = (e) => {
        e.stopPropagation();
        document.getElementById('mainProductImage').src = allImages[index];
        
        // Update active thumbnail
        document.querySelectorAll('.thumbnail').forEach(t => {
          t.classList.remove('border-blue-500');
          t.classList.add('border-transparent');
        });
        thumbnail.classList.add('border-blue-500');
        thumbnail.classList.remove('border-transparent');
      };
    } else {
      thumbnail.style.display = 'none';
    }
  });
  
  // Highlight first thumbnail
  const firstThumb = document.querySelector('.thumbnail');
  if (firstThumb) {
    firstThumb.classList.add('border-blue-500');
    firstThumb.classList.remove('border-transparent');
  }
}

function initializeSpecsTabs() {
  const tabs = document.querySelectorAll('.specs-tab');
  const contents = document.querySelectorAll('.specs-content');
  
  tabs.forEach(tab => {
    tab.addEventListener('click', function() {
      // Remove active class from all tabs
      tabs.forEach(t => t.classList.remove('active'));
      
      // Add active class to clicked tab
      this.classList.add('active');
      
      // Hide all content
      contents.forEach(content => content.classList.add('hidden'));
      
      // Show the corresponding content
      const tabId = this.getAttribute('data-tab');
      const activeContent = document.getElementById(tabId);
      if (activeContent) {
        activeContent.classList.remove('hidden');
      }
    });
  });
}

async function loadRelatedProducts() {
  try {
    const response = await fetch(`${API_BASE_URL}/get-all`);
    if (!response.ok) {
      console.error('Failed to fetch related products');
      showFallbackRelatedProducts();
      return;
    }
    
    const apiProducts = await response.json();
    
    if (apiProducts.length === 0) {
      showFallbackRelatedProducts();
      return;
    }
    
    // Filter related products: same category but different ID
    const relatedProducts = apiProducts
      .filter(p => p.id !== product.id && p.category === product.category)
      .slice(0, 4)
      .map(p => ({
        id: p.id,
        title: p.title,
        price: getDisplayPrice(p.price),
        image: p.mainImageUrl ? `http://localhost:8083${p.mainImageUrl}` : 'https://via.placeholder.com/400x400/cccccc/ffffff?text=No+Image',
        brand: p.brand,
        category: p.category,
        // sku: p.sku || `SKU-${p.id}`,
        rating: p.rating || 4.0,
        // reviewCount: p.reviewCount || 0
      }));
    
    if (relatedProducts.length === 0) {
      // If no same category products, show other baby products
      const otherProducts = apiProducts
        .filter(p => p.id !== product.id)
        .slice(0, 4)
        .map(p => ({
          id: p.id,
          title: p.title,
          price: getDisplayPrice(p.price),
          image: p.mainImageUrl ? `http://localhost:8083${p.mainImageUrl}` : 'https://via.placeholder.com/400x400/cccccc/ffffff?text=No+Image',
          brand: p.brand,
          category: p.category,
          sku: p.sku || `SKU-${p.id}`,
          rating: p.rating || 4.0,
          // reviewCount: p.reviewCount || 0
        }));
      
      displayRelatedProducts(otherProducts);
    } else {
      displayRelatedProducts(relatedProducts);
    }
    
  } catch (error) {
    console.error('Error loading related products:', error);
    showFallbackRelatedProducts();
  }
}

function showFallbackRelatedProducts() {
  const fallbackProducts = [
    {
      id: 1,
      title: "Pampers Premium Care Pants",
      price: 1299,
      image: "https://m.media-amazon.com/images/I/71N3kZZyZAL._SL1500_.jpg",
      brand: "Pampers",
      category: "Baby Care",
      sku: "PMP-001",
      rating: 4.5,
      reviewCount: 124
    },
    {
      id: 2,
      title: "Himalaya Gentle Baby Shampoo",
      price: 349,
      image: "https://m.media-amazon.com/images/I/71pIlb8rKUL._SL1500_.jpg",
      brand: "Himalaya",
      category: "Baby Care",
      sku: "HML-002",
      rating: 4.3,
      reviewCount: 89
    },
    {
      id: 3,
      title: "Babyhug Feeding Bottle",
      price: 499,
      image: "https://m.media-amazon.com/images/I/61fF9vJ2KHL._SL1000_.jpg",
      brand: "BabyHug",
      category: "Baby Care",
      sku: "BHG-003",
      rating: 4.7,
      reviewCount: 156
    },
    {
      id: 4,
      title: "MamyPoko Pants Extra Absorb",
      price: 1099,
      image: "https://m.media-amazon.com/images/I/81X5o2d2KZL._SL1500_.jpg",
      brand: "MamyPoko",
      category: "Baby Care",
      sku: "MPK-004",
      rating: 4.4,
      reviewCount: 203
    }
  ];
  
  displayRelatedProducts(fallbackProducts);
}

function displayRelatedProducts(products) {
  const container = document.getElementById('relatedProducts');
  if (!container) return;

  let grid = container.querySelector('.grid');
  if (!grid) {
    grid = document.createElement('div');
    grid.className = 'grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6';
    container.appendChild(grid);
  }
  
  if (products.length === 0) {
    grid.innerHTML = `
      <div class="col-span-full text-center py-8">
        <p class="text-gray-500">No related products found.</p>
      </div>
    `;
    return;
  }
  
  grid.innerHTML = products.map(p => {
    // Generate star rating
    const rating = p.rating || 0;
    const fullStars = Math.floor(rating);
    const hasHalfStar = rating % 1 >= 0.5;
    let starsHTML = '';
    
    for (let i = 0; i < fullStars; i++) {
      starsHTML += '<i class="fas fa-star text-yellow-400 text-xs"></i>';
    }
    if (hasHalfStar) {
      starsHTML += '<i class="fas fa-star-half-alt text-yellow-400 text-xs"></i>';
    }
    for (let i = fullStars + (hasHalfStar ? 1 : 0); i < 5; i++) {
      starsHTML += '<i class="far fa-star text-yellow-400 text-xs"></i>';
    }
    
    return `
      <div class="related-product bg-white rounded-lg shadow-md overflow-hidden hover:shadow-lg cursor-pointer transition-transform duration-300 hover:-translate-y-1"
           onclick="openRelatedProduct(${p.id})">
        <div class="relative bg-gray-50 aspect-[4/3] overflow-hidden">
          <img src="${p.image}" alt="${p.title}" 
               class="w-full h-full object-contain p-4"
               onerror="this.src='https://via.placeholder.com/400x400/cccccc/ffffff?text=No+Image'">
          ${p.price > 1000 ? `
            <div class="absolute top-2 right-2 bg-blue-600 text-white text-xs font-bold px-2 py-1 rounded">
              PREMIUM
            </div>
          ` : ''}
        </div>
        <div class="p-4">
          <p class="text-xs text-gray-500 uppercase font-medium truncate">${p.brand || 'Brand'}</p>
          <h3 class="font-medium text-gray-800 line-clamp-2 h-12 mt-1">${p.title}</h3>
          <!-- <p class="text-xs text-gray-500 mt-1">SKU: ${p.sku || 'N/A'}</p> -->
          
          <!-- Rating for related products -->
          <div class="flex items-center mt-2">
            <div class="star-rating flex items-center">
              ${starsHTML}
            </div>
          <!-- <span class="text-xs text-gray-600 ml-2">${p.reviewCount || 0}</span> -->
          </div>
          
          <div class="flex justify-between items-center mt-3">
            <span class="text-lg font-bold text-blue-600">₹${p.price.toLocaleString('en-IN')}</span>
            <button onclick="event.stopPropagation(); openRelatedProduct(${p.id})" 
                    class="text-sm bg-blue-100 text-blue-600 px-3 py-1 rounded hover:bg-blue-200 transition">
              View
            </button>
          </div>
        </div>
      </div>
    `;
  }).join('');
}

function openRelatedProduct(id) {
  // Store current scroll position
  sessionStorage.setItem('scrollPosition', window.scrollY);
  
  // Navigate to product details with ID
  window.location.href = `baby-product-details.html?id=${id}`;
}

function generateBatchNumber() {
  const l = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ';
  const n = '0123456789';
  return Array(2).fill().map(() => l[Math.floor(Math.random()*26)]).join('') + '-' +
         Array(6).fill().map(() => n[Math.floor(Math.random()*10)]).join('');
}

// UPDATE CART COUNT
function updateCartCount() {
  const cart = JSON.parse(localStorage.getItem('cart') || '[]');
  const total = cart.reduce((sum, i) => sum + (i.quantity || 1), 0);
  document.querySelectorAll('#desktop-cart-count, #mobile-cart-count, #cart-count, #cartItemsCount, .cart-count').forEach(el => {
    if (el) {
      el.textContent = total;
      el.style.display = total > 0 ? 'inline-flex' : 'none';
    }
  });
}

function updateWishlistButtonState() {
  const wishlistBtn = document.getElementById('addToWishlist');
  if (!wishlistBtn) return;
  
  const wishlist = JSON.parse(localStorage.getItem('wishlist') || '[]');
  const exists = wishlist.some(i => i.id === product.id);
  
  if (exists) {
    wishlistBtn.innerHTML = '<i class="fas fa-heart mr-2"></i>Added to Wishlist';
    wishlistBtn.classList.add('active');
  }
}

// Toast notification function
function showToast(message) {
  const toast = document.createElement('div');
  toast.className = 'custom-toast fixed bottom-24 left-1/2 transform -translate-x-1/2 bg-green-600 text-white px-6 py-3 rounded-lg shadow-lg z-50';
  toast.textContent = message;
  document.body.appendChild(toast);
  
  setTimeout(() => {
    toast.classList.add('hiding');
    setTimeout(() => toast.remove(), 300);
  }, 3000);
}

// Restore scroll position if coming from related product click
window.addEventListener('load', () => {
  const scrollPosition = sessionStorage.getItem('scrollPosition');
  if (scrollPosition) {
    window.scrollTo(0, parseInt(scrollPosition));
    sessionStorage.removeItem('scrollPosition');
  }
  
  // Initialize cart count
  updateCartCount();
});

// Add toast styles if not present
if (!document.querySelector('#toast-styles')) {
  const style = document.createElement('style');
  style.id = 'toast-styles';
  style.textContent = `
    @keyframes slideInUp {
      from {
        transform: translateX(-50%) translateY(20px);
        opacity: 0;
      }
      to {
        transform: translateX(-50%) translateY(0);
        opacity: 1;
      }
    }
    
    @keyframes slideOutDown {
      from {
        transform: translateX(-50%) translateY(0);
        opacity: 1;
      }
      to {
        transform: translateX(-50%) translateY(20px);
        opacity: 0;
      }
    }
    
    .custom-toast {
      animation: slideInUp 0.3s ease-out;
    }
    
    .custom-toast.hiding {
      animation: slideOutDown 0.3s ease-in;
    }
  `;
  document.head.appendChild(style);
}



