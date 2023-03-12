import React, { useEffect, useContext, useState, useRef } from 'react';
import { InventoryContext } from '../../contexts/inventory.context';
import { updateInventoryItem } from '../../services/inventoryAPIcalls'

import AddProductRow from './AddProductRow';
import SettingsPopup from './popups/Settings';
import OrderNowPopup from './popups/OrderNow';
import IncomingPopup from './popups/IncomingOrders';
import './inventory.css';
import './popups/popup.css';
import './dropdown.css';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faFile, faSquarePlus, faCloudArrowUp } from '@fortawesome/free-solid-svg-icons';
import { sendCSVfile } from '../../services/inventoryAPIcalls';

export default function Inventory() {
  const { inventory, reloadInventory, isUsingStock } = useContext(InventoryContext);
  const [itemId, setItemId] = useState(0)
  const [isDropOpen, setIsDropOpen] = useState(false);
  const dropdownRef = useRef(null);


  //-------------- Icon Drop down for add product -----------------
  const toggleDropdown = () => {
    setIsDropOpen(!isDropOpen);
  };

  // closes drop down after user selects an item from the menu
  const handleDropClose = () => {
    setIsDropOpen(false);
  };

  // close dropdown if user clicks outside of the menu

  const handleClickOutside = (event) => {
    if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
      setIsDropOpen(false);
    }
  };

  useEffect(() => {
    document.addEventListener("click", handleClickOutside, true);
    return () => {
      document.removeEventListener("click", handleClickOutside, true);
    };
  }, []);

  // -------------------- end drop down menu ------------------------------


  useEffect(() => {
    console.log(inventory)
  }, [inventory])

  const handleReloadInventory = () => {
    reloadInventory()
  }

  // -------------- store temp inStock values and refresh page every second -------------

  const [tempInStock, setTempInStock] = useState({});
  useEffect(() => {
    const inStockData = {};
    inventory.forEach(item => {
      inStockData[item.id] = item.inStock;
    });
    setTempInStock(inStockData);
  }, [inventory]);

  // Update tempInStock every second based on its previous value
  useEffect(() => {
    let intervalId = null;
    if (isUsingStock === true) {
      intervalId = setInterval(() => {
        setTempInStock(prevInStock => {
          const updatedInStock = {};
          inventory.forEach(item => {
            updatedInStock[item.id] = prevInStock[item.id] > 0 ? prevInStock[item.id] - 1 : 0;
          });
          return updatedInStock;
        });
      }, 1000);
    }
    return () => clearInterval(intervalId);
  }, [inventory, isUsingStock]);



  // ------------- update items' input values when user changes them ---------------

  // ------------- CSV ------------------
  // -------------------------- CSV ----------------------------
  const handleChange = (e) => {
    sendCSVfile(e.target.files[0]);
  };

  // ------------- update items' input values  ---------------

  const handleKeyDown = async (event, id, field, value) => {
    if (event.keyCode === 13) {
      const updatedItem = { [field]: Number(value) };
      await updateInventoryItem(id, updatedItem);
      reloadInventory();
    }
  };
  /*   useEffect(() => {
      console.log(item);
  }, [item]); */

  // ---------------   display and hide rows with "+ button" or "cancel"   -----------

  const [rows, setRows] = useState([]);
  const [rowAdded, setRowAdded] = useState(false);

  const handleDisplayRow = () => {
    if (!rowAdded) setRows([...rows, {}]), setRowAdded(true)
    handleHeaderChange([
      "SKU",
      "Brand",
      "Name",
      "Description",
      "In Stock",
      "Reorder At",
      "Order QTY",
      "Unit Price",
      "Order",
      "Cancel"
    ]);
  };
  const handleHideRow = (index) => {
    rowAdded ? setRowAdded(false) : null;
  };

  // ---------------   column headings changer ----- header changes when adding a product   -----------

  const defaultHeader = ["SKU", "Brand", "Name", <span className="heading-description">Description</span>, "In Stock", "Reorder At", "Order QTY", "Orders", "Order Now", "Settings",];
  const [tableHeader, setTableHeader] = useState(defaultHeader);
  const handleHeaderChange = (newHeader, reset = false) => {
    reset ? setTableHeader(defaultHeader) : setTableHeader(newHeader);
  };


  // --------------------- all popups --------------------------

  const [popup, setPopup] = useState(null);
  const handleOpenPopup = (itemId, event) => {
    if (event && event.target) {
      setPopup(event.target.id);
      console.log(itemId)
      setItemId(itemId)
    }
  };
  const handleClosePopup = (event) => {
    setPopup(event.target.id);
  }
  // ----------------------------------------------------------
  return (
    <div className="headings-and-table-container">
      <table>
        <thead>
          <tr>
            {tableHeader.map((header) => (
              <td key={header}>{header}</td>
            ))}
            <td id='add-prod-td'>
              <div className="dropdown-icon">
                <button className='addprodicon'>
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
                            handleDisplayRow();
                            handleDropClose();
                          }}
                        >
                          <FontAwesomeIcon
                            icon={faSquarePlus}
                          />
                          Add Product
                        </a>
                      </li>
                      <li>
                        <a>
                          <label>
                            <FontAwesomeIcon icon={faCloudArrowUp} />
                            From file
                            <input
                              type="file"
                              accept=".csv"
                              onChange={(e) => handleChange(e)}
                              onClick={handleDropClose}
                              style={{ display: 'none' }}
                            />
                          </label>
                        </a>
                      </li>
                    </ul>
                  </div>
                )}
              </div>
            </td>
          </tr>
        </thead>
        <tbody className="inventory-items-container">

          <AddProductRow
            rowAdded={rowAdded}
            handleHideRow={handleHideRow}
            handleHeaderChange={handleHeaderChange}
            reloadInventory={handleReloadInventory}
          />
          {/* this is what creates each list item by mapping over inventory (which is pulled in from context) */}
          {Array.isArray(inventory) && inventory.map((item) => (
            // use key here to get specific item to get (for popup) update or delete. 
            // item.sku value - this will scroll to selected value from searchInput.jsx
            <tr key={item.id} id={item.sku}>
              <td>
                {item.sku}
              </td>
              <td>
                {item.brand}
              </td>
              <td
                className="item-name">
                {item.productName}
              </td>
              <td
                className="item-description">
                <div className='desc-text'>
                  {item.description}
                </div>
              </td>
              <td
                className="item-in-stock"
              >
                {/* {item.inStock} */}
                {tempInStock[item.id] || item.inStock}
              </td>
              <td>
                <input
                  className="dynamic-inputs"
                  id="reorderAt"
                  type="text"
                  defaultValue={item.reorderAt}
                  onKeyDown={(event) => handleKeyDown(event, item.id, 'reorderAt', event.target.value)}
                />
              </td>
              <td>
                <input
                  className="dynamic-inputs"
                  id="orderQty"
                  type="text"
                  defaultValue={item.orderQty}
                  onKeyDown={(event) => handleKeyDown(event, item.id, 'orderQty', event.target.value)}
                />
              </td>
              <td>
                <button id="incoming" onClick={(event) => handleOpenPopup(item.id, event)}>
                  <FontAwesomeIcon
                    icon={faFile}
                    className="fa-icon fa-regular"
                    style={{ pointerEvents: 'none' }}
                  />
                </button>
              </td>
              <td>
                <button id="order" onClick={(event) => { handleOpenPopup(item.id, event); }}>
                  <FontAwesomeIcon
                    icon="fa-bag-shopping"
                    className="fa-icon"
                    style={{ pointerEvents: 'none' }}
                  />
                </button>
              </td>
              <td>
                <button id="settings" onClick={(event) => handleOpenPopup(item.id, event)}
                >
                  <FontAwesomeIcon
                    icon="fa-gear"
                    className="fa-icon"
                    style={{ pointerEvents: 'none' }}
                  />
                </button>
              </td>
              <td id='add-prod-td'> </td>
            </tr>
          ))}
        </tbody>
      </table >


      {
        popup == 'incoming' && (
          <IncomingPopup handleClosePopup={handleClosePopup} popup={popup} itemId={itemId} reloadInventory={handleReloadInventory} />
        )
      }
      {
        popup == 'order' && (
          <OrderNowPopup handleClosePopup={handleClosePopup} popup={popup} itemId={itemId} reloadInventory={handleReloadInventory} />
        )
      }
      {
        popup == 'settings' && (
          <SettingsPopup handleClosePopup={handleClosePopup} popup={popup} itemId={itemId} reloadInventory={handleReloadInventory} />
        )
      }
    </div >
  );
}
