import './App.css';
import React, { useState, useEffect } from 'react';

function App() {
  const [data, setData] = useState(null);

  useEffect(() => {
    const fetchData = async () => {
      const response = await fetch('http://localhost:5000');
      const jsonData = await response.json();
      setData(jsonData);
    };

    fetchData();
  }, []);

  if (!data) {
    return <div>Loading...</div>;
  }
  return (
    <div className="App">
      <header className="App-header">
        Here we go
     <div>
      <h1>Data:</h1>
       {data.message}
     </div>
      </header>
    </div>
  );
}

export default App;
