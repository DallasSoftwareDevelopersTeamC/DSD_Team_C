import React from 'react';
import InventoryFilterRow from './InventoryFilSeaAdd';
import './inventory.css'
import { useContext, useState } from 'react';
import { InventoryContext } from '../../contexts/inventory.context';
import SettingsPopup from './settingsPopup';
import OrderPopup from './orderPopup';
import IncomingPopup from './incomingPopup';
import './orderpopup.css';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

export default function Inventory() {

  const { inventory } = useContext(InventoryContext);
  const [popup, setPopup] = useState(null);

  const handleClick = (event) => {
    setPopup(event.target.id)
  };

  return (
    <div className='headings-and-table-container'>
      <InventoryFilterRow />
      <table>
        <thead className='thead-table-header'>
            <td>SKU</td>
            <td>Brand</td>
            <td>Name</td>
            <td>Description</td>
            <td>In Stock</td>
            <td>Reorder At</td>
            <td>Order QTY</td>
            <td>Incoming QTY</td>
            <td>Order Now</td>
            <td>Settings</td>
        </thead>
        <tbody className='inventory-items-container'>
          {inventory.map((item) => (
            <tr key={item.id}>
              <td>{item.sku}</td>
              <td>{item.brand}</td>
              <td className='item-name'>{item.name}</td>
              <td className='item-description'>{item.description}</td>
              <td>{item.inStock}</td>
              <td>
                <input className='dynamic-inputs'
                  id="name-input"
                  type="text"
                  value={item.reorderAt}
                // onChange={handleOrderQtyChange}
                /></td>
              <td>
                <input className='dynamic-inputs'
                  id="name-input"
                  type="text"
                  value={item.orderQTY}
                // onChange={handleOrderQtyChange}
                />
              </td>
              <td>
                  <FontAwesomeIcon icon='fa-box' className='fa-icon' id="incoming" onClick={handleClick} />
              </td>
              <td>
                  <FontAwesomeIcon icon='fa-bag-shopping' className='fa-icon' id="order" onClick={handleClick} />
              </td>
              <td>
                  <FontAwesomeIcon icon='fa-gear' className='fa-icon' id="settings" onClick={handleClick} />
              </td>
            </tr>
          ))}
        </tbody>
      </table>

      {popup == "incoming" && <IncomingPopup handleClick={handleClick} popup={popup} />}
      {popup == "order" && <OrderPopup handleClick={handleClick} popup={popup} />}
      {popup == "settings" && <SettingsPopup handleClick={handleClick} popup={popup} />}
    </div>
  );
}


