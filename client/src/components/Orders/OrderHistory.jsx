import React, { useContext, useEffect, useState, useRef } from "react";
import './orders.css'
import { OrdersContext } from '../../contexts/orders.context';


function OrderHistory() {
    const { orders, reloadOrders } = useContext(OrdersContext);
    const orderHistory = orders.filter(item => item.orderStatus === "delivered")

    /*     useEffect(() => {
            console.log(orderHistory)
        }, [orderHistory]);
     */

    return (
        <>
            <div className="title-container">
                <h4>Order History</h4>
                <p className="ord-p">Shippers Info</p>
            </div>
            <div className="order-container">
                <table>
                    <thead>
                        <tr className="order-table-header">
                            <td className="heading-orderId">Order ID</td>
                            <td>SKU</td>
                            <td>Name</td>
                            <td>Ordered</td>
                            <td>Delivered</td>
                            <td>QTY</td>
                            <td>Shipper</td>
                            <td>Total Cost</td>
                            <td>Edit</td>
                        </tr>
                    </thead>
                    <tbody className="order-items-container">
                        {Array.isArray(orders) && orderHistory.map((item, index) => (
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
                                    {item.delivered || 'n/a'}
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
                </table>
            </div>
        </>
    )
}

export default OrderHistory