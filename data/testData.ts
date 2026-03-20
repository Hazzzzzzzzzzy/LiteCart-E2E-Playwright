export const TIMEOUTS = {
  login: 10_000,
  cartReady: 10_000,
  orderSuccess: 20_000,
  networkIdle: 15_000,
} as const;

export const CREDENTIALS = {
  email: 'test@test.com',
  password: '1234567890',
  invalidPassword: 'wrongpassword',
} as const;

export const URLS = {
  base: 'https://litecart.stqa.ru',
  login: '/en/login',
  checkout: '/en/checkout',
  home: '/en/',
  greenDuck: '/en/rubber-ducks-c-1/subcategory-c-2/green-duck-p-2',
  yellowDuck: '/en/rubber-ducks-c-1/subcategory-c-2/yellow-duck-p-1',
  redDuck: '/en/rubber-ducks-c-1/red-duck-p-3',
  blueDuck: '/en/rubber-ducks-c-1/blue-duck-p-4',
} as const;

export const PRODUCTS = {
  greenDuck: { name: 'Green Duck', price: 20, hasDiscount: false },
  yellowDuck: { name: 'Yellow Duck', price: 18, regularPrice: 20, hasDiscount: true },
  redDuck: { name: 'Red Duck', price: 20, hasDiscount: false },
  blueDuck: { name: 'Blue Duck', price: 20, hasDiscount: false },
} as const;
