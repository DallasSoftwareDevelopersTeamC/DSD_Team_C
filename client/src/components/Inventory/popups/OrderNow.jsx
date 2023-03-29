import React, { useState, useEffect, useContext } from 'react';
import { OrdersContext } from '../../../contexts/orders.context';
import { createOrderItem } from '../../../services/ordersAPIcalls';
import calculateTotal from '../../../utils/calcShippingAndTotal';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faXmark } from '@fortawesome/free-solid-svg-icons';

export default function Order({ handleClosePopup, popup, item, handleReloadInventory }) {
  const { reloadOrders } = useContext(OrdersContext);

  const [orderQty, setOrderQty] = useState(0)
  const [shippingCost, setShippingCost] = useState(0);
  const [totalCost, setTotalCost] = useState(0);

  useEffect(() => {
    setOrderQty(item.orderQty);
  }, [item]);

  const handleCalculateTotals = () => {
    const qty = parseFloat(orderQty);
    const price = parseFloat(item.unitPrice);

    if (isNaN(qty) || isNaN(price)) {
      setShippingCost(0);
      setTotalCost(0);
    } else {
      const { ship, total } = calculateTotal(orderQty, item.unitPrice)
      setShippingCost(ship)
      setTotalCost(total)
    }
  }

  const handleQtyChange = (event) => {
    const newQty = Number(event.target.value)
    setOrderQty(newQty)
  }

  // calc totals again when input chnages
  useEffect(() => {
    handleCalculateTotals();
  }, [orderQty]);

  useEffect(() => {
    handleCalculateTotals(orderQty); // Calculate on load
  }, [item]);

  async function handleCreateOrder(e) {
    const orderInfo = {
      sku: item.sku,
      orderQty: orderQty,
      totalCost: totalCost
    }

    e.preventDefault();
    const response = await createOrderItem(orderInfo)
    // console.log(response)
    // clear fields after response succeeds
    reloadOrders()
    handleClosePopup(e)
  }

  return (
    <div className='popup'>
        <div className='close-icon'>
          <button
            id='close'
            onClick={(event) => handleClosePopup(event)}
            className={popup === 'close' ? 'hide' : 'show'}
          >
          <FontAwesomeIcon className='fa-close-icon' icon={faXmark}/>
          </button>
        </div>
      <div className='container-both-columns'>
        <div className='left-container'>
          <div className='popup-cell'>SKU</div>
          <div className='popup-cell'>Brand</div>
          <div className='popup-cell'>Name</div>
          <div className='popup-cell'>Shipper</div>
          <div className='popup-cell'>Cost</div>
          <div className='popup-cell'>Qty</div>
          <div className='popup-cell'>Shipping</div>
          <div className='popup-cell'>Total</div>
          <div className='popup-cell'>        
            <button
              className='popup-button'
              onClick={(event) => handleCreateOrder(event)}
            >
              Order Now
            </button>
          </div>
        </div>
        <div className='right-container'>
          <div className='popup-cell'>{item.sku}</div>
          <div className='popup-cell'>{item.brand}</div>
          <div className='popup-cell'>{item.productName}</div>
          <div className='popup-cell'>{item.shipper}</div>
          <div className='popup-cell'>{item.unitPrice}</div>
          <div className='popup-cell'>
            <input
              className='popup-input'
              id='order-qty'
              type='text'
              defaultValue={item.orderQty}
              onChange={handleQtyChange}
            ></input>
          </div>
          <div className='popup-cell'>{`$${shippingCost}`}</div>
          <div className='popup-cell'>{`$${totalCost}`}</div>
      </div>
      </div>
    </div>
    )
  }