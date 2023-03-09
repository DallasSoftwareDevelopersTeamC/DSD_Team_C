import React from "react";

function InventoryFilterRow(props) {
  const handleAddRow = () => {
    props.addRow();
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
    <table className="table-filter-search-add">
      <tbody>
        <tr className="tr-filter-search-add">
         <td>
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
         </td>
         <td>
          <input type="text" placeholder="Search" className='search-input' />
         </td>
         <td>
          <button className="add-prod-btn" onClick={handleAddRow}>Add Product</button>
         </td>
        </tr>
      </tbody>
    </table>  
  )
}

export default InventoryFilterRow