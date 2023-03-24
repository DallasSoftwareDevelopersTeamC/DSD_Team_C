import React, { useEffect, useState, useContext } from 'react';
import { useDropdown } from '../../../hooks/useDropDown';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { InventoryContext } from '../../../contexts/inventory.context';
import {
  faSquarePlus,
  faCloudArrowUp,
} from '@fortawesome/free-solid-svg-icons';
import { sendCSVfile } from '../../../services/inventoryAPIcalls';
import AddProductPopup from './AddProductPopup.jsx';
import './AddProductButton.css';
import Swal from 'sweetalert2';

export default function DropDownIcon(props) {
  const { reloadInventory } = useContext(InventoryContext);
  console.log(document.getElementById('csv-file'));
  // -------------------------- CSV ----------------------------
  const openCSVPopup = async () => {
    await Swal.fire({
      icon: 'info',
      title: 'Success!',
      text: ` products have been added to inventory`,
      background: '#19191a',
      color: '#fff',
      confirmButtonColor: '#2952e3',
      customClass: { confirmButton: 'csv-upload-button' },
    }).then(async (result) => {
      if (result.isConfirmed) {
        csvButton = await document?.getElementById('csv-file').click();
      }
    });
  };

  const handleChange = async (e) => {
    console.log(e.target.files[0]);
    // e.preventDefault();
    // console.log(e.target);
    // await console.log(e.target.files[0]);
    sendCSVfile(e.target.files[0]);
  };
  // -------------------------- Popup ----------------------------
  const [isPopupOpen, setIsPopupOpen] = useState(false);

  const openPopup = () => {
    setIsPopupOpen(true);
    handleDropClose();
  };

  const closePopup = () => {
    setIsPopupOpen(false);
  };

  //   defines the custom hook from useDrownDown in hooks folder
  const {
    isDropOpen,
    setIsDropOpen,
    dropdownRef,
    toggleDropdown,
    handleDropClose,
  } = useDropdown();

  return (
    <div className="dropdown-icon">
      <button className="addprodicon">
        <FontAwesomeIcon icon={faSquarePlus} onClick={toggleDropdown} />
      </button>
      {isDropOpen && (
        <div ref={dropdownRef} className="dropdown-menu">
          <ul>
            <li>
              <a
                onClick={() => {
                  openPopup();
                  document
                    .getElementById('scrollForAddRow')
                    .scrollIntoView({ behavior: 'smooth' });
                }}
              >
                <FontAwesomeIcon icon={faSquarePlus} className="fa-dropdown" />
                Add Product
              </a>
            </li>
            <li>
              <a onClick={() => openCSVPopup()}>
                <label>
                  <FontAwesomeIcon
                    icon={faCloudArrowUp}
                    className="fa-dropdown"
                  />
                  From file
                </label>
              </a>
            </li>
          </ul>
        </div>
      )}
      {isPopupOpen && <AddProductPopup onClose={closePopup} />}
      <input
        type="file"
        accept=".csv"
        onChange={(e) => handleChange(e)}
        style={{ display: 'none' }}
        // hidden
        id="csv-file"
      />
    </div>
  );
}
