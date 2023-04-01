import { createContext, useState, useEffect } from 'react';
import { updateUser } from '../services/userAPIcalls';
import { getUser } from '../services/userAPIcalls';


export const PinningContext = createContext({
  pinnedItems: [],
  pinItem: () => {},
  unpinItem: () => {},
  isPinned: () => {},
});

export const PinningProvider = ({ children, userData }) => {
  const [pinnedItems, setPinnedItems] = useState(userData?.settings?.pinned || []);


  useEffect(() => {
    // Load pinned items from the user's settings when the component mounts
    // or when userData updates
    if (userData?.settings?.pinned) {
      setPinnedItems(userData.settings.pinned);
    }
  }, [userData]);

  const pinItem = async (itemId) => {
    try {
      const updatedPinnedItems = [...pinnedItems, itemId];
      const updatedUser = { ...userData, settings: { ...userData.settings, pinned: updatedPinnedItems } };
      const response = await updateUser(userData.username, updatedUser);
      setPinnedItems(updatedPinnedItems);
    } catch (error) {
      console.error(error);
    }
  };
  
  const unpinItem = async (itemId) => {
    try {
      const updatedPinnedItems = pinnedItems.filter((id) => id !== itemId);
      const updatedUser = { ...userData, settings: { ...userData.settings, pinned: updatedPinnedItems } };
      const response = await updateUser(userData.username, updatedUser);
      setPinnedItems(updatedPinnedItems);
    } catch (error) {
      console.error(error);
    }
  };
  
  

  const isPinned = (itemId) => {
    return pinnedItems.includes(itemId);
  };

  const value = {
    pinnedItems,
    pinItem,
    unpinItem,
    isPinned,
  };

  return (
      <PinningContext.Provider value={value}>
        {children}
      </PinningContext.Provider>
  );
};
