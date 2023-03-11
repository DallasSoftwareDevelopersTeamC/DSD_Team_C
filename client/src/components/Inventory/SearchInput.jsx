import React, { useState, useContext } from 'react';
import { InventoryContext } from '../../contexts/inventory.context';
import './SearchInput.css'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faMagnifyingGlass, faCircleXmark } from '@fortawesome/free-solid-svg-icons';

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
          const values = Object.values(product).map(val => // returns an array of the values of all properties in the product object.
            typeof val === 'string' ? val.toLowerCase() : val); // map is called on this array, applying the following function to each value: If the value is a string, convert it to lowercase. Otherwise, leave it as is.
          return values.some(val => typeof val === 'string' && val.includes(value)); // some is called on the result value, it returns true if the element is a string or if the string contains the value to be searched for
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
          <div className='searchIcon'>
          {searchResults.length === 0 ? ( // search icon appears until an inputted value is filtered, then clear icon replaces search icon
            <FontAwesomeIcon 
              icon={faMagnifyingGlass} 
            />
          ) : (
            <FontAwesomeIcon 
              icon={faCircleXmark} 
              id="clear" 
              onClick={handleClearClick} 
            />
          )} 
          </div>
        </form>
        
        <div className='results-container'>
        <div className='results-list' id='list'>
            {/* iterate over searchResults - renders matching items. displays under the search bar with LIs in a dropdown */}
            {searchResults.map((product, index) => (
              <ul key={index}>
                {Object.keys(product).map(key => {
                    if (typeof product[key] === 'string' && product[key].toLowerCase().includes(searchTerm)) {
                       return <li key={key}><a href='{product.sku}'>{product[key]}</a></li>
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
