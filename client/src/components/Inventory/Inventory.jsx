import React from 'react';
import InventoryFilterRow from './InventoryFilSeaAdd';
import './inventory.css'
import {useContext, useState} from 'react';
import { InventoryContext } from '../../contexts/inventory.context';
import Settings from './settings';
import Order from '../Inventory/order';
import Incoming from './incoming';
import './orderpopup.css';

export default function Inventory () {

  const {inventory} = useContext(InventoryContext);
  const [popup, setPopup] = useState(null);

  const handleClick = (event) => {
      setPopup(event.target.id)
   };  
  
   return (
     <div> 
      <InventoryFilterRow />
      <div className='table-container'>
      <div className="table-row header">
        <div className="table-cell">SKU</div>
        <div className="table-cell">Image</div>
        <div className="table-cell">Brand</div>
        <div className="table-cell">Name</div>
        <div className="table-cell">In Stock</div>
        <div className="table-cell">Reorder At</div>
        <div className="table-cell">Set QTY Order</div>
        <div className="table-cell">Incoming QTY</div>
        <div className="table-cell">Order Now</div>
        <div className="table-cell">Settings</div>
      </div>
      <div className='table'>
       {inventory.map((item) => (
        <div className='table-row' key = {item.id}>    
        <div className="table-cell">{item.sku}</div>
        <img className="table-cell" src={item.imageUrl}/>
        <div className="table-cell">{item.brand}</div>
        <div className="table-cell">{item.name}</div>
        <div className="table-cell">{item.inStock}</div>
        <div className="table-cell">{item.reOrderAt}</div>
        <fieldset>
          <select id="set_qty_order" className='filter-item'
                 // value={}
                  name = "amount"
                  // onChange = {handleChange}
                  >
            <option value = "" label='QTY'></option>
            {(function (rows, i, len) {
               while(++i <= len) {rows.push(<option key = {i} value = {i}>{i}</option>)}
               return rows;
             })([], 1, 10)}
          </select>
        </fieldset>
        <button id="incoming" onClick={handleClick}>Incoming</button>
        <button id="order" onClick={handleClick}>Order</button>
        <button id="settings" onClick={handleClick}>Settings</button>
      </div>
     ))}
     </div>
    </div>
       { popup == "incoming" && <Incoming handleClick = {handleClick} popup = {popup}/> }
       { popup == "order" && <Order handleClick = {handleClick} popup = {popup}/> }
       { popup == "settings" && <Settings handleClick = {handleClick} popup = {popup}/> }
    </div>
  );
}


