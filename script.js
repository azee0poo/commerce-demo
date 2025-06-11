// === Demo Product Data ===

const products = [
  {
    id: 1,
    name: "Elegant Blazer",
    price: 89.99,
    image: "https://images.unsplash.com/photo-1588186941799-f9a4fc54ff1e?q=80&w=1974&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"
  },
  {
    id: 2,
    name: "Pink Heels",
    price: 79.99,
    image: "https://plus.unsplash.com/premium_photo-1673716789172-a6ca263eb4db?q=80&w=2070&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"  
  },
  {
    id: 3,
    name: "Boho Top",
    price: 39.99,
    image: "https://images.unsplash.com/photo-1521577352947-9bb58764b69a?auto=format&fit=crop&w=700&q=80"
  },
  {
    id: 4,
    name: "Pastel Handbag",
    price: 59.99,
    image: "https://images.unsplash.com/photo-1542068829-1115f7259450?auto=format&fit=crop&w=700&q=80"
  }
];

// === Render Products using Map ===
function renderProducts(targetId) {
  const container = document.getElementById(targetId);
  if (!container) return;
  
  // Clear existing content
  container.innerHTML = '';
  
  // Use map to create product HTML
  const productHTML = products.map(product => `
    <div class="product-card">
      <div class="product-image-container">
        <img src="${product.image}" alt="${product.name}" class="product-image">
      </div>
      <div class="product-info">
        <h3 class="product-name">${product.name}</h3>
        <p class="product-price">$${product.price.toFixed(2)}</p>
        <button class="add-to-cart-btn" onclick="addToCart(${product.id})">Add to Cart</button>
      </div>
    </div>
  `).join('');
  
  container.innerHTML = productHTML;
}


// === Add to Cart ===
function addToCart(id) {
  const product = products.find(p => p.id === id);
  let cart = JSON.parse(localStorage.getItem("cart")) || [];
  const item = cart.find(p => p.id === id);
  if (item) {
    item.qty += 1;
  } else {
    cart.push({ ...product, qty: 1 });
  }
  localStorage.setItem("cart", JSON.stringify(cart));
  alert(`${product.name} added to cart!`);
}

// === Render Cart Function ===
function renderCart() {
  const container = document.getElementById("cart-container");
  if (!container) return;

  let cart = JSON.parse(localStorage.getItem("cart")) || [];
  
  if (cart.length === 0) {
    container.innerHTML = `
      <div class="empty-cart">
        <h3>Your cart is empty</h3>
        <p>Looks like you haven't added any items to your cart yet.</p>
        <a href="products.html" class="continue-shopping-btn">Continue Shopping</a>
      </div>
    `;
    return;
  }

  let total = 0;
  let totalItems = cart.reduce((sum, item) => sum + item.qty, 0);
  
  const cartHTML = `
    <div class="cart-header">
      <h2 class="section-title">Shopping Cart</h2>
      <div style="display: flex; gap: 15px; align-items: center;">
        <span class="cart-count">${totalItems} item${totalItems !== 1 ? 's' : ''}</span>
        <button class="clear-cart-btn" onclick="clearCart()">Clear Cart</button>
      </div>
    </div>
    
    <div class="cart-items">
      ${cart.map(item => {
        total += item.price * item.qty;
        return `
          <div class="cart-item">
            <img src="${item.image}" alt="${item.name}" class="cart-item-image">
            <div class="cart-item-details">
              <h4>${item.name}</h4>
              <p class="cart-item-price">$${item.price.toFixed(2)} each</p>
              <div class="quantity-controls">
                <button class="qty-btn" onclick="updateQuantity(${item.id}, ${item.qty - 1})">-</button>
                <span class="qty-display">${item.qty}</span>
                <button class="qty-btn" onclick="updateQuantity(${item.id}, ${item.qty + 1})">+</button>
              </div>
            </div>
            <div style="text-align: right;">
              <p class="cart-item-price" style="font-size: 1.2rem; margin-bottom: 10px;">
                $${(item.price * item.qty).toFixed(2)}
              </p>
              <button class="remove-btn" onclick="removeFromCart(${item.id})">Remove</button>
            </div>
          </div>
        `;
      }).join('')}
    </div>
    
    <div class="cart-summary">
      <h3>Order Summary</h3>
      <div class="summary-row">
        <span>Subtotal (${totalItems} items):</span>
        <span>$${total.toFixed(2)}</span>
      </div>
      <div class="summary-row">
        <span>Shipping:</span>
        <span>Free</span>
      </div>
      <div class="summary-row">
        <span>Total:</span>
        <span>$${total.toFixed(2)}</span>
      </div>
      <button class="checkout-btn" onclick="checkout()">Proceed to Checkout</button>
    </div>
  `;

  container.innerHTML = cartHTML;
}

// === Update Quantity Function ===
function updateQuantity(id, newQty) {
  if (newQty < 1) {
    removeFromCart(id);
    return;
  }
  
  let cart = JSON.parse(localStorage.getItem("cart")) || [];
  const item = cart.find(p => p.id === id);
  if (item) {
    item.qty = newQty;
    localStorage.setItem("cart", JSON.stringify(cart));
    renderCart();
  }
}

// === Clear Cart Function ===
function clearCart() {
  if (confirm("Are you sure you want to clear your cart?")) {
    localStorage.removeItem("cart");
    renderCart();
  }
}

// === Remove from Cart ===
function removeFromCart(id) {
  let cart = JSON.parse(localStorage.getItem("cart")) || [];
  cart = cart.filter(item => item.id !== id);
  localStorage.setItem("cart", JSON.stringify(cart));
  renderCart();
}

// === Checkout Function ===
// === Enhanced Checkout Function ===
function checkout() {
  const cart = JSON.parse(localStorage.getItem("cart")) || [];
  if (cart.length === 0) {
    alert("Your cart is empty!");
    return;
  }
  
  // Navigate to checkout page
  window.location.href = "checkout.html";
}



// === On Page Load ===
document.addEventListener("DOMContentLoaded", () => {
  if (document.getElementById("featured-products")) {
    renderProducts("featured-products");
  }
  if (document.getElementById("shop-products")) {
    renderProducts("shop-products");
  }
  if (document.getElementById("cart-container")) {
    renderCart();
  }
});
