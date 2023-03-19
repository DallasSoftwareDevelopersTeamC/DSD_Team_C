import React, { useContext } from 'react';
import Header from '../components/Header/Header.jsx';

import Footer from '../components/Footer.jsx';
import InventoryContent from '../components/Inventory/Inventory.jsx';
import ActiveOrders from '../components/orders/activeOrders'

import './inventory_orders_Container.css'

function InventoryPage({ tempInStock }) {

  return (
    <div>
      <Header />
      <div className='inventory-orders-container'>
        <div className='inventory-section'>
          <InventoryContent tempInStock={tempInStock} />
        </div>
        <div className='orders-section'>
          <ActiveOrders />
        </div>
      </div>
      <Footer />
    </div>
  );
}

export default InventoryPage;