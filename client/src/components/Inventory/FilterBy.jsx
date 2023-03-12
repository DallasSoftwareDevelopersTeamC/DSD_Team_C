import React, {useContext} from 'react';
import { InventoryContext } from '../../contexts/inventory.context';
import '../headerFooter.css';

function FilterBy () {
     const { inventory } = useContext(InventoryContext);


    return (
        <select className='filter-style'>
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
