import React, { useState, useEffect } from 'react';
import { deleteInventoryItems } from '../../../services/inventoryAPIcalls';
import { Switch } from "@mui/material";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faTrash } from '@fortawesome/free-solid-svg-icons';
import { faShoppingBag } from '@fortawesome/free-solid-svg-icons';


export default function SelectedCheckboxOptions({ handleClosePopup, popup, reloadInventory }) {
    async function handleDeleteInventoryItems(event, itemId) {
        await deleteInventoryItems()
        await reloadInventory(() => {
            // This function is called after the inventory has been reloaded
            // Update the state of the component here to re-render the list
        })
        handleClosePopup(event)
    }

    return (
        <div className="popup selected-options-popup">
            <table className='popup-table'>
                <thead className='popup-thead'>
                    <tr id='popup-tr'>
                        <td className='popup-td-head'>Highlight Selected</td>
                        <td className='popup-td-head'>Delete Selected</td>
                        <td className='popup-td-head'>Order Now for Selected</td>
                    </tr>
                </thead>
                <tbody>
                    <tr id='popup-tr'>
                        <td className='popup-td'><Switch />
                        </td>
                        {/* add additional popup to this delete button that asks 'are you sure you want to delete ${list of product}' */}
                        <td className='popup-td'>
                            <button>
                                <FontAwesomeIcon
                                    icon={faTrash}>

                                </FontAwesomeIcon>
                            </button>
                        </td>

                        <td className='popup-td'>
                            <button>
                                <FontAwesomeIcon
                                    icon={faShoppingBag}>

                                </FontAwesomeIcon>
                            </button>
                        </td>


                    </tr>
                </tbody>
            </table>
            <button id="close" onClick={(event) => handleClosePopup(event)} className={popup === "close" ? "hide" : "show"}>Close</button>
        </div>

    )
}
