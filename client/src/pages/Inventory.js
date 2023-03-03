import React from 'react';
import Header from '../components/Header';
import Footer from '../components/Footer';
import InventoryContent from '../components/Inventory/InventoryContent.js';

function InventoryPage() {
  return (
    <div>
      <Header />
      <InventoryContent />
      <Footer />
    </div>
  );
}

export default InventoryPage;