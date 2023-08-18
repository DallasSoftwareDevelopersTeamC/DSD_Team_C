import React, { useState, useRef } from "react";
import InventoryContent from "../components/Inventory/Inventory.jsx";
import Header from "../components/Header/Header.jsx";

function InventoryPage() {
  const inventoryListScrollRef = useRef(null);
  const ordersListScrollRef = useRef(null);
  const [rowHeightState, setRowHeightState] = useState(null);

  return (
    <>
      <div className="max-w-screen-2xl m-8 flex flex-col">
        <Header />
        <InventoryContent
          inventoryListScrollRef={inventoryListScrollRef}
          ordersListScrollRef={ordersListScrollRef}
          rowHeightState={rowHeightState}
        />
      </div>
    </>
  );
}

export default InventoryPage;
