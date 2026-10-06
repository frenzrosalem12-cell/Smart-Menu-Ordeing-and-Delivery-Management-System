import { createContext, useContext, useState } from 'react';
import { STATUSES } from '../constants/theme';
import { SAMPLE_ORDERS } from '../data/products';

const CartContext = createContext();
export const useCart = () => useContext(CartContext);

// Empty customer details (used before the customer fills the form)
const EMPTY_CUSTOMER = {
  name: '',
  contact: '',
  area: '',
  address: '',
  landmark: '',
  facebook: '',
};

export function CartProvider({ children }) {
  const [cart, setCart] = useState([]);
  const [orders, setOrders] = useState(SAMPLE_ORDERS);
  const [reviews, setReviews] = useState([]);
  const [lastOrder, setLastOrder] = useState(null);
  const [customer, setCustomer] = useState(EMPTY_CUSTOMER);
  const [orderNumber, setOrderNumber] = useState(1);

  // total = food subtotal (without delivery fee)
  const total = cart.reduce((sum, i) => sum + i.unitPrice * i.qty, 0);
  const count = cart.reduce((sum, i) => sum + i.qty, 0);

  const addToCart = (product, size, addOns, qty) => {
    const base = size ? size.price : product.price;
    const unitPrice = base + addOns.reduce((s, a) => s + a.price, 0);
    const key = [product.id, size ? size.name : '', addOns.map((a) => a.name).join(',')].join('|');
    setCart((prev) => {
      const found = prev.find((i) => i.key === key);
      if (found) return prev.map((i) => (i.key === key ? { ...i, qty: i.qty + qty } : i));
      return [...prev, { key, product, size, addOns, qty, unitPrice }];
    });
  };

  const changeQty = (key, delta) =>
    setCart((prev) => prev.map((i) => (i.key === key ? { ...i, qty: Math.max(1, i.qty + delta) } : i)));

  const removeItem = (key) => setCart((prev) => prev.filter((i) => i.key !== key));

  // Creates the local order. Later, this is where you send the order to your backend.
  const placeOrder = ({ deliveryFee, paymentMethod, paymentReference }) => {
    const isGcash = paymentMethod === 'GCash';
    const order = {
      id: 'FYI-' + String(orderNumber).padStart(4, '0'),
      customer: customer,
      items: cart,

      subtotal: total,
      deliveryFee: deliveryFee,
      total: total + deliveryFee,

      paymentMethod: paymentMethod,
      paymentStatus: isGcash ? 'For Verification' : 'Pending',
      paymentReference: isGcash ? paymentReference : '',

      status: STATUSES[0],
      reviewed: false,
      eta: '30-40 mins',
      createdAt: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
    };
    setOrders((prev) => [order, ...prev]);
    setLastOrder(order);
    setOrderNumber(orderNumber + 1);
    setCart([]);
    return order;
  };

  // Demo only: moves an order to the next status
  const advanceStatus = (id) =>
    setOrders((prev) =>
      prev.map((o) => {
        const idx = STATUSES.indexOf(o.status);
        return o.id === id && idx < STATUSES.length - 1 ? { ...o, status: STATUSES[idx + 1] } : o;
      })
    );

  const addReview = (orderId, rating, text) => {
    const name = orders.find((o) => o.id === orderId)?.customer.name || 'Customer';
    setReviews((prev) => [{ orderId, rating, text, name }, ...prev]);
    setOrders((prev) => prev.map((o) => (o.id === orderId ? { ...o, reviewed: true } : o)));
  };

  return (
    <CartContext.Provider
      value={{
        cart, total, count, orders, reviews, lastOrder,
        customer, setCustomer,
        addToCart, changeQty, removeItem, placeOrder, advanceStatus, addReview,
      }}
    >
      {children}
    </CartContext.Provider>
  );
}