import React from 'react';
import Header from '../components/Header';
import Footer from '../components/Footer';
import Inventory from '../components/InventoryContent.js';

function Inventory() {
  return (
    <div>
      <Header />
      <Inventory />
      <Footer />
    </div>
  );
}

export default Inventory;