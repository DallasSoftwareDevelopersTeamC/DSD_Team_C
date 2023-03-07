import { API_URL } from './config';


export async function getInventoryList() {
    const response = await fetch(`${API_URL}/`, {
        method: 'GET'
    });
    return response.json();
}


export async function getInventoryItem(id) {
    const response = await fetch(`${API_URL}/${id}`, {
        method: 'GET'
    });
    return response.json();
}

// totalIncomingQty, incomingDates,
export async function createInventoryItem(sku, brand, name, description, inStock, reorderAt, orderQTY, shipper, priceEA, orderNowOrderQty, shippingCost, itemUsageSpeed) {
    const response = await fetch(`${API_URL}/`, {
        method: 'POST',
        body: JSON.stringify({
            sku, brand, name, description, inStock, reorderAt, orderQTY, shipper, priceEA, orderNowOrderQty, shippingCost, itemUsageSpeed
        }),
        headers: {
            'Content-Type': 'application/json'
        },
    });
    return response.json();
}


export async function updateInventoryItem(id, updates) {
    const response = await fetch(`${API_URL}/${id}`, {
        method: 'PATCH',
        body: JSON.stringify({
            updates
        }),
        headers: {
            'Content-Type': 'application/json'
        },
    });
    return response.json();
}


export async function deleteInventoryItem(id) {
    const response = await fetch(`${API_URL}/${id}`, {
        method: 'DELETE',
        headers: {
            'Content-Type': 'application/json'
        },
    });
    return response.json();
}