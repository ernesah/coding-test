import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import OrdersList from './views/orders/OrdersList';
import OrderDetails from './views/orders/OrderDetails';

const App = () => {
  return (
    <Router>
      <Routes>
        <Route path='/' element={<OrdersList />} />
        <Route path='/orders/:id' element={<OrderDetails />} />
      </Routes>
    </Router>
  );
};

export default App;
