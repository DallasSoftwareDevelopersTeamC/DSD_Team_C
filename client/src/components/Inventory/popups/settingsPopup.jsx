import React from 'react'
import { deleteInventoryItem } from '../../../services/inventoryAPIcalls';

export default function Settings({ handleClick, popup, itemId, reloadInventory }) {

    const handleDeleteInventoryItem = itemId => {
        deleteInventoryItem(itemId)
        reloadInventory()
    }

    return (
        <div className="popup">
            <table>
                <thead>
                    <tr id='popup-tr'>
                        <td>Product</td>
                        <td>SKU</td>
                        <td>Item Usage Speed</td>
                    </tr>
                </thead>
                <tbody>
                    <tr id='popup-tr'>
                        <td>Apple Watch</td>
                        <td>0000</td>
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
                <button onClick={() => handleDeleteInventoryItem(itemId)} className="popup-button">Delete Product</button>
                <button id="close" onClick={() => handleClick()} className={popup == "close" ? "hide" : "show"}>Close</button>
            </div>
        </div>

    )
}
