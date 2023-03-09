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

// added this comment to test out my git push

export default function Inventory() {
  const { inventory } = useContext(InventoryContext);
  const [popup, setPopup] = useState(null);
  const [addProdRow, setAddProdRow] = useState([]);
  const [addProdInfo, setAddProdInfo] = useState({
    sku: '',
    brand: '',
    productName: '',
    description: '',
    inStock: '',
    reorderAt: '',
    orderQty: '',
    unitPrice: ''
  });

  // ---------------- add product functions start ---------------------
  const handleAddProd_InputChange = (e) => {
    // (e) represents the event - the exact input that changed
    const { name, value } = e.target;
    setAddProdInfo((prevState) => ({ ...prevState, [name]: value }));
  };

  async function handleCreateItem(e) {
    e.preventDefault();
    const response = await createInventoryItem(addProdInfo)
    console.log(response)
    // clear fields after response succeeds
    clearProdInputFields()
  }

  function clearProdInputFields() {
    setAddProdInfo(prevState => {
      return Object.fromEntries(Object.keys(prevState).map(key => [key, '']));
    });
  }
  // ---------------- add product functions end  ---------------------

  const handleClick = (event) => {
    setPopup(event.target.id);
  };

  const [rows, setRows] = useState([]);
  const [tableHeader, setTableHeader] = useState([
    "SKU",
    "Brand",
    "Name",
    "Description",
    "In Stock",
    "Reorder At",
    "Order QTY",
    "Incoming Orders",
    "Order Now",
    "Settings",
  ]);
  const [rowAdded, setRowAdded] = useState(false);

  const displayRow = () => {
    !rowAdded ? (setRows([...rows, {}]), setRowAdded(true)) : null;
  };

  const deleteRow = (index) => {
    const newRows = [...rows];
    newRows.splice(index, 1);
    setRows(newRows);
    rowAdded ? setRowAdded(false) : null;
  };

  const handleHeaderChange = (newHeader, reset = false) => {
    const defaultHeader = [
      "SKU",
      "Brand",
      "Name",
      "Description",
      "In Stock",
      "Reorder At",
      "Order QTY",
      "Incoming Orders",
      "Order Now",
      "Settings",
    ];
    reset ? setTableHeader(defaultHeader) : setTableHeader(newHeader);
  };

  return (
    <div className="headings-and-table-container">
      <InventoryFilterRow
        addRow={displayRow}
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

          {rowAdded && (
            <tr>
              <td>
                <input
                  type="text" className="dynamic-inputs sku"
                  name="sku"
                  value={addProdInfo.sku}
                  onChange={handleAddProd_InputChange} />
              </td>
              <td>
                <input
                  type="text" className="dynamic-inputs brand"
                  name="brand"
                  value={addProdInfo.brand}
                  onChange={handleAddProd_InputChange} />
              </td>
              <td>
                <input
                  type="text" className="dynamic-inputs name"
                  name="productName"
                  value={addProdInfo.productName}
                  onChange={handleAddProd_InputChange} />
              </td>
              <td>
                <input
                  type="text" className="dynamic-inputs desc"
                  name="description"
                  value={addProdInfo.description}
                  onChange={handleAddProd_InputChange} />
              </td>
              <td>
                <input
                  type="text" className="dynamic-inputs"
                  name="inStock"
                  value={addProdInfo.inStock}
                  onChange={handleAddProd_InputChange} />
              </td>
              <td>
                <input
                  type="text" className="dynamic-inputs"
                  name="reorderAt"
                  value={addProdInfo.reorderAt}
                  onChange={handleAddProd_InputChange} />
              </td>
              <td>
                <input
                  type="text" className="dynamic-inputs"
                  name="orderQty"
                  value={addProdInfo.orderQty}
                  onChange={handleAddProd_InputChange} />
              </td>
              <td>
                <input
                  type="text" className="dynamic-inputs unit-price"
                  name="unitPrice"
                  value={addProdInfo.unitPrice}
                  onChange={handleAddProd_InputChange} />
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
          )}
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
