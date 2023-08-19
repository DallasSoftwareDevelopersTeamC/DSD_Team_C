import getRandomShipper from '../utils/getRandomShipper';
import Swal from 'sweetalert2';
import axios from 'axios';

const API_URL = import.meta.env.VITE_REACT_APP_API_URL;



export const sendCSVfile = async (csvFile) => {
  try {
    const formData = new FormData();
    formData.append("csvFile", csvFile);

    const response = await axios.post(`${API_URL}/inventory/upload`, formData);
    const { data } = response;

    const processedData = data.map((item) => ({
      ...item,
      shipper: getRandomShipper(),
    }));

    const csvFileResult = await createManyInventoryItems(processedData);
    return csvFileResult;
    
  } catch (error) {
    console.error(error);
  }
}


export async function getInventoryList(filterBy, sortOrder) {
  const response = await fetch(
    `${API_URL}/inventory/${filterBy}/${sortOrder}`,
    {
      method: "GET",
      credentials: "include",
    }
  );
  return response.json();
}

export async function getInventoryItem(id) {
  const response = await fetch(`${API_URL}/inventory/${id}`, {
    method: "GET",
    credentials: "include",
  });
  return response.json();
}


export async function createInventoryItem(product) {

  const fieldsToValidate = ['inStock', 'reorderAt', 'orderQty', 'unitPrice'];

  for (let field of fieldsToValidate) {
    if (typeof product[field] !== 'number' && isNaN(Number(product[field]))) {
      throw new Error(`The field ${field} must be a number.`);
    }
  }

  try {
    const response = await fetch(`${API_URL}/inventory/`, {
      method: "POST",
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
      }),
      headers: {
        "Content-Type": "application/json",
      },
      credentials: "include",
    });

    if (!response.ok) {
      const errorData = await response.json();
      throw new Error(errorData.error || 'An unexpected error occurred.');
    }

    return response.json();

  } catch (error) {

    console.error("Error creating inventory item:", error);

    return error.message;
  }
}



export async function createManyInventoryItems(products) {
  let message;
  await products.map((product) => {
    for (let prop in product) {
      if (product.hasOwnProperty(prop)) {
        if (
          prop === "inStock" ||
          prop === "reorderAt" ||
          prop === "orderQty" ||
          prop === "unitPrice"
        ) {
          product[prop] = parseInt(product[prop]);
        }
      }
    }
  });
  console.log(products);
  const response = await fetch(`${API_URL}/inventory/bulk`, {
    method: "POST",
    body: JSON.stringify({ products }),
    headers: {
      "Content-Type": "application/json",
    },
  });
  message = await response.json();
  if (response.status === 400) {
    return Swal.fire({
      icon: "error",
      title: "Oops...",
      text: `${message.error}`,
      background: "#19191a",
      color: "#fff",
      confirmButtonColor: "#2952e3",
    });
  }
  return Swal.fire({
    icon: "success",
    title: "Success!",
    text: `${message} products have been added to inventory`,
    background: "#19191a",
    color: "#fff",
    confirmButtonColor: "#2952e3",
  }).then((result) => {
    if (result.isConfirmed) {
      location.reload();
    }
  });
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

export async function deleteInventoryItems(ids) {
  const response = await fetch(`${API_URL}/inventory/bulk`, {
    method: 'DELETE',
    body: JSON.stringify({ ids }),
    headers: {
      'Content-Type': 'application/json',
    },
  });
  return response.json();
}
