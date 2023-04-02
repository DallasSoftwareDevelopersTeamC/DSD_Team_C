import React, { useEffect, useState, useContext } from 'react';
import { InventoryContext } from '../../contexts/inventory.context';
import { OrdersContext } from '../../contexts/orders.context'
import { getSettings } from '../../services/settingsAPIcalls'
import { updateSetting } from '../../services/settingsAPIcalls'

function FilterBy() {
  const [settings, setSettings] = useState();
  const { reloadInventory, userData } = useContext(InventoryContext);
  const { reloadOrders } = useContext(OrdersContext);
  const [selectedOption, setSelectedOption] = useState('');


  const handleFilterChange = async (event) => {
    const twoValues = event.target.value;
    setSelectedOption(twoValues);
    let newFilterBy, newSortOrder;
    newFilterBy = twoValues.split('_')[0];
    newSortOrder = twoValues.split('_')[1];
    const filterBy = newFilterBy;
    const sortOrder = newSortOrder;

    if (userData) {
      let updated = await updateSetting(userData.username, { filterBy, sortOrder });
      console.log(updated)
      // trigger rerender of handleGetSettings because settings state is a dependancy
      setSettings(updated);

      reloadInventory();
      reloadOrders();
    }

  };

  useEffect(() => {
    const handleGetSettings = async () => {
      if (userData) {
        const settingsData = await getSettings(userData.username);
        setSettings(settingsData);
        if (settingsData.filterBy && settingsData.sortOrder) {
          setSelectedOption(`${settingsData.filterBy}_${settingsData.sortOrder}`);
        }
      }
    };
    handleGetSettings();
  }, [userData]);

  useEffect(() => {
    console.log('settings:  ', settings);
  }, [settings]);



  return (
    <select id='filterBy'
      onChange={handleFilterChange}
      defaultValue={selectedOption}
      key={selectedOption}
    >
      <option value="sku_asc">Sku (A-Z)</option>
      <option value="sku_des">Sku (Z-A)</option>
      <option value="brand_asc">Brand (A-Z)</option>
      <option value="brand_des">Brand (Z-A)</option>
      <option value="inStock_asc">Stock (Low to High)</option>
      <option value="inStock_des">Stock (High to Low)</option>
    </select>
  );
}

export default FilterBy;
