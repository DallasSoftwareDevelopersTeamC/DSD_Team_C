import React, { useEffect } from 'react';
import InventoryFilterRow from './InventoryFilSeaAdd';
import { useContext, useState } from 'react';
import { InventoryContext } from '../../contexts/inventory.context';
import { updateInventoryItem } from '../../services/inventoryAPIcalls'

import AddProductRow from './AddProductRow';
import SettingsPopup from './popups/Settings';
import OrderNowPopup from './popups/OrderNow';
import IncomingPopup from './popups/IncomingOrders';
import './inventory.css';
import './popups/popup.css';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faFile } from '@fortawesome/free-solid-svg-icons';

export default function Inventory() {
  const { inventory } = useContext(InventoryContext);
  const { reloadInventory } = useContext(InventoryContext);
  const [itemId, setItemId] = useState(0)

  useEffect( () => {
    console.log(inventory)
  }, [inventory])

  const handleReloadInventory = () => {
    reloadInventory()
  }
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

  // ---------------   display and hide rows    -----------

  const [rows, setRows] = useState([]);
  const [rowAdded, setRowAdded] = useState(false);

  // changing name from displayRow to handleDisplayRow
  const handleDisplayRow = () => {
    if (!rowAdded) setRows([...rows, {}]), setRowAdded(true)
  };

  // changed name from deleteRow to handleHideRow
  const handleHideRow = (index) => {
    rowAdded ? setRowAdded(false) : null;
  };

  // ---------------   column headings changer    -----------

  const defaultHeader = ["SKU", "Brand", "Name", <span className="heading-description">Description</span>, "In Stock", "Reorder At", "Order QTY", "Orders", "Order Now", "Settings",];
  const [tableHeader, setTableHeader] = useState(defaultHeader);
  const handleHeaderChange = (newHeader, reset = false) => {
    reset ? setTableHeader(defaultHeader) : setTableHeader(newHeader);
  };

  // --------------------- popups --------------------------

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
      <InventoryFilterRow
        // left side of equals is prop name, rigtht side is value (here, the value is a function "handleDisplayRow")
        // in the InventoryFilterRow component, this function is called via calling the prop name "displayRow"
        displayRow={handleDisplayRow}
        handleHeaderChange={handleHeaderChange}
      />

      <table>
        <thead>
          <tr className="tr-table-header">
            {tableHeader.map((header) => (
              <td key={header}>{header}</td>
            ))}
          </tr>
        </thead>
        <tbody className="inventory-items-container">

          <AddProductRow
            rowAdded={rowAdded}
            handleHideRow={handleHideRow}
            handleHeaderChange={handleHeaderChange}
            reloadInventory={handleReloadInventory}
          />

          {Array.isArray(inventory) && inventory.map((item) => (
            // use key here to get specific item to get (for popup) update or delete
            <tr key={item.id}>
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
              <td>
                {item.inStock}
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
            </tr>
          ))}
        </tbody>
      </table>


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
