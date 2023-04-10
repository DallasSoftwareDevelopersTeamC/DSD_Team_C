import React, { useState, useEffect, useContext } from 'react';
import './orderedDeliveredPopup.css'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faTimes } from '@fortawesome/free-solid-svg-icons';
import { OrdersContext } from '../../../contexts/orders.context';

export default function OrderedDeliveredPopup() {
    const { displayOrderedDeliveredPopup, setDisplayOrderedDeliveredPopup, orderedDeliveryPopupContent, setOrderedDeliveryPopupContent } = useContext(OrdersContext);
    const [popupTimeoutId, setPopupTimeoutId] = useState(null);

    useEffect(() => {
        if (displayOrderedDeliveredPopup) {
            const timeoutId = setTimeout(() => {
                setDisplayOrderedDeliveredPopup(false);
                setOrderedDeliveryPopupContent([])
            }, 8000);
            setPopupTimeoutId(timeoutId);
        } else if (popupTimeoutId) {
            clearTimeout(popupTimeoutId);
            setPopupTimeoutId(null);
        }
    }, [displayOrderedDeliveredPopup]);

    const handleClose = () => {
        setDisplayOrderedDeliveredPopup(false);
        setOrderedDeliveryPopupContent([]);
    };

    return (
        <>
            {displayOrderedDeliveredPopup &&
                <div className='notification-popup'>
                    <div className=''>
                        {/* //`Delivered ${order.orderQty} - ${order.SKU} - ${order.product.brand} - ${order.product.productName}` */}
                        <div className='heading-and-quantity'>
                            <h4 className='deliv-or-ordered'>{orderedDeliveryPopupContent[0] === 'd' ? 'Delivered' : 'Ordered'}</h4>
                            <p> Qty: {orderedDeliveryPopupContent[1].orderQty}</p>
                        </div>
                        <p>{orderedDeliveryPopupContent[1].SKU}</p>
                        <p>{orderedDeliveryPopupContent[1].product.brand} - {orderedDeliveryPopupContent[1].product.productName}</p>

                    </div>
                    <button className='close-button' onClick={handleClose}><FontAwesomeIcon icon={faTimes} /></button>
                </div>
            }
        </>
    )
}
