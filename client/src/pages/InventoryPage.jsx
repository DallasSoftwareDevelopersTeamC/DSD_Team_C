import React from 'react';
import InventoryContent from '../components/Inventory/Inventory.jsx';
import OrdersPreview from '../components/Orders/OrdersPreview';

import './inventoryOrdPreviewContainer.css';

function InventoryPage({ tempInStock }) {
  return (
    <>
      <div className="inventory-orders-container">
        <div className="inventory-section">
          <InventoryContent tempInStock={tempInStock} />
        </div>
        <div className="orders-section">
          <OrdersPreview />
        </div>
      </div>
    </>
  );
}

export default InventoryPage;
