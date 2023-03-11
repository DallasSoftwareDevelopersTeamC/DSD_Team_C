import React, { useState, useContext } from 'react';
import { InventoryContext } from '../../contexts/inventory.context';

function SearchInput() {
  const { inventory } = useContext(InventoryContext);
  const [searchTerm, setSearchTerm] = useState('');
  const [searchResults, setSearchResults] = useState([]);

//   handleInputChange will be called when user types in the seach input. trims whitespace and converts to lowercase. 
  const handleInputChange = (event) => {
    const value = event.target.value.trim().toLowerCase();
    setSearchTerm(value);
    // filter inventory array based on sku (we can change this to all prod items?) updates results using set variables.
    const filteredResults = value ? inventory.filter(
        (product) => product.sku.includes(value)
      ) : [];
    setSearchResults(filteredResults);
  };
// called when user clicks clear button to clear results - the tutorial i followed used this, if we want to scrap and convert to a go button we can.
  const handleClearClick = () => {
    setSearchTerm('');
    setSearchResults([]);
  };

  return (
    <>
      <div className='form-container'>
        <form className='form'>
          <input
            id='search'
            type='text'
            className='search-input'
            // change the placeholder if we decide to broaden user search feature.
            placeholder='search by sku' 
            value={searchTerm}
            onChange={handleInputChange}
          />
          <button id='clear' className='clear-results' onClick={handleClearClick}>
            clear
          </button>
        </form>
      </div>
      <div className='results-container'>
        <ul className='results-list' id='list'>
            {/* iterate over searchResults - renders a list of items matching the search terms. displays under the search bar with LIs need to make this render into our table */}
          {searchResults.map((product, index) => (
            <li key={index} className='result-item'>
              {product.sku}
            </li>
          ))}
        </ul>
      </div>
    </>
  );
}

export default SearchInput;
