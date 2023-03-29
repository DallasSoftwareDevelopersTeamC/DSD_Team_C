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
  faUser,
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
        <Link to="/">
          <li>
            <FontAwesomeIcon className="fa-sidebar-icon" icon={faFile} />
            {!collapsed && <span>Inventory</span>}
          </li>
        </Link>
        <Link to="/Orders">
          <li>
            <FontAwesomeIcon className="fa-sidebar-icon" icon={faShoppingBag} />
            {!collapsed && <span>Orders</span>}
          </li>
        </Link>
        <Link to="/Settings">
          <li>
            <FontAwesomeIcon className="fa-sidebar-icon" icon={faGear} />
            {!collapsed && <span>Settings</span>}
          </li>
        </Link>
        <li onClick={() => handleLogoutUser()}>
          <FontAwesomeIcon
            className="fa-sidebar-icon"
            icon={faRightFromBracket}
          />
          {!collapsed && <span>Log out</span>}
        </li>
        <Link to="/Profile">
          <li>
            <FontAwesomeIcon className="fa-sidebar-icon" icon={faUser} />
            {!collapsed && <span>Profile</span>}
          </li>
        </Link>
      </ul>
      <ul className="filter-search-container">
        <li>
          <FontAwesomeIcon className="fa-sidebar-icon-fs" icon={faSearch} />
          {!collapsed && (
            <span>
              <SearchInput />
            </span>
          )}
        </li>
        <li>
          <FontAwesomeIcon className="fa-sidebar-icon-fs" icon={faFilter} />
          {!collapsed && (
            <span>
              <FilterBy />
            </span>
          )}
        </li>
      </ul>
      <div className="footer-side">
        {!collapsed && (
          <span className="footer-span">
            &copy;Orderly 2023. All Rights Reserved.
          </span>
        )}
      </div>
    </div>
  );
};

export default SidebarContent;
