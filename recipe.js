const salmonRecipeIngredientIds = [
    window.INGREDIENT_IDS.SALMON,
    window.INGREDIENT_IDS.CREAM,
    window.INGREDIENT_IDS.BUTTER,
    window.INGREDIENT_IDS.SPINACH
];

const spaghettiRecipeIngredientIds = [
    window.INGREDIENT_IDS.SPAGHETTI,
    window.INGREDIENT_IDS.BUTTER,
    window.INGREDIENT_IDS.PEPPER,
    window.INGREDIENT_IDS.PECORINO
];

const chorizoRecipeIngredientIds = [
    window.INGREDIENT_IDS.CHORIZO,
    window.INGREDIENT_IDS.TOMATOES,
    window.INGREDIENT_IDS.BEANS,
    window.INGREDIENT_IDS.PESTO
];

const curryRecipeIngredientIds = [
    window.INGREDIENT_IDS.CURRY_PASTE,
    window.INGREDIENT_IDS.SQUASH,
    window.INGREDIENT_IDS.PEPPER,
    window.INGREDIENT_IDS.COCONUT_MILK,
    window.INGREDIENT_IDS.CORIANDER
];

const quantities = {};

function changeQty(ingredient, change) {
    let newValue = Math.max(0, window.currentRecipeQuantities[ingredient] + change);
    if ((getItemQuantity(ingredient) + newValue) > 6) {
        alert(`Max quantity for each product in the cart is 6. You already have ${getItemQuantity(ingredient)} ${window.INGREDIENTS.find(i => i.id === ingredient).name} in the cart`);
    } else {
        window.currentRecipeQuantities[ingredient] = newValue
        document.getElementById('qty-'+ingredient).textContent = window.currentRecipeQuantities[ingredient];
        updateTotalCost();
    }
}

function getPriceById(id) {
  const item = window.INGREDIENTS.find(i => i.id === id);
  return item && item.priceValue ? item.priceValue : 0;
}

function updateTotalCost() {
  let total = 0;
  for (let id in window.currentRecipeQuantities) {
    total += getPriceById(id) * window.currentRecipeQuantities[id];
  }
  document.getElementById('total-cost-value').textContent = `$${total}`;
}

function renderIngredients(containerId, ingredientIds) {
	const container = document.getElementById(containerId);
	if (!container) return;

	container.innerHTML = "";
	const quantities = {};

	ingredientIds.forEach(id => {
		const item = window.INGREDIENTS.find(i => i.id === id);
		if (!item) return;

		quantities[item.id] = 0;

		const li = document.createElement('li');
		li.innerHTML = `
			<img src="icons/minus-circle.svg" class="qty-controls" onclick="changeQty('${item.id}', -1)">
			<span class="qty" id="qty-${item.id}">0</span>
			<img src="icons/add.svg" class="qty-controls" onclick="changeQty('${item.id}', 1)">
			<span class="ingredient-name">${item.name} (${item.price})</span>
		`;
		container.appendChild(li);
	});

	window.currentRecipeQuantities = quantities;
	updateTotalCost();
}