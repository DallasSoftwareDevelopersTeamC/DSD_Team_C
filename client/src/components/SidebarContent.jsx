import React, { useState } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faBars, faFile, faFilter, faGear, faSearch, faShoppingBag } from '@fortawesome/free-solid-svg-icons';
import './Header/headerFooter.css';
import './sidebar.css'
import './Header/SearchInput.css'
import SearchInput from './Header/SearchInput';
import FilterBy from './Header/FilterBy';

const SidebarContent = ({ onToggle, collapsed }) => {

  return (
    <div className={`sidebar ${collapsed ? 'sidebar-collapsed' : ''}`}>
      {/* Your other sidebar content */}
      <div className="sidebar-btn-container">
        <button className='sidebarToggleIcon' onClick={onToggle}>
          <FontAwesomeIcon icon={faBars} />
        </button>
        <h2><a href="/">Orderly</a></h2>
      </div>
        <ul className='nav-links'>
          <li>
            <a href="/">
              <FontAwesomeIcon className='fa-sidebar-icon' icon={faFile} />
              <span>Inventory</span>
            </a>
          </li>
          <li>
            <a href="/Orders">
              <FontAwesomeIcon className='fa-sidebar-icon' icon={faShoppingBag} />
              <span>Orders</span>
            </a>
          </li>
          <li>
            <a href="/Settings">
              <FontAwesomeIcon className='fa-sidebar-icon' icon={faGear} />
              <span>Settings</span>
            </a>
          </li>
        </ul>
        <ul className='filter-search-container'>
          <li>
        
              <FontAwesomeIcon className='fa-sidebar-icon-fs' icon={faSearch} />
              <span><SearchInput/></span>

          </li>
          <li>
            
              <FontAwesomeIcon className='fa-sidebar-icon-fs' icon={faFilter} />
             <span><FilterBy/></span>
         
          </li>
        </ul>
    </div>
  );
};

export default SidebarContent;
