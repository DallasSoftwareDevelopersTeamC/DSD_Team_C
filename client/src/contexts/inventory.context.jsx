import { createContext, useState, useEffect } from "react";
import { getInventoryList } from '../services/inventoryAPIcalls';

export const InventoryContext = createContext({
  inventory: []

});

export const InventoryProvider = ({ children }) => {
  // set inventory to empty array initially
  const [inventory, setInventory] = useState([]);
  // then pull in the data from api call
  useEffect(() => {
    getInventoryList().then((data) => {
      setInventory(data);
    }).catch((error) => {
      console.error('Error fetching inventory list:', error);
    });
  }, []);
  const value = { inventory }
  return (
    <InventoryContext.Provider value={value}>{children}</InventoryContext.Provider>
  )
}