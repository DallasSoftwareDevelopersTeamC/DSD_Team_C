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
  /*   useEffect(() => {
      console.log(item);
    }, [item]); */

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
            <td className='popup-td-head'>Shipping Cost</td>
            <td className='popup-td-head'>Total</td>
          </tr>
        </thead>
        <tbody>
          <tr id='popup-tr'>
            <td className='popup-td'>{item.sku}</td>
            <td className='popup-td'>{item.productName}</td>
            <td className='popup-td'>{item.brand}</td>
            <td className='popup-td'><input
              className="dynamic-inputs"
              id=""
              type="text"
              defaultValue={item.priceEa}
            >
            </input></td>
            <td className='popup-td'>{item.priceEA}</td>
            <td className='popup-td'>{item.shippingCost}</td>
            <td className='popup-td'>calc total via order req</td>
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
