import React from 'react';

function FilterBy({ onFilterChange }) {
  const handleFilterChange = (event) => {
    onFilterChange(event.target.value);
  };

  return (
    <select id='filterBy' onChange={handleFilterChange}>
      <option value="">Select a filter</option>
      <option value="brand_asc">Brand (A-Z)</option>
      <option value="brand_desc">Brand (Z-A)</option>
      <option value="stock_asc">Stock (Low to High)</option>
      <option value="stock_desc">Stock (High to Low)</option>
    </select>
  );
}

export default FilterBy;
