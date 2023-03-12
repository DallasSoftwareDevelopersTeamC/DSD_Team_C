export const decreaseStock = (inventory, itemId, quantity, usageSpeed) => {
    const updatedInventory = [...inventory];
    const itemIndex = updatedInventory.findIndex(item => item.id === itemId);
    if (itemIndex !== -1) {
        const item = updatedInventory[itemIndex];
        const decreaseDelay = usageSpeed * 1000; // Modify the delay calculation
        setTimeout(() => {
            if (item.stock >= quantity) {
                item.stock -= quantity;
            } else {
                throw new Error(`Insufficient stock for item "${item.name}"`);
            }
            updatedInventory[itemIndex] = item;
        }, decreaseDelay);
        return updatedInventory;
    } else {
        throw new Error(`Item with ID "${itemId}" not found in inventory`);
    }
};
