import React from 'react'

export default function Settings({ handleClick, popup}) {
  return (
      <div className="popup">
              <table className='popup-cont'>
                <thead className="popup-row-header">
                    <td>Product</td>
                    <td>SKU</td>
                    <td>Item Usage Speed</td>
                </thead>
                <tbody className='body'>
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
                <tbody className='btn-cont'>
                    <td><button className="pop-btn-order">Delete</button></td>
                    <td><button id ="close" onClick={(event)=>handleClick(event)} className= { popup == "close" ? "hide":"show"}>Close</button></td>
                </tbody>
      </div>
      
  )
}
