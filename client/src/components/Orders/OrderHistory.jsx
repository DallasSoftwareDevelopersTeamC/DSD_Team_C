import React from "react";
import './orders.css'

function OrderHistory() {
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
                        <td>Order ID</td>
                        <td>SKU</td>
                        <td>Name</td>
                        <td>Ordered</td>
                        <td>Delivered</td>
                        <td>QTY</td>
                        <td>Name</td>
                        <td>Address</td>
                        <td>Phone</td>
                        <td>Total Cost</td>
                        <td>Edit</td>
                    </tr>
                </thead>
                <tbody className="order-items-container">
                  <tr>
                    <td>00000</td>
                    <td>-</td>
                    <td>-</td>
                    <td>-</td>
                    <td>-</td>
                    <td>-</td>
                    <td>-</td>
                    <td>-</td>
                    <td>-</td>
                    <td>-</td>
                    <td><button>Edit</button></td>
                  </tr>
                  <tr>
                    <td>00000</td>
                    <td>-</td>
                    <td>-</td>
                    <td>-</td>
                    <td>-</td>
                    <td>-</td>
                    <td>-</td>
                    <td>-</td>
                    <td>-</td>
                    <td>-</td>
                    <td><button>Edit</button></td>
                  </tr>
                </tbody>
            </table>
        </div>
    </>
    )
}

export default OrderHistory