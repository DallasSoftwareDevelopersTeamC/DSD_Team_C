import React from 'react';
import Header from '../components/Header.jsx';
import Footer from '../components/Footer.jsx';
import InventoryContent from '../components/Inventory/InventoryContent.jsx';

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