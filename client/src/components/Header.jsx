import React from 'react';
import './headerFooter.css';
import { sendCSVfile } from '../services/inventoryAPIcalls';

function Header() {
  const handleChange = (e) => {
    sendCSVfile(e.target.files[0]);
  };
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
              onChange={(e) => handleChange(e)}
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
