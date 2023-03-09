import React from 'react';
import InventoryFilterRow from './InventoryFilSeaAdd';
import { useContext, useState } from 'react';
import { InventoryContext } from '../../contexts/inventory.context';
import { getInventoryList } from '../../services/inventoryAPIcalls' // can be used instead of context

import AddProductRow from './AddProductRow';
import SettingsPopup from './popups/settingsPopup';
import OrderNowPopup from './popups/orderNowPopup';
import IncomingPopup from './popups/incomingPopup';
import './inventory.css';
import './popups/popup.css';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

export default function Inventory() {
  const { inventory } = useContext(InventoryContext);
  const { reloadInventory } = useContext(InventoryContext);
  const [itemId, setItemId] = useState(0)

  const handleReloadInventory = () => {
    reloadInventory()
  }

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

  const [tableHeader, setTableHeader] = useState(["SKU", "Brand", "Name", "Description", "In Stock", "Reorder At", "Order QTY", "Incoming Orders", "Order Now", "Settings"]);
  const handleHeaderChange = (newHeader, reset = false) => {
    const defaultHeader = ["SKU", "Brand", "Name", "Description", "In Stock", "Reorder At", "Order QTY", "Incoming Orders", "Order Now", "Settings",];
    reset ? setTableHeader(defaultHeader) : setTableHeader(newHeader);
  };

  const [popup, setPopup] = useState(null);
  const handleClick = (itemId, event) => {
    if (event && event.target) {
      setPopup(event.target.id);
      console.log(itemId)
      setItemId(itemId)
    }
  };

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
                {item.description}
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
                // onChange={handleOrderQtyChange}
                />
              </td>
              <td>
                <input
                  className="dynamic-inputs"
                  id="orderQty"
                  type="text"
                  defaultValue={item.orderQty}
                // onChange={handleOrderQtyChange}
                />
              </td>
              <td>
                <FontAwesomeIcon
                  icon="fa-box"
                  className="fa-icon"
                  id="incoming"
                  onClick={(event) => handleClick(item.id, event)}
                />
              </td>
              <td>
                <FontAwesomeIcon
                  icon="fa-bag-shopping"
                  className="fa-icon"
                  id="order"
                  onClick={(event) => handleClick(item.id, event)}
                />
              </td>
              <td>
                <FontAwesomeIcon
                  icon="fa-gear"
                  className="fa-icon"
                  id="settings"
                  onClick={(event) => handleClick(item.id, event)}
                />
              </td>
            </tr>
          ))}
        </tbody>
      </table>


      {
        popup == 'incoming' && (
          <IncomingPopup handleClick={handleClick} popup={popup} itemId={itemId} reloadInventory={handleReloadInventory} />
        )
      }
      {
        popup == 'order' && (
          <OrderNowPopup handleClick={handleClick} popup={popup} itemId={itemId} reloadInventory={handleReloadInventory} />
        )
      }
      {
        popup == 'settings' && (
          <SettingsPopup handleClick={handleClick} popup={popup} itemId={itemId} reloadInventory={handleReloadInventory} />
        )
      }
    </div >
  );
}
