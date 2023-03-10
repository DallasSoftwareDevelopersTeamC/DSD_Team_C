import React, { Component } from 'react';

export default function Incoming({ handleClosePopup, popup }) {
    return (
        <div className='popup'>
            <table>
                <thead>
                    <tr id='popup-tr'>
                        <td>Product</td>
                        <td>Vendor</td>
                        <td>Name</td>
                        <td>Price Ea</td>
                        <td>Shipping Cost</td>
                        <td>Total</td>
                    </tr>
                </thead>
                <tbody>
                    <tr id='popup-tr'>
                        <td>--</td>
                        <td>--</td>
                        <td>--</td>
                        <td>--</td>
                        <td>--</td>
                        <td>--</td>
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