import React, { useContext } from 'react';
import { useLocation, Routes, Route } from 'react-router-dom';
import InventoryPage from './pages/InventoryPage.jsx';
import SettingsPage from './pages/SettingsPage.jsx';
import OrdersPage from './pages/OrdersPage.jsx';
import LoginPage from './pages/LoginPage.jsx';
import ProfilePage from './pages/ProfilePage.jsx';
import DemoControls from './components/DemoControls.jsx';

export default function AppRouterContent() {
  const location = useLocation();
  const params = new URLSearchParams(location.search);
  const isDemo = params.get('demo') === 'true';

  return (
    <>
      <Routes>
        <Route path="/" element={<InventoryPage />} />
        <Route path="/settings" element={<SettingsPage />} />
        <Route path="/orders" element={<OrdersPage />} />
        <Route path="/login" element={<LoginPage />} />
        <Route path="/profile" element={<ProfilePage />} />
      </Routes>
      {(location.pathname === '/orders' ||
        location.pathname === '/' ||
        isDemo) && <DemoControls />}
    </>
  );
}
