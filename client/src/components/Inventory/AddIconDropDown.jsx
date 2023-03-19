import { useDropdown } from "../../hooks/useDropDown";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faSquarePlus, faCloudArrowUp, } from '@fortawesome/free-solid-svg-icons';
import { sendCSVfile } from '../../services/inventoryAPIcalls';
import './AddIconDropDown.css';

export default function DropDownIcon(props) {

// -------------------------- CSV ----------------------------
  const handleChange = async (e) => {
    console.log(e.target.files[0]);
    await sendCSVfile(e.target.files[0]);
    handleDropClose();
    reloadInventory(); // not working yet
  };

//   defines the custom hook from useDrownDown in hooks folder
  const { isDropOpen, setIsDropOpen, dropdownRef, toggleDropdown, handleDropClose } = useDropdown();

  return (
    <div className="dropdown-icon">
      <button className="addprodicon">
        <FontAwesomeIcon
          icon={faSquarePlus}
          onClick={toggleDropdown}
        />
      </button>
      {isDropOpen && (
        <div ref={dropdownRef} className="dropdown-menu">
          <ul>
            <li>
              <a
                onClick={() => {
                  props.handleDisplayRow();
                  handleDropClose();
                  document
                    .getElementById('scrollForAddRow')
                    .scrollIntoView({ behavior: 'smooth' });
                }}
              >
                <FontAwesomeIcon
                  icon={faSquarePlus}
                  className="fa-dropdown"
                />
                Add Product
              </a>
            </li>
            <li>
              <a>
                <label>
                  <FontAwesomeIcon
                    icon={faCloudArrowUp}
                    className="fa-dropdown"
                  />
                  From file
                  <input
                    type="file"
                    accept=".csv"
                    onChange={(e) => handleChange(e)}
                    // onClick={handleDropClose}
                    style={{ display: 'none' }}
                  />
                </label>
              </a>
            </li>
          </ul>
        </div>
      )}
    </div>
  );
}
