import { createContext, useContext, useState, useEffect } from "react";
import { getInventoryList } from "../services/inventoryAPIcalls";
import { getSettings } from "../services/settingsAPIcalls";
import { updateSetting } from "../services/settingsAPIcalls";
import { useTempInStock } from "../hooks/useTempStock";

import { AuthContext } from "./auth.context";

export const InventoryContext = createContext({
  userData: {},
  userSettings: {},
  inventory: [],
  reloadInventory: () => {},
  startUsage: () => {},
  stopUsage: () => {},
  resetInventory: () => {},
  useSelectedOnlyOn: false,
  setUseSelectedOnlyOn: () => {},
  isUsingStock: false,
  tempInStock: {},
  setTempInStock: () => {},
  selectedItems: [],
  setSelectedItems: () => {},
  toggleSelectedItem: () => {},
  isLoading: false,
});

export const InventoryProvider = ({ children }) => {
  const [userData, setUserData] = useState({});
  const [userSettings, setUserSettings] = useState({});
  const [inventory, setInventory] = useState([]);
  const [isUsingStock, setIsUsingStock] = useState(false);
  const [selectedItems, setSelectedItems] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [tempInStock, setTempInStock] = useState({});
  // this is for demo controls to set the "Use Selected (products) Only" on or off
  const [useSelectedOnlyOn, setUseSelectedOnlyOn] = useState(false);
  const [hasFetchedUserSettings, setHasFetchedUserSettings] = useState(false);

  const { isLoggedIn } = useContext(AuthContext);

  const fetchAndSetSettingsData = async () => {
    if (userData.id) {
      const freshSettingsData = await getSettings(userData.username);
      setUserSettings(freshSettingsData);
      setHasFetchedUserSettings(true); // Add this line
    }
  };
  /* 
  useEffect(() => {
    // console.log('userSettings:  ', userSettings)
    fetchAndSetSettingsData();
  }, [data]); */

  useEffect(() => {
    const fetchData = async () => {
      try {
        const userSettingsData = await getSettings(userData.username);
        setUserSettings(userSettingsData);

        const inventoryData = await getInventoryList(
          userSettingsData.filterBy,
          userSettingsData.sortOrder
        );
        setInventory(inventoryData);
      } catch (error) {
        console.error("Failed to fetch data:", error);
      }
    };

    fetchData();
  }, []);

  const reloadInventory = async (newInventory, updatedSettings) => {
    setIsLoading(true);

    if (newInventory) {
      setInventory(newInventory);
    } else {
      try {
        const filter = updatedSettings?.filterBy || userSettings.filterBy;
        const sort = updatedSettings?.sortOrder || userSettings.sortOrder;

        const data = await getInventoryList(filter, sort);
        setInventory(data);
      } catch (error) {
        console.error("Error fetching inventory list:", error);
      }
    }

    setIsLoading(false);
  };

  // load inventory on page load
  useEffect(() => {
    // authenticateUser();
    reloadInventory();
  }, [isLoggedIn]);

  // call the tempInStock hook that takes care of decreasing the inventory
  useTempInStock(
    inventory,
    isUsingStock,
    setIsUsingStock,
    tempInStock,
    setTempInStock,
    useSelectedOnlyOn,
    selectedItems,
    hasFetchedUserSettings
  );

  // -----------------------  toggle selected items ---------------------
  const getInventoryIndex = (itemId) => {
    return inventory.findIndex((item) => item.id === itemId);
  };

  const toggleSelectedItem = async (itemId) => {
    setSelectedItems((prevSelectedItems) => {
      const prevSelectedItemsArray = Array.from(prevSelectedItems);
      // Check if the item is already selected
      const itemIndexInSelected = prevSelectedItemsArray.indexOf(itemId);
      if (itemIndexInSelected !== -1) {
        // Remove the item from the selected items array
        console.log(
          "1) prevSelectedItemsArray before removing:  ",
          prevSelectedItemsArray
        );
        prevSelectedItemsArray.splice(itemIndexInSelected, 1);
        console.log(
          "2) prevSelectedItemsArray after removing:  ",
          prevSelectedItemsArray
        );
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
      // Filter out invalid item IDs
      const validSelectedItemsArray = prevSelectedItemsArray.filter(
        (selectedItemId) => inventory.some((item) => item.id === selectedItemId)
      );

      // Update the settings after modifying the selected items array
      updateSetting(userData.username, { selected: prevSelectedItemsArray });
      // return the array
      return prevSelectedItemsArray;
    });
  };

  // ---------- save selected items to database and pull from db on page load --------
  const [attemptedToGetSelectedItems, setAttemptedToGetSelectedItems] =
    useState(false);
  useEffect(() => {
    // if selected items is empty and haven't attempted to get them yet and userSettings is defined, get selected items userSettings
    if (
      !selectedItems.length &&
      !attemptedToGetSelectedItems &&
      userSettings &&
      hasFetchedUserSettings &&
      // only match selectedItems array if it doesn't match user.settings
      selectedItems !== userSettings.selected
    ) {
      setSelectedItems(userSettings.selected || []);
      setAttemptedToGetSelectedItems(true);
    }
  }, [selectedItems, userSettings]);

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
    userSettings,
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
