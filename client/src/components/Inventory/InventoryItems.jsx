import React, { useState } from 'react';
import './orderpopup.css'

function InventoryItems() {
    const [isOpen, setIsOpen] = useState(false);
    const [isOpenTwo, setIsOpenTwo] = useState(false);
    
    const handleClick = () => {
      // If isOpenTwo is true, close it before opening isOpen
      if (isOpenTwo) {
        setIsOpenTwo(false);
      }
      setIsOpen(!isOpen);
    };
    
    const settingsClick = () => {
      // If isOpen is true, close it before opening isOpenTwo
      if (isOpen) {
        setIsOpen(false);
      }
      setIsOpenTwo(!isOpenTwo);
    };

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
        <div className="table-cell">
            <select className='filter-item'>
              <option label='QTY'></option>
              <option value="number">1</option>
              <option value="number">2</option>
            </select>
        </div>
        <div className="table-cell">
            <select className='filter-item'>
              <option label='QTY'></option>
              <option value="number">1</option>
              <option value="number">2</option>
            </select>
        </div>
        <div className="table-cell">00/00/0000</div>

        <div className="table-cell">
          <button onClick={handleClick}>Order</button>
          {/* This is the pop up content */}
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
                    <div className="popup-cell">
                    <div className="table-cell">
                        <select className='filter-item'>
                            <option label='QTY'></option>
                            <option value="number">1</option>
                            <option value="number">2</option>
                        </select>
                    </div>
                </div>
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
          {/* end pop up content */}
        </div>
        <div className="table-cell">
        <button onClick={settingsClick}>Settings</button>
        {/* This is the pop up content */}
          {isOpenTwo && (
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
                    <button onClick={settingsClick} className="pop-button">Close</button>
                </div>
             </div>
          )}
          {/* end pop up content */}
        </div>
    </div>
      <div className="table-row">
        <div className="table-cell">00000</div>
        <div className="table-cell"><img src="./src/assets/50x50.png" alt="product" /></div>
        <div className="table-cell">Brand</div>
        <div className="table-cell">Product</div>
        <div className="table-cell">0</div>
        <div className="table-cell">0</div>
        <div className="table-cell">
            <select className='filter-item'>
              <option label='QTY'></option>
              <option value="number">1</option>
              <option value="number">2</option>
            </select>
        </div>
        <div className="table-cell">
            <select className='filter-item'>
              <option label='QTY'></option>
              <option value="number">1</option>
              <option value="number">2</option>
            </select>
        </div>
        <div className="table-cell">00/00/0000</div>
        <div className="table-cell">
        <button onClick={handleClick}>Order</button>
          {/* This is the pop up content */}
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
                    <div className="popup-cell">
                    <div className="table-cell">
                        <select className='filter-item'>
                            <option label='QTY'></option>
                            <option value="number">1</option>
                            <option value="number">2</option>
                        </select>
                    </div>
                </div>
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
          {/* end pop up content */}
        </div>
        <div className="table-cell">
        <button onClick={settingsClick}>Settings</button>
        {/* This is the pop up content */}
          {isOpenTwo && (
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
                    <button onClick={settingsClick} className="pop-button">Close</button>
                </div>
             </div>
          )}
          {/* end pop up content */}
        </div>
      </div>
      <div className="table-row">
        <div className="table-cell">00000</div>
        <div className="table-cell"><img src="./src/assets/50x50.png" alt="product" /></div>
        <div className="table-cell">Brand</div>
        <div className="table-cell">Product</div>
        <div className="table-cell">0</div>
        <div className="table-cell">0</div>
        <div className="table-cell">
            <select className='filter-item'>
              <option label='QTY'></option>
              <option value="number">1</option>
              <option value="number">2</option>
            </select>
        </div>
        <div className="table-cell">
            <select className='filter-item'>
              <option label='QTY'></option>
              <option value="number">1</option>
              <option value="number">2</option>
            </select>
        </div>
        <div className="table-cell">00/00/0000</div>
        <div className="table-cell">
        <button onClick={handleClick}>Order</button>
          {/* This is the pop up content */}
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
                    <div className="popup-cell">
                    <div className="table-cell">
                        <select className='filter-item'>
                            <option label='QTY'></option>
                            <option value="number">1</option>
                            <option value="number">2</option>
                        </select>
                    </div>
                </div>
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
          {/* end pop up content */}
        </div>
        <div className="table-cell">
            <button onClick={settingsClick}>Settings</button>
        {/* This is the pop up content */}
          {isOpenTwo && (
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
                    <button onClick={settingsClick} className="pop-button">Close</button>
                </div>
             </div>
          )}
          {/* end pop up content */}
        </div>
        </div>
    </div>
    )
}

export default InventoryItems


