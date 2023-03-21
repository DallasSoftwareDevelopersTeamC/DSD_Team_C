import React, { useContext, useEffect, useState, useRef } from 'react';
import { useNavigate } from 'react-router-dom';
import './orders.css';
import { OrdersContext } from '../../contexts/orders.context';
import { clearAllOrderHistory } from '../../services/ordersAPIcalls';
import { authenticateUser } from '../../services/authenticationAPIcalls';
import { useQuery } from 'react-query';

function OrderHistory() {
  const navigate = useNavigate();
  const { data, isLoading, isError } = useQuery(
    'authenticateUser',
    authenticateUser,
    {
      onSuccess: (data) => {
        if (data === 'JsonWebTokenError') {
          navigate('/login');
        }
      },
    }
  );
  if (isError) {
    alert(isError);
  }
  const { orders, reloadOrders } = useContext(OrdersContext);
  const orderHistory = orders.filter(
    (item) => item.orderStatus === 'delivered'
  );

  const handleClearHistory = async () => {
    await clearAllOrderHistory();
    reloadOrders();
  };
  /*     useEffect(() => {
            console.log(orderHistory)
        }, [orderHistory]);
     */

  return (
    <>
      <div className="order-container order-history-container">
        <table>
          <thead>
            <tr className="orders-page-title-for-each-table">
              <td>
                <h1>Order History</h1>
              </td>
            </tr>
            <tr className="order-table-header">
              <td className="heading-orderId">Order ID</td>
              <td>SKU</td>
              <td>Name</td>
              <td>Ordered</td>
              <td>Delivered</td>
              <td>QTY</td>
              <td>Shipper</td>
              <td>Total Cost</td>
            </tr>
          </thead>
          <tbody className="order-items-container order-history-body">
            {Array.isArray(orders) &&
              orderHistory.map((item, index) => (
                // use key here to get specific item to get (for popup) update or delete.
                // item.sku value - this will scroll to selected value from searchInput.jsx
                <tr key={item.id}>
                  <td className="orderId">{item.id}</td>
                  <td>{item.SKU}</td>
                  <td>{item.product.productName}</td>
                  <td>{item.orderedDate}</td>
                  <td>{item.delivered || 'n/a'}</td>
                  <td>{item.orderQty}</td>
                  {/* 
                                <td>
                                    {item.shipper}
                                </td> */}
                  <td>{`$${item.totalCost}`}</td>
                </tr>
              ))}
          </tbody>
        </table>
        <div className="clear-history">
          <button className="small-blue-button" onClick={handleClearHistory}>
            Clear History
          </button>
        </div>
      </div>
    </>
  );
}

export default OrderHistory;
