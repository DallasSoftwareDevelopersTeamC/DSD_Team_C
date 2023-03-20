import React, { useContext, useEffect, useState, useRef } from "react";
import './orders.css'
import { OrdersContext } from '../../contexts/orders.context';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faPen } from '@fortawesome/free-solid-svg-icons';


function OrdersPreview() {
    const { orders, reloadOrders, deliveriesOn } = useContext(OrdersContext);
    const activeOrders = orders.filter(item => item.orderStatus === "active")

    useEffect(() => {
        console.log(activeOrders)
    }, [activeOrders]);

    useEffect(() => {
        console.log(deliveriesOn)
    }, [deliveriesOn]);

    const simulateDelivery = async (order) => {
        const deliveryTime = Math.floor(Math.random() * (15000 - 5000 + 1)) + 5000;

        setTimeout(async () => {
            // Update the tempStockamount for this product
            console.log(order.shedArrivalDate)
            console.log('sim prod delivered')

            // Send an update request to the backend to change the order status
            // await updateOrderStatusInBackend(order.id, "delivered");

            // Update the "in stock" amount for the inventory item in the React context
            // updateInventoryStock(order.inventoryItemId, order.quantity);

            // Send an update request to the backend to update the inventory
            // await updateInventoryStockInBackend(order.inventoryItemId, order.quantity);
        }, deliveryTime);
    };

    useEffect(() => {
        if (deliveriesOn) {
            activeOrders.forEach(order => {
                simulateDelivery(order);
            });
        }
    }, [activeOrders, deliveriesOn]);



    return (
        <>

            <div className="order-container" id='orders'>
                
                <table>
                    <thead>
                        <tr className="title-tr">
                            <td><h1>Active Orders</h1></td>
                        </tr>
                        <tr className="order-table-header">

                            <td className="order-preview-sku">SKU</td>
                            <td>Name</td>
                            <td className="order-preview-arrival">Est. Arrival</td>
                            <td>QTY</td>
                            <td>Total Cost</td>
                            <td>Edit</td>
                        </tr>
                    </thead>

                    <tbody className="order-items-container">

                        {Array.isArray(orders) && activeOrders.map((item, index) => (
                            // use key here to get specific item to get (for popup) update or delete. 
                            // item.sku value - this will scroll to selected value from searchInput.jsx
                            <tr key={index}> 
                            {/* the key above takes away the console log error. 
                            a unique key prop is necessary to map over an array to create multiple elements, 
                            each element should have a unique key to help React optimize rendering
                            index used for now, However, using the index as a key is not recommended if your list can change 
                            (e.g., items can be added, removed, or reordered) because it can lead to performance issues and incorrect behavior. 
                            */}

                                <td className="order-preview-sku">
                                    {item.SKU}
                                </td>
                                <td>
                                    {item.product.productName}
                                </td>

                                <td className="order-preview-arrival">
                                    {item.schedArrivalDate || 'n/a'}
                                </td>
                                <td>
                                    {item.orderQty}
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
export default OrdersPreview