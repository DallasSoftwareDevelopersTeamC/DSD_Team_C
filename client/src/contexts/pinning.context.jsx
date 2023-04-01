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
      // Get the user data from the API
      const user = await getUser(userData.id);
  
      // Make sure the user object exists and has a settings.pinned property
      if (!user || !user.settings || !user.settings.pinned) {
        console.log('User data is invalid');
        return;
      }
  
      // Check if the itemId is already in the pinned items
      if (user.settings.pinned.includes(itemId)) {
        console.log('Item is already pinned');
        return;
      }
  
      // Add the itemId to the settings.pinned array
      const updatedPinnedItems = [...user.settings.pinned, itemId];
      const updatedUser = { ...user, settings: { ...user.settings, pinned: updatedPinnedItems } };

      console.log('Pinning item:', itemId);
      console.log('Updated pinned items:', updatedPinnedItems);
      console.log('Updated user:', updatedUser);
  
      // Update the user data in the API
      const response = await updateUser(userData.id, updatedUser);
  
      // Update the user data in the context
      setPinnedItems(updatedPinnedItems);
    } catch (error) {
      console.error(error);
    }
  };
  
  
  const unpinItem = async (itemId) => {
    try {
      // Get the user data from the API
      const user = await getUser(userData.id);
  
      // Make sure the user object exists and has a settings.pinned property
      if (!user || !user.settings || !user.settings.pinned) {
        console.log('User data is invalid');
        return;
      }
  
      // Remove the itemId from the settings.pinned array
      const updatedPinnedItems = user.settings.pinned.filter((id) => id !== itemId);
  
      // Update the user data in the API
      const updatedUser = { ...user, settings: { ...user.settings, pinned: updatedPinnedItems } };

      console.log('Unpinning item:', itemId);
      console.log('Updated pinned items:', updatedPinnedItems);
      console.log('Updated user:', updatedUser);

      const response = await updateUser(userData.id, updatedUser);
  
      // Update the user data in the context
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
