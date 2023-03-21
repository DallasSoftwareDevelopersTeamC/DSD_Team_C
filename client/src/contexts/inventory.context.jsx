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
});

export const InventoryProvider = ({ children }) => {
  const [inventory, setInventory] = useState([]);
  const [isUsingStock, setIsUsingStock] = useState(false);

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
  };

  return (
    <InventoryContext.Provider value={value}>
      {children}
    </InventoryContext.Provider>
  );
};

