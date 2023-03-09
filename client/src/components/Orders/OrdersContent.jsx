import React from 'react'
import ActiveOrders from './ActiveOrders.jsx'
import OrderHistory from './OrderHistory.jsx'

function OrdersContent (){
    return (
        <>
            <ActiveOrders />
            <OrderHistory />
        </>
    )
}

export default OrdersContent