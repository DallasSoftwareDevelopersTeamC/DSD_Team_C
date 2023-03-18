import { createContext, useState, useEffect } from "react";
import { getOrdersList } from "../services/ordersAPIcalls";

export const OrdersContext = createContext({
    orders: [],
    reloadOrders: () => { },
    deliveriesOn: false,
    setDeliveriesOn: () => { },
});

export const OrdersProvider = ({ children }) => {
    const [orders, setOrders] = useState([]);
    const [deliveriesOn, setDeliveriesOn] = useState(false);

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

    useEffect(() => {
        console.log("deliveries on in orders.context: " + deliveriesOn)
    }, [deliveriesOn]);

    // orders.context.js



    // -----------------------------------

    const value = { orders, reloadOrders, deliveriesOn, setDeliveriesOn };

    return <OrdersContext.Provider value={value}>{children}</OrdersContext.Provider>;
};
