import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import OrdersList from './views/orders/OrdersList';

const App = () => {
  return (
    <Router>
      <Routes>
        <Route path='/' element={<OrdersList />} />
      </Routes>
    </Router>
  );
};

export default App;
