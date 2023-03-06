import React, { useState, useEffect } from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Inventory from './pages/Inventory';
import Orders from './pages/Orders';
import Settings from './pages/Settings';
import './App.css';

function FetchData() {
  const [data, setData] = useState(null);

  useEffect(() => {
    const fetchData = async () => {
      const response = await fetch('http://localhost:7777');
      const jsonData = await response.json();
      setData(jsonData);
    };

    fetchData();
  }, []);

  if (!data) {
    return <div>Loading...</div>;
  }

  return (
    <div>
      <h1>Data:</h1>
      {data.message}
    </div>
  );
}

function App() {
  return (
    <Router>
      <div className="App">
        <header className="App-header">Here we go</header>
        <Routes>
          <Route exact path="/" component={Inventory} />
          <Route path="/Orders" component={Orders} />
          <Route path="/Settings" component={Settings} />
          <Route path="/data" component={FetchData} />
        </Routes>
      </div>
    </Router>
  );
}

export default App;
