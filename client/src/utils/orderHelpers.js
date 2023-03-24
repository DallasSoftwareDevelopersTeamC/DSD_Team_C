import { updateOrderItem } from '../services/ordersAPIcalls';
import { updateInventoryItem } from '../services/inventoryAPIcalls';

export async function handleOrderDelivery(order) {
    const updatedItem = { orderStatus: 'delivered' };
    const itemId = order.id;
    await updateOrderItem(itemId, updatedItem);
    await updateInventoryItem(id, updatedItem);

    reloadInventory();
    return;
}

export async function orderEnRouteTimer(order, timeouts, remainingTime = null) {
    // If timeout was already flagged as completed below, return
    if (timeouts.current[order.id] && timeouts.current[order.id].completed) {
        return;
    }

    let deliveryDuration;
    if (remainingTime !== null) {
        deliveryDuration = remainingTime;
    } else {
        // Generate a random delivery duration between 2000ms and 22000ms
        deliveryDuration = Math.floor(Math.random() * 20001) + 1000;
    }

    const startTime = Date.now();
    const timeoutFunction = setTimeout(async () => {
        timeouts.current[order.id].completed = true;
        delete timeouts.current[order.id]; // delete the timeout entry for the delivered order
        await handleOrderDelivery(order);



    }, deliveryDuration);

    timeouts.current[order.id] = {
        timeoutFunction,
        startTime,
        deliveryDuration,
        completed: false,
    };

    // Add console logs to see the details of the timeout
    //  console.log(`Order ID: ${order.id}`);
    // console.log(`Remaining Time: ${remainingTime}`); 
    // console.log(`Delivery Duration: ${deliveryDuration}`);
    // console.log(`Timeouts: `, timeouts.current);

    return timeouts;
}

export function pauseAllTimeouts(timeouts) {
    for (const [orderId, timeoutObj] of Object.entries(timeouts.current)) {
        clearTimeout(timeoutObj.timeoutFunction);

        const elapsedTime = Date.now() - timeoutObj.startTime;
        const remainingTimeCalc = timeoutObj.deliveryDuration - elapsedTime;
        const isDelivered = remainingTimeCalc <= 0;

        if (isDelivered) {
            // The order is already delivered, remove it from the timeouts.current object
            delete timeouts.current[orderId];
        } else {
            // Update the remaining time, startTime, and deliveryDuration for the paused timeout
            timeoutObj.remainingTime = remainingTimeCalc;
            timeoutObj.startTime = Date.now();
            timeoutObj.deliveryDuration = remainingTimeCalc;
        }
    }
}





