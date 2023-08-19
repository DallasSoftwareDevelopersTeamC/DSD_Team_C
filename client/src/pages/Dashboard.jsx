import React, { useState, useRef } from "react";
import InventoryContent from "../components/Inventory/Inventory.jsx";
import Header from "../components/Header/Header.jsx";
import Footer from "../components/Footer/Footer.jsx";

function InventoryPage() {
  const inventoryListScrollRef = useRef(null);
  const ordersListScrollRef = useRef(null);
  const [rowHeightState, setRowHeightState] = useState(null);

  return (
    <>
      <div className="max-w-screen-xl px-8 flex mx-auto flex-col">
        <Header />
        <InventoryContent
          inventoryListScrollRef={inventoryListScrollRef}
          ordersListScrollRef={ordersListScrollRef}
          rowHeightState={rowHeightState}
        />
      </div>
      <div className=" absolute bottom-2 left-20 ">
        <Footer/>
      </div>
    </>
  );
}

export default InventoryPage;
