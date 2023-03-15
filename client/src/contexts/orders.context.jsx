import { createContext, useState, useEffect } from "react";
import { getOrdersList } from "../services/ordersAPIcalls";

export const OrdersContext = createContext({
    orders: [],
    reloadOrders: () => { },
});

export const OrdersProvider = ({ children }) => {
    const [orders, setOrders] = useState([]);


    const reloadOrders = async () => {
        try {
            const data = await getOrdersList();
            setOrders(data);
        } catch (error) {
            console.error("Error fetching orders list:", error);
        }
    };

    useEffect(() => {
        reloadOrders();
    }, []);


    // -----------------------------------

    const value = { orders, reloadOrders };

    return <OrdersContext.Provider value={value}>{children}</OrdersContext.Provider>;
};
