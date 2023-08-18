import {
  faSignOut,
  faChevronUp,
  faChevronDown,
} from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import React, { useState } from "react";

const Header = () => {
  const [showDropdown, setShowDropdown] = useState(false);

  return (
    <div className="flex justify-between items-center p-4 mb-4">
      <h1 className="text-4xl ">Orderly</h1>
      <nav className="flex items-center">
        <div className="relative group inline-block">
          <button
            onClick={() => setShowDropdown(!showDropdown)}
            className="bg-emerald-400 hover:bg-emerald-500/80 px-4 py-2 rounded-full focus:outline-none focus:bg-emerald-400"
          >
            Account
            <FontAwesomeIcon
              icon={showDropdown ? faChevronUp : faChevronDown}
              className="ml-2"
            />
          </button>
          {showDropdown && (
            <div className="absolute right-0 mt-2 w-48 bg-white text-zinc-800 rounded-lg shadow-md">
              <ul>
                <li className="px-4 py-2 hover:bg-gray-200">
                  <a href="#link1">Link 1</a>
                </li>
                <li className="px-4 py-2 hover:bg-gray-200">
                  <a href="#link2">Link 2</a>
                </li>
                <li className="px-4 py-2 hover:bg-gray-200">
                  <a href="#link3">Link 3</a>
                </li>
                <li className="px-4 py-2 hover:bg-gray-200">
                  <a href="#link4">Link 4</a>
                </li>
              </ul>
            </div>
          )}
        </div>
        <button
          onClick={() => console.log("Logout")}
          className="ml-4 bg-emerald-400 hover:bg-emerald-400 px-4 py-2 rounded-full focus:outline-none focus:bg-emerald-400"
        >
          Logout
          <FontAwesomeIcon icon={faSignOut} className="ml-2" />
        </button>
      </nav>
    </div>
  );
};

export default Header;
