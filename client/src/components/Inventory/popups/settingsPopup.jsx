import React from 'react'

export default function Settings({ handleClick, popup}) {
  return (
      <div className="popup">
              <table>
                <thead>
                    <td>Product</td>
                    <td>SKU</td>
                    <td>Item Usage Speed</td>
                </thead>
                <tbody>
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
                </tbody>
            </table>
                <tbody id='button-table-container'>
                    <td><button className="popup-button">Delete</button></td>
                    <td><button id ="close" onClick={(event)=>handleClick(event)} className= { popup == "close" ? "hide":"show"}>Close</button></td>
                </tbody>
      </div>
      
  )
}
