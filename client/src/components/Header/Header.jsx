import {
  faChevronUp,
  faChevronDown,
  faUser,
  faGear,
  faSignOutAlt,
} from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import React, { useState, useEffect, useRef, useContext } from "react";
import { AuthContext } from "../../contexts/auth.context";
const API_URL = import.meta.env.VITE_REACT_APP_API_URL;
import axios from "axios";
import { toast } from "react-hot-toast";
import ProfileContent from "./ProfileContent";
import SettingsContent from "./SettingsContent";
import HeaderModal from "./HeaderModal";

const Header = () => {
  const [showDropdown, setShowDropdown] = useState(false);
  const [loggedInUser, setLoggedInUser] = useState({ username: "" });
  const dropdownRef = useRef(null);
  const { setIsLoggedIn } = useContext(AuthContext);
  const [modalContent, setModalContent] = useState(null);
  const [showModal, setShowModal] = useState(false); 
  const closeModal = () => setShowModal(false);

  const openProfileModal = () => {
    setModalContent(<ProfileContent loggedInUser={loggedInUser} />);
    setShowModal(true);
  };

  const openSettingsModal = () => {
    setModalContent(<SettingsContent />);
    setShowModal(true);
  };

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
      const response = await axios.post(
        `${API_URL}/authentication/logout`,
        {},
        { withCredentials: true }
      );

      if (response.status === 200 || response.status === 202) {
        setIsLoggedIn(false);
        toast.success("Goodybye 👋");
      } else {
        toast.error("Failed to log out. Please try again.");
      }
    } catch (error) {
      toast.error(
        `An error occurred during logout. Please try again. ${error}`
      );
    }
  };

  return (
    <div className="flex justify-between items-center pt-4  ">
      <a
        href="/"
        className="text-5xl font-bold text-neutral-600 tracking-tighter hover:scale-105 transition-all ease-linear duration-300"
      >
        Orderly
      </a>
      <nav className="flex items-center gap-4 lg:gap-8">
        <span className="hidden sm:block text-xl font-semibold text-neutral-600">
          Hello, {loggedInUser?.username}
        </span>
        <div className="relative group inline-block" ref={dropdownRef}>
          <button
            onClick={() => setShowDropdown(!showDropdown)}
            className="bg-emerald-400 hover:bg-emerald-400/80 p-2 h-14 w-14 rounded-full focus:outline-none focus:bg-emerald-400"
          >
            <span className="text-3xl font-bold uppercase text-emerald-700">
              {loggedInUser?.username?.charAt(0)}
            </span>

            <FontAwesomeIcon
              icon={showDropdown ? faChevronUp : faChevronDown}
              className="ml-1 text-xs text-emerald-700"
            />
          </button>
          {showDropdown && (
            <div className="absolute right-0 mt-2 w-48 bg-zinc-50 text-zinc-800 rounded-lg drop-shadow-lg">
              <ul>
                <li className="px-4 py-2 hover:bg-zinc-200/80 hover:rounded-t-lg">
                  <button onClick={openProfileModal}>
                    <FontAwesomeIcon
                      icon={faUser}
                      className="mr-2 text-zinc-400"
                    />
                    Profile
                  </button>
                </li>
                <li className="px-4 py-2 hover:bg-zinc-200/80">
                  <button onClick={openSettingsModal}>
                    <FontAwesomeIcon
                      icon={faGear}
                      className="mr-2 text-zinc-400"
                    />
                    Settings
                  </button>
                </li>
                <li className="px-4 py-2 hover:bg-zinc-200/80 hover:rounded-b-lg">
                  <button onClick={handleLogoutUser}>
                    <FontAwesomeIcon
                      icon={faSignOutAlt}
                      className="mr-2 text-zinc-400"
                    />
                    Sign Out
                  </button>
                </li>
              </ul>
            </div>
          )}
        </div>
        <HeaderModal show={showModal} onClose={closeModal}>
          {modalContent}
        </HeaderModal>
      </nav>
    </div>
  );
};

export default Header;
