export const CART_SELECTORS = {
  removeButton:
    'button[name="remove_cart_item"], [name="remove_cart_item"], a[href*="remove"]',
  itemRow: '#checkout-cart-wrapper li:has(button:has-text("Remove"))',
  cartReady:
    '#checkout-cart-wrapper li button:has-text("Remove"), #checkout-cart-wrapper table tr td a[href*="duck"], #checkout-cart-wrapper p em',
} as const;

export const PRICE_REGEX = /\$(\d+(?:\.\d+)?)/;
