import React, { useState, useEffect, useContext } from 'react';
import { OrdersContext } from '../../../contexts/orders.context';
import { createOrderItem } from '../../../services/ordersAPIcalls';
import calculateTotal from '../../../utils/calcShippingAndTotal';

export default function Order({ handleClosePopup, popup, item, handleReloadInventory }) {
  const { reloadOrders } = useContext(OrdersContext);

  const [orderQty, setOrderQty] = useState(0)
  const [shippingCost, setShippingCost] = useState(0);
  const [totalCost, setTotalCost] = useState(0);

  useEffect(() => {
    setOrderQty(item.orderQty);
  }, [item]);


  const handleCalculateTotals = () => {
    const qty = parseFloat(orderQty);
    const price = parseFloat(item.unitPrice);

    if (isNaN(qty) || isNaN(price)) {
      setShippingCost(0);
      setTotalCost(0);
    } else {
      const { ship, total } = calculateTotal(orderQty, item.unitPrice)
      setShippingCost(ship)
      setTotalCost(total)
    }
  }

  const handleQtyChange = (event) => {
    const newQty = Number(event.target.value)
    setOrderQty(newQty)
  }

  // calc totals again when input chnages
  useEffect(() => {
    handleCalculateTotals();
  }, [orderQty]);

  /*   useEffect(() => {
      handleGetItem(itemId);
    }, [itemId]); */


  // -------------------- create one-time order ---------------------



  useEffect(() => {
    handleCalculateTotals(orderQty); // Calculate on load
  }, [item]);

  async function handleCreateOrder(e) {
    const orderInfo = {
      sku: item.sku,
      orderQty: orderQty,
      totalCost: totalCost
    }

    e.preventDefault();
    const response = await createOrderItem(orderInfo)
    // console.log(response)
    // clear fields after response succeeds
    reloadOrders()
    /*  // order added message
        setPopupMsg('Order created successfully.');
        // clear popup message after 3 seconds
        setTimeout(() => {
          setPopupMsg('');
        }, 3000); */
    handleClosePopup(e)
  }

  // -------------------------------------------------------------------

  return (
    <div className="popup">
      <table className='popup-table'>
        <thead className='popup-thead'>
          <tr id='popup-tr'>
            <td className='popup-td-head'>SKU</td>
            <td className='popup-td-head'>Brand</td>
            <td className='popup-td-head'>Name</td>
            <td className='popup-td-head'>Shipper</td>
            <td className='popup-td-head'>Unit Price</td>
            <td className='popup-td-head'>Qty</td>
            {/* <td className='popup-td-head'>Get Totals</td> */}
            <td className='popup-td-head'>Shipping</td>
            <td className='popup-td-head'>Total</td>
          </tr>
        </thead>
        <tbody>
          <tr id='popup-tr'>
            <td className='popup-td'>{item.sku}</td>
            <td className='popup-td'>{item.brand}</td>
            <td className='popup-td'>{item.productName}</td>
            <td className='popup-td'>{item.shipper}</td>
            <td className='popup-td'>{item.unitPrice}</td>
            <td className='popup-td'><input
              className="dynamic-inputs"
              id="order-qty"
              type="text"
              defaultValue={item.orderQty}
              onChange={handleQtyChange}
            >
            </input></td>
            {/* <td className='popup-td'>
              <button
                id="calculate"
                onClick={handleCalculateTotals}
              >
                Calculate
              </button>
            </td> */}
            <td className='popup-td'>{`$${shippingCost}`}</td>
            <td className='popup-td'>{`$${totalCost}`}</td>
          </tr>
        </tbody>
      </table>
      <div className='button-container'>
        <button
              className="popup-button"
              onClick={(event) => handleCreateOrder(event)}
            >
              Order Now
            </button>
            <button 
              id="close" 
              onClick={(event) => handleClosePopup(event)} 
              className={popup === "close" ? "hide" : "show"}
              >
              Close
            </button>
      </div>
    </div>
  )
}
