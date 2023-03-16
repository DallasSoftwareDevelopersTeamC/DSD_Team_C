import React, { useState, useEffect } from 'react';
import { getInventoryItem } from '../../../services/inventoryAPIcalls'
import calculateTotal from '../../../utils/calcShippingAndTotal';

export default function Order({ handleClosePopup, popup, itemId, handleReloadInventory }) {
  const [item, setItem] = useState('')
  const [orderQty, setOrderQty] = useState(0)
  const [shippingCost, setShippingCost] = useState(0);
  const [totalCost, setTotalCost] = useState(0);

  const handleGetItem = async (id) => {
    const res = await getInventoryItem(id)
    setItem(res)
    setOrderQty(res.orderQty)
  }
  const handleCalculateTotals = () => {
    const qty = parseFloat(orderQty);
    const price = parseFloat(item.priceEA);

    if (isNaN(qty) || isNaN(price)) {
      setShippingCost(0);
      setTotalCost(0);
    } else {
      const { ship, total } = calculateTotal(orderQty, item.priceEA)
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

  useEffect(() => {
    handleGetItem(itemId);
  }, [itemId]);

  useEffect(() => {
    handleCalculateTotals(orderQty); // Calculate on load
  }, [item]);

  /*   useEffect(() => {
      console.log("Shipping Cost Changed:", shippingCost);
      console.log("Total Cost Changed:", totalCost);
    }, [shippingCost, totalCost]); */

  return (
    <div className="popup">
      <table className='popup-table'>
        <thead className='popup-thead'>
          <tr id='popup-tr'>
            <td className='popup-td-head'>SKU</td>
            <td className='popup-td-head'>Name</td>
            <td className='popup-td-head'>Vendor</td>
            <td className='popup-td-head'>Price EA</td>
            <td className='popup-td-head'>Qty</td>
            {/* <td className='popup-td-head'>Get Totals</td> */}
            <td className='popup-td-head'>Shipping Cost</td>
            <td className='popup-td-head'>Total</td>
          </tr>
        </thead>
        <tbody>
          <tr id='popup-tr'>
            <td className='popup-td'>{item.sku}</td>
            <td className='popup-td'>{item.productName}</td>
            <td className='popup-td'>{item.brand}</td>
            <td className='popup-td'>{item.priceEA}</td>
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
      <div className='button-table-container'>
        <button className="popup-button">Order Now</button>
        <button id="close" onClick={(event) => handleClosePopup(event)} className={popup === "close" ? "hide" : "show"}>Close</button>
      </div>
    </div>
  )
}
