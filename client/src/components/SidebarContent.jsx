import React from 'react';
import { Link } from 'react-router-dom';
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
            <Link to="/">
              <FontAwesomeIcon className='fa-sidebar-icon' icon={faFile} />
              <span>Inventory</span>
            </Link>
          </li>
          <li>
            <Link to="/Orders">
              <FontAwesomeIcon className='fa-sidebar-icon' icon={faShoppingBag} />
              <span>Orders</span>
            </Link>
          </li>
          <li>
            <Link to="/Settings">
              <FontAwesomeIcon className='fa-sidebar-icon' icon={faGear} />
              <span>Settings</span>
            </Link>
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
