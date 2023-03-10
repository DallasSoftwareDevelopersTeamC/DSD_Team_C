import { API_URL } from './config';

export async function sendCSVfile(csvFile) {
  console.log(csvFile);
  const formData = new FormData();
  formData.append('csvFile', csvFile);
  fetch(`${API_URL}/upload`, {
    method: 'POST',
    body: formData,
  })
    .then((response) => response.json())
    .then((data) => console.log(data))
    .catch((error) => console.error(error));
}

export async function getInventoryList() {
  const response = await fetch(`${API_URL}/`, {
    method: 'GET',
  });
  return response.json();
}

export async function getInventoryItem(id) {
  const response = await fetch(`${API_URL}/${id}`, {
    method: 'GET',
  });
  return response.json();
}

// totalIncomingQty, incomingDates,
export async function createInventoryItem(product) {
  const response = await fetch(`${API_URL}/`, {
    method: 'POST',
    body: JSON.stringify({
      sku: product.sku,
      brand: product.brand,
      productName: product.productName,
      description: product.description,
      inStock: Number(product.inStock),
      reorderAt: Number(product.reorderAt),
      orderQty: Number(product.orderQty),
      priceEA: Number(product.unitPrice),
    }),
    headers: {
      'Content-Type': 'application/json',
    },
  });
  return response.json();
}

export async function updateInventoryItem(id, updates) {
  const response = await fetch(`${API_URL}/${id}`, {
    method: 'PATCH',
    body: JSON.stringify({
      updates,
    }),
    headers: {
      'Content-Type': 'application/json',
    },
  });
  return response.json();
}

export async function deleteInventoryItem(id) {
  const response = await fetch(`${API_URL}/${id}`, {
    method: 'DELETE',
    headers: {
      'Content-Type': 'application/json',
    },
  });
  return response.json();
}
