import React from "react";

function InventoryFilterRow(props) {
  const handleAddRow = () => {
    props.addRow();
    props.handleHeaderChange([
      "New SKU",
      "New Brand",
      "New Name",
      "New Description",
      "New In Stock",
      "New Reorder At",
      "New Order QTY",
      "New TEST",
      "New Order Now",
      "New Settings"
    ]);
  }

  return (
    <table className="table-filter-search-add">
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
        <button onClick={handleAddRow}>Add Row</button>
        </td>
      </tr>
    </table>
  )
}

export default InventoryFilterRow