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
    const [userData, setUserData] = useState({})
    const [companyId, setCompanyId] = useState(null);
    const [orders, setOrders] = useState([]);
    const [activeOrders, setActiveOrders] = useState([]);
    const [deliveriesOn, setDeliveriesOn] = useState(false);

    const { data } = useQuery('authenticateUser', authenticateUser, {
        onSuccess: (data) => {
            if (data !== 'JsonWebTokenError' && data !== 'TokenExpiredError') {
                setUserData(data)
                // console.log(data)
                setCompanyId(data.companyID);
            }
        },
    });

    const reloadOrders = async () => {
        try {
            if (companyId) {
                const ordData = await getOrdersList(companyId);
                setOrders(ordData);
            }
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
