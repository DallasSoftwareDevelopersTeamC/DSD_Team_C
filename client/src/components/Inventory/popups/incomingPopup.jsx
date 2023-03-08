import React, { Component } from 'react';

export default function Incoming({ handleClick, popup }) {
    return (
        <div className='popup'>
            <table className='popup-cont'>
                <thead className='popup-row-header'>
                    <td>Product</td>
                    <td>Vendor</td>
                    <td>Name</td>
                    <td>Price Ea</td>
                    <td>Shipping Cost</td>
                    <td>Total</td>
                </thead>
                <tbody className='body'>
                    <td>--</td>
                    <td>--</td>
                    <td>--</td>
                    <td>--</td>
                    <td>--</td>
                    <td>--</td>
                    <td>--</td>
                </tbody>
            </table>
            <tbody className='btn-cont'>
                <td><button className="pop-btn-order">View more</button></td>
                <td><button id="close" onClick={(event) => handleClick(event)} className={popup == "close" ? "hide" : "show"}>Close</button></td>
            </tbody>
        </div>
    )
}
