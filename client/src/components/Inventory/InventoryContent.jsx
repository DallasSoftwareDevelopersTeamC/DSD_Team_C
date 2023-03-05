import React from 'react';
import InventoryFilterRow from './InventoryFilSeaAdd';
import InventoryItems from './InventoryItems';

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
       {inventory.map((item) => (
        <div key = {item.id}>    
         <div className="table-cell">{item.sku}</div>
        <img className="" src={item.imageUrl}/>
        <div className="table-cell">{item.brand}</div>
        <div className="table-cell">{item.name}</div>
        <div className="table-cell">{item.inStock}</div>
        <div className="table-cell">{item.reOrderAt}</div>
        <div className="table-cell">{item.set_qty_order}</div>
        <div className="table-cell">{item.incoming_qty}</div>
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
