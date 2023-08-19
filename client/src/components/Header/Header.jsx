import {
  faChevronUp,
  faChevronDown,
  faUser,
  faGear,
  faSignOutAlt,
} from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import React, { useState, useEffect, useRef, useContext } from "react";
import { useNavigate } from "react-router-dom";
import { AuthContext } from "../../contexts/auth.context";
import { logoutUser } from "../../services/userAPIcalls";

const Header = () => {
  const [showDropdown, setShowDropdown] = useState(false);
  const dropdownRef = useRef(null);
    const { toggleLogin } = useContext(AuthContext);
      const navigate = useNavigate();

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
        setShowDropdown(false);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);

    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

const handleLogoutUser = async () => {
  try {
    await logoutUser(); // This function will now throw if something goes wrong.
    toggleLogin();
    navigate("/login");
  } catch (error) {
    // Here you might show some user-friendly error message or notification
    console.error('Failed to log out the user:', error);
  }
};



  return (
    <div className="flex justify-between items-center p-4 mb-1">
      <h1 className="text-6xl font-bold text-zinc-700 tracking-tighter">
        Orderly
      </h1>
      <nav className="flex items-center">
        <div className="relative group inline-block" ref={dropdownRef}>
          <button
            onClick={() => setShowDropdown(!showDropdown)}
            className="bg-emerald-400 hover:bg-emerald-500/80 px-4 py-1 rounded-full focus:outline-none focus:bg-emerald-400"
          >
            <span className="text-2xl font-bold text-emerald-800">J</span>
            <FontAwesomeIcon
              icon={showDropdown ? faChevronUp : faChevronDown}
              className="ml-2 text-sm text-emerald-800"
            />
          </button>
          {showDropdown && (
            <div className="absolute right-0 mt-2 w-48 bg-white text-zinc-800 rounded-lg drop-shadow-lg">
              <ul>
                <li className="px-4 py-2 hover:bg-gray-200 hover:rounded-t-lg">
                  <a href="#link1">
                    <FontAwesomeIcon
                      icon={faUser}
                      className="mr-2 text-emerald-500"
                    />{" "}
                    Profile
                  </a>
                </li>
                <li className="px-4 py-2 hover:bg-gray-200">
                  <a href="#link2">
                    <FontAwesomeIcon
                      icon={faGear}
                      className="mr-2 text-emerald-500"
                    />{" "}
                    Settings
                  </a>
                </li>
                <li className="px-4 py-2 hover:bg-gray-200 hover:rounded-b-lg">
                  <button onClick={handleLogoutUser}>
                    <FontAwesomeIcon
                      icon={faSignOutAlt}
                      className="mr-2 text-emerald-500"
                    />{" "}
                    Sign Out
                  </button>
                </li>
              </ul>
            </div>
          )}
        </div>
      </nav>
    </div>
  );
};

export default Header;
