import React from "react";
import FilterBy from "./FilterBy";
import SearchInput from "./SearchInput";

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
          <FilterBy />
        </div>
        <div>
          <SearchInput />
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