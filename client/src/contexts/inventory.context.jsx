import { createContext, useState, useEffect } from "react";
import { getInventoryList } from "../services/inventoryAPIcalls";

export const InventoryContext = createContext({
  inventory: [],
  reloadInventory: () => { },
  startUsage: () => { },
  stopUsage: () => { },
  resetInventory: () => { },
  // tempStock: {},
  isUsingStock: false,
  selectedItems: [],
  toggleSelectedItem: () => { },
});

export const InventoryProvider = ({ children }) => {
  const [inventory, setInventory] = useState([]);
  const [isUsingStock, setIsUsingStock] = useState(false);
  const [selectedItems, setSelectedItems] = useState(new Set());

  const reloadInventory = async (newInventory) => {
    if (newInventory) {
      setInventory(newInventory);
    } else {
      try {
        const data = await getInventoryList();
        setInventory(data);
      } catch (error) {
        console.error("Error fetching inventory list:", error);
      }
    }
  };

  useEffect(() => {
    reloadInventory();
  }, []);

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
    selectedItems: Array.from(selectedItems),
    toggleSelectedItem,
  };

  return (
    <InventoryContext.Provider value={value}>
      {children}
    </InventoryContext.Provider>
  );
};

