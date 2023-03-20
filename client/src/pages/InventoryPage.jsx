import React from 'react';
import Footer from '../components/Footer/Footer.jsx';
import InventoryContent from '../components/Inventory/Inventory.jsx';
import OrdersPreview from '../components/Orders/OrdersPreview'

import './inventory_ordPreview_Container.css'

function InventoryPage({ tempInStock }) {

  return (
    <>
      <div className='inventory-orders-container'>
        <div className='inventory-section'>
          <InventoryContent tempInStock={tempInStock} />
        </div>
        <div className='orders-section'>
          <OrdersPreview />
        </div>
      </div>
      <Footer />
    </>
  );
}

export default InventoryPage;