import React, { useState, useRef } from "react";
import InventoryContent from "../components/Inventory/Inventory.jsx";
import Header from "../components/Header/Header.jsx";
import Footer from "../components/Footer/Footer.jsx";
import Stats from "../components/Inventory/Stats.jsx";

function InventoryPage() {
  const inventoryListScrollRef = useRef(null);
  const ordersListScrollRef = useRef(null);
  const [rowHeightState, setRowHeightState] = useState(null);

  return (
    <div className=" max-w-screen-xl mx-auto ">
      <div className="max-w-screen-xl bg-zinc-200  m-4 px-8 flex gap-6 flex-col rounded-3xl">
        <Header />
        <Stats/>
        <InventoryContent
          inventoryListScrollRef={inventoryListScrollRef}
          ordersListScrollRef={ordersListScrollRef}
          rowHeightState={rowHeightState}
        />
              <div className=" flex justify-center  mb-4">
        <Footer/>
      </div>
      </div>

    </div>
  );
}

export default InventoryPage;
