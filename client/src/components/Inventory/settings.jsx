import React from 'react'

export default function Settings({ handleClick, popup}) {
  return (
      <div className="popup">
              <div className='popup-cont'>
                <div className="popup-row-header">
                    <div className="popup-cell">Product</div>
                    <div className="popup-cell">SKU</div>
                    <div className="popup-cell">Item Usage Speed</div>
                </div>
                <div className="popup-row-right">
                    <div className="popup-cell">Apple Watch</div>
                    <div className="popup-cell">00000</div>
                    <div className="popup-cell">
                    <div className="table-cell">
                        <select className='filter-item'>
                            <option label='Select'></option>
                            <option value="number">Slow</option>
                            <option value="number">Medium</option>
                            <option value="number">Fast</option>
                        </select>
                    </div>
                 </div>
                </div>
              </div>
                <div className='btn-cont'>
                    <button className="pop-btn-order">Delete</button>
                    <button id ="close" onClick={(event)=>handleClick(event)} className= { popup == "close" ? "hide":"show"}>Close</button>
                </div>
      </div>
      
  )
}
