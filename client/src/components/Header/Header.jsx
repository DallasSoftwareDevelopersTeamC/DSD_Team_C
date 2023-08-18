import {
  faSignOut,
  faChevronUp,
  faChevronDown,
  faUser,
  faGear,
  faSignOutAlt,
} from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import React, { useState } from "react";

const Header = () => {
  const [showDropdown, setShowDropdown] = useState(false);

  return (
    <div className="flex justify-between items-center p-4 mb-1">
      <h1 className="text-5xl font-bold text-zinc-700 tracking-tighter">Orderly</h1>
      <nav className="flex items-center">
        <div className="relative group inline-block">
          <button
            onClick={() => setShowDropdown(!showDropdown)}
            className="bg-emerald-400 hover:bg-emerald-500/80 px-4 py-2 rounded-full focus:outline-none focus:bg-emerald-400"
          >
            <span className="text-xl font-bold">J</span>
            <FontAwesomeIcon
              icon={showDropdown ? faChevronUp : faChevronDown}
              className="ml-2"
            />
          </button>
          {showDropdown && (
            <div className="absolute right-0 mt-2 w-48 bg-white text-zinc-800 rounded-lg drop-shadow-lg">
              <ul>
                <li className="px-4 py-2 hover:bg-gray-200 hover:rounded-t-lg">
                  <a href="#link1"><FontAwesomeIcon icon={faUser} className="mr-2 text-emerald-500" /> Profile</a>
                </li>
                <li className="px-4 py-2 hover:bg-gray-200">
                  <a href="#link2"><FontAwesomeIcon icon={faGear} className="mr-2 text-emerald-500" /> Settings</a>
                </li>
                <li className="px-4 py-2 hover:bg-gray-200 hover:rounded-b-lg">
                  <a href="#link3"><FontAwesomeIcon icon={faSignOutAlt} className="mr-2 text-emerald-500" /> Sign Out</a>
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
