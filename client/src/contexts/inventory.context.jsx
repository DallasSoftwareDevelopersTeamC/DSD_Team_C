import { createContext, useState, useEffect } from 'react';
import { getInventoryList } from '../services/inventoryAPIcalls';
import { getUser } from '../services/userAPIcalls';
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
  useSelectedOnlyOn: false,
  setUseSelectedOnlyOn: () => { },
  isUsingStock: false,
  tempInStock: {},
  setTempInStock: () => { },
  selectedItems: [],
  setSelectedItems: () => { },
  toggleSelectedItem: () => { },
  isLoading: false,
});

export const InventoryProvider = ({ children }) => {
  const [userData, setUserData] = useState({});
  const [companyId, setCompanyId] = useState(null);
  const [inventory, setInventory] = useState([]);
  const [isUsingStock, setIsUsingStock] = useState(false);
  const [selectedItems, setSelectedItems] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [tempInStock, setTempInStock] = useState({});
  // this is for demo controls to set the "Use Selected (products) Only" on or off
  const [useSelectedOnlyOn, setUseSelectedOnlyOn] = useState(false)


  const { data } = useQuery('authenticateUser', authenticateUser, {
    onSuccess: (data) => {
      if (data !== 'JsonWebTokenError' && data !== 'TokenExpiredError') {
        console.log(data);
        setUserData(data);
        // console.log(data)
        setCompanyId(data.companyID);
      }
    },
  });
  const fetchAndSetUserData = async () => {
    if (userData.id) {
      const freshUserData = await getUser(userData.id);
      setUserData(freshUserData);
    }
  };
  useEffect(() => {
    fetchAndSetUserData();
  }, []);

  const reloadInventory = async (newInventory, updatedUserData) => {
    // setIsLoading(true);
    if (newInventory) {
      setInventory(newInventory);
    } else {
      try {
        if (userData) {
          // get new set of userData to pass through in params to getInventoryList
          const freshUserData = await getUser(userData.id)
          setUserData(freshUserData)


          // if updatedUserData is passed in as arg from filterBy component, use that. Otherwise, use the userData that is set in the above useQuery function
          const data = await getInventoryList(freshUserData);
          setInventory(data);
        }
      } catch (error) {
        console.error('Error fetching inventory list:', error);
      }
    }
    setIsLoading(false);
  };

  // load inventory on page load
  useEffect(() => {
    authenticateUser();
    if (companyId !== null) {
      reloadInventory();
    }
  }, [data]);

  // call the tempInStock hook that takes care of decreasing the inventory
  useTempInStock(inventory, isUsingStock, tempInStock, setTempInStock, useSelectedOnlyOn, selectedItems);

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
    useSelectedOnlyOn,
    setUseSelectedOnlyOn,
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
