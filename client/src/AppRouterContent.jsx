import React from 'react';
import { useLocation, Routes, Route } from 'react-router-dom';
import InventoryPage from './pages/InventoryPage.jsx';
import SettingsPage from './pages/SettingsPage.jsx';
import OrdersPage from './pages/OrdersPage.jsx';
import LoginPage from './pages/LoginPage.jsx';
import DemoControls from './components/DemoControls.jsx';
import { useTempInStock } from './hooks/useTempStock';
import { useContext } from 'react';
import { InventoryContext } from './contexts/inventory.context';


export default function AppRouterContent() {
    const { inventory, isUsingStock } = useContext(InventoryContext);
    const tempInStock = useTempInStock(inventory, isUsingStock);

    const location = useLocation();
    const params = new URLSearchParams(location.search);
    const isDemo = params.get("demo") === "true";

    return (
        <>
            <Routes>
                <Route path="/" element={<InventoryPage tempInStock={tempInStock} />} />
                <Route path="/settings" element={<SettingsPage />} />
                <Route path="/orders" element={<OrdersPage />} />
                <Route path="/login" element={<LoginPage />} />
            </Routes>
            {(location.pathname === "/orders" || location.pathname === "/" || isDemo) && <DemoControls />}
        </>
    );
}
