import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import InventoryPage from './pages/Inventory.jsx';
import SettingsPage from './pages/Settings.jsx';
import OrdersPage from './pages/Orders.jsx';

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<InventoryPage />} />
        <Route path="/settings" element={<SettingsPage />} />
        <Route path="/orders" element={<OrdersPage />} />
      </Routes>
    </Router>
  );
}

export default App;
