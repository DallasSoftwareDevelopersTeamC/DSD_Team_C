import React from 'react';
import { Link } from 'react-router-dom';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import {
  faBars,
  faFile,
  faFilter,
  faGear,
  faSearch,
  faShoppingBag,
  faRightFromBracket,
} from '@fortawesome/free-solid-svg-icons';
import './sidebar.css';
import './SearchInput.css';
import SearchInput from './SearchInput';
import FilterBy from './FilterBy';
import { logoutUser } from '../../services/userAPIcalls';
import { useNavigate } from 'react-router-dom';

const SidebarContent = ({ onToggle, collapsed }) => {
  const navigate = useNavigate();
  const handleLogoutUser = async () => {
    await logoutUser();
    navigate('/login');
  };
  return (
    <div className="sidebar">
      <div className="sidebar-btn-container">
        <button className="sidebarToggleIcon" onClick={onToggle}>
          <FontAwesomeIcon icon={faBars} />
        </button>
        <h2>
          <a href="/">Orderly</a>
        </h2>
      </div>
      <ul className="nav-links">
        <li>
          <Link to="/">
            <FontAwesomeIcon className="fa-sidebar-icon" icon={faFile} />
            {!collapsed && <span>Inventory</span>}
          </Link>
        </li>
        <li>
          <Link to="/Orders">
            <FontAwesomeIcon className="fa-sidebar-icon" icon={faShoppingBag} />
            {!collapsed && <span>Orders</span>}
          </Link>
        </li>
        <li>
          <Link to="/Settings">
            <FontAwesomeIcon className="fa-sidebar-icon" icon={faGear} />
            {!collapsed && <span>Settings</span>}
          </Link>
        </li>
        <li onClick={() => handleLogoutUser()}>
          <FontAwesomeIcon
            className="fa-sidebar-icon"
            icon={faRightFromBracket}
          />
          {!collapsed && <span>Log out</span>}
        </li>
      </ul>
      <ul className="filter-search-container">
        <li>
          <FontAwesomeIcon className="fa-sidebar-icon-fs" icon={faSearch} />
          {!collapsed && <span>
            <SearchInput />
          </span>}
        </li>
        <li>
          <FontAwesomeIcon className="fa-sidebar-icon-fs" icon={faFilter} />
          {!collapsed && <span>
            <FilterBy />
          </span>}
        </li>
      </ul>
      <div className='footer-side'>
      {!collapsed && <span className='footer-span'>&copy;Orderly 2023. All Rights Reserved.</span>}
      </div>
    </div>
  );
};

export default SidebarContent;
