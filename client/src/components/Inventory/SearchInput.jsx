import React, { useState, useContext } from 'react';
import { InventoryContext } from '../../contexts/inventory.context';
import './SearchInput.css'

function SearchInput() {
  const { inventory } = useContext(InventoryContext);
  const [searchTerm, setSearchTerm] = useState('');
  const [searchResults, setSearchResults] = useState([]);

//   handleInputChange will be called when user types in the seach input. trims whitespace and converts to lowercase. 
  const handleInputChange = (event) => {
    const value = event.target.value.trim().toLowerCase();
    setSearchTerm(value);
    // filter inventory array based on all property values, conditional used to check if the value is a string before calling
    const filteredResults = value ? inventory.filter(
        (product) => {
          const values = Object.values(product).map(val =>
            typeof val === 'string' ? val.toLowerCase() : val);
          return values.some(val => typeof val === 'string' && val.includes(value));
        }
      ) : [];      
    setSearchResults(filteredResults);
  };
// called when user clicks clear button to clear results 
  const handleClearClick = () => {
    setSearchTerm('');
    setSearchResults([]);
  };

  return (
    <>
        <form className='form'>
          <input
            id='search'
            type='text'
            className='search-input'
            placeholder='Search' 
            value={searchTerm}
            onChange={handleInputChange}
          />
          <button id='clear' className='clear-results' onClick={handleClearClick}>
            Clear
          </button>
        </form>
        <div className='results-container'>
        <div className='results-list' id='list'>
            {/* iterate over searchResults - renders matching items. displays under the search bar with LIs in a dropdown */}
            {searchResults.map((product, index) => (
              <ul key={index}>
                {Object.keys(product).map(key => {
                    if (typeof product[key] === 'string' && product[key].toLowerCase().includes(searchTerm)) {
                       return <li key={key}>{product[key]}</li>
                    }
                })}
              </ul>
            ))}
        </div>
        </div>
    </>
  );
}

export default SearchInput;
