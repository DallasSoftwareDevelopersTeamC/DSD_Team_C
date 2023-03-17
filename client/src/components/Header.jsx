import React from 'react';
import './headerFooter.css';
import '../components/Inventory/SearchInput.css'
import SearchInput from './Inventory/SearchInput';
import FilterBy from './Inventory/FilterBy';

function Header() {

  return (
    <div className="header-container">
       <h1>
          <a href="#">Orderly</a>
        </h1>
        <ul className='filter-search-container'>
          <li><FilterBy /></li>
          <li><SearchInput /></li>
        </ul>
        <ul className="nav-links">
          <li>
            <a href="/">
              Inventory
            </a>
          </li>
          <li>
            <a href="/Orders">
              Orders
            </a>
          </li>
          <li>
            <a href="/Settings">
              Settings
            </a>
          </li>
        </ul>
    </div>
  );
}

export default Header;
