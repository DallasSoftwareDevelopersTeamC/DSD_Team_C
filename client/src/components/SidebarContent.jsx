import React from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faBars, faFile, faFilter, faGear, faSearch, faShoppingBag } from '@fortawesome/free-solid-svg-icons';
import './Header/headerFooter.css';
import './sidebar.css'
import './Header/SearchInput.css'
import SearchInput from './Header/SearchInput';
import FilterBy from './Header/FilterBy';

const SidebarContent = ({ onToggle }) => {
  return (
    <div>
      {/* Your other sidebar content */}
      <div className="sidebar-logo-btn">
        <button className='sidebarIcon' onClick={onToggle}>
          <FontAwesomeIcon icon={faBars} />
        </button>
        <h1>
          <a href="#">Orderly</a>
        </h1>
      </div>
      <div>
        <ul className='filter-search-container'>
          <li>
        
              <FontAwesomeIcon className='fa-sidebar-icon' icon={faSearch} />
              <SearchInput/>

          </li>
          <li>
            
              <FontAwesomeIcon className='fa-sidebar-icon' icon={faFilter} />
             <FilterBy/>
         
          </li>
        </ul>
        <ul className='nav-links'>
          <li>
            <a href="/">
              <FontAwesomeIcon className='fa-sidebar-icon' icon={faFile} />
              Inventory
            </a>
          </li>
          <li>
            <a href="/Orders">
              <FontAwesomeIcon className='fa-sidebar-icon' icon={faShoppingBag} />
              Orders
            </a>
          </li>
          <li>
            <a href="/Settings">
              <FontAwesomeIcon className='fa-sidebar-icon' icon={faGear} />
              Settings
            </a>
          </li>
        </ul>
      </div>
    </div>
  );
};

export default SidebarContent;
