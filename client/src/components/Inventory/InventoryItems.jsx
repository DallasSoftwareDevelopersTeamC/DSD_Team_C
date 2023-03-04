import React, { useState } from 'react';
import './orderpopup.css'

function InventoryItems() {
  const [isOpen, setIsOpen] = useState(false);

  const handleClick = () => {
    setIsOpen(!isOpen);
  }

  return (
    <div className="table-container">
      <div className="table-row header">
        <div className="table-cell">SKU</div>
        <div className="table-cell">Image</div>
        <div className="table-cell">Brand</div>
        <div className="table-cell">Name</div>
        <div className="table-cell">In Stock</div>
        <div className="table-cell">Reorder At</div>
        <div className="table-cell">Set QTY Order</div>
        <div className="table-cell">Incoming QTY</div>
        <div className="table-cell">Arrival</div>
        <div className="table-cell">Order Now</div>
        <div className="table-cell">Settings</div>
      </div>
      <div className="table-row">
        <div className="table-cell">00000</div>
        <div className="table-cell"><img src="./src/assets/50x50.png" alt="product" /></div>
        <div className="table-cell">Brand</div>
        <div className="table-cell">Product</div>
        <div className="table-cell">0</div>
        <div className="table-cell">0</div>
        <div className="table-cell">-</div>
        <div className="table-cell">-</div>
        <div className="table-cell">-</div>

        <div className="table-cell">
          <button onClick={handleClick}>Order</button>
          {isOpen && (
            <div className="popup">
              <div className='popup-cont'>
                <div className="popup-row-header">
                    <div className="popup-cell">Product</div>
                    <div className="popup-cell">SKU</div>
                    <div className="popup-cell">Shipper</div>
                    <div className="popup-cell">Name</div>
                    <div className="popup-cell">Price EA</div>
                    <div className="popup-cell">Order QTY</div>
                    <div className="popup-cell">Shipping Cost</div>
                    <div className="popup-cell">Total</div>
                </div>
                <div className="popup-row-right">
                    <div className="popup-cell">Apple Watch</div>
                    <div className="popup-cell">00000</div>
                    <div className="popup-cell">Apple</div>
                    <div className="popup-cell">Name Here</div>
                    <div className="popup-cell">$456</div>
                    <div className="popup-cell">10</div>
                    <div className="popup-cell">$44</div>
                    <div className="popup-cell">$500</div>
                </div>
              </div>
                <div className='btn-cont'>
                    <button className="pop-btn-order">Order Now</button>
                    <button onClick={handleClick} className="pop-button">Close</button>
                </div>
             </div>
          )}
        </div>
        <div className="table-cell"><button>Settings</button></div>
    </div>
      <div className="table-row">
        <div className="table-cell">00000</div>
        <div className="table-cell"><img src="./src/assets/50x50.png" alt="product" /></div>
        <div className="table-cell">Brand</div>
        <div className="table-cell">Product</div>
        <div className="table-cell">0</div>
        <div className="table-cell">0</div>
        <div className="table-cell">-</div>
        <div className="table-cell">-</div>
        <div className="table-cell">-</div>
        <div className="table-cell"><button>Order</button></div>
        <div className="table-cell"><button>Settings</button></div>
      </div>
      <div className="table-row">
        <div className="table-cell">00000</div>
        <div className="table-cell"><img src="./src/assets/50x50.png" alt="product" /></div>
        <div className="table-cell">Brand</div>
        <div className="table-cell">Product</div>
        <div className="table-cell">0</div>
        <div className="table-cell">0</div>
        <div className="table-cell">-</div>
        <div className="table-cell">-</div>
        <div className="table-cell">-</div>
        <div className="table-cell"><button>Order</button></div>
        <div className="table-cell"><button>Settings</button></div>
        </div>
    </div>
    )
}

export default InventoryItems


