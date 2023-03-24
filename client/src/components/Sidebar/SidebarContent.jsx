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
    <div className={`sidebar ${collapsed ? 'sidebar-collapsed' : ''}`}>
      {/* Your other sidebar content */}
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
            <span>Inventory</span>
          </li>
        </Link>
        <Link to="/Orders">
          <li>
            <FontAwesomeIcon className="fa-sidebar-icon" icon={faShoppingBag} />
            <span>Orders</span>
          </li>
        </Link>
        <Link to="/Settings">
          <li>
            <FontAwesomeIcon className="fa-sidebar-icon" icon={faGear} />
            <span>Settings</span>
          </li>
        </Link>
        <li onClick={() => handleLogoutUser()}>
          <FontAwesomeIcon
            className="fa-sidebar-icon"
            icon={faRightFromBracket}
          />
        </li>
      </ul>
      <ul className="filter-search-container">
        <li>
          <FontAwesomeIcon className="fa-sidebar-icon-fs" icon={faSearch} />
          <span>
            <SearchInput />
          </span>
        </li>
        <li>
          <FontAwesomeIcon className="fa-sidebar-icon-fs" icon={faFilter} />
          <span>
            <FilterBy />
          </span>
        </li>
      </ul>
    </div>
  );
};

export default SidebarContent;
