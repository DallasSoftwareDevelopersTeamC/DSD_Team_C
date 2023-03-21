import React, { useEffect, useContext, useState, useRef } from 'react';
import { InventoryContext } from '../../contexts/inventory.context';
import { updateInventoryItem } from '../../services/inventoryAPIcalls';
import { DragDropContext, Droppable, Draggable } from 'react-beautiful-dnd';
import { useNavigate } from 'react-router-dom';
import { useDropdown } from "../../hooks/useDropDown";

import AddProductRow from './AddProductRow';
import SettingsPopup from './popups/Settings';
import OrderNowPopup from './popups/OrderNow';
import IncomingPopup from './popups/IncomingOrders';
import './inventory.css';
import './popups/popup.css';
import './AddIconDropDown.css';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faFile } from '@fortawesome/free-solid-svg-icons';
import { sendCSVfile } from '../../services/inventoryAPIcalls';
import { authenticateUser } from '../../services/authenticationAPIcalls';
import { useQuery } from 'react-query';
import DropDownIcon from './AddIconDropDown.jsx';
import ScaleLoader from 'react-spinners/ScaleLoader';

export default function Inventory({ tempInStock }) {
  const navigate = useNavigate();
  const { data, isLoading, isError } = useQuery(
    'authenticateUser',
    authenticateUser,
    {
      onSuccess: (data) => {
        if (data === 'JsonWebTokenError') {
          navigate('/login');
        }
      },
    }
  );
  if (isError) {
    alert(isError);
  }
  const { inventory, reloadInventory, isUsingStock } =
    useContext(InventoryContext);
  const [itemId, setItemId] = useState(0);
  // this is the whole product object to be passed down into popup
  const [productForPopup, setProductForPopup] = useState('');
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
  const { dropdownRef } = useDropdown();
  const handleClickOutside = (event) => {
    if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
      setIsDropOpen(false);
    }
  };

  // -------------------- Authenticate user credentials on mount -----------------------------
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

  // ------------- update items' input values when user changes them ---------------
  // ------------- update items' input values  ---------------

  const handleKeyDown = async (event, id, field, value) => {
    if (event.keyCode === 13) {
      const updatedItem = { [field]: Number(value) };
      await updateInventoryItem(id, updatedItem);
      reloadInventory();
    }
  };

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
    if (!result.destination) {
      return;
    }
  
    const newInventory = Array.from(inventory);
    const [reorderedItem] = newInventory.splice(result.source.index, 1);
    newInventory.splice(result.destination.index, 0, reorderedItem);
  
    console.log('New inventory:', newInventory);
  
    reloadInventory(Array.from(newInventory));   
  };

  // ----------------------------------------------------------
  return (
    <div className="headings-and-table-container" id="inventory">
      {isLoading ? (
        <div className="scale-loader-container">
          <ScaleLoader
            color={'#3b9893'}
            loading={isLoading}
            height={200}
            width={50}
            aria-label="Loading Spinner"
            data-testid="loader"
          />
        </div>
      ) : (
        <>
          <table>
            <thead>
              <tr className="tr-header">
                {tableHeader.map((header) => (
                  <td
                    className={`header-tds 
                ${header === 'SKU' ? 'heading-sku' : ''}
                ${header === 'Name' ? 'heading-name' : ''}
                ${header === 'Description' ? 'heading-description' : ''}
                ${header === 'In Stock' ? 'heading-in-stock' : ''}`}
                    key={header}
                  >
                    {header}
                  </td>
                ))}
                <td id="add-prod-td">
                  <DropDownIcon handleDisplayRow={handleDisplayRow} />
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
                              className={snapshot.isDragging ? 'dragging' : ''}
                            >
                              <td id="scrollForAddRow" className="item-sku">
                                {/* this id catches the scrollintoview when clicking add product */}
                                {item.sku}
                              </td>
                              <td>{item.brand}</td>
                              <td className="item-name">{item.productName}</td>
                              <td className="item-description">
                                <div className="desc-text">
                                  {item.description}
                                </div>
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
                      ))
                    ) : (
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
        </>
      )}
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
