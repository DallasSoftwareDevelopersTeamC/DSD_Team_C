import React, { useEffect, useContext, useState, useRef } from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { InventoryContext } from './contexts/inventory.context';
import InventoryPage from './pages/InventoryPage.jsx';
import SettingsPage from './pages/SettingsPage.jsx';
import OrdersPage from './pages/OrdersPage.jsx';
import LoginPage from './pages/LoginPage.jsx';
import DemoControls from './components/DemoControls.jsx';
import { useTempInStock } from './hooks/useTempStock';

import { faBox, faGear, faBagShopping, faMagnifyingGlass, faCircleXmark, } from '@fortawesome/free-solid-svg-icons';
// import { fab } from '@fortawesome/free-brands-svg-icons' this is if we decide to use any branded icons
import { library } from '@fortawesome/fontawesome-svg-core';
library.add(faBox, faGear, faBagShopping, faMagnifyingGlass, faCircleXmark);

function App() {
  const { inventory, isUsingStock } = useContext(InventoryContext);


  // tempInStock decreases each inStock amount - the object is passed down as prop all the way to inventory.jsx 
  // where it uses this value to display the stock level for each item
  const tempInStock = useTempInStock(inventory, isUsingStock);


  return (
    <Router>
      <Routes>
        <Route path="/" element={<InventoryPage tempInStock={tempInStock} />} />
        <Route path="/settings" element={<SettingsPage />} />
        <Route path="/orders" element={<OrdersPage />} />
        <Route path="/login" element={<LoginPage />} />
      </Routes>
      <DemoControls />
    </Router>
  );
}

export default App;
