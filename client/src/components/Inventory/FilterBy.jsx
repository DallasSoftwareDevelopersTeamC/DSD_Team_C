import React, { useState, useContext, useEffect } from 'react';
import { InventoryContext } from '../../contexts/inventory.context';

function FilterBy () {
     const { inventory } = useContext(InventoryContext);



    return (
        <select className='filter-style'>
            <option label='Filter By'></option>
            <option value="sku">SKU</option>
            <option value="image">Image</option>
            <option value="brand">Brand</option>
            <option value="name">Name</option>
            <option value="in-stock">In Stock</option>
            <option value="reorder-at">Reorder At</option>
            <option value="order-qty">Order Qty</option>
            <option value="qty">Qty</option>
            <option value="arrival">Arrival</option>
      </select>
    )
}

export default FilterBy
