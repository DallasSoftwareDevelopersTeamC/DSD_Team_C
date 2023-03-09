import React, { Component } from 'react';

export default function Incoming({ handleClick, popup }) {
    return (
        <div className='popup'>
            <table>
                <thead>
                    <td>Product</td>
                    <td>Vendor</td>
                    <td>Name</td>
                    <td>Price Ea</td>
                    <td>Shipping Cost</td>
                    <td>Total</td>
                </thead>
                <tbody>
                    <td>--</td>
                    <td>--</td>
                    <td>--</td>
                    <td>--</td>
                    <td>--</td>
                    <td>--</td>
                    <td>--</td>
                </tbody>
            </table>
            <tbody id='button-table-container'>
                <td><button className="popup-button">View more</button></td>
                <td><button id="close" onClick={(event) => handleClick(event)} className={popup == "close" ? "hide" : "show"}>Close</button></td>
            </tbody>
        </div>
    )
}
