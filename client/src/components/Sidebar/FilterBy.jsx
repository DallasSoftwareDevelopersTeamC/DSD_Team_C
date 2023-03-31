import React, { useEffect, useState, useContext } from 'react';
import { InventoryContext } from '../../contexts/inventory.context';
import { getSettings } from '../../services/settingsAPIcalls'
import { updateSetting } from '../../services/settingsAPIcalls'


function FilterBy({ onFilterChange }) {
  const [settings, setSettings] = useState()
  const { userData } = useContext(InventoryContext);
  const handleFilterChange = (event) => {
    onFilterChange(event.target.value);
  };

  useEffect(() => {
    const handleGetSettings = async () => {
      console.log('userData:  ', userData)
      if (userData) {
        const settingsData = await getSettings(userData.username)
        setSettings(settingsData)
      }
    }
    handleGetSettings()
  }, [userData])

  useEffect(() => {
    console.log('settings:  ', settings);
  }, [settings]);

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
