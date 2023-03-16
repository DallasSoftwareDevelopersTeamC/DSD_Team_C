import React, { useEffect, useContext, useState, useRef } from 'react';
import { InventoryContext } from '../../contexts/inventory.context';
import { updateInventoryItem } from '../../services/inventoryAPIcalls';
import { DragDropContext, Droppable, Draggable } from 'react-beautiful-dnd';

import AddProductRow from './AddProductRow';
import SettingsPopup from './popups/Settings';
import OrderNowPopup from './popups/OrderNow';
import IncomingPopup from './popups/IncomingOrders';
import './inventory.css';
import './popups/popup.css';
import './dropdown.css';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faFile, faSquarePlus, faCloudArrowUp, } from '@fortawesome/free-solid-svg-icons';
import { sendCSVfile } from '../../services/inventoryAPIcalls';

export default function Inventory() {
  const { inventory, reloadInventory, isUsingStock } =
    useContext(InventoryContext);
  const [itemId, setItemId] = useState(0);
  // this is the whole product object to be passed down into popup
  const [productForPopup, setProductForPopup] = useState('')
  const [isDropOpen, setIsDropOpen] = useState(false);
  const dropdownRef = useRef(null);
  const [dragInventory, setDragInventory] = useState([]);

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
    document.addEventListener('click', handleClickOutside, true);
    return () => {
      document.removeEventListener('click', handleClickOutside, true);
    };
  }, []);

  // -------------------- load and reload inventory ------------------------------

  useEffect(() => {
    console.log(inventory);
  }, [inventory]);

  const handleReloadInventory = () => {
    reloadInventory();
  };

  // -------------- store temp inStock values and refresh page every second -------------

  const [tempInStock, setTempInStock] = useState({});
  useEffect(() => {
    const inStockData = {};
    inventory.forEach((item) => {
      inStockData[item.id] = item.inStock;
    });
    setTempInStock(inStockData);
  }, [inventory]);

  // ----------- Update tempInStock every second based on its previous value ---------
  useEffect(() => {
    let intervalId = null;
    if (isUsingStock === true) {
      intervalId = setInterval(() => {
        setTempInStock((prevInStock) => {
          const updatedInStock = {};
          inventory.forEach((item) => {
            updatedInStock[item.id] =
              prevInStock[item.id] > 0 ? prevInStock[item.id] - 1 : 0;
          });
          return updatedInStock;
        });
      }, 1000);
    }
    return () => clearInterval(intervalId);
  }, [inventory, isUsingStock]);

  // ------------- update items' input values when user changes them ---------------

  // -------------------------- CSV ----------------------------
  const handleChange = async (e) => {
    console.log(e.target.files[0]);
    await sendCSVfile(e.target.files[0]);
    handleDropClose();
    reloadInventory(); // not working yet
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
    if (!rowAdded) setRows([...rows, {}]), setRowAdded(true);
    handleHeaderChange([
      'SKU',
      'Brand',
      'Name',
      'Description',
      'In Stock',
      'Reorder At',
      'Order QTY',
      'Unit Price',
      'Order',
      'Cancel',
    ]);
  };
  const handleHideRow = (index) => {
    rowAdded ? setRowAdded(false) : null;
  };

  // ---------------   column headings changer ----- header changes when adding a product   -----------

  const defaultHeader = [
    'SKU',
    'Brand',
    'Name',
    'Description',
    'In Stock',
    'Reorder At',
    'Order QTY',
    'Orders',
    'Order Now',
    'Settings',
  ];
  const [tableHeader, setTableHeader] = useState(defaultHeader);
  const handleHeaderChange = (newHeader, reset = false) => {
    reset ? setTableHeader(defaultHeader) : setTableHeader(newHeader);
  };

  // --------------------- all popups --------------------------

  const [popup, setPopup] = useState(null);
  const handleOpenPopup = (product, event) => {
    if (event && event.target) {
      setPopup(event.target.id);
      setProductForPopup(product);
    }
  };

  const handleClosePopup = (event) => {
    setPopup(event.target.id);
  };
  // -------------------------- drag and drop --------------------
  const handleDragEnd = (result) => {
    return result.destination
      ? (() => {
        const startIndex = result.source.index;
        const endIndex = result.destination.index;

        const newInventory = Array.from(dragInventory);
        const [removed] = newInventory.splice(startIndex, 1);
        newInventory.splice(endIndex, 0, removed);

        setDragInventory(newInventory);
      })()
      : null;
  };

  // ----------------------------------------------------------
  return (
    <div className="headings-and-table-container" id="inventory">
      <table>
        <thead>
          <tr className="tr-header">
            {tableHeader.map((header) => (
              <td
                className={`header-tds 
                ${header === "SKU" ? "heading-sku" : ""}
                ${header === "Name" ? "heading-name" : ""}
                ${header === "Description" ? "heading-description" : ""}
                ${header === "In Stock" ? "heading-in-stock" : ""}`}
                key={header}>
                {header}
              </td>
            ))}
            <td id="add-prod-td">
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
                            handleDisplayRow();
                            handleDropClose();
                            document
                              .getElementById('scrollForAddRow')
                              .scrollIntoView({ behavior: 'smooth' });
                          }}
                        >
                          <FontAwesomeIcon icon={faSquarePlus} className='fa-dropdown' />
                          Add Product
                        </a>
                      </li>
                      <li>
                        <a>
                          <label>
                            <FontAwesomeIcon icon={faCloudArrowUp} className='fa-dropdown' />
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
            </td>
          </tr>
        </thead>
        <DragDropContext onDragEnd={handleDragEnd}>
          <Droppable droppableId="inventory">
            {(provided, snapshot) => (
              <tbody
                ref={provided.innerRef}
                {...provided.droppableProps}
                className="inventory-items-container"
              >
                <AddProductRow
                  rowAdded={rowAdded}
                  handleHideRow={handleHideRow}
                  handleHeaderChange={handleHeaderChange}
                  reloadInventory={handleReloadInventory}
                />
                {/* this is what creates each list item by mapping over inventory (which is pulled in from context) */}
                {inventory.length > 0 ? (
                  inventory.map((item, index) => (
                    // use key here to get specific item to get (for popup) update or delete.
                    // item.sku value - this will scroll to selected value from searchInput.jsx
                    <Draggable
                      key={item.id}
                      draggableId={String(item.id)}
                      index={index}
                    >
                      {(provided, snapshot) => (
                        <tr
                          id={item.sku}
                          ref={provided.innerRef}
                          {...provided.draggableProps}
                          {...provided.dragHandleProps}
                        >
                          <td id="scrollForAddRow"

                            className="item-sku"
                          >
                            {/* this id catches the scrollintoview when clicking add product */}
                            {item.sku}
                          </td>
                          <td>{item.brand}</td>
                          <td className="item-name">{item.productName}</td>
                          <td className="item-description">
                            <div className="desc-text">{item.description}</div>
                          </td>
                          <td className="item-in-stock">
                            {/* {item.inStock} */}
                            {tempInStock[item.id] || item.inStock}
                          </td>
                          <td>
                            <input
                              className="dynamic-inputs"
                              id="reorderAt"
                              type="text"
                              defaultValue={item.reorderAt}
                              onKeyDown={(event) =>
                                handleKeyDown(
                                  event,
                                  item.id,
                                  'reorderAt',
                                  event.target.value
                                )
                              }
                            />
                          </td>
                          <td>
                            <input
                              className="dynamic-inputs"
                              id="orderQty"
                              type="text"
                              defaultValue={item.orderQty}
                              onKeyDown={(event) =>
                                handleKeyDown(
                                  event,
                                  item.id,
                                  'orderQty',
                                  event.target.value
                                )
                              }
                            />
                          </td>
                          <td>
                            <button
                              id="incoming"
                              onClick={(event) =>
                                handleOpenPopup(item, event)
                              }
                            >
                              <FontAwesomeIcon
                                icon={faFile}
                                className="fa-icon fa-regular"
                                style={{ pointerEvents: 'none' }}
                              />
                            </button>
                          </td>
                          <td>
                            <button
                              id="order"
                              onClick={(event) => {
                                handleOpenPopup(item, event);
                              }}
                            >
                              <FontAwesomeIcon
                                icon="fa-bag-shopping"
                                className="fa-icon"
                                style={{ pointerEvents: 'none' }}
                              />
                            </button>
                          </td>
                          <td>
                            <button
                              id="settings"
                              onClick={(event) =>
                                handleOpenPopup(item, event)
                              }
                            >
                              <FontAwesomeIcon
                                icon="fa-gear"
                                className="fa-icon"
                                style={{ pointerEvents: 'none' }}
                              />
                            </button>
                          </td>
                          {/* <td id="add-prod-td"> </td> */}
                        </tr>
                      )}
                    </Draggable>
                  ))) : (
                  <tr>
                    <td colSpan={10}>No inventory data available.</td>
                  </tr>
                )}
                {provided.placeholder}
              </tbody>
            )}
          </Droppable>
        </DragDropContext>
      </table>

      {popup == 'incoming' && (
        <IncomingPopup
          handleClosePopup={handleClosePopup}
          popup={popup}
          item={productForPopup}
          reloadInventory={handleReloadInventory}
        />
      )}
      {popup == 'order' && (
        <OrderNowPopup
          handleClosePopup={handleClosePopup}
          popup={popup}
          item={productForPopup}
          reloadInventory={handleReloadInventory}
        />
      )}
      {popup == 'settings' && (
        <SettingsPopup
          handleClosePopup={handleClosePopup}
          popup={popup}
          item={productForPopup}
          reloadInventory={handleReloadInventory}
        />
      )}
    </div>
  );
}
