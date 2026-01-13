document.addEventListener('click', function (event) {
  const button = event.target.closest('.ajax-add-to-cart');
  if (!button) return;

  const variantId = button.dataset.variantId;

  fetch('/cart/add.js', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json'
    },
    body: JSON.stringify({
      id: variantId,
      quantity: 1
    })
  })
    .then(res => res.json())
    .then(() => {
      updateMiniCart();
    })
    .catch(err => console.error(err));
});
