import { createContext, useState, useEffect } from "react";
import { getInventoryList } from '../services/inventoryAPIcalls';
import { decreaseStock } from '../utils/decreaseStock';

export const InventoryContext = createContext({
  inventory: [],
  tempStock: {},
  reloadInventory: () => { },
  updateStock: () => { }
});

export const InventoryProvider = ({ children }) => {
  const [inventory, setInventory] = useState([]);
  const [tempStock, setTempStock] = useState({});

  const reloadInventory = async () => {
    try {
      const data = await getInventoryList();
      setInventory(data);
    } catch (error) {
      console.error('Error fetching inventory list:', error);
    }
  }

  const useInventory = (itemId, quantity) => {
    const updatedTempStock = { ...tempStock };
    updatedTempStock[itemId] = (updatedTempStock[itemId] || 0) + quantity;
    setTempStock(updatedTempStock);
    setInventory(prevInventory => decreaseStock(prevInventory, itemId, quantity, usageSpeed)); // Pass the usageSpeed value to decreaseStock
  };

  const updateStock = () => {
    // Update the stock for each item in the inventory array
    const inventoryWithUpdatedStock = inventory.map(item => ({
      ...item,
      stock: item.stock + (tempStock[item.id] || 0)
    }));
    setInventory(inventoryWithUpdatedStock);
    setTem
  }
  useEffect(() => {
    reloadInventory();
  }, []);
  // ---------- | ------< state > ----- ||-------------< functions  >-------------|
  const value = { inventory, tempStock, reloadInventory, useInventory, updateStock };

  return (
    <InventoryContext.Provider value={value}>
      {children}
    </InventoryContext.Provider>
  )
}

