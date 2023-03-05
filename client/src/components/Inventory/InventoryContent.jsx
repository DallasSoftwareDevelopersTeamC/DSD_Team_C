import React from 'react';
import InventoryFilterRow from './InventoryFilSeaAdd';
import InventoryItems from './InventoryItems';
import './inventoryContent.css'
import './orderpopup.css'
import {useContext, useState} from 'react';

import { InventoryContext } from '../../contexts/inventory.context';

 const InventoryContent = () => {

  const [isDoorOpen, setDoorOpen] = useState(false);
  const [isDoorOpenTwo, setDoorOpenTwo] = useState(false);
  
  const handleClick = () => {
    // If isDoorOpenTwo is true, close it before opening isDoorOpen
    if (isDoorOpenTwo) {
      setDoorOpenTwo(false);
    }
    setDoorOpen(!isDoorOpen);
  };
  
  const settingsClick = () => {
    // If isDoorOpen is true, close it before opening isDoorOpenTwo
    if (isDoorOpen) {
      setDoorOpen(false);
    }
    setDoorOpenTwo(!isDoorOpenTwo);
  };

   const {inventory} = useContext(InventoryContext)
     // console.log(inventory)
    return (
    <div>
      <InventoryFilterRow />
      <InventoryItems />
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
        <div className="table-cell">Arrival</div>
        <div className="table-cell">Order Now</div>
        <div className="table-cell">Settings</div>
      </div>
      <div className='table'>
       {inventory.map((item) => (
      <div className='table-row' key = {item.id}>    
        <div className="table-cell">{item.sku}</div>
        <img className="table-cell-img" src={item.imageUrl}/>
        <div className="table-cell">{item.brand}</div>
        <div className="table-cell">{item.name}</div>
        <div className="table-cell">{item.inStock}</div>
        <div className="table-cell">{item.reOrderAt}</div>
        {/* <div className="table-cell">{item.set_qty_order}</div> */}
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
        <fieldset>
        <select id="incoming_qty" className='filter-item'
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
        {/* <div className="table-cell">{item.incoming_qty}</div> */}
        <div className="table-cell">{item.arrival}</div>
        <div className="table-cell">
          <button onClick={handleClick}>Order</button>
          {/* This is the pop up content */}
          {isDoorOpen && (
            <div className="popup">
              <div className='popup-cont'>
                <div className="popup-row-header">
                    <div className="popup-cell">Product</div>
                    <div className="popup-cell">SKU</div>
                    <div className="popup-cell">Shipper</div>
                    <div className="popup-cell">Name</div>
                    <div className="popup-cell">Price EA</div>
                    <div className="popup-cell">Order QTY</div>
                    <div className="popup-cell">Shipping Cost</div>
                    <div className="popup-cell">Total</div>
                </div>
                <div className="popup-row-right">
                    <div className="popup-cell">Apple Watch</div>
                    <div className="popup-cell">00000</div>
                    <div className="popup-cell">Apple</div>
                    <div className="popup-cell">Name Here</div>
                    <div className="popup-cell">$456</div>
                    <div className="popup-cell">
                    <div className="table-cell">
                        <select className='filter-item'>
                            <option label='QTY'></option>
                            <option value="number">1</option>
                            <option value="number">2</option>
                        </select>
                    </div>
                </div>
                    <div className="popup-cell">$44</div>
                    <div className="popup-cell">$500</div>
                </div>
              </div>
                <div className='btn-cont'>
                    <button className="pop-btn-order">Order Now</button>
                    <button onClick={handleClick} className="pop-button">Close</button>
                </div>
             </div>
          )}
          {/* end pop up content */}
        </div>
        <div className="table-cell">
        <button onClick={settingsClick}>Settings</button>
        {/* This is the pop up content */}
          {isDoorOpenTwo && (
            <div className="popup">
              <div className='popup-cont'>
                <div className="popup-row-header">
                    <div className="popup-cell">Product</div>
                    <div className="popup-cell">SKU</div>
                    <div className="popup-cell">Item Usage Speed</div>
                </div>
                <div className="popup-row-right">
                    <div className="popup-cell">Apple Watch</div>
                    <div className="popup-cell">00000</div>
                    <div className="popup-cell">
                    <div className="table-cell">
                        <select className='filter-item'>
                            <option label='Select'></option>
                            <option value="number">Slow</option>
                            <option value="number">Medium</option>
                            <option value="number">Fast</option>
                        </select>
                    </div>
                 </div>
                </div>
              </div>
                <div className='btn-cont'>
                    <button className="pop-btn-order">Delete</button>
                    <button onClick={settingsClick} className="pop-button">Close</button>
                </div>
             </div>
          )}
          {/* end pop up content */}
        </div>
    </div>
     ))}
     </div>
    </div>
    </div>
  );
}

export default InventoryContent;
