import React from 'react';
import './headerFooter.css';
import '../components/Inventory/SearchInput.css'
import { sendCSVfile } from '../services/inventoryAPIcalls';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faCloudArrowUp } from '@fortawesome/free-solid-svg-icons';
import SearchInput from './Inventory/SearchInput';
import FilterBy from './Inventory/FilterBy';

function Header() {
  const handleChange = (e) => {
    sendCSVfile(e.target.files[0]);
  };
  return (
    <div className="header-nav">
       <h1 className="header-name">
          <a href="#">Orderly</a>
        </h1>
      <header>
       
        <ul className="nav-links">
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
          <li>
          <label className="upload-button">
              <FontAwesomeIcon icon={faCloudArrowUp} />
              <input
                type="file"
                accept=".csv"
                onChange={(e) => handleChange(e)}
                style={{ display: 'none' }}
              />
            </label>
          </li>
        </ul>
        <FilterBy />
      </header>
      <div className='search-container'>
        <SearchInput />
      </div>
    </div>
  );
}

export default Header;
