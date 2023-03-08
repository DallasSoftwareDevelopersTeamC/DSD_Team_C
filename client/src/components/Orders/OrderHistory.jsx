import React from "react";
import './orderhistory.css'

function OrderHistory() {
    return (
        <div>
            <div className="head-order-cont">
                <h2>Order History</h2>
                <p className="ord-p">Shippers Info</p>
            </div>
            <div className="order-container">
                <div className="order-row header">
                    <div className="order-cell">Order ID</div>
                    <div className="order-cell">SKU</div>
                    <div className="order-cell">Name</div>
                    <div className="order-cell">Ordered</div>
                    <div className="order-cell">Delivered</div>
                    <div className="order-cell">QTY</div>
                    <div className="order-cell">Name</div>
                    <div className="order-cell">Address</div>
                    <div className="order-cell">Phone</div>
                    <div className="order-cell">Total Cost</div>
                    <div className="order-cell">Edit</div>
                </div>
                <div className="order-row">
                    <div className="order-cell">00000</div>
                    <div className="order-cell">-</div>
                    <div className="order-cell">-</div>
                    <div className="order-cell">-</div>
                    <div className="order-cell">-</div>
                    <div className="order-cell">-</div>
                    <div className="order-cell">-</div>
                    <div className="order-cell">-</div>
                    <div className="order-cell">-</div>
                    <div className="order-cell">-</div>
                    <div className="order-cell"><button>Edit</button></div>
                </div>
                <div className="order-row">
                    <div className="order-cell">00000</div>
                    <div className="order-cell">-</div>
                    <div className="order-cell">-</div>
                    <div className="order-cell">-</div>
                    <div className="order-cell">-</div>
                    <div className="order-cell">-</div>
                    <div className="order-cell">-</div>
                    <div className="order-cell">-</div>
                    <div className="order-cell">-</div>
                    <div className="order-cell">-</div>
                    <div className="order-cell"><button>Edit</button></div>
                </div>
            </div>
        </div>
    )
}

export default OrderHistory