import React, { useContext } from 'react';
import { handleOrderDelivery } from '../../utils/orderHelpers'
import { InventoryContext } from '../../contexts/inventory.context';
import { OrdersContext } from '../../contexts/orders.context';

function EditPopup({ handleClosePopup, order }) {
    const { setTempInStock } = useContext(InventoryContext);
    const { reloadOrders } = useContext(OrdersContext);

    const handleDelivery = async (order) => {
        await handleOrderDelivery(order, setTempInStock);
        console.log('delivered');
        handleClosePopup();
        reloadOrders();
    }

    return (
        <div className="popup edit-popup">
            <div>
                <h2>SKU</h2>
                <div>{order.product.sku}</div>
            </div>
            <div>
                <h2>Order ID</h2>
                <div>{order.id}</div>
            </div>
            <div>
                {/* Add form elements to edit the order here */}
                <button onClick={() => handleDelivery(order)}>Mark as delivered</button>
                <button onClick={handleClosePopup}>Close</button>
            </div>
        </div>
    );
}

export default EditPopup;
