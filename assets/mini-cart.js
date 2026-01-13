// Fetch cart JSON and render mini-cart
async function renderMiniCart() {
  try {
    const response = await fetch('/cart.js');
    const cart = await response.json();

    const itemsContainer = document.getElementById('mini-cart-items');
    const totalEl = document.getElementById('mini-cart-total');

    itemsContainer.innerHTML = ''; // Clear previous items

    cart.items.forEach(item => {
      const li = document.createElement('li');
      li.innerHTML = `
        <img src="${item.image}" alt="${item.title}" width="50" height="50">
        <span>${item.quantity} x ${item.title}</span>
        <span>${(item.price / 100).toFixed(2)}$</span>
        <button class="remove" data-line="${item.key}">Remove</button>
      `;
      itemsContainer.appendChild(li);
    });

    totalEl.textContent = `$${(cart.items_subtotal_price / 100).toFixed(2)}`;
  } catch (error) {
    console.error('Error fetching cart:', error);
  }
}

// Remove item from cart
async function removeFromCart(key) {
  try {
    await fetch('/cart/change.js', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ id: key, quantity: 0 })
    });
    renderMiniCart(); // Refresh mini-cart
  } catch (error) {
    console.error('Error removing item:', error);
  }
}

// Add event listener for remove buttons
document.addEventListener('click', (e) => {
  if (e.target.matches('#mini-cart-items .remove')) {
    const key = e.target.dataset.line;
    removeFromCart(key);
  }
});

// Initial load
renderMiniCart();
