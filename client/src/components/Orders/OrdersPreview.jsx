import React, { useContext, useEffect, useState, useRef } from 'react';
import { useNavigate } from 'react-router-dom';
import './orders.css';
import { OrdersContext } from '../../contexts/orders.context';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faPen } from '@fortawesome/free-solid-svg-icons';
import { Link } from 'react-router-dom';
import { updateOrderItem } from '../../services/ordersAPIcalls';
import {
  handleOrderDelivery,
  orderEnRouteTimer,
  pauseAllTimeouts,
} from '../../utils/orderHelpers';
import { authenticateUser } from '../../services/authenticationAPIcalls';
import { useQuery } from 'react-query';
function OrdersPreview() {
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

  const { orders, activeOrders, reloadOrders, deliveriesOn } =
    useContext(OrdersContext);

  /*   useEffect(() => {
      console.log(activeOrders);
    }, [activeOrders]); */

  // Load remaining time from localStorage for each active order and store it in the useRef object
  /*   useEffect(() => {
    activeOrders.forEach((order) => {
      const remainingTime = localStorage.getItem(`orderRemainingTime_${order.id}`);
      console.log(`remaining time from local storage:  ${remainingTime}`);
      // if there was a value stored in local storage for remaining setTimout function time, then add the remaining time to the timeout ref object
      if (remainingTime) {
        
        timeouts.current[order.id] = {
          remainingTime: Number(remainingTime),
        };
        localStorage.removeItem(`orderRemainingTime_${order.id}`);
      }
    });
  }, [activeOrders]); */

  // useRef used to maintain mutable data that doesn't cause any rerenders
  const timeouts = useRef({});

  useEffect(() => {
    console.log('useRef value:  ', timeouts.current);
  }, [timeouts]);

  // useEffect(() => {
  //   if (deliveriesOn) {
  //     activeOrders.forEach((order) => {
  //       // if timeout was not paused (it has no value in the "timeouts" useRef), then call the orderEnRouteTimer function with a fresh start
  //       if (!timeouts.current[order.id]) {
  //         orderEnRouteTimer(order, timeouts);
  //       }
  //       // if the timeout was paused (then it has a value in "timeouts" useRef), call the orderEnRouteTimer function with the remaining time argument
  //       else {
  //         const { startTime, deliveryDuration } = timeouts.current[order.id];

  //         const elapsedTime = Date.now() - startTime;
  //         const remainingTimeCalc = deliveryDuration - elapsedTime;
  //         const remainingTime = remainingTimeCalc < 0 ? null : remainingTimeCalc;

  //         clearTimeout(timeouts.current[order.id].timeoutFunction); // Clear previous timeout
  //         timeouts.current[order.id].startTime = Date.now(); // Update startTime before resuming the timer
  //         orderEnRouteTimer(order, timeouts, remainingTime); // Start a new timeout with the remaining time
  //       }
  //     });
  //     reloadOrders();
  //   } else {
  //     pauseAllTimeouts(timeouts);
  //   }
  // }, [activeOrders, deliveriesOn]);

  // Before unmounting, store remaining time in localStorage for each order
  /*   useEffect(() => {
      return () => {
        Object.entries(timeouts.current).forEach(([orderId, { timeoutFunction, remainingTime }]) => {
          clearTimeout(timeoutFunction);
          localStorage.setItem(`orderRemainingTime_${orderId}`, remainingTime);
        });
      };
    }, []); */

  return (
    <>
      <div className="order-container" id="orders">
        <table>
          <thead>
            <tr className="title-tr">
              <td>
                <h1>Active Orders</h1>
              </td>
              <td>
                <Link to="/orders" className="small-blue-button">
                  View all
                </Link>
              </td>
            </tr>
            <tr className="order-table-header">
              <td className="order-preview-sku">SKU</td>
              <td className="order-preview-qty">QTY</td>
              <td className="order-preview-arrival">Est. Arrival</td>
              <td>Total Cost</td>
              <td>Edit</td>
            </tr>
          </thead>

          <tbody className="order-items-container">
            {Array.isArray(orders) &&
              activeOrders.map((item, index) => (
                // use key here to get specific item to get (for popup) update or delete.
                // item.sku value - this will scroll to selected value from searchInput.jsx
                <tr key={item.id}>
                  {/* the key above takes away the console log error. 
                            a unique key prop is necessary to map over an array to create multiple elements, 
                            each element should have a unique key to help React optimize rendering 
                            */}

                  <td className="order-preview-sku">{item.SKU}</td>

                  <td className="order-preview-qty">{item.orderQty}</td>

                  <td className="order-preview-arrival">
                    {item.schedArrivalDate || 'n/a'}
                  </td>

                  <td>{`$${item.totalCost}`}</td>
                  <td>
                    <button
                      id="settings"
                      onClick={(event) => handleOpenPopup(item.id, event)}
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

        {/*      {
                popup == 'edit' && (
                    <EditPopup handleClosePopup={handleClosePopup} popup={popup} itemId={itemId} reloadOrders={handleReloadInventory} />
                )
            } */}
      </div>
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
export default OrdersPreview;
