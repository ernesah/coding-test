import orders from '../data/orders.json';

export const fetchOrders = async () => {
  return new Promise((resolve) => {
    setTimeout(() => {
      resolve({ data: orders });
    }, 500);
  });
};

export const fetchOrder = async (id) => {
  return new Promise((resolve) => {
    setTimeout(() => {
      const order = orders.find((order) => order.id === id);
      resolve({ data: order });
    }, 500);
  });
};

export const placeOrder = async (order) => {
  try {
    console.log('Placing order:', order);
    return { success: true, message: 'Order placed successfully!' };
  } catch (error) {
    return { success: false, message: 'Failed to place order.' };
  }
};
