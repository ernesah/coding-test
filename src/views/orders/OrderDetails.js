import React, { useEffect, useState, useCallback } from 'react';
import { useParams } from 'react-router-dom';
import { toast } from 'react-toastify';
import ErrorDisplay from '../../components/ErrorDisplay';
import Loading from '../../components/Loading';
import Modal from '../../components/Modal';
import AddProductForm from './components/AddProductForm';
import ProductItem from './components/ProductItem';
import Button from '../../components/Button';
import { fetchOrder, placeOrder } from '../../api/orders.api';
import { fetchProduct } from '../../api/products.api';

const OrderDetails = () => {
  const { id } = useParams();
  const [order, setOrder] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [showAddProductForm, setShowAddProductForm] = useState(false);

  useEffect(() => {
    const fetchOrderDetails = async () => {
      try {
        const { data: orderData } = await fetchOrder(id);
        const updatedItems = await Promise.all(
          orderData.items.map(async (item) => {
            const { data: productData } = await fetchProduct(
              item['product-id']
            );
            return {
              ...item,
              description: productData.description,
              category: productData.category,
              quantity: parseInt(item.quantity),
              ['unit-price']: parseFloat(item['unit-price']),
              total: parseFloat(item.quantity * item['unit-price'])
            };
          })
        );
        const total = calculateTotal(updatedItems);
        setOrder({ ...orderData, items: updatedItems, total });
      } catch (error) {
        setError(
          error.message || 'An error occurred while fetching order details'
        );
      } finally {
        setLoading(false);
      }
    };

    fetchOrderDetails();
  }, [id]);

  const calculateTotal = (items) => {
    return items.reduce((total, item) => total + parseFloat(item.total), 0);
  };

  const toggleAddProductModal = useCallback(() => {
    setShowAddProductForm((prev) => !prev);
  }, []);

  const handleAddProduct = useCallback(
    async (newProduct) => {
      const existingProductIndex = order.items.findIndex(
        (item) => item['product-id'] === newProduct.id
      );
      const updatedItems = [...order.items];

      if (existingProductIndex > -1) {
        const item = updatedItems[existingProductIndex];
        updatedItems[existingProductIndex] = {
          ...item,
          quantity: item.quantity + 1,
          total: (item.quantity + 1) * item['unit-price']
        };
      } else {
        const newProductItem = {
          'product-id': newProduct.id,
          description: newProduct.description,
          category: newProduct.category,
          quantity: 1,
          'unit-price': parseFloat(newProduct.price),
          total: parseFloat(newProduct.price)
        };
        updatedItems.push(newProductItem);
      }

      const newTotal = calculateTotal(updatedItems);
      setOrder({ ...order, items: updatedItems, total: newTotal });
      setShowAddProductForm(false);
    },
    [order, setOrder]
  );

  const handleQuantityChange = useCallback(
    (index, change) => {
      const updatedItems = order.items.map((item, i) => {
        if (i === index) {
          const newQuantity = parseInt(item.quantity) + change;
          if (newQuantity < 1) return item;
          return {
            ...item,
            quantity: newQuantity,
            total: newQuantity * item['unit-price']
          };
        }
        return item;
      });

      const newTotal = calculateTotal(updatedItems);
      setOrder({ ...order, items: updatedItems, total: newTotal });
    },
    [order, setOrder]
  );

  const handleRemoveProduct = useCallback(
    (indexToRemove) => {
      const updatedItems = order.items.filter(
        (_, index) => index !== indexToRemove
      );
      const newTotal = calculateTotal(updatedItems);
      setOrder({ ...order, items: updatedItems, total: newTotal });
    },
    [order, setOrder]
  );

  const handlePlaceOrder = async () => {
    if (!order || !order.items.length) {
      toast.error('Order is empty!');
      return;
    }

    try {
      const result = await placeOrder(order);
      if (result.success) {
        toast.success(result.message);
      } else {
        toast.error(result.message);
      }
    } catch (err) {
      toast.error(err.message);
    }
  };

  if (loading) return <Loading />;

  if (error) return <ErrorDisplay errorMessage={error} />;

  return (
    <div className='max-w-3xl mx-auto bg-white rounded-lg shadow-lg p-6'>
      <h3 className='text-bluish-grey text-xl font-medium uppercase border-b pb-2 mb-4'>
        Order {order.id}
      </h3>
      <div className='flex justify-end w-full mb-8'>
        <Button variant='primary' onClick={toggleAddProductModal}>
          <p className='font-medium'>Add new product</p>
        </Button>
      </div>
      {order?.items?.map((item, index) => (
        <ProductItem
          key={index}
          item={item}
          onIncrease={() => handleQuantityChange(index, 1)}
          onDecrease={() => handleQuantityChange(index, -1)}
          onRemove={() => handleRemoveProduct(index)}
        />
      ))}
      <div className='mt-6 text-right text-lg font-bold text-sage'>
        Total: ${order.total.toFixed(2)}
      </div>
      {order?.items.length > 0 && (
        <div className='flex justify-center w-full my-3'>
          <Button type='submit' variant='primary' onClick={handlePlaceOrder}>
            <p className='font-medium'>Place Order</p>
          </Button>
        </div>
      )}

      {showAddProductForm && (
        <Modal
          openModal={showAddProductForm}
          handleClose={toggleAddProductModal}
        >
          <AddProductForm
            handleSubmit={handleAddProduct}
            handleCancel={toggleAddProductModal}
          />
        </Modal>
      )}
    </div>
  );
};

export default OrderDetails;
