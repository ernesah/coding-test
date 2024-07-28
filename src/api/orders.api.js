import orders from '../data/orders.json';

export const fetchOrders = async () => {
  try {
    return { data: orders };
  } catch (error) {
    throw new Error('Failed to fetch orders');
  }
};

export const fetchOrder = async (id) => {
  try {
    const order = orders.find((order) => order.id === id);
    if (!order) {
      throw new Error('Order not found');
    }
    return { data: order };
  } catch (error) {
    throw new Error('Failed to fetch order');
  }
};

export const placeOrder = async (order) => {
  try {
    console.log('Placing order:', order);
    return { success: true, message: 'Order placed successfully!' };
  } catch (error) {
    return { success: false, message: 'Failed to place order.' };
  }
};
