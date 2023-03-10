import React, { useState, useEffect } from 'react';
import { deleteInventoryItem } from '../../../services/inventoryAPIcalls';
import { getInventoryItem } from '../../../services/inventoryAPIcalls'


export default function Settings({ handleClosePopup, popup, itemId, reloadInventory }) {
    const [item, setItem] = useState('')
    const handleGetItem = async (id) => {
        const res = await getInventoryItem(id)
        setItem(res)
    }

    useEffect(() => {
        handleGetItem(itemId);
    }, [itemId]);
    /*   useEffect(() => {
          console.log(item);
      }, [item]); */

    async function handleDeleteInventoryItem(event, itemId) {
        await deleteInventoryItem(itemId)
        await reloadInventory(() => {
            // This function is called after the inventory has been reloaded
            // Update the state of the component here to re-render the list
        })
        handleClosePopup(event)
    }

    return (
        <div className="popup">
            <table>
                <thead>
                    <tr id='popup-tr'>
                        <td>SKU</td>
                        <td>Product</td>
                        <td>Item Usage Speed</td>
                    </tr>
                </thead>
                <tbody>
                    <tr id='popup-tr'>
                        <td>{item.sku}</td>
                        <td>{item.productName}</td>
                        <td>
                            <select className='filter-item'>
                                <option label='Select'></option>
                                <option value="number">Slow</option>
                                <option value="number">Medium</option>
                                <option value="number">Fast</option>
                            </select>
                        </td>
                    </tr>
                </tbody>
            </table>
            <div className='button-table-container'>
                <button onClick={(event) => handleDeleteInventoryItem(event, itemId)} className="popup-button">Delete Product</button>
                <button id="close" onClick={(event) => handleClosePopup(event)} className={popup == "close" ? "hide" : "show"}>Close</button>
            </div>
        </div>

    )
}
