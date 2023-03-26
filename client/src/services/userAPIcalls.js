const API_URL = import.meta.env.VITE_REACT_APP_API_URL;

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
export async function createUser(username, password, companyID) {
  const response = await fetch(`${API_URL}/user/`, {
    method: 'POST',
    body: JSON.stringify({
      username: username,
      password: password,
      companyID: Number(companyID),
    }),
    headers: {
      'Content-Type': 'application/json',
      'Access-Control-Allow-Credentials': 'true',
      'Access-Control-Allow-Origin': 'http://localhost:5173',
    },
  });
  return response.json();
}
export async function loginUser(username, password) {
  const response = await fetch(`${API_URL}/user/login`, {
    method: 'POST',
    credentials: 'include',
    body: JSON.stringify({
      username: username,
      password: password,
    }),
    headers: {
      'Content-Type': 'application/json',
      'Access-Control-Allow-Credentials': 'true',
      'Access-Control-Allow-Origin': 'http://localhost:5173',
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

export async function logoutUser() {
  const response = await fetch(`${API_URL}/user/logout`, {
    method: 'POST',
    withCredentials: true,
    credentials: 'include',
  });
  return response.json();
}
