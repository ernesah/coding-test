import products from '../data/products.json';

export const fetchProduct = async (id) => {
  return new Promise((resolve) => {
    setTimeout(() => {
      const product = products.find((product) => product.id === id);
      resolve({ data: product });
    }, 500);
  });
};
