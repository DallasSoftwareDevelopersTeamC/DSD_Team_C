import { createContext, useState, useEffect } from 'react';
import { updateSetting } from '../services/settingsAPIcalls';
import { updateUser } from '../services/userAPIcalls';
import { getUser } from '../services/userAPIcalls';

export const PinningContext = createContext({
  pinnedItems: [],
  pinItem: () => {},
  unpinItem: () => {},
  isPinned: () => {},
});

export const PinningProvider = ({ children, userData }) => {
  const [pinnedItems, setPinnedItems] = useState([]);

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
      await user.settings.pinned.push(Number(itemId));

      // Make sure the user object exists and has a pinnedItems property
      if (!user || !user.settings.pinned) {
        console.log('User data is invalid');
        return;
      }
      // Add the itemId to the pinnedItems array
      const updatedSettings = await {
        pinned: user.settings.pinned,
      };
      // console.log(updatedUser);
      // Update the user data in the API
      await updateSetting(userData.username, updatedSettings);
      // Update the user data in the context
      getUser(userData.id);
    } catch (error) {
      console.error(error);
    }
  };

  const unpinItem = async (itemId) => {
    try {
      // Get the user data from the API
      const user = await getUser(userData.id);

      // Make sure the user object exists and has a pinnedItems property
      if (!user || !user.pinnedItems) {
        console.log('User data is invalid');
        return;
      }

      // Remove the itemId from the pinnedItems array
      const updatedPinnedItems = user.pinnedItems.filter((id) => id !== itemId);

      // Update the user data in the API
      const updatedUser = { ...user, pinnedItems: updatedPinnedItems };
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
    <PinningContext.Provider value={value}>{children}</PinningContext.Provider>
  );
};
