import React from 'react'
import ActiveOrders from './ActiveOrders.jsx'
import OrderHistory from './OrderHistory.jsx'

function OrdersContent (){
    return (
        <div>
            <ActiveOrders />
            <OrderHistory />
        </div>
    )
}

export default OrdersContent