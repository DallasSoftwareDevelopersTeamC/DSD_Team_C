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
                    <td>Product</td>
                    <td>SKU</td>
                    <td>Item Usage Speed</td>
                </thead>
                <tbody>
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
                </tbody>
            </table>
            <tbody id='button-table-container'>
                <td><button onClick={handleDeleteInventoryItem(itemId)} className="popup-button">Delete Product</button></td>
                <td><button id="close" onClick={(event) => handleClick(event)} className={popup == "close" ? "hide" : "show"}>Close</button></td>
            </tbody>
        </div>

    )
}
