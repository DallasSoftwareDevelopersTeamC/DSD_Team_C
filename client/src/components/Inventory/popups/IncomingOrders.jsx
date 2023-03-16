import React, { useState, useEffect } from 'react';

export default function Incoming({ handleClosePopup, popup, item, reloadInventory }) {

    return (
        <div className='popup'>
            <table className='popup-table'>
                <thead className='popup-thead'>
                    <tr id='popup-tr'>
                        <td className='popup-td-head'>SKU</td>
                        <td className='popup-td-head'>Product</td>
                        <td className='popup-td-head'>Orders</td>
                        <td className='popup-td-head'>Total Incoming QTY</td>

                    </tr>
                </thead>
                <tbody>
                    <tr id='popup-tr'>
                        <td className='popup-td'>{item.sku}</td>
                        <td className='popup-td'>{item.productName}</td>
                        <td className='popup-td'>
                            {item.orders.map((order) => (
                                <div key={order.shedArrivalDate}>
                                    {order.shedArrivalDate}
                                </div>
                            ))}
                        </td>
                        <td className='popup-td'>
                            {item.orders.reduce((total, order) => (
                                total + order.orderQty
                            ), 0)}
                        </td>

                    </tr>
                </tbody>
            </table>
            <div className='button-table-container'>
                <button className="popup-button">View more</button>
                <button id="close" onClick={(event) => handleClosePopup(event)} className={popup == "close" ? "hide" : "show"}>Close</button>
            </div>
        </div>
    )
}