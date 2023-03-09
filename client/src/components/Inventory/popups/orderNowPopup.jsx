import React from 'react';

export default function Order({ handleClick, popup }) {
  return (
    <div className="popup">
      <table>
        <thead>
          <td>SKU</td>
          <td>Name</td>
          <td>Vendor</td>
          <td>Price EA</td>
          <td>Shipping Cost</td>
          <td>Total</td>
        </thead>
        <tbody>
          <td>12345</td>
          <td>-</td>
          <td>Apple</td>
          <td>-</td>
          <td>$4546</td>
          <td>$4546</td>
        </tbody>
      </table>
      <tbody id='button-table-container'>
        <td><button className="ordernow-popup-button">Order Now</button></td>
        <td><button id="close" onClick={(event) => handleClick(event)} className={popup === "close" ? "hide" : "show"}>Close</button></td>
      </tbody>
    </div>
  )
}
