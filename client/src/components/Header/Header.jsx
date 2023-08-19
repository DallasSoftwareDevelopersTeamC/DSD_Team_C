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
import { API_URL } from "../../services/config";
import axios from "axios";

const Header = () => {
  const [showDropdown, setShowDropdown] = useState(false);
  const [loggedInUser, setLoggedInUser] = useState({ username: "" });
  const dropdownRef = useRef(null);
  const { toggleLogin } = useContext(AuthContext);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchUser = async () => {
      try {
        const response = await axios.get(`${API_URL}/user/me`, {
          headers: {
            Authorization: `Bearer ${localStorage.getItem("token")}`,
          },
          withCredentials: true,
        });
        setLoggedInUser(response.data);
      } catch (error) {
        console.error("Error fetching user:", error);
      }
    };

    fetchUser();

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
      await logoutUser();
      toggleLogin();
      navigate("/login");
    } catch (error) {
      console.error("Failed to log out the user:", error);
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
            <span className="text-2xl font-bold uppercase text-emerald-800">
              {loggedInUser?.username?.charAt(0)}
            </span>

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
                      className="mr-2 text-zinc-400"
                    />{" "}
                    Profile
                  </a>
                </li>
                <li className="px-4 py-2 hover:bg-gray-200">
                  <a href="#link2">
                    <FontAwesomeIcon
                      icon={faGear}
                      className="mr-2 text-zinc-400"
                    />{" "}
                    Settings
                  </a>
                </li>
                <li className="px-4 py-2 hover:bg-gray-200 hover:rounded-b-lg">
                  <button onClick={handleLogoutUser}>
                    <FontAwesomeIcon
                      icon={faSignOutAlt}
                      className="mr-2 text-zinc-400"
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
