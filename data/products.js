// Dummy product data. Replace with an API call later.
// "image": put require('../assets/xxx.png') or { uri: 'https://...' } here. null shows an emoji.
const sizes3 = (s, r, l) => [
  { name: 'Small', price: s },
  { name: 'Regular', price: r },
  { name: 'Large', price: l },
];
const sizes2 = (r, l) => [
  { name: 'Regular', price: r },
  { name: 'Large', price: l },
];
const teaAddOns = [
  { name: 'Pearl', price: 10 },
  { name: 'Oreo', price: 15 },
  { name: 'Grahams', price: 10 },
];
const fruitAddOns = [
  { name: 'Nata', price: 10 },
  { name: 'Fruit Jelly', price: 10 },
];

export const CATEGORIES = [
  'All', 'Fruit Tea', 'Fruit Milk', 'Coffee Series', 'Milk Tea',
  'Premium Milk Tea', 'Pizza & Street Foods', 'Sides & Extras',
];

const p = (id, name, category, description, price, emoji, extra = {}) => ({
  id, name, category, description, price, emoji, image: null,
  sizes: null, addOns: null, ...extra,
});

export const PRODUCTS = [
p('1', 'Strawberry', 'Fruit Tea', 'Sweet & Bright', 39, '🍓', {
  addOns: fruitAddOns,
  image: require('../assets/products/strawberry-fruit-tea.jpeg'),
}),
  p('2', 'Blue Lemonade', 'Fruit Tea', 'Zesty citrus', 39, '🍋', { 
  addOns: fruitAddOns,
  image: require('../assets/products/lemonade-fruit-tea.jpeg')
}),
  p('3', 'Green Apple', 'Fruit Tea', 'Crisp & tangy', 39, '🍏', { 
  addOns: fruitAddOns,
   image: require('../assets/products/green-apple-fruit-tea.jpeg')
}),
  p('4', 'Fruit Milk Mango', 'Fruit Milk', 'Tropical & creamy', 59, '🥭', {
  addOns: fruitAddOns,
  image: require('../assets/products/mango-fruit-milk.jpeg')
 }),
  p('5', 'Fruit Milk Ube', 'Fruit Milk', 'Sweet purple yam', 59, '🍠', { 
  addOns: fruitAddOns, 
  image: require('../assets/products/ube-fruit-milk.jpeg')
}),
  p('6', 'Kape Espresso', 'Coffee Series', 'Bold and creamy', 59, '☕', {
  image: require('../assets/products/kape-espresso.jpeg')
}),
  p('7', 'Spanish Latte', 'Coffee Series', 'Sweet espresso & milk', 69, '🥛', {
  image: require('../assets/products/spanish-latte.jpeg')
  }),
  p('8', 'Iced Coffee with Matcha', 'Coffee Series', 'Coffee meets matcha', 69, '🍵', {
  image: require('../assets/products/ice-coffe-matcha.jpeg')
  }),
  p('9', 'Choco Kisses', 'Milk Tea', 'Rich chocolate milk tea shake with pearls', 65, '🍫', { sizes: sizes3(42, 65, 90), addOns: teaAddOns,
    image: require('../assets/products/choco-kisses.jpeg')
   }),
  p('10', 'Cookies N Cream', 'Milk Tea', 'Creamy cookies milk tea shake', 65, '🍪', { sizes: sizes3(42, 65, 90), addOns: teaAddOns,
    image: require('../assets/products/cookes N Cream.jpeg')
   }),
  p('11', 'Red Velvet', 'Premium Milk Tea', 'Striking dessert-style milk tea', 75, '❤️', { sizes: sizes2(75, 99), addOns: teaAddOns,
    image: require('../assets/products/red velvet.jpeg')
   }),
  p('12', 'Matcha', 'Premium Milk Tea', 'Rich, creamy matcha', 75, '🍃', { sizes: sizes2(75, 99), addOns: teaAddOns,
    image: require('../assets/products/matcha prem.jpeg')
   }),
  p('13', 'Italian Cheese Pizza', 'Pizza & Street Foods', 'Melty, savory slice', 150, '🍕', {
    image: require('../assets/products/pizza.jpeg')
  }),
  p('14', 'Cheesy Hotdog', 'Pizza & Street Foods', 'Juicy & cheesy', 50, '🌭', {
    image: require('../assets/products/cheesy hotdog.jpeg')
  }),
  p('15', 'Chicken Pater', 'Pizza & Street Foods', 'Savory chicken over rice', 30, '🍗', {
    image: require('../assets/products/pater.jpeg')
  }),
  p('16', 'Lumpia (per piece)', 'Pizza & Street Foods', 'Chicken / Beef / Pork', 8, '🥟', {
    image: require('../assets/products/lumpia.jpeg')
  }),
  p('17', 'Fries', 'Sides & Extras', 'Crisp & golden', 75, '🍟', { sizes: [{ name: 'Small', price: 50 }, { name: 'Regular', price: 75 }, { name: 'Large', price: 99 }],
    image: require('../assets/products/fries.jpeg')}),
  p('18', 'Rice', 'Sides & Extras', 'Warm & ready', 15, '🍚', {
    image: require('../assets/products/rice.jpeg')
  }),
];

// Sample order shown in the Orders tab at start
export const SAMPLE_ORDERS = [
  {
    id: 'FYI-2025', status: 'Out for Delivery', total: 50, reviewed: false,
    createdAt: '4:12 PM', eta: '15-20 mins',
    customer: { name: 'Risty', address: 'Purok Mauswagon, Kimaya', contact: '+63 965 843 1363', facebook: 'Risty mea' },
    items: [{ key: 's1', product: PRODUCTS[13], size: null, addOns: [], qty: 1, unitPrice: 50 }],
  },
];
