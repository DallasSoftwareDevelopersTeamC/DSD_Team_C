import { API_URL } from './config';
import getRandomShipper from '../utils/getRandomShipper';

export async function sendCSVfile(csvFile, reloadInventory) {
  console.log(csvFile);
  const formData = new FormData();
  formData.append('csvFile', csvFile);
  fetch(`${API_URL}/inventory/upload`, {
    method: 'POST',
    body: formData,
  })
    .then((response) => response.json())
    .then(async (data) => {
      await createManyInventoryItems(data);
      return 'Success!';
    })
    .catch((error) => console.error(error));
}

export async function getInventoryList() {
  const response = await fetch(`${API_URL}/inventory/`, {
    method: 'GET',
  });
  return response.json();
}

export async function getInventoryItem(id) {
  const response = await fetch(`${API_URL}/inventory/${id}`, {
    method: 'GET',
  });
  return response.json();
}

// totalIncomingQty, incomingDates,
export async function createInventoryItem(product) {
  const response = await fetch(`${API_URL}/inventory/`, {
    method: 'POST',
    body: JSON.stringify({
      sku: product.sku,
      brand: product.brand,
      productName: product.productName,
      description: product.description,
      shipper: getRandomShipper(),
      inStock: Number(product.inStock),
      reorderAt: Number(product.reorderAt),
      orderQty: Number(product.orderQty),
      unitPrice: Number(product.unitPrice),
      companyID: 13282
    }),
    headers: {
      'Content-Type': 'application/json',
    },
  });
  return response.json();
}

export async function createManyInventoryItems(products) {
  await products.map((product) => {
    for (let prop in product) {
      if (product.hasOwnProperty(prop)) {
        if (
          prop === 'inStock' ||
          prop === 'reorderAt' ||
          prop === 'orderQty' ||
          prop === 'unitPrice' ||
          prop === 'companyID'
        ) {
          product[prop] = parseInt(product[prop]);
        }
      }
    }
  });
  console.log(products);
  const response = await fetch(`${API_URL}/inventory/bulk`, {
    method: 'POST',
    body: JSON.stringify({ products }),
    headers: {
      'Content-Type': 'application/json',
    },
  });
  return response.json();
}

export async function updateInventoryItem(id, updates) {
  const { sku, brand, productName, description, inStock, reorderAt, orderQty } =
    updates;
  const response = await fetch(`${API_URL}/inventory/${id}`, {
    method: 'PATCH',
    body: JSON.stringify({
      sku,
      brand,
      productName,
      description,
      inStock,
      reorderAt,
      orderQty,
    }),
    headers: {
      'Content-Type': 'application/json',
    },
  });
  return response.json();
}

export async function deleteInventoryItem(id) {
  const response = await fetch(`${API_URL}/inventory/${id}`, {
    method: 'DELETE',
    headers: {
      'Content-Type': 'application/json',
    },
  });
  return response.json();
}
