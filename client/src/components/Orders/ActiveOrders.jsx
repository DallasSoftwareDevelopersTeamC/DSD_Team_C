import React, { useContext, useEffect, useState } from "react";
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


                        {/* this is what creates each list item by mapping over orders (which is pulled in from context) */}
                        {Array.isArray(orders) && orders.map((item, index) => (
                            // use key here to get specific item to get (for popup) update or delete. 
                            // item.sku value - this will scroll to selected value from searchInput.jsx
                            <tr>
                                <td>
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
                                    {item.shedArrivalDate}
                                </td>
                                <td>
                                    {item.orderQty}
                                </td>
                                <td>
                                    {item.shipperName}
                                </td>
                                <td>
                                    {item.shipperPhone}
                                </td>
                                <td>
                                    {item.totalCost}
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