import React from 'react';
import InventoryFilterRow from './InventoryFilSeaAdd';
import { useContext, useState } from 'react';
import { InventoryContext } from '../../contexts/inventory.context';
import { getInventoryList } from '../../services/inventoryAPIcalls' // can be used instead of context
import { createInventoryItem } from '../../services/inventoryAPIcalls'
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
  const [addProdInfo, setAddProdInfo] = useState({ sku: '', brand: '', productName: '', description: '', inStock: '', reorderAt: '', orderQty: '', unitPrice: '' });

  const handleAddProdInputChange = (e) => {
    // (e) represents the event - the exact input that changed
    const { name, value } = e.target;
    setAddProdInfo((prevState) => ({ ...prevState, [name]: value }));
  };

  async function handleCreateItem(e) {
    e.preventDefault();
    const response = await createInventoryItem(addProdInfo)
    console.log(response)
    // setInventory([...inventory, response]);
    // clear fields after response succeeds
    clearProdInputFields()
  }

  function clearProdInputFields() {
    setAddProdInfo(prevState => {
      return Object.fromEntries(Object.keys(prevState).map(key => [key, '']));
    });
  }

  const handleClick = (event) => {
    setPopup(event.target.id);
  };

  // Function to add "add product" row
  const handleAddRow = () => {
    setAddProdRow([...addProdRow, {}]);
  };

  // Function to delete a row
  const deleteRow = (index) => {
    const newRows = [...addProdRow];
    newRows.splice(index, 1);
    setAddProdRow(newRows);
  };

  const [tableHeader, setTableHeader] = useState(['SKU', 'Brand', 'Name', 'Description', 'In Stock', 'Reorder At', 'Order QTY', 'Incoming QTY', 'Order Now', 'Settings',
  ]);

  const handleHeaderChange = (newHeader, reset = false) => {
    reset ? setTableHeader(['SKU', 'Brand', 'Name', 'Description', 'In Stock', 'Reorder At', 'Order QTY', 'Incoming QTY', 'Order Now', 'Settings',
    ]) : setTableHeader(newHeader);
  };


  return (
    <div className="headings-and-table-container">
      <InventoryFilterRow
        addRow={handleAddRow}
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
          {/* {addProdRow.map((row, index) => ( */}
          {/* <tr key={index}> */}
          <tr>
            <td>
              <input className="dynamic-inputs sku" name="sku" type="text" value={addProdInfo.sku}
                onChange={handleAddProdInputChange} />
            </td>
            <td>
              <input className="dynamic-inputs brand" name="brand" type="text" value={addProdInfo.brand}
                onChange={handleAddProdInputChange} />
            </td>
            <td>
              <input className="dynamic-inputs name" name="productName" type="text" value={addProdInfo.name}
                onChange={handleAddProdInputChange} />
            </td>
            <td>
              <input className="dynamic-inputs desc" name="description" type="text" value={addProdInfo.description}
                onChange={handleAddProdInputChange} />
            </td>
            <td>
              <input className="dynamic-inputs" name="in-stock" type="text" value={addProdInfo.inStock}
                onChange={handleAddProdInputChange} />
            </td>
            <td>
              <input className="dynamic-inputs" name="reorder-at" type="text" value={addProdInfo.reorderAt}
                onChange={handleAddProdInputChange} />
            </td>
            <td>
              <input className="dynamic-inputs" name="order-qty" type="text" value={addProdInfo.orderQty}
                onChange={handleAddProdInputChange} />
            </td>
            <td>
              <input className="dynamic-inputs unit-price" name="unit-price" type="text" value={addProdInfo.unitPrice}
                onChange={handleAddProdInputChange} />
            </td>
            <td>
              <form onSubmit={handleCreateItem}>
                <button type="submit">Save</button>
              </form>
            </td>
            <td>
              <button onClick={() => {
                deleteRow()
                handleHeaderChange(null, true);
                clearProdInputFields()
              }
              }>Cancel</button>
            </td>
          </tr>

          {/* ))} */}
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


      {
        popup == 'incoming' && (
          <IncomingPopup handleClick={handleClick} popup={popup} />
        )
      }
      {
        popup == 'order' && (
          <OrderNowPopup handleClick={handleClick} popup={popup} />
        )
      }
      {
        popup == 'settings' && (
          <SettingsPopup handleClick={handleClick} popup={popup} />
        )
      }
    </div >
  );
}
