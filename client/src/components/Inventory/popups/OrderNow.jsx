import React, { useState, useEffect } from 'react';
import { getInventoryItem } from '../../../services/inventoryAPIcalls'

export default function Order({ handleClosePopup, popup, itemId, handleReloadInventory }) {
  const [item, setItem] = useState('')

  const handleGetItem = async (id) => {
    const res = await getInventoryItem(id)
    setItem(res)
  }

  useEffect(() => {
    handleGetItem(itemId);
  }, [itemId]);
  /*  useEffect(() => {
       console.log(item);
   }, [item]); */

  return (
    <div className="popup">
      <table>
        <thead>
          <tr id='popup-tr'>
            <td>SKU</td>
            <td>Name</td>
            <td>Vendor</td>
            <td>Price EA</td>
            <td>Shipping Cost</td>
            <td>Total</td>
          </tr>
        </thead>
        <tbody>
          <tr id='popup-tr'>
            <td>{item.sku}</td>
            <td>{item.productName}</td>
            <td>{item.brand}</td>
            <td>{item.priceEA}</td>
            <td>{item.shippingCost}</td>
            <td>calc total via order req</td>
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
