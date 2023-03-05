import { createContext, useState } from "react";
import INVENTORY from '../assets/data.json';

export const InventoryContext =  createContext({
    inventory: []

});

export const InventoryProvider =( {children}) => {
    const [inventory, setInventory] = useState(INVENTORY);
    const value = {inventory}
  return (
     <InventoryContext.Provider value={value}>{ children }</InventoryContext.Provider>
  )
}