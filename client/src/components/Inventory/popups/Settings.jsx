import React, { useState, useEffect } from 'react';
import { deleteInventoryItem } from '../../../services/inventoryAPIcalls';

export default function Settings({ handleClosePopup, popup, item, reloadInventory }) {

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
            <table className='popup-table'>
                <thead className='popup-thead'>
                    <tr id='popup-tr'>
                        <td className='popup-td-head'>SKU</td>
                        <td className='popup-td-head'>Product</td>
                        <td className='popup-td-head'>Item Usage Speed</td>
                    </tr>
                </thead>
                <tbody>
                    <tr id='popup-tr'>
                        <td className='popup-td'>{item.sku}</td>
                        <td className='popup-td'>{item.productName}</td>
                        <td className='popup-td'>
                            <select className='filter-style'>
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
                <button onClick={(event) => handleDeleteInventoryItem(event, item.id)} className="popup-button">Delete Product</button>
                <button id="close" onClick={(event) => handleClosePopup(event)} className={popup == "close" ? "hide" : "show"}>Close</button>
            </div>
        </div>

    )
}
