import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import OrdersList from './views/orders/OrdersList';
import OrderDetails from './views/orders/OrderDetails';

const App = () => {
  return (
    <Router>
      <ToastContainer position='bottom-left' />
      <Routes>
        <Route path='/' element={<OrdersList />} />
        <Route path='/orders/:id' element={<OrderDetails />} />
      </Routes>
    </Router>
  );
};

export default App;
