import React from 'react';
import InventoryFilterRow from './InventoryFilSeaAdd';
import { useContext, useState } from 'react';
import { InventoryContext } from '../../contexts/inventory.context';
import SettingsPopup from './popups/settingsPopup';
import OrderNowPopup from './popups/orderNowPopup';
import IncomingPopup from './popups/incomingPopup';
import './inventory.css';
import './popups/popup.css';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

export default function Inventory() {
  const { inventory } = useContext(InventoryContext);
  const [popup, setPopup] = useState(null);
  const [addProdRow, setAddProdRow] = useState([]);


  const handleClick = (event) => {
    setPopup(event.target.id);
  };

  // Function to add "add product" row
  const addRow = () => {
    setAddProdRow([...addProdRow, {}]);
  };

  // Function to delete a row
  const deleteRow = (index) => {
    const newRows = [...addProdRow];
    newRows.splice(index, 1);
    setAddProdRow(newRows);
  };

  const [tableHeader, setTableHeader] = useState([
    'SKU',
    'Brand',
    'Name',
    'Description',
    'In Stock',
    'Reorder At',
    'Order QTY',
    'Incoming QTY',
    'Order Now',
    'Settings',
  ]);

  const handleHeaderChange = (newHeader, reset = false) => {
    reset ? setTableHeader([
      'SKU',
      'Brand',
      'Name',
      'Description',
      'In Stock',
      'Reorder At',
      'Order QTY',
      'Incoming QTY',
      'Order Now',
      'Settings',
    ]) : setTableHeader(newHeader);
  };


  return (
    <div className="headings-and-table-container">
      {console.log(inventory)}
      <InventoryFilterRow
        addRow={addRow}
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
          {addProdRow.map((row, index) => (
            <tr key={index}>
              <td>
                <input
                  className="dynamic-inputs sku"
                  field="sku"
                  type="text"
                // defaultValue={}
                />
              </td>
              <td>
                <input
                  className="dynamic-inputs brand"
                  field="brand"
                  type="text"
                // defaultValue={}
                />
              </td>
              <td>
                <input
                  className="dynamic-inputs name"
                  field="name"
                  type="text"
                // defaultValue={}
                />
              </td>
              <td>
                <input
                  className="dynamic-inputs desc"
                  field="description"
                  type="text"
                // defaultValue={}
                />
              </td>
              <td>
                <input
                  className="dynamic-inputs"
                  field="in-stock"
                  type="text"
                // defaultValue={}
                />
              </td>
              <td>
                <input
                  className="dynamic-inputs"
                  field="reorder-at"
                  type="text"
                // defaultValue={}
                />
              </td>
              <td>
                <input
                  className="dynamic-inputs"
                  field="order-qty"
                  type="text"
                // defaultValue={}
                />
              </td>
              <td>
                <input
                  className="dynamic-inputs unit-price"
                  field="unit-price"
                  type="text"
                // defaultValue={}
                />
              </td>
              <td>
                <button>Save</button>
              </td>
              <td>
                <button onClick={() => {
                  deleteRow(index)
                  handleHeaderChange(null, true);
                }
                }>Cancel</button>
              </td>
            </tr>
          ))}
          {inventory.map((item) => (
            <tr key={item.id}>
              <td>{item.sku}</td>
              <td>{item.brand}</td>
              <td className="item-name">{item.productName}</td>
              <td className="item-description">{item.description}</td>
              <td>{item.inStock}</td>
              <td>
                <input
                  className="dynamic-inputs"
                  id="name-input"
                  type="text"
                  defaultValue={item.reorderAt}
                // onChange={handleOrderQtyChange}
                />
              </td>
              <td>
                <input
                  className="dynamic-inputs"
                  id="name-input"
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
                  onClick={handleClick}
                />
              </td>
              <td>
                <FontAwesomeIcon
                  icon="fa-bag-shopping"
                  className="fa-icon"
                  id="order"
                  onClick={handleClick}
                />
              </td>
              <td>
                <FontAwesomeIcon
                  icon="fa-gear"
                  className="fa-icon"
                  id="settings"
                  onClick={handleClick}
                />
              </td>
            </tr>
          ))}
        </tbody>
      </table>

      {popup == 'incoming' && (
        <IncomingPopup handleClick={handleClick} popup={popup} />
      )}
      {popup == 'order' && (
        <OrderNowPopup handleClick={handleClick} popup={popup} />
      )}
      {popup == 'settings' && (
        <SettingsPopup handleClick={handleClick} popup={popup} />
      )}
    </div>
  );
}
