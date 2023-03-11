import React from "react";
import Form from "./SearchInput";

function InventoryFilterRow(props) {

  // this function is called on "add product" button click
  const handleDisplayRow = () => {
    // this part calls the displayRow function tha is passed down through the prop (see InventoryFilterRow prop in inventory.jsx)
    props.displayRow();

    props.handleHeaderChange([
      "SKU",
      "Brand",
      "Name",
      "Description",
      "In Stock",
      "Reorder At",
      "Order QTY",
      "Unit Price",
      "Order",
      "Cancel"
    ]);
  }

  return (
    <div className="table-filter-search-add">
      <section className="filter-search-container">
        <div className="tr-filter-search-add">
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
        <div>
          <Form />
        </div>
      </section>
      <div>
        {/* when button is clicked, handleDisplayRow function is called */}
        <button className="add-prod-btn" onClick={handleDisplayRow}>Add Product</button>
      </div>
    </div >
  )
}

export default InventoryFilterRow