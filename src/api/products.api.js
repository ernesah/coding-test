import products from '../data/products.json';

export const fetchProducts = async () => {
  return new Promise((resolve, reject) => {
    try {
      resolve({ data: products });
    } catch (error) {
      reject(new Error('Failed to fetch products'));
    }
  });
};

export const fetchProduct = async (id) => {
  return new Promise((resolve, reject) => {
    try {
      const product = products.find((product) => product.id === id);
      if (!product) {
        reject(new Error('Product not found'));
      } else {
        resolve({ data: product });
      }
    } catch (error) {
      reject(new Error('Failed to fetch product'));
    }
  });
};
