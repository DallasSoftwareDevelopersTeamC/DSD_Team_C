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

  const handleClick = (event) => {
    setPopup(event.target.id);
  };

  const [rows, setRows] = useState([]);

  // Function to add a new row
  const addRow = () => {
    setRows([...rows, {}]);
  };

  // Function to delete a row
  const deleteRow = (index) => {
    const newRows = [...rows];
    newRows.splice(index, 1);
    setRows(newRows);
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

  const handleHeaderChange = (newHeader) => {
    setTableHeader(newHeader);
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
          {rows.map((row, index) => (
            <tr key={index}>
              <td>Cell 1</td>
              <td>Cell 2</td>
              <td>Cell 1</td>
              <td>Cell 2</td>
              <td>Cell 1</td>
              <td>Cell 2</td>
              <td>--</td>
              <td>unit price</td>
              <td>Cell 2</td>
              <td>
                <button onClick={() => deleteRow(index)}>Delete Row</button>
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
