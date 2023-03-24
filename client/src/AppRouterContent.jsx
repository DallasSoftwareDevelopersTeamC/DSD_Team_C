import React, { useState } from 'react';
import { useLocation, Routes, Route } from 'react-router-dom';
import InventoryPage from './pages/InventoryPage.jsx';
import SettingsPage from './pages/SettingsPage.jsx';
import OrdersPage from './pages/OrdersPage.jsx';
import LoginPage from './pages/LoginPage.jsx';
import DemoControls from './components/DemoControls.jsx';
import { useTempInStock } from './hooks/useTempStock';
import { useContext } from 'react';
import { InventoryContext } from './contexts/inventory.context';

import Sidebar from 'react-sidebar';
// import './components/sidebar.css'; // Or your custom CSS file
import SidebarContent from './components/Sidebar/SidebarContent';

export default function AppRouterContent() {
  const { inventory, isUsingStock } = useContext(InventoryContext);
  const tempInStock = useTempInStock(inventory, isUsingStock);

  const location = useLocation();
  const params = new URLSearchParams(location.search);
  const isDemo = params.get('demo') === 'true';

  // -------------- sidebar --------------
  const [sidebarCollapsed, setSidebarCollapsed] = useState(true);

  const toggleSidebar = () => {
    setSidebarCollapsed(!sidebarCollapsed);
  };

  const sidebarStyles = {
    background: 'var(--dark-grey)',
    position: 'fixed',
    width: sidebarCollapsed ? '45px' : '200px',
    transition: 'width 0.3s ease-in-out',
  };

  const sidebarContent = (
    <div>
      <SidebarContent onToggle={toggleSidebar} collapsed={sidebarCollapsed} />
    </div>
  );


  return (
    <>
      <Sidebar
        sidebar={sidebarContent}
        open={true}
        onSetOpen={() => { }}
        docked={true}
        styles={{ sidebar: sidebarStyles }}
        pullRight={false}
      >
      </Sidebar>
      <Routes>
        <Route path="/" element={<InventoryPage tempInStock={tempInStock} />} />
        <Route path="/settings" element={<SettingsPage />} />
        <Route path="/orders" element={<OrdersPage />} />
        <Route path="/login" element={<LoginPage />} />
      </Routes>
      {(location.pathname === '/orders' ||
        location.pathname === '/' ||
        isDemo) && <DemoControls />}
    </>
  );
}
