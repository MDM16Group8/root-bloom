// Ingredient identifiers
window.INGREDIENT_IDS = {
  SALMON: 'Salmon',
  CREAM: 'Cream',
  BUTTER: 'Butter',
  SPINACH: 'Spinach',
  SPAGHETTI: 'Spaghetti',
  PEPPER: 'Pepper',
  PECORINO: 'Pecorino',
  CHORIZO: 'Chorizo',
  TOMATOES: 'Tomatoes',
  BEANS: 'Beans',
  PESTO: 'Pesto',
  CURRY_PASTE: 'Curry Paste',
  SQUASH: 'Squash',
  COCONUT_MILK: 'Coconut Milk',
  CORIANDER: 'Coriander'
};

// List of all ingredients
window.INGREDIENTS = [
  { id: window.INGREDIENT_IDS.SALMON, name: 'Salmon', price: '$10/pkg', priceValue: 10 },
  { id: window.INGREDIENT_IDS.CREAM, name: 'Cream', price: '$8/100ml', priceValue: 8 },
  { id: window.INGREDIENT_IDS.BUTTER, name: 'Butter', price: '$6/100g', priceValue: 6 },
  { id: window.INGREDIENT_IDS.SPINACH, name: 'Spinach', price: '$2/bunch', priceValue: 2 },
  { id: window.INGREDIENT_IDS.SPAGHETTI, name: 'Spaghetti', price: '$2/900g', priceValue: 2 },
  { id: window.INGREDIENT_IDS.PEPPER, name: 'Red Bell Pepper', price: '$3/pepper', priceValue: 3 },
  { id: window.INGREDIENT_IDS.PECORINO, name: 'Pecorino (cheese)', price: '$12/250g', priceValue: 12 },
  { id: window.INGREDIENT_IDS.CHORIZO, name: 'Chorizo', price: '$8/500g', priceValue: 8 },
  { id: window.INGREDIENT_IDS.TOMATOES, name: 'Tomatoes', price: '$1/two tomatoes', priceValue: 1 },
  { id: window.INGREDIENT_IDS.BEANS, name: 'Butter beans (can)', price: '$2/540ml', priceValue: 2 },
  { id: window.INGREDIENT_IDS.PESTO, name: 'Pesto', price: '$3/270ml jar', priceValue: 3 },
  { id: window.INGREDIENT_IDS.CURRY_PASTE, name: 'Curry paste (jar)', price: '$7/112g', priceValue: 7 },
  { id: window.INGREDIENT_IDS.SQUASH, name: 'Butternut Squash', price: '$4/one squash', priceValue: 4 },
  { id: window.INGREDIENT_IDS.COCONUT_MILK, name: 'Coconut milk (can)', price: '$1/400ml', priceValue: 1 },
  { id: window.INGREDIENT_IDS.CORIANDER, name: 'Coriander/Cilantro', price: '$2/bunch', priceValue: 2 }
];

// Get cart quantities
function getCart() { return JSON.parse(localStorage.getItem("cart")) || []; }

// Save new cart quantities
function saveCart(cart) { localStorage.setItem('cart', JSON.stringify(cart)); }

// Load cart content
function loadCart() {
  const cartItems = getCart();
  const cartContainer = document.getElementById("cart-items");
  const totalDisplay = document.getElementById("cart-total");
  const message = document.getElementById("cart-message");

  cartContainer.innerHTML = "";
  let total = 0;

  cartItems.forEach((item, index) => {
    const itemTotal = (item.price * item.quantity).toFixed(2);
    total += parseFloat(itemTotal);

    const itemDiv = document.createElement("div");
    itemDiv.className = "cart-item";
    itemDiv.innerHTML = `
  <span>${item.name}</span>
  <span>$${item.price.toFixed(2)}</span>
  <div class="quantity-controls">
    <button onclick="updateQuantity(${index}, -1)">−</button>
    <span>${item.quantity}</span>
    <button onclick="updateQuantity(${index}, 1)">+</button>
  </div>
  <span>$${itemTotal}</span>
  <button onclick="removeItem(${index})">remove from cart</button>
    `;
    cartContainer.appendChild(itemDiv);
  });

  totalDisplay.innerText = `Total: $${total.toFixed(2)}`;
  const checkoutBtn = document.getElementById("checkout-btn");
  if (cartItems.length === 0) {
    checkoutBtn.disabled = true;
    checkoutBtn.style.opacity = 0.5;
  } else {
    checkoutBtn.disabled = false;
    checkoutBtn.style.opacity = 1;
  }
}

// Update the total cart ingredients count in object with id "cart-count"
function updateCartCount() {
  const cart = getCart();
  let total = 0;
  cart.forEach(item => {
    total += item.quantity;
  });
  document.getElementById('cart-count').textContent = total;
}

// Adds one ingredient to cart
// ingredient: product identifier of type INGREDIENT_IDS
function addItemToCart(ingredient) {
  let cart = getCart();

  const info = window.INGREDIENTS.find(i => i.id === ingredient);
  if (!info) return;

  const existing = cart.find(item => item.id === ingredient);
  if (existing) {
    existing.quantity += 1;
  } else {
    cart.push({
      id: ingredient,
      name: info.name,
      price: info.priceValue,
      quantity: 1
    });
  }

  saveCart(cart);
  updateCartCount();
}

// Get product count in the cart
// ingredient: product identifier of type INGREDIENT_IDS
function getItemQuantity(ingredient) {
  let cart = getCart();

  const inCart = cart.find(item => item.id === ingredient);
  if (!inCart) return 0;
  return inCart.quantity
}

// Get product price
// ingredient: product identifier of type INGREDIENT_IDS
function getIngredientPrice(ingredient) {
  const item = window.INGREDIENTS.find(i => i.id === ingredient);
  return item && item.priceValue ? item.priceValue : 0;
}

// Adds multiple ingredients to cart
// quantities: array of [ingredient: quantity] pairs
// ingredient: product identifier of type INGREDIENT_IDS
function addToCart(quantities) {
  let cart = getCart();
  for (let ingredient in quantities) {
      if (quantities[ingredient] > 0) {
          cart[ingredient] = (cart[ingredient] || 0) + quantities[ingredient];
      }
  }
  for (let id in quantities) {
    const qty = quantities[id];
    if (qty <= 0) continue;

    const info = window.INGREDIENTS.find(i => i.id === id);
    if (!info) continue;

    const existing = cart.find(item => item.id === id);
    if (existing) {
      existing.quantity += qty;
    } else {
      cart.push({
        id: id,
        name: info.name,
        price: info.priceValue,
        quantity: qty
      });
    }
  }
  saveCart(cart);
  alert('Ingredients have been added to your cart!');
  updateCartCount();
}

// Remove product from cart
function removeItem(index) {
  const cart = getCart();
  if (index >= 0 && index < cart.length) {
    cart.splice(index, 1);
    saveCart(cart);
    document.getElementById("cart-message").innerText = "Item removed!";
    loadCart();
    updateCartCount();
  }
}

// Change product quantity in cart
function updateQuantity(index, change) {
  const cart = getCart();
  if (index >= 0 && index < cart.length) {
    cart[index].quantity = cart[index].quantity + change;
    if (cart[index].quantity < 1) {
      cart[index].quantity = 1;
      document.getElementById("cart-message").innerText = "Quantity can't be less than 1.";
    } else {
      document.getElementById("cart-message").innerText = "Item updated!";
    }
    if (cart[index].quantity === 0) {
      cart.splice(index, 1);
    }
    saveCart(cart);
    loadCart();
    updateCartCount();
  }
}

// --- Clear All Items ---
function clearAllItemsFromCart() {
    const emptyCart = [];
    saveCart(emptyCart);
    updateCartCount();
}
