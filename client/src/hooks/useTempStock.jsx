import { useState, useEffect } from 'react';

export const useTempInStock = (inventory, isUsingStock) => {

    // -------------- store temp inStock values and refresh page every second -------------

    const [tempInStock, setTempInStock] = useState({});
    useEffect(() => {
        const inStockData = {};
        inventory.forEach((item) => {
            inStockData[item.id] = item.inStock;
        });
        setTempInStock(inStockData);
    }, [inventory]);

    // ----------- Update tempInStock every second based on its previous value ---------
    useEffect(() => {
        let intervalId = null;
        if (isUsingStock === true) {
            intervalId = setInterval(() => {
                setTempInStock((prevInStock) => {
                    const updatedInStock = {};
                    inventory.forEach((item) => {
                        updatedInStock[item.id] =
                            prevInStock[item.id] > 0 ? prevInStock[item.id] - 1 : 0;
                    });
                    return updatedInStock;
                });
            }, 2000);
        }
        return () => clearInterval(intervalId);
    }, [inventory, isUsingStock]);

    return [tempInStock, setTempInStock];
}
