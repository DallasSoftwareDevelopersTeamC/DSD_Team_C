import React from 'react'

export default function Settings({ handleClick, popup}) {
  return (
      <div className="popup">
              <table>
                <thead>
                  <tr id='popup-tr'>
                    <td>Product</td>
                    <td>SKU</td>
                    <td>Item Usage Speed</td>
                  </tr>
                </thead>
                <tbody>
                  <tr id='popup-tr'>
                    <td>Apple Watch</td>
                    <td>0000</td>
                    <td>
                        <select className='filter-item'>
                            <option label='Select'></option>
                            <option value="number">Slow</option>
                            <option value="number">Medium</option>
                            <option value="number">Fast</option>
                        </select>
                    </td>
                  </tr>
                </tbody>
            </table>
                <div className='button-table-container'>
                    <button className="popup-button">Delete</button>
                    <button id ="close" onClick={(event)=>handleClick(event)} className= { popup == "close" ? "hide":"show"}>Close</button>
                </div>
      </div>
      
  )
}
