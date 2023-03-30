import { createContext, useState, useEffect } from 'react';
import { getInventoryList } from '../services/inventoryAPIcalls';
import { useTempInStock } from '../hooks/useTempStock';
import { useQuery } from 'react-query';
import { authenticateUser } from '../services/authenticationAPIcalls';

export const InventoryContext = createContext({
  userData: {},
  inventory: [],
  reloadInventory: () => { },
  startUsage: () => { },
  stopUsage: () => { },
  resetInventory: () => { },
  isUsingStock: false,
  tempInStock: {},
  setTempInStock: () => { },
  selectedItems: [],
  setSelectedItems: () => { },
  toggleSelectedItem: () => { },
  isLoading: false,
});

export const InventoryProvider = ({ children }) => {
  const [userData, setUserData] = useState({})
  const [inventory, setInventory] = useState([]);
  const [isUsingStock, setIsUsingStock] = useState(false);
  const [selectedItems, setSelectedItems] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [tempInStock, setTempInStock] = useState({});
  const [companyId, setCompanyId] = useState(null);

  const { data } = useQuery('authenticateUser', authenticateUser, {
    onSuccess: (data) => {
      if (data !== 'JsonWebTokenError' && data !== 'TokenExpiredError') {
        setUserData(data)
        // console.log(data)
        setCompanyId(data.companyID);
      }
    },
  });

  useEffect(() => {
    if (companyId !== null) {
      reloadInventory();
    }
  }, [data]);

  const reloadInventory = async (newInventory) => {
    // setIsLoading(true);
    if (newInventory) {
      setInventory(newInventory);
    } else {
      try {
        console.log(companyId)
        const data = await getInventoryList();
        const productsByCompanyId = data.filter(
          (product) => product.companyID === companyId
        );
        setInventory(productsByCompanyId);
        setInventory(data);
      } catch (error) {
        console.error('Error fetching inventory list:', error);
      }
    }
    setIsLoading(false);
  };

  // load inventory on page load
  useEffect(() => {
    authenticateUser();
    reloadInventory();
  }, []);

  // call the tempInStock hook that takes care of decreasing the inventory
  useTempInStock(inventory, isUsingStock, tempInStock, setTempInStock);

  // ------  handle changes in the checkboxes/ match order to inventory order for highlight feature ----------
  const getInventoryIndex = (itemId) => {
    return inventory.findIndex((item) => item.id === itemId);
  };

  const toggleSelectedItem = (itemId) => {
    setSelectedItems((prevSelectedItems) => {
      const prevSelectedItemsArray = Array.from(prevSelectedItems);
      // Check if the item is already selected
      const itemIndexInSelected = prevSelectedItemsArray.indexOf(itemId);
      if (itemIndexInSelected !== -1) {
        // Remove the item from the selected items array
        prevSelectedItemsArray.splice(itemIndexInSelected, 1);
      } else {
        // Add the item to the selected items array in the correct order based on the inventory
        const inventoryIndex = getInventoryIndex(itemId);
        const insertIndex = prevSelectedItemsArray.findIndex(
          (selectedItemId) => inventoryIndex < getInventoryIndex(selectedItemId)
        );
        if (insertIndex !== -1) {
          prevSelectedItemsArray.splice(insertIndex, 0, itemId);
        } else {
          prevSelectedItemsArray.push(itemId);
        }
      }

      // Convert the array back to a Set
      return prevSelectedItemsArray;
    });
  };


  // --------------------- demo controls -------------------

  const startUsage = () => {
    setIsUsingStock(true);
  };

  const stopUsage = () => {
    setIsUsingStock(false);
  };

  const resetInventory = () => {
    reloadInventory();
  };
  // -----------------------------------

  const value = {
    userData,
    inventory,
    reloadInventory,
    startUsage,
    stopUsage,
    resetInventory,
    isUsingStock,
    tempInStock,
    setTempInStock,
    selectedItems: Array.from(selectedItems),
    setSelectedItems,
    toggleSelectedItem,
    isLoading,
  };

  return (
    <InventoryContext.Provider value={value}>
      {children}
    </InventoryContext.Provider>
  );
};
