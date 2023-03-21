import React, { useContext, useEffect, useState, useRef } from "react";
import './orders.css'
import { OrdersContext } from '../../contexts/orders.context';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faPen } from '@fortawesome/free-solid-svg-icons';
import { Link } from "react-router-dom";
<<<<<<< HEAD


function OrdersPreview() {
    const { orders, reloadOrders, deliveriesOn } = useContext(OrdersContext);
    const activeOrders = orders.filter(item => item.orderStatus === "active")
=======
import { updateOrderItem } from "../../services/ordersAPIcalls";


function OrdersPreview() {
    const { orders, activeOrders, reloadOrders, deliveriesOn } = useContext(OrdersContext);
>>>>>>> c09350e67965cc550b32a79ffd40cad8e29172f9

    useEffect(() => {
        console.log(activeOrders)
    }, [activeOrders]);

    useEffect(() => {
        console.log(deliveriesOn)
    }, [deliveriesOn]);

    const simulateDelivery = async (order) => {
<<<<<<< HEAD
        const deliveryTime = Math.floor(Math.random() * (15000 - 5000 + 1)) + 5000;
=======
        const deliveryTime = Math.floor(Math.random() * (25001)) + 2000;
>>>>>>> c09350e67965cc550b32a79ffd40cad8e29172f9

        setTimeout(async () => {
            // Update the tempStockamount for this product
            console.log(order.shedArrivalDate)
            console.log('sim prod delivered')

<<<<<<< HEAD
            // Send an update request to the backend to change the order status
            // await updateOrderStatusInBackend(order.id, "delivered");
=======
            const updatedItem = { orderStatus: "delivered" };
            const itemId = order.id;
            await updateOrderItem(itemId, updatedItem);
            reloadOrders();
>>>>>>> c09350e67965cc550b32a79ffd40cad8e29172f9

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
<<<<<<< HEAD
                
=======

>>>>>>> c09350e67965cc550b32a79ffd40cad8e29172f9
                <table>
                    <thead>
                        <tr className="title-tr">
                            <td><h1>Active Orders</h1></td>
<<<<<<< HEAD
                            <td><Link to='/orders' className="view-all">View all</Link></td>
=======
                            <td><Link to='/orders' className="small-blue-button">View all</Link></td>
>>>>>>> c09350e67965cc550b32a79ffd40cad8e29172f9
                        </tr>
                        <tr className="order-table-header">

                            <td className="order-preview-sku">SKU</td>
<<<<<<< HEAD
                            <td>Name</td>
                            <td className="order-preview-arrival">Est. Arrival</td>
                            <td>QTY</td>
=======
                            <td className="order-preview-arrival">Est. Arrival</td>
                            <td className="order-preview-qty">QTY</td>
>>>>>>> c09350e67965cc550b32a79ffd40cad8e29172f9
                            <td>Total Cost</td>
                            <td>Edit</td>
                        </tr>
                    </thead>

                    <tbody className="order-items-container">

                        {Array.isArray(orders) && activeOrders.map((item, index) => (
                            // use key here to get specific item to get (for popup) update or delete. 
                            // item.sku value - this will scroll to selected value from searchInput.jsx
<<<<<<< HEAD
                            <tr key={item.id}> 
                            {/* the key above takes away the console log error. 
=======
                            <tr key={item.id}>
                                {/* the key above takes away the console log error. 
>>>>>>> c09350e67965cc550b32a79ffd40cad8e29172f9
                            a unique key prop is necessary to map over an array to create multiple elements, 
                            each element should have a unique key to help React optimize rendering 
                            */}

                                <td className="order-preview-sku">
                                    {item.SKU}
                                </td>
<<<<<<< HEAD
                                <td>
                                    {item.product.productName}
                                </td>
=======
>>>>>>> c09350e67965cc550b32a79ffd40cad8e29172f9

                                <td className="order-preview-arrival">
                                    {item.schedArrivalDate || 'n/a'}
                                </td>
<<<<<<< HEAD
                                <td>
=======
                                <td className="order-preview-qty">
>>>>>>> c09350e67965cc550b32a79ffd40cad8e29172f9
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