import React, { useContext } from 'react';
import Header from '../components/Header/Header';
import Footer from '../components/Footer';
// import OrdersContent from '../components/Orders/OrdersContent.jsx';
import ActiveOrders from '../components/Orders/ActiveOrders'
import OrderHistory from '../components/Orders/OrderHistory'
import DemoControls from '../components/Demo.jsx';
import { OrdersContext } from "../contexts/orders.context";


function OrdersPage() {
  const { deliveryState, setDeliveryState } = useContext(OrdersContext);
  return (
    <div>
      <Header />
      <ActiveOrders />
      <OrderHistory />
      <DemoControls />
      <Footer />
    </div>
  );
}

export default OrdersPage;