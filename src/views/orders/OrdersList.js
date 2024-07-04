import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import ErrorDisplay from '../../components/ErrorDisplay';
import Loading from '../../components/Loading';
import { fetchOrders } from '../../api/orders.api';

const OrdersList = () => {
  const [orders, setOrders] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const loadOrders = async () => {
      try {
        const response = await fetchOrders();
        setOrders(response.data);
      } catch (error) {
        setError(error.message || 'An error occurred while fetching orders');
      } finally {
        setLoading(false);
      }
    };

    loadOrders();
  }, []);

  if (loading) return <Loading />;

  if (error) return <ErrorDisplay errorMessage={error} />;

  return (
    <div className='p-5'>
      <h3 className='text-bluish-grey text-xl font-medium uppercase border-b mb-3'>
        Orders List
      </h3>
      {!orders.length ? (
        <p className='text-bluish-grey font-bold py-10'>No orders available.</p>
      ) : (
        <div className='grid gap-4 grid-cols-5 mt-5'>
          {orders.map((order) => (
            <Link
              key={order.id}
              to={`/orders/${order.id}`}
              className='flex justify-center items-center bg-seashell rounded-md h-24'
            >
              <p className='text-bluish-grey text-xl font-medium'>
                Order {order.id}
              </p>
            </Link>
          ))}
        </div>
      )}
    </div>
  );
};

export default OrdersList;
