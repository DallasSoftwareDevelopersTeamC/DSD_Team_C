import React from 'react';

export default function Order({ handleClick, popup }) {
  return (
    <div className="popup">
      <table className='popup-cont'>
        <thead className='popup-row-header'>
          <td>SKU</td>
          <td>Name</td>
          <td>Vendor</td>
          <td>Price EA</td>
          <td>Shipping Cost</td>
          <td>Total</td>
        </thead>
        <tbody className='body'>
          <td>12345</td>
          <td>-</td>
          <td>Apple</td>
          <td>-</td>
          <td>$4546</td>
          <td>$4546</td>
        </tbody>
      </table>
      <tbody className='btn-cont'>
        <td><button className="pop-button">Order Now</button></td>
        <td><button id="close" onClick={(event) => handleClick(event)} className={popup === "close" ? "hide" : "show"}>Close</button></td>
      </tbody>
    </div>
  )
}
