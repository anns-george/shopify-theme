

document.addEventListener('DOMContentLoaded', () => {
  document.body.addEventListener('click', (event) => {
    const addToCartButton = event.target.closest('button[name="add"]');

    if (!addToCartButton) return;

    console.log('Add to cart clicked');

    // Wait a bit so Dawn finishes adding to cart
    setTimeout(() => {
      document.documentElement.dispatchEvent(
        new CustomEvent('cart:open')
      );
    }, 300);
  });
});

document.addEventListener('DOMContentLoaded', () => {
  const menuButton = document.querySelector('[data-mobile-menu-button]');
  const menu = document.querySelector('[data-mobile-menu]');

  if (menuButton && menu) {
    menuButton.addEventListener('click', () => {
      menu.classList.toggle('is-open');
      console.log('Mobile menu toggled ✅');
    });
  }
});
