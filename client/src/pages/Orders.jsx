import React from 'react';
import Header from '../components/Header/Header';
import Footer from '../components/Footer';
// import OrdersContent from '../components/Orders/OrdersContent.jsx';
import ActiveOrders from '../components/Orders/ActiveOrders'
import OrderHistory from '../components/Orders/OrderHistory'

function OrdersPage() {
  return (
    <div>
      <Header />
      <ActiveOrders />
      <OrderHistory />
      <Footer />
    </div>
  );
}

export default OrdersPage;