import { BrowserRouter as Router, Switch, Route } from 'react-router-dom';
import InventoryPage from './pages/Inventory.jsx';
import SettingsPage from './pages/Settings.jsx';
import OrdersPage from './pages/Orders.jsx';

function App() {
  return (
    <Router>
      <Switch>
        <Route path="/inventory">
          <InventoryPage />
        </Route>
        <Route path="/settings">
          <Settings />
        </Route>
        <Route path="/orders">
          <OrdersPage />
        </Route>
      </Switch>
    </Router>
  );
}

export default App;
