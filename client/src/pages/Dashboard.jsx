import React, { useState, useRef } from 'react';
import InventoryContent from '../components/Inventory/Inventory.jsx';


function InventoryPage() {
  const inventoryListScrollRef = useRef(null);
  const ordersListScrollRef = useRef(null);
  const [rowHeightState, setRowHeightState] = useState(null);

  return (
    <>
      <div className="flex flex-col gap-10 mx-6">
        <div className="inventory-section">
          <InventoryContent
            inventoryListScrollRef={inventoryListScrollRef}
            ordersListScrollRef={ordersListScrollRef}
            rowHeightState={rowHeightState}
          />
        </div>
        {/* <div className="orders-section">
          <OrdersPreview
            inventoryListScrollRef={inventoryListScrollRef}
            ordersListScrollRef={ordersListScrollRef}
            rowHeightState={rowHeightState}
            setRowHeightState={setRowHeightState}
          />
        </div> */}
      </div>
    </>
  );
}

export default InventoryPage;
