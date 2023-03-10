import { createContext, useState, useEffect } from "react";
import { getInventoryList } from '../services/inventoryAPIcalls';

export const InventoryContext = createContext({
  inventory: [],
  reloadInventory: () => { }
});

export const InventoryProvider = ({ children }) => {
  const [inventory, setInventory] = useState([]);

  const reloadInventory = async () => {
    try {
      const data = await getInventoryList();
      setInventory(data);
    } catch (error) {
      console.error('Error fetching inventory list:', error);
    }
  }

  useEffect(() => {
    reloadInventory();
  }, []);
  const value = { inventory, reloadInventory };

  return (
    <InventoryContext.Provider value={value}>
      {children}
    </InventoryContext.Provider>
  )
}
