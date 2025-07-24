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
function getCart() { return JSON.parse(localStorage.getItem('cart')) || {}; }

// Save new cart quantities
function saveCart(cart) { localStorage.setItem('cart', JSON.stringify(cart)); }

// Update the total cart ingredients count in object with id "cart-count"
function updateCartCount() {
    const cart = getCart();
    let total = 0;
    for (let key in cart) { total += cart[key]; }
    document.getElementById('cart-count').textContent = total;
}

// Adds one ingredient to cart
// ingredient: product identifier of type INGREDIENT_IDS
function addItemToCart(ingredient) {
    let currentCart = getCart();
    currentCart[ingredient] = (currentCart[ingredient] || 0) + 1;
    saveCart(currentCart);
    alert('Ingredients have been added to your cart!');
    updateCartCount();
}

// Adds multiple ingredients to cart
// quantities: array of [ingredient: quantity] pairs
// ingredient: product identifier of type INGREDIENT_IDS
function addToCart(quantities) {
    let currentCart = getCart();
    for (let ingredient in quantities) {
        if (quantities[ingredient] > 0) {
            currentCart[ingredient] = (currentCart[ingredient] || 0) + quantities[ingredient];
        }
    }
    saveCart(currentCart);
    alert('Ingredients have been added to your cart!');
    updateCartCount();
}