import React from 'react';
import './headerFooter.css';
import './SearchInput.css'
import SearchInput from './SearchInput';
import FilterBy from './FilterBy';
import { Link } from 'react-router-dom';

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
            <Link to="/">
              Inventory
            </Link>
          </li>
          <li>
            <Link to="/Orders">
              Orders
            </Link>
          </li>
          <li>
            <Link to="/Settings">
              Settings
            </Link>
          </li>
        </ul>
    </div>
  );
}

export default Header;
