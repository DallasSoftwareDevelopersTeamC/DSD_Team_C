import React, {useContext} from 'react';
import { InventoryContext } from '../../contexts/inventory.context';
import './sidebar.css';

function FilterBy () {
     const { inventory } = useContext(InventoryContext);


    return (
        <select id='filterBy'>
            <option label='Filter By'></option>
            <option value="sku">SKU</option>
            <option value="brand">Brand</option>
            <option value="name">Name</option>
            <option value="in-stock">In Stock</option>
            <option value="reorder-at">Reorder At</option>
            <option value="order-qty">Order Qty</option>
      </select>
    )
}

export default FilterBy
