import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import InventoryPage from './pages/InventoryPage.jsx';
import SettingsPage from './pages/SettingsPage.jsx';
import OrdersPage from './pages/OrdersPage.jsx';
import LoginPage from './pages/LoginPage.jsx';

import { faBox, faGear, faBagShopping, faMagnifyingGlass, faCircleXmark, } from '@fortawesome/free-solid-svg-icons';
// import { fab } from '@fortawesome/free-brands-svg-icons' this is if we decide to use any branded icons
import { library } from '@fortawesome/fontawesome-svg-core';
library.add(faBox, faGear, faBagShopping, faMagnifyingGlass, faCircleXmark);

function App() {
  return (
    <Router>

      <Routes>
        <Route path="/" element={<InventoryPage />} />
        <Route path="/settings" element={<SettingsPage />} />
        <Route path="/orders" element={<OrdersPage />} />
        <Route path="/login" element={<LoginPage />} />
      </Routes>

    </Router>
  );
}

export default App;
