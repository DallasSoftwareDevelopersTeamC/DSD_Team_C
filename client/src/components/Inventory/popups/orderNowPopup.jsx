import React from 'react';

export default function Order({ handleClick, popup }) {
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
          <td>12345</td>
          <td>-</td>
          <td>Apple</td>
          <td>-</td>
          <td>$4546</td>
          <td>$4546</td>
         </tr>
        </tbody>
      </table>
      <div className='button-table-container'>
        <button className="popup-button">Order Now</button>
        <button id="close" onClick={(event) => handleClick(event)} className={popup === "close" ? "hide" : "show"}>Close</button>
      </div>
    </div>
  )
}
