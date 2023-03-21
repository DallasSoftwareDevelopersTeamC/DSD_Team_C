import { createContext, useState, useEffect } from "react";
import { getOrdersList } from "../services/ordersAPIcalls";

export const OrdersContext = createContext({
    orders: [],
    activeOrders: [],
    reloadOrders: () => { },
    deliveriesOn: false,
    setDeliveriesOn: () => { },
});

export const OrdersProvider = ({ children }) => {
    const [orders, setOrders] = useState([]);
    const [activeOrders, setActiveOrders] = useState([]);
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
        const onlyActive = orders.filter(item => item.orderStatus === "active");
        setActiveOrders(onlyActive);
    }, [orders]);


    // -----------------------------------

    const value = { orders, activeOrders, reloadOrders, deliveriesOn, setDeliveriesOn };

    return <OrdersContext.Provider value={value}>{children}</OrdersContext.Provider>;
};
