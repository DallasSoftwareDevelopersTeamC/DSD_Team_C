import React from 'react';
import Header from '../components/Header';
import Footer from '../components/Footer';
import OrdersContent from '../components/Orders/OrdersContent.jsx';

function OrdersPage() {
  return (
    <div>
      <Header />
      <OrdersContent />
      <Footer />
    </div>
  );
}

export default OrdersPage;