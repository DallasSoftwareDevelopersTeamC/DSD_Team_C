import React from 'react';
import InventoryFilterRow from './InventoryFilSeaAdd';
import InventoryItems from './InventoryItems';
import './inventoryContent.css'
import {useContext, useState} from 'react';

import { InventoryContext } from '../../contexts/inventory.context';

 const InventoryContent = () => {
   const {inventory} = useContext(InventoryContext)
     // console.log(inventory)
    return (
    <div>
      <InventoryFilterRow />
      <InventoryItems />
      <div className="table-row">
      <div className="table-row header">
        <div className="table-cell">SKU</div>
        <div className="table-cell">Image</div>
        <div className="table-cell">Brand</div>
        <div className="table-cell">Name</div>
        <div className="table-cell">In Stock</div>
        <div className="table-cell">Reorder At</div>
        <div className="table-cell">Set QTY Order</div>
        <div className="table-cell">Incoming QTY</div>
        <div className="table-cell">Arrival</div>
        <div className="table-cell">Order Now</div>
        <div className="table-cell">Settings</div>
      </div>
       {inventory.map((item) => (
      <div key = {item.id}>    
        <div className="table-cell">{item.sku}</div>
        <img className="" src={item.imageUrl}/>
        <div className="table-cell">{item.brand}</div>
        <div className="table-cell">{item.name}</div>
        <div className="table-cell">{item.inStock}</div>
        <div className="table-cell">{item.reOrderAt}</div>
        {/* <div className="table-cell">{item.set_qty_order}</div> */}
        <fieldset>
          <select id="set_qty_order"
                 // value={}
                  name = "amount"
                  // onChange = {handleChange}
                  >
            <option value = "">Number</option>
            {(function (rows, i, len) {
               while(++i <= len) {rows.push(<option key = {i} value = {i}>{i}</option>)}
               return rows;
             })([], 1, 10)}
          </select>
        </fieldset>
        <fieldset>
        <select id="incoming_qty"
                 // value={}
                  name = "amount"
                  // onChange = {handleChange}
                  >
            <option value = "">Number</option>
            {(function (rows, i, len) {
               while(++i <= len) {rows.push(<option key = {i} value = {i}>{i}</option>)}
               return rows;
             })([], 1, 10)}
          </select>
        </fieldset>
        {/* <div className="table-cell">{item.incoming_qty}</div> */}
        <div className="table-cell">{item.arrival}</div>
        <div className="table-cell"><button>Order</button></div>
        <div className="table-cell"><button>Settings</button></div>
      </div>
     ))}
    </div>
    </div>
  );
}

export default InventoryContent;
