import React from "react";

function InventoryFilterRow() {
  return (
    <div className="inventory-container">
      <div className="inventory-row">
        <div className="inventory-filter-by">
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
        </div>
        <div className="inventory-search">
          <input type="text" placeholder="Search" className='search-input' />
        </div>
        <div className="inventory-add-product">
          <button className='add-prod-btn'>Add Product</button>
        </div>
      </div>
    </div>
  )
}

export default InventoryFilterRow