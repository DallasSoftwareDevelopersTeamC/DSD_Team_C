import { useState, useEffect } from 'react';

export const useTempInStock = (inventory, isUsingStock, tempInStock, setTempInStock) => {

    // -------------- use tempInStock state that is declared in the inventory.context to setTempInStock-------------

    useEffect(() => {
        const inStockData = {};
        inventory.forEach((item) => {
            inStockData[item.id] = item.inStock;
        });
        setTempInStock(inStockData);

        console.log(tempInStock)
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

    return [setTempInStock];
}
