import React, { useEffect, useState } from 'react';
import { NavLink } from 'react-router-dom';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { getCompany } from '../../services/companyAPIcalls';
import {
  faBars,
  faFile,
  faFilter,
  faGear,
  faSearch,
  faShoppingBag,
  faRightFromBracket,
  faUser,
  faTimes,
} from '@fortawesome/free-solid-svg-icons';
import './sidebar.css';
import './SearchInput.css';
import SearchInput from './SearchInput';
import FilterBy from './FilterBy';
import { logoutUser } from '../../services/userAPIcalls';
import { useNavigate } from 'react-router-dom';
import { authenticateUser } from '../../services/authenticationAPIcalls';
import { useQuery } from 'react-query';
import Swal from 'sweetalert2';

const SidebarContent = ({ onToggle, collapsed }) => {
  const [companyName, setCompanyName] = useState(null);
  const [username, setUsername] = useState(null);
  const navigate = useNavigate();
  const [userIsLoggedIn, setUserIsLoggedIn] = useState(true);
  const { data, isError } = useQuery('authenticateUser', authenticateUser, {
    onSuccess: async (data) => {
      if (data !== 'JsonWebTokenError' && data !== 'TokenExpiredError') {
        setUsername(data.username);
        setCompanyName(await getCompany(data.companyID));
        if (!data.id) {
          setUserIsLoggedIn(false);
        }
      }
    },
  });
  const userDataBlock =
    '<div class="userInfo-container">' +
    `<p>Username: ${data?.username}</p>` +
    `<p>Company ID: ${data?.companyID}</p>` +
    '</div>';

  const userSettingsBlock =
    '<div class="userInfo-container">' +
    `<p>Filter By: ${data?.settings.filterBy}</p>` +
    `<p>Sort Order: ${data?.settings.sortOrder}</p>` +
    '</div>';

  useEffect(() => {
    authenticateUser();
  }, []);
  const handleLogoutUser = async () => {
    await logoutUser();
    navigate(0);
  };
  const handleProfilePopup = () => {
    if (data.id) {
      console.log(data);
      return Swal.fire({
        icon: 'info',
        title: 'User Information',
        html: userDataBlock,
        background: '#19191a',
        color: '#fff',
        confirmButtonColor: '#2952e3',
        showCancelButton: true,
        customClass: {
          confirmButton: 'csv-upload-button',
          popup: 'csv-instructions',
        },
      });
    }
  };

  const handleSettingsPopup = () => {
    if (data.id) {
      console.log(data);
      return Swal.fire({
        icon: 'info',
        title: 'Settings',
        html: userSettingsBlock,
        background: '#19191a',
        color: '#fff',
        confirmButtonColor: '#2952e3',
        showCancelButton: true,
        customClass: {
          confirmButton: 'csv-upload-button',
          popup: 'csv-instructions',
        },
      });
    }
  };

  return (
    <div className="sidebar">
      <div className="sidebar-btn-container">
        {!collapsed && (
          <h2>
            <a href="/">Orderly</a>
          </h2>
        )}
        <button className="sidebarToggleIcon" onClick={onToggle}>
          <FontAwesomeIcon
            icon={collapsed ? faBars : faTimes}
            className={`sidebarToggleIcon ${collapsed ? '' : 'expand'}`}
          />
        </button>
      </div>
      <ul className="nav-links">
        <NavLink to="/" activeclassname="active">
          <li>
            <FontAwesomeIcon className="fa-sidebar-icon" icon={faFile} />
            {!collapsed && <span>Inventory</span>}
          </li>
        </NavLink>
        <NavLink to="/Orders" activeclassname="active">
          <li>
            <FontAwesomeIcon className="fa-sidebar-icon" icon={faShoppingBag} />
            {!collapsed && <span>Orders</span>}
          </li>
        </NavLink>
        <li onClick={() => handleSettingsPopup()}>
          <FontAwesomeIcon className="fa-sidebar-icon" icon={faGear} />
          {!collapsed && <span>Settings</span>}
        </li>
        <li onClick={() => handleProfilePopup()}>
          <FontAwesomeIcon className="fa-sidebar-icon" icon={faUser} />
          {!collapsed && <span>Profile</span>}
        </li>
        {userIsLoggedIn && (
          <li onClick={() => handleLogoutUser()}>
            <FontAwesomeIcon
              className="fa-sidebar-icon"
              icon={faRightFromBracket}
            />
            {!collapsed && <span>Log out</span>}
          </li>
        )}
      </ul>
      <ul className="filter-search-container">
        <li>
          <FontAwesomeIcon
            className="fa-sidebar-icon-fs"
            icon={faSearch}
            onClick={onToggle}
          />
          {!collapsed && (
            <span>
              <SearchInput />
            </span>
          )}
        </li>
        {/* <li>
          <FontAwesomeIcon className="fa-sidebar-icon-fs" icon={faFilter} onClick={onToggle}/>
          {!collapsed && (
            <span>
              <FilterBy />
            </span>
          )}
        </li> */}
      </ul>
      {!collapsed && (
        <div className="footer-side">
          <ul className="user-info">
            <li>Username: {username}</li>
            <li>Company: {companyName?.companyName}</li>
          </ul>
          <span className="footer-span">
            &copy;Orderly 2023. All Rights Reserved.
          </span>
        </div>
      )}
    </div>
  );
};

export default SidebarContent;
