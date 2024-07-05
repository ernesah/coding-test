import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import ErrorDisplay from '../../components/ErrorDisplay';
import Loading from '../../components/Loading';
import { fetchOrder } from '../../api/orders.api';
import { fetchProduct } from '../../api/products.api';

const OrderDetails = () => {
  const { id } = useParams();
  const [order, setOrder] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const loadOrder = async () => {
      try {
        const { data: orderData } = await fetchOrder(id);
        const updatedItems = await Promise.all(
          orderData.items.map(async (item) => {
            const product = await fetchProduct(item['product-id']);
            const { data: productData } = product;
            return {
              ...item,
              description: productData.description,
              category: productData.category
            };
          })
        );
        setOrder({ ...orderData, items: updatedItems });
      } catch (error) {
        setError(
          error.message || 'An error occurred while fetching order details'
        );
      } finally {
        setLoading(false);
      }
    };

    loadOrder();
  }, []);

  const handleRemoveProduct = (indexToRemove) => {
    const updatedItems = order.items.filter(
      (_, index) => index !== indexToRemove
    );

    const newTotal = updatedItems.reduce(
      (total, item) => total + item.total,
      0
    );

    setOrder({ ...order, items: updatedItems, total: newTotal });
  };

  if (loading) return <Loading />;

  if (error) return <ErrorDisplay errorMessage={error} />;

  return (
    <div className='max-w-3xl mx-auto bg-white rounded-lg shadow-lg p-6'>
      <div className='border-b pb-2 mb-4'>
        <h3 className='text-bluish-grey text-xl font-medium uppercase'>
          Order {order.id}
        </h3>
      </div>
      <div className='flex justify-end w-full mb-8'>
        <button className='flex justify-center items-center rounded-md bg-sage text-white px-4 py-2.5'>
          <p className='font-medium'>Add new product</p>
        </button>
      </div>
      {order.items.map((item, index) => (
        <div className='border-b py-4'>
          <div key={index} className='flex justify-between'>
            <div>
              <ProductInfo label='Product' value={item['product-id']} />
              <ProductInfo label='Description' value={item['description']} />
              <ProductInfo label='Category' value={item['category']} />
            </div>
            <div className='text-right text-sage'>
              <ProductInfo label='Quantity' value={item['quantity']} />
              <ProductInfo label='Unit Price' value={`$${item['quantity']}`} />
              <ProductInfo label='Total' value={`$${item['total']}`} />
            </div>
          </div>
          <div className='flex justify-end'>
            <button
              className='bg-red-500 text-white px-3 py-1 rounded-md mt-3'
              onClick={() => handleRemoveProduct(index)}
            >
              Remove
            </button>
          </div>
        </div>
      ))}
      <div className='mt-6 text-right text-lg font-bold text-sage'>
        Total: ${order.total}
      </div>
    </div>
  );
};

const ProductInfo = ({ label, value }) => (
  <div className='text-bluish-grey'>
    <span className='font-bold'>{label}:</span> {value}
  </div>
);

export default OrderDetails;
