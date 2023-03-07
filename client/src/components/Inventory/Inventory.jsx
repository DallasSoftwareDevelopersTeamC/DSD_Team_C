import React from 'react';
import InventoryFilterRow from './InventoryFilSeaAdd';
import './inventory.css'
import { useContext, useState } from 'react';
import { InventoryContext } from '../../contexts/inventory.context';
import SettingsPopup from './settingsPopup';
import OrderPopup from './orderPopup';
import IncomingPopup from './incomingPopup';
import './orderpopup.css';

export default function Inventory() {

  const { inventory } = useContext(InventoryContext);
  const [popup, setPopup] = useState(null);

  const handleClick = (event) => {
    setPopup(event.target.id)
  };

  return (
    <div>
      <InventoryFilterRow />
      <table>
        <thead>
          <tr className='tr-table-header'>
            <td>SKU</td>
            <td>Image</td>
            <td>Brand</td>
            <td>Name</td>
            <td>In Stock</td>
            <td>Reorder At</td>
            <td>Set QTY Order</td>
            <td>Incoming QTY</td>
            <td>Order Now</td>
            <td>Settings</td>
          </tr>
        </thead>
        <tbody>
          {inventory.map((item) => (
            <tr key={item.id}>
              <td>{item.sku}</td>
              <td><img src={item.imageUrl} /></td>
              <td>{item.brand}</td>
              <td>{item.name}</td>
              <td>{item.inStock}</td>
              <td>{item.reOrderAt}</td>
              <td>
                <fieldset>
                  <select id="set_qty_order"
                    className='filter-item'
                    name="amount"
                  // value={}
                  // onChange={handleChange}
                  >
                    <option value="" label='QTY'></option>
                    {(function (rows, i, len) {
                      while (++i <= len) { rows.push(<option key={i} value={i}>{i}</option>) }
                      return rows;
                    })([], 1, 10)}
                  </select>
                </fieldset>
              </td>
              <td><button id="incoming" onClick={handleClick}>Incoming</button></td>
              <td><button id="order" onClick={handleClick}>Order</button></td>
              <td><button id="settings" onClick={handleClick}>Settings</button></td>
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


