import React from 'react';
import './headerFooter.css';
import { useState } from 'react';
import { sendCSVfile } from '../services/inventoryAPIcalls';

function Header() {
  const [csvFile, setCsvFile] = useState(null);

  if (csvFile) {
    sendCSVfile(csvFile);
  }
  return (
    <div className="header-nav">
      <nav>
        <h1 className="header-name">
          <a href="#">Orderly</a>
        </h1>
        <ul className="nav-links">
          <li>
            <input
              type="file"
              accept=".csv"
              onChange={(e) => setCsvFile(e.target.files[0])}
            />
          </li>
          <li>
            <a href="/" className="header-li-a">
              Inventory
            </a>
          </li>
          <li>
            <a href="/Orders" className="header-li-a">
              Orders
            </a>
          </li>
          <li>
            <a href="/Settings" className="header-li-a">
              Settings
            </a>
          </li>
        </ul>
      </nav>
    </div>
  );
}

export default Header;
