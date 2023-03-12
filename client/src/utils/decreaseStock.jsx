/* export const decreaseStock = (prevInventory, itemId, quantity, usageSpeed) => {
    const updatedInventoryPromises = prevInventory.map(item => {
        if (item.id === itemId) {
            const decreaseDelay = usageSpeed * 1000;
            return new Promise(resolve => {
                setTimeout(() => {
                    if (item.inStock >= quantity) {
                        const updatedItem = { ...item, inStock: item.inStock - quantity };
                        if (updatedItem.inStock === 0) {
                            console.log(`Item "${updatedItem.productName}" is out of stock`);
                        }
                        resolve(updatedItem);
                    } else {
                        throw new Error(`Insufficient stock for item "${item.productName}"`);
                    }
                }, decreaseDelay);
            });
        }
        return Promise.resolve(item);
    });
    return Promise.all(updatedInventoryPromises);
};
 */