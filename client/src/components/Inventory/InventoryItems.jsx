import React from "react";

function InventoryItems(){
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


