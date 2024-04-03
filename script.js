const cartItems = document.getElementById('cart-items');
const cartTotal = document.getElementById('cart-total');

let products = [];

// Mock data for products
products = [
	{ id: 1, name: 'Product 1', price: 100 },
	{ id: 2, name: 'Product 2', price: 200 },
	{ id: 3, name: 'Product 3', price: 300 },
];

const productEls = document.querySelectorAll('.product');

productEls.forEach((productEl) => {
	const id = productEl.dataset.id;
	const name = productEl.dataset.name;
	const price = productEl.dataset.price;

	const addToCartBtn = productEl.querySelector('.add-to-cart');

	addToCartBtn.addEventListener('click', () => {
		addToCart(id, name, price);
	});
});

function addToCart(id, name, price) {
	const existingItem = cartItems.querySelector(`[data-id="${id}"]`);

	if (existingItem) {
		incrementCartItemQuantity(existingItem, price);
	} else {
		const cartItem = createCartItem(id, name, price);
		cartItems.appendChild(cartItem);
		updateCartTotal();
	}
}

function createCartItem(id, name, price) {
	const cartItem = document.createElement('li');
	cartItem.dataset.id = id;
	cartItem.innerHTML = `
		<span>${name}</span>
		<span>$${price}</span>
		<button class="remove-from-cart">Remove</button>
		<span class="quantity">1</span>
	`;

	const removeFromCartBtn = cartItem.querySelector('.remove-from-cart');
	removeFromCartBtn.addEventListener('click', () => {
		cartItem.remove();
		updateCartTotal();
	});

	const quantity = cartItem.querySelector('.quantity');
	quantity.addEventListener('click', () => {
		incrementCartItemQuantity(cartItem, price);
	});

	return cartItem;
}

function incrementCartItemQuantity(cartItem, price) {
	const quantity = cartItem.querySelector('.quantity');
	const currentQuantity = parseInt(quantity.textContent);
	const newQuantity = currentQuantity + 1;
	quantity.textContent = newQuantity;
	updateCartTotal(price, newQuantity);
}

function updateCartTotal(price = 0, quantity = 1) {
	const existingTotal = parseFloat(cartTotal.textContent.slice(1));
	const newTotal = existingTotal + price * quantity;
	cartTotal.textContent = `$${newTotal.toFixed(2)}`;
}