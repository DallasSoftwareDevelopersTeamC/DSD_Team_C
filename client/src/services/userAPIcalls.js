import { API_URL } from './config';

export async function getUsers() {
  const response = await fetch(`${API_URL}/user/`, {
    method: 'GET',
  });
  return response.json();
}

export async function getUser(id) {
  const response = await fetch(`${API_URL}/user/${id}`, {
    method: 'GET',
  });
  return response.json();
}

// totalIncomingQty, incomingDates,
export async function createUser(order) {
  const response = await fetch(`${API_URL}/user/`, {
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
export async function loginUser(username, password) {
  const response = await fetch(`${API_URL}/user/login`, {
    method: 'POST',
    body: JSON.stringify({
      username: username,
      password: password,
    }),
    headers: {
      'Content-Type': 'application/json',
    },
  });
  return response.json();
}

export async function updateUser(id, updates) {
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
  const response = await fetch(`${API_URL}/user/${id}`, {
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

export async function deleteUser(id) {
  const response = await fetch(`${API_URL}/user/${id}`, {
    method: 'DELETE',
    headers: {
      'Content-Type': 'application/json',
    },
  });
  return response.json();
}
