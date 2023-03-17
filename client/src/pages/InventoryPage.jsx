import React, { useContext } from 'react';
import Header from '../components/Header/Header.jsx';
import DemoControls from '../components/Demo.jsx';
import Footer from '../components/Footer.jsx';
import InventoryContent from '../components/Inventory/Inventory.jsx';
import { OrdersContext } from "../contexts/orders.context";


function InventoryPage({ tempInStock }) {
  const { deliveryState, setDeliveryState } = useContext(OrdersContext);
  return (
    <div>
      <Header />
      <InventoryContent tempInStock={tempInStock} />
      <DemoControls />
      <Footer />
    </div>
  );
}

export default InventoryPage;