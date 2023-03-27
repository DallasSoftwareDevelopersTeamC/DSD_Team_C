import React, { useEffect, useContext, useState, useRef } from 'react';
import { InventoryContext } from '../../contexts/inventory.context';
import { updateInventoryItem } from '../../services/inventoryAPIcalls';
import { OrdersContext } from '../../contexts/orders.context';
import { createOrderItem } from '../../services/ordersAPIcalls';
import calculateTotal from '../../utils/calcShippingAndTotal';
import { DragDropContext, Droppable, Draggable } from 'react-beautiful-dnd';
import { useNavigate } from 'react-router-dom';
import { useDropdown } from '../../hooks/useDropDown';

// import AddProductRow from './popups/AddProductRow';
import SelectedCheckboxOptionsPopup from './popups/CheckboxOptions';
import OrderNowPopup from './popups/OrderNow';
import './inventory.css';
import './popups/popup.css';
import {
  CustomCheckbox,
  CustomCheckboxPopupButton,
  renderHeaderContent,
} from './CustomCheckbox';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { library } from '@fortawesome/fontawesome-svg-core';
import { faCheck } from '@fortawesome/free-solid-svg-icons';
import { faShoppingBag } from '@fortawesome/free-solid-svg-icons';
library.add(faShoppingBag);
import { sendCSVfile } from '../../services/inventoryAPIcalls';
import { Checkbox } from '@mui/material';
import { authenticateUser } from '../../services/authenticationAPIcalls';
import { useQuery } from 'react-query';
import AddProductButton from './popups/AddProductButton.jsx';
import ScaleLoader from 'react-spinners/ScaleLoader';
import toast, { Toaster } from 'react-hot-toast';
import { truncateString } from '../../utils/truncateString';
import FilterBy from '../Sidebar/FilterBy';
import Swal from 'sweetalert2';

export default function Inventory() {
  const {
    inventory,
    reloadInventory,
    isUsingStock,
    tempInStock,
    setTempInStock,
    selectedItems,
    toggleSelectedItem,
    isLoading,
  } = useContext(InventoryContext);
  const { reloadOrders } = useContext(OrdersContext);
  const navigate = useNavigate();
  const { data, isError } = useQuery('authenticateUser', authenticateUser, {
    onSuccess: (data) => {
      if (data === 'JsonWebTokenError' || data === 'TokenExpiredError') {
        navigate('/login');
      }
    },
  });
  useEffect(() => {
    if (isError) {
      return Swal.fire({
        icon: 'error',
        title: 'Oops...',
        text: `Unable to communicate with the server. Please refresh the webpage.`,
        background: '#333',
        color: '#fff',
        confirmButtonColor: '#3b9893',
      });
    } else {
      if (data?.username) {
        toast.success(`Welcome back ${data?.username}`, {
          style: {
            background: '#333',
            color: '#fff',
          },
        });
      }
    }
  }, [data]);

  // -------------------- Authenticate user credentials on mount -----------------------------
  useEffect(() => {
    document.addEventListener('click', handleClickOutside, true);
    return () => {
      document.removeEventListener('click', handleClickOutside, true);
    };
  }, []);

  // -------------------- Trigger orders at reorder at points ------------------------------

  const handleCalculateTotals = (orderQty, unitPrice) => {
    const qty = parseFloat(orderQty);
    const price = parseFloat(unitPrice);

    if (isNaN(qty) || isNaN(price)) {
      return 0;
    } else {
      const { total } = calculateTotal(qty, price);
      return total;
    }
  };

  useEffect(() => {
    // Check inventory for items that need to be re-ordered
    inventory.forEach((item) => {
      const totalCost = handleCalculateTotals(item.orderQty, item.unitPrice);
      // console.log(tempInStock[item.id], item.reorderAt);

      if (
        tempInStock[item.id] === item.reorderAt &&
        isUsingStock &&
        item.reorderAt != 0
      ) {
        // Create order item
        const orderInfo = {
          sku: item.sku,
          orderQty: item.orderQty,
          totalCost: totalCost,
        };

        // Make API call to create order item
        createOrderItem(orderInfo)
          .then(() => {
            reloadOrders();
            // reloading inventory here will cause tempStock values to be lost unless we send update req first
          })
          .catch((error) => {
            console.error('Error creating order item:', error);
          });
      }
    });
  }, [tempInStock, isUsingStock]);

  // -------------------- load and reload inventory ------------------------------

  useEffect(() => {
    // console.log(inventory);

    const storedOrder = JSON.parse(localStorage.getItem('inventoryOrder'));
    if (storedOrder) {
      const orderedInventory = storedOrder
        .map((id) => inventory.find((item) => item.id === id))
        .filter((item) => item !== undefined);

      // Only update the state if the order has changed
      if (
        JSON.stringify(orderedInventory.map((item) => item.id)) !==
        JSON.stringify(inventory.map((item) => item.id))
      ) {
        reloadInventory(orderedInventory);
      }
    }
    setFilteredInventory(inventory);
  }, [inventory, reloadInventory]);

  const handleReloadInventory = () => {
    reloadInventory();
  };

  // ------------- update items' input values when user changes them ---------------

  const handleKeyDown = async (event, id, field, value) => {
    if (event.keyCode === 13) {
      const updatedItem = { [field]: Number(value) };
      await updateInventoryItem(id, updatedItem);
      reloadInventory();
    }
  };

  // --------------------- all popups --------------------------
  // this is the whole product object to be passed down into popup
  const [productForPopup, setProductForPopup] = useState('');

  const [popup, setPopup] = useState(null);
  const handleOpenPopup = (product = null, event) => {
    if (event && event.target) {
      if (event.target.classList.contains('custom-checkbox')) {
        setPopup('selectedCheckboxOptions');
      } else {
        const targetId = event.target.id;
        setPopup(targetId);
        setProductForPopup(product);
      }
    }
  };

  // close dropdown if user clicks outside of the menu
  const { dropdownRef } = useDropdown();
  const handleClickOutside = (event) => {
    if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
      setIsDropOpen(false);
    }
  };
  const handleClosePopup = () => {
    setPopup(null);
    setProductForPopup(null);
  };

  // -------------------------- drag and drop --------------------

  const saveNewOrderToLocalStorage = (newInventory) => {
    localStorage.setItem(
      'inventoryOrder',
      JSON.stringify(newInventory.map((item) => item.id))
    );
  };

  const handleDragEnd = (result) => {
    if (!result.destination) {
      return;
    }

    const newInventory = Array.from(inventory);
    const [reorderedItem] = newInventory.splice(result.source.index, 1);
    newInventory.splice(result.destination.index, 0, reorderedItem);

    console.log('New inventory:', newInventory);

    saveNewOrderToLocalStorage(newInventory);

    reloadInventory(Array.from(newInventory));
  };

  // -----------filter by
  const [filteredInventory, setFilteredInventory] = useState([]);

  const handleFilterChange = (filter) => {
    let updatedInventory = [...inventory];

    switch (filter) {
      case 'brand_asc':
        filteredInventory.sort((a, b) => a.brand.localeCompare(b.brand));
        break;
      case 'brand_desc':
        filteredInventory.sort((a, b) => b.brand.localeCompare(a.brand));
        break;
      case 'stock_asc':
        filteredInventory.sort((a, b) => a.inStock - b.inStock);
        break;
      case 'stock_desc':
        filteredInventory.sort((a, b) => b.inStock - a.inStock);
        break;
      default:
        break;
    }

    setFilteredInventory(updatedInventory);
  };

  // ----------------------------------------------------------
  return (
    <>
      <Toaster
        position="top-center"
        reverseOrder={false}
        toastOptions={{
          success: {
            iconTheme: {
              primary: '#3b9893',
              secondary: 'white',
            },
          },
        }}
      />
      {isLoading && (
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
      )}

      <table id="inventory">
        <thead>
          <tr className="tr-inventory-title">
            <td>
              <h1>Inventory</h1>
            </td>
            {/* <td>
              <FilterBy onFilterChange={handleFilterChange} />
              </td> */}
            <td id="add-prod-td">
              <AddProductButton data={data} />
            </td>
          </tr>
          <tr className="tr-header">
            <td className="header-tds heading-select" onClick={handleOpenPopup}>
              {renderHeaderContent('Checkbox', handleOpenPopup)}
            </td>
            <td className="header-tds heading-sku">SKU</td>
            <td className="header-tds">Brand</td>
            <td className="header-tds heading-name">Name</td>
            <td className="header-tds heading-description">Description</td>
            <td className="header-tds heading-in-stock">Stock</td>
            <td className="header-tds">Target</td>
            <td className="header-tds">Ord. Qty</td>
            <td className="header-tds">Order</td>
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
                          <td className="item-select">
                            <CustomCheckbox
                              itemId={item.id}
                              onChange={toggleSelectedItem}
                              selectedItems={selectedItems}
                            />
                          </td>
                          <td id="scrollForAddRow" className="item-sku">
                            {/* this id catches the scrollintoview when clicking add product */}
                            {item.sku}
                          </td>
                          <td>{item.brand}</td>
                          <td className="item-name">{item.productName}</td>
                          <td className="item-description">
                            <div className="desc-text">
                              {truncateString(item.description, 30)}
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
                          {/* <td>
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
                              </td> */}
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
                          {/* <td>
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
                              </td> */}
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
      {popup == 'selectedCheckboxOptions' && (
        <SelectedCheckboxOptionsPopup
          handleClosePopup={handleClosePopup}
          popup={popup}
          reloadInventory={handleReloadInventory}
        />
      )}
    </>
  );
}
