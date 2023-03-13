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
      shipperName: shipperName,
      shippingCost: shippingCost,
      shipperAddress: shipperAddress,
      shipperPhone: shipperPhone,
      orderQty: orderQty,
      totalCost: totalCost,
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
    delivered,
    orderQty,
    shipperName,
    shipperAddress,
    shipperPhone,
    totalCost,
    shippingCost,
  } = updates;
  const response = await fetch(`${API_URL}/orders/${id}`, {
    method: 'PATCH',
    body: JSON.stringify({
      sku,
      schedArrivalDate,
      delivered,
      orderQty,
      shipperName,
      shipperAddress,
      shipperPhone,
      totalCost,
      shippingCost,
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
