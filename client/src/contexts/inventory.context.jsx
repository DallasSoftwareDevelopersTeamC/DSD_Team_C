import { createContext, useState, useEffect } from 'react';
import { getInventoryList } from '../services/inventoryAPIcalls';
import { useTempInStock } from '../hooks/useTempStock';
import { useQuery } from 'react-query';
import { authenticateUser } from '../services/authenticationAPIcalls';

export const InventoryContext = createContext({
  inventory: [],
  reloadInventory: () => {},
  startUsage: () => {},
  stopUsage: () => {},
  resetInventory: () => {},
  isUsingStock: false,
  tempInStock: {},
  setTempInStock: () => {},
  selectedItems: [],
  setSelectedItems: () => {},
  selectAllItems: () => {},
  toggleSelectedItem: () => {},
  isLoading: false,
});

export const InventoryProvider = ({ children }) => {
  const [inventory, setInventory] = useState([]);
  const [isUsingStock, setIsUsingStock] = useState(false);
  const [selectedItems, setSelectedItems] = useState(new Set());
  const [isLoading, setIsLoading] = useState(false);
  const [tempInStock, setTempInStock] = useState({});
  const [companyId, setCompanyId] = useState(null);

  const { data } = useQuery('authenticateUser', authenticateUser, {
    onSuccess: (data) => {
      if (data !== 'JsonWebTokenError' && data !== 'TokenExpiredError') {
        console.log(data.companyID);
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
    console.log(companyId);
    // setIsLoading(true);
    if (newInventory) {
      setInventory(newInventory);
    } else {
      try {
        const data = await getInventoryList();
        const productsByCompanyId = data.filter(
          (product) => product.companyID === companyId
        );
        setInventory(productsByCompanyId);
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

  // ------  handle changes in the checkboxes -----
  const toggleSelectedItem = (itemId) => {
    setSelectedItems((prevSelectedItems) => {
      // the reason for using Sets vs arrays here is fast lookups and updates and no duplicate Ids
      const newSelectedItems = new Set(prevSelectedItems);
      if (newSelectedItems.has(itemId)) {
        newSelectedItems.delete(itemId);
      } else {
        newSelectedItems.add(itemId);
      }
      // console.log(Array.from(newSelectedItems));
      return newSelectedItems;
    });
  };
  // ----- check or uncheck all checkboxes based on toggle switch in popups/ CheckboxOptions.jsx
  const selectAllItems = (selectAll) => {
    if (selectAll) {
      setSelectedItems(new Set(inventory.map((item) => item.id)));
    } else {
      setSelectedItems(new Set());
    }
  };

  // --- demo controls -------

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
    selectAllItems,
    toggleSelectedItem,
    isLoading,
  };

  return (
    <InventoryContext.Provider value={value}>
      {children}
    </InventoryContext.Provider>
  );
};
