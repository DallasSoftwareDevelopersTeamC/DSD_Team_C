import React from 'react';


export default function Order({ handleClick, popup}) {
  return (<div className="popup">
           <div className='popup-cont'>
                <div className="popup-row-header">
                    <div className="popup-cell">Product</div>
                    <div className="popup-cell">Vendor</div>
                    <div className="popup-cell">Shipper</div>
                    <div className="popup-cell">Name</div>
                    <div className="popup-cell">Price EA</div>
                    <div className="popup-cell">Shipping Cost</div>
                    <div className="popup-cell">Total</div>
                </div>
                <div className="popup-row-right">
                    <div className="popup-cell">Apple Watch</div>
                    <div className="popup-cell">Date</div>
                    <div className="popup-cell">Apple</div>
                    <div className="popup-cell">Name Here</div>
                    <div className="popup-cell">$4546</div>
                </div>
                <div className="popup-row-right">
                    <div className="popup-cell">-</div>
                    <div className="popup-cell">QTY</div>
                    <div className="popup-cell">Apple</div>
                    <div className="popup-cell">Name Here</div>
                    <div className="popup-cell">$4546</div>
                </div>
           </div>
                <div className='btn-cont'>
                    <button className="pop-btn-order">View more</button>
                    <button id ="close" onClick={(event)=>handleClick(event)} className= { popup == "close" ? "hide":"show"}>Close</button>
                </div>
         
     </div>
  )
}
