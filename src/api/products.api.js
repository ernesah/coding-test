import products from '../data/products.json';

export const fetchProducts = async () => {
  try {
    return { data: products };
  } catch (error) {
    throw new Error('Failed to fetch products');
  }
};

export const fetchProduct = async (id) => {
  try {
    const product = products.find((product) => product.id === id);
    if (!product) {
      throw new Error('Product not found');
    }
    return { data: product };
  } catch (error) {
    throw new Error('Failed to fetch product');
  }
};
