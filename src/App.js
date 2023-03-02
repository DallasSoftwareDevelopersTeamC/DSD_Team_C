import React from 'react';
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom';
import Inventory from './pages/Inventory';
import Orders from './pages/Orders';
import Settings from './pages/Settings';

function App() {
  return (
    <Router>
      <Switch>
        <Route exact path="/" component={Inventory} />
        <Route path="/Orders" component={Orders} />
        <Route path="/Settings" component={Settings} />
      </Switch>
    </Router>
  );
}

export default App;