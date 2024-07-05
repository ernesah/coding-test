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
