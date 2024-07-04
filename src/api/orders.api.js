import orders from '../data/orders.json';

export const fetchOrders = async () => {
  return new Promise((resolve) => {
    setTimeout(() => {
      resolve({ data: orders });
    }, 500);
  });
};
