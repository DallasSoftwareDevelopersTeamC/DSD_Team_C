import { API_URL } from './config';

export async function getOrdersList() {
  const response = await fetch(`${API_URL}/orders/`, {
    method: 'GET',
  });
  return response.json();
}

export async function getOrderItem(id) {
  const response = await fetch(`${API_URL}/orders/${id}`, {
    method: 'GET',
  });
  return response.json();
}

// totalIncomingQty, incomingDates,
export async function createOrderItem(order) {
  const response = await fetch(`${API_URL}/orders/`, {
    method: 'POST',
    body: JSON.stringify({
      sku: order.sku,
      schedArrivalDate: order.schedArrivalDate,
      orderQty: order.orderQty,
      shipper: order.shipper,
      // status has default of "active" in model
      totalCost: order.totalCost,
    }),
    headers: {
      'Content-Type': 'application/json',
    },
  });
  return response.json();
}


export async function updateOrderItem(id, updates) {
  const {
    sku,
    schedArrivalDate,
    orderQty,
    shipper,
    totalCost,
  } = updates;
  const response = await fetch(`${API_URL}/orders/${id}`, {
    method: 'PATCH',
    body: JSON.stringify({
      schedArrivalDate,
      orderStatus,
    }),
    headers: {
      'Content-Type': 'application/json',
    },
  });
  return response.json();
}

export async function deleteOrderItem(id) {
  const response = await fetch(`${API_URL}/orders/${id}`, {
    method: 'DELETE',
    headers: {
      'Content-Type': 'application/json',
    },
  });
  return response.json();
}
