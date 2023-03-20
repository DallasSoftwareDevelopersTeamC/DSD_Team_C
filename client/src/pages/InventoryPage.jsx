import React, { useContext } from 'react';
import Header from '../components/Header/Header.jsx';

import Footer from '../components/Footer.jsx';
import InventoryContent from '../components/Inventory/Inventory.jsx';

function InventoryPage({ tempInStock }) {
  return (
    <div>
      <Header />
      <InventoryContent tempInStock={tempInStock} />
      <Footer />
    </div>
  );
}

export default InventoryPage;
