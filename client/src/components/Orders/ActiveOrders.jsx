import React, { useContext, useEffect, useState, useRef } from "react";
import './orders.css'
import { OrdersContext } from '../../contexts/orders.context';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faPen } from '@fortawesome/free-solid-svg-icons';


function ActiveOrders() {
    const { orders, reloadOrders } = useContext(OrdersContext);
    const [itemId, setItemId] = useState(0)

    useEffect(() => {
        console.log(orders)
    }, [orders]);

    /* 
        const { timerState } = useContext(TimerContext); // You should create this context for managing timer state.
        const timers = useRef({});
    
        const handleDelivery = (order) => {
            if (timers.current[order.id]) clearTimeout(timers.current[order.id]);
    
            const remainingTime = order.timeRemaining || order.deliveryTime;
            timers.current[order.id] = setTimeout(() => {
                // Handle order delivery logic here.
                console.log("Order delivered:", order.id);
            }, remainingTime);
        };
    
        useEffect(() => {
            if (Array.isArray(orders)) {
                orders
                    .filter((item) => item.orderStatus === "active")
                    .forEach((item) => {
                        handleDelivery(item);
                    });
            }
        }, [orders]);
    
        // loop through active orders and call handleDelivery for each
        useEffect(() => {
            if (timerState === "paused") {
                for (const orderId in timers.current) {
                    clearTimeout(timers.current[orderId]);
                }
            } else if (timerState === "playing") {
                orders
                    .filter((item) => item.orderStatus === "active")
                    .forEach((item) => {
                        handleDelivery(item);
                    });
            }
        }, [timerState]); */




    // --------------------- all popups --------------------------

    /*     const [popup, setPopup] = useState(null);
        const handleOpenPopup = (itemId, event) => {
            if (event && event.target) {
                setPopup(event.target.id);
                console.log(itemId)
                setItemId(itemId)
            }
        };
        const handleClosePopup = (event) => {
            setPopup(event.target.id);
        } */



    return (
        <>
            <div className="title-container">
                <h4>Active Orders</h4>
                <p className="ord-p">Shippers Info</p>
            </div>
            <div className="order-container" id='orders'>
                <table>
                    <thead>
                        <tr className="order-table-header">
                            <td className="heading-orderId">Order ID</td>
                            <td>SKU</td>
                            <td>Name</td>
                            <td>Ordered</td>
                            <td>Est. Arrival</td>
                            <td>QTY</td>
                            <td>Shipper</td>
                            <td>Total Cost</td>
                            <td>Edit</td>
                        </tr>
                    </thead>

                    <tbody className="order-items-container">

                        {Array.isArray(orders) && orders.filter(item => item.orderStatus === "active").map((item, index) => (
                            // use key here to get specific item to get (for popup) update or delete. 
                            // item.sku value - this will scroll to selected value from searchInput.jsx
                            <tr>
                                <td className="orderId">
                                    {item.id}
                                </td>
                                <td>
                                    {item.SKU}
                                </td>
                                <td>
                                    {item.product.productName}
                                </td>
                                <td>
                                    {item.orderedDate}
                                </td>
                                <td>
                                    {item.shedArrivalDate || 'n/a'}
                                </td>
                                <td>
                                    {item.orderQty}
                                </td>

                                <td>
                                    {item.shipper}
                                </td>
                                <td>
                                    {`$${item.totalCost}`}
                                </td>
                                <td>
                                    <button id="settings" onClick={(event) => handleOpenPopup(item.id, event)}
                                    >
                                        <FontAwesomeIcon
                                            icon={faPen}
                                            className="fa-icon"
                                            style={{ pointerEvents: 'none' }}
                                        />
                                    </button>
                                </td>
                            </tr>
                        ))}

                    </tbody>

                </table >

                {/*      {
                popup == 'edit' && (
                    <EditPopup handleClosePopup={handleClosePopup} popup={popup} itemId={itemId} reloadOrders={handleReloadInventory} />
                )
            } */}

            </div >
        </>
    );
}

/* return (
<>
                 
                    <div className="order-container">
                        <table>
                            <thead>
                                <tr className="order-table-header">
                                    <td>Order ID</td>
                                    <td>SKU</td>
                                    <td>Name</td>
                                    <td>Ordered</td>
                                    <td>Est. Arrival</td>
                                    <td>QTY</td>
                                    <td>Name</td>
                                    <td>Address</td>
                                    <td>Phone</td>
                                    <td>Total Cost</td>
                                    <td>Edit</td>
                                </tr>
                            </thead>
                            <tbody className="order-items-container">
                        
                        
                            </tbody>
                        </table>
                    </div>
                </>
                )
} */
export default ActiveOrders