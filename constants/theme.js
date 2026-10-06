export const COLORS = {
  green: '#1B5E3B',
  darkGreen: '#0F3D26',
  cream: '#FFFDF4',
  gold: '#F5B335',
  white: '#FFFFFF',
  text: '#1F2A24',
  gray: '#7A857E',
  border: '#D7E3D9',
  lightGreen: '#E6F0E4',
  red: '#C0392B',
};

export const STATUSES = ['Order Confirmed', 'Being Prepared', 'Out for Delivery', 'Delivered'];

// DELIVERY FEES - change the numbers here (in pesos)
export const DELIVERY_FEES = {
  'Jasaan': 30,
  'Kimaya': 40,
  'Solana': 50,
  'Other Nearby Area': 60,
};

// Area choices for the dropdown (taken from the fees above)
export const AREAS = Object.keys(DELIVERY_FEES);

// GCASH INFO - replace with the real business details later
export const GCASH = {
  number: '09XX XXX XXXX',
  accountName: 'FYI-KANTO FOODS',
};

// Shows 75 as ₱75.00
export const peso = (amount) => '₱' + Number(amount).toFixed(2);