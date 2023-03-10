import React from 'react';
import Header from '../components/Header.jsx';
import Demo from '../components/Demo.jsx';
import Footer from '../components/Footer.jsx';
import InventoryContent from '../components/Inventory/Inventory.jsx';


function InventoryPage() {
  return (
    <div>
      <Header />
      <InventoryContent />
      <Demo />
      <Footer />
    </div>
  );
}

export default InventoryPage;