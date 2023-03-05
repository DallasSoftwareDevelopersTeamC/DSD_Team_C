import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import InventoryPage from './pages/Inventory.jsx';
import SettingsPage from './pages/Settings.jsx';
import OrdersPage from './pages/Orders.jsx';

import { InventoryProvider } from './contexts/inventory.context.jsx';

function App() {
  return (
    <Router>
      <InventoryProvider>
      <Routes>
        <Route path="/" element={<InventoryPage />} />
        <Route path="/settings" element={<SettingsPage />} />
        <Route path="/orders" element={<OrdersPage />} />
      </Routes>
      </InventoryProvider>
    </Router>
  );
}

export default App;

