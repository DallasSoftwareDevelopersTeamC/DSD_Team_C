import { createContext, useState, useEffect } from "react";
import { getOrdersList } from "../services/ordersAPIcalls";

export const OrdersContext = createContext({
    orders: [],
    reloadOrders: () => { },
    deliveryState: false,
    setDeliveryState: () => { },
});

export const OrdersProvider = ({ children }) => {
    const [orders, setOrders] = useState([]);
    const [deliveryState, setDeliveryState] = useState(false);

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

    // orders.context.js



    // -----------------------------------

    const value = { orders, reloadOrders, deliveryState, setDeliveryState };

    return <OrdersContext.Provider value={value}>{children}</OrdersContext.Provider>;
};
