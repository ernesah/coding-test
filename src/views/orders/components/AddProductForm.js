import React, { useState, useEffect } from 'react';
import PropTypes from 'prop-types';
import Button from '../../../components/Button';
import ErrorDisplay from '../../../components/ErrorDisplay';
import { fetchProducts } from '../../../api/products.api';

const AddProductForm = ({ handleSubmit, handleCancel }) => {
  const [products, setProducts] = useState([]);
  const [selectedProduct, setSelectedProduct] = useState({});
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchProductsList = async () => {
      try {
        const response = await fetchProducts();
        setProducts(response.data);
      } catch (error) {
        setError(error.message || 'An error occurred while fetching products');
      } finally {
        setLoading(false);
      }
    };

    fetchProductsList();
  }, []);

  const handleProductChange = (e) => {
    const selectedProductId = e.target.value;
    const selectedProduct = products.find((p) => p.id === selectedProductId);
    setSelectedProduct(selectedProduct);
  };

  const validateForm = () => {
    if (!Object.entries(selectedProduct).length) {
      setError('Please select a product');
      return false;
    }
    return true;
  };

  const handleSave = () => {
    if (validateForm()) {
      const addedProduct = products.find((p) => p.id === selectedProduct.id);
      handleSubmit(addedProduct);
      setSelectedProduct('');
    }
  };

  return (
    <div className='w-full p-4'>
      <h3 className='text-bluish-grey text-xl font-medium uppercase mb-4'>
        Add new product
      </h3>
      <select
        name='productId'
        onChange={handleProductChange}
        value={selectedProduct.productId}
        className='appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline'
      >
        <option value=''>Select a product</option>
        {loading ? (
          <option disabled>Loading...</option>
        ) : (
          products.map((product) => (
            <option key={product.id} value={product.id}>
              {product.description}
            </option>
          ))
        )}
      </select>
      {error && <ErrorDisplay errorMessage={error} />}
      <div className='flex justify-end gap-4 mt-6'>
        <Button variant='secondary' onClick={handleCancel}>
          Cancel
        </Button>
        <Button type='submit' variant='primary' onClick={handleSave}>
          Add
        </Button>
      </div>
    </div>
  );
};

AddProductForm.propTypes = {
  handleSubmit: PropTypes.func.isRequired,
  handleCancel: PropTypes.func.isRequired
};

export default AddProductForm;
