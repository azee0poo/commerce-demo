// Debug function to check cart data
function debugCart() {
  const cart = JSON.parse(localStorage.getItem("cart")) || [];
  console.log("Cart data:", cart);
  console.log("Cart length:", cart.length);
  return cart;
}

// Load checkout page
document.addEventListener("DOMContentLoaded", () => {
  console.log("Checkout page loaded");
  
  // Add a small delay to ensure everything is loaded
  setTimeout(() => {
    if (document.getElementById("checkout-items")) {
      console.log("Found checkout-items container");
      loadCheckoutItems();
      setupFormValidation();
    } else {
      console.error("checkout-items container not found");
    }
  }, 100);
});

// Load items in checkout
function loadCheckoutItems() {
  console.log("Loading checkout items...");
  
  const cart = debugCart();
  const container = document.getElementById("checkout-items");
  
  if (!container) {
    console.error("Container not found!");
    return;
  }
  
  if (cart.length === 0) {
    console.log("Cart is empty, redirecting...");
    container.innerHTML = `
      <div style="text-align: center; padding: 20px;">
        <p>No items in cart. <a href="products.html">Continue Shopping</a></p>
      </div>
    `;
    return;
  }
  
  let subtotal = 0;
  
  try {
    const itemsHTML = cart.map(item => {
      console.log("Processing item:", item);
      subtotal += (item.price || 0) * (item.qty || 1);
      return `
        <div class="checkout-item">
          <img src="${item.image || 'https://via.placeholder.com/60'}" alt="${item.name || 'Product'}" class="checkout-item-image">
          <div class="checkout-item-details">
            <h4 class="checkout-item-name">${item.name || 'Unknown Product'}</h4>
            <p class="checkout-item-price">$${(item.price || 0).toFixed(2)} × ${item.qty || 1}</p>
          </div>
          <span class="checkout-item-qty">Qty: ${item.qty || 1}</span>
        </div>
      `;
    }).join('');
    
    container.innerHTML = itemsHTML;
    console.log("Items HTML set successfully");
    
    // Update totals
    const tax = subtotal * 0.08; // 8% tax
    const total = subtotal + tax;
    
    console.log("Subtotal:", subtotal, "Tax:", tax, "Total:", total);
    
    // Update total elements with error checking
    const subtotalEl = document.getElementById("subtotal");
    const taxEl = document.getElementById("tax");
    const totalEl = document.getElementById("total");
    
    if (subtotalEl) subtotalEl.textContent = `$${subtotal.toFixed(2)}`;
    if (taxEl) taxEl.textContent = `$${tax.toFixed(2)}`;
    if (totalEl) totalEl.textContent = `$${total.toFixed(2)}`;
    
    console.log("Totals updated successfully");
    
  } catch (error) {
    console.error("Error loading checkout items:", error);
    container.innerHTML = `
      <div style="text-align: center; padding: 20px; color: red;">
        <p>Error loading cart items. Please try again.</p>
        <button onclick="location.reload()">Refresh Page</button>
      </div>
    `;
  }
}

// Form validation and formatting
function setupFormValidation() {
  console.log("Setting up form validation...");
  
  const form = document.getElementById("checkoutForm");
  const cardNumber = document.getElementById("cardNumber");
  const expiryDate = document.getElementById("expiryDate");
  const cvv = document.getElementById("cvv");
  
  if (!form) {
    console.error("Form not found!");
    return;
  }
  
  // Format card number
  if (cardNumber) {
    cardNumber.addEventListener("input", (e) => {
      let value = e.target.value.replace(/\s+/g, "").replace(/[^0-9]/gi, "");
      let formattedValue = value.match(/.{1,4}/g)?.join(" ") || value;
      e.target.value = formattedValue;
    });
  }
  
  // Format expiry date
  if (expiryDate) {
    expiryDate.addEventListener("input", (e) => {
      let value = e.target.value.replace(/\D/g, "");
      if (value.length >= 2) {
        value = value.substring(0, 2) + "/" + value.substring(2, 4);
      }
      e.target.value = value;
    });
  }
  
  // Format CVV
  if (cvv) {
    cvv.addEventListener("input", (e) => {
      e.target.value = e.target.value.replace(/\D/g, "");
    });
  }
  
  // Handle form submission
  form.addEventListener("submit", (e) => {
    e.preventDefault();
    processOrder();
  });
  
  console.log("Form validation setup complete");
}

// Process order
function processOrder() {
  const form = document.getElementById("checkoutForm");
  
  // Validate required fields
  const requiredFields = ["firstName", "lastName", "email", "phone", "address", "city", "state", "zipCode"];
  let isValid = true;
  
  requiredFields.forEach(field => {
    const input = document.getElementById(field);
    if (input && !input.value.trim()) {
      input.style.borderColor = "#dc3545";
      isValid = false;
    } else if (input) {
      input.style.borderColor = "#e9ecef";
    }
  });
  
  if (!isValid) {
    alert("Please fill in all required fields.");
    return;
  }
  
  // Simulate order processing
  const submitBtn = document.querySelector(".btn-primary");
  if (submitBtn) {
    submitBtn.textContent = "Processing...";
    submitBtn.disabled = true;
  }
  
  setTimeout(() => {
    localStorage.removeItem("cart");
    window.location.href = "order-success.html";
  }, 2000);
}

// Manual load function for testing
function manualLoadCheckout() {
  console.log("Manual load triggered");
  loadCheckoutItems();
}
