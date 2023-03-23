import React, { useState, useEffect, useContext } from 'react';
import { InventoryContext } from '../../../contexts/inventory.context';
import { OrdersContext } from '../../../contexts/orders.context';

import { deleteInventoryItems } from '../../../services/inventoryAPIcalls';
import { Switch } from "@mui/material";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faTrash } from '@fortawesome/free-solid-svg-icons';
import { faShoppingBag } from '@fortawesome/free-solid-svg-icons';


export default function SelectedCheckboxOptions({ handleClosePopup, popup }) {
    const { inventory, reloadInventory, isUsingStock, selectedItems, setSelectedItems, toggleSelectedItem } =
        useContext(InventoryContext);
    const { reloadOrders } = useContext(OrdersContext);
    const [displayConfirmation, setDisplayConfirmation] = useState(false);

    const handleDisplayConfirmationToggle = (event) => {
        setDisplayConfirmation(event.target.checked);
    };


    function findProductById(id) {
        return inventory.find(product => product.id === id);
    }

    const [message, setMessage] = useState(null);
    async function handleDeleteProductsAndOrders(event) {
        try {
            await deleteInventoryItems(selectedItems);
            // Remove deleted items' IDs from selectedItems array
            setSelectedItems((prevSelectedItems) => {
                const newSelectedItems = new Set(prevSelectedItems);
                for (const itemId of selectedItems) {
                    newSelectedItems.delete(itemId);
                }
                return newSelectedItems;
            });

            setMessage("Products deleted successfully.");
            setTimeout(() => {
                setMessage(null);
            }, 3000); // 3 seconds timeou
            reloadInventory();
            reloadOrders();
        } catch (error) {
            setMessage("An error occurred while deleting products.");
            console.error("Error deleting products:", error);
        } finally {
            handleClosePopup(event);
        }
    }


    return (
        <>
            <div className="popup checkbox-options-popup">
                <h2>Checkbox Selection Options</h2>
                <section className='options-section'>
                    <div className='rows'>
                        <div className=''>Select All</div>
                        <Switch />
                    </div>
                    <div className='rows'>
                        <div className=''>Highlight Selected</div>
                        <Switch />
                    </div>
                    <div className='rows '>
                        <div className=''>Display list to delete all or create orders for selected</div>
                        <Switch
                            className="display-list"
                            checked={displayConfirmation}
                            onChange={handleDisplayConfirmationToggle}
                        />
                    </div>

                </section>
                {/* this section is displayed when the toggle switch for "display list..." is on */}
                {displayConfirmation && (
                    <section className='confirmation'>
                        <h4>Confirm</h4>
                        <div className='listOfSelectedContainer'>
                            <ul>
                                {
                                    selectedItems.map((id, index) => {
                                        console.log(id)
                                        const product = findProductById(id);
                                        return (
                                            <li key={id}>
                                                <div className='list-numbering'>
                                                    {index + 1}
                                                </div>
                                                <div>
                                                    {product.sku}
                                                </div>
                                                <div className='list-spacer'>
                                                    -
                                                </div>
                                                <div>
                                                    {product.productName}
                                                </div>
                                            </li>
                                        );
                                    })}

                            </ul>
                        </div>
                        <div className='rows'>
                            <p>Delete {selectedItems.length} selected products and any orders associated with them</p>
                            <button
                                onClick={handleDeleteProductsAndOrders}
                            >
                                <FontAwesomeIcon
                                    icon={faTrash}
                                >
                                </FontAwesomeIcon>
                            </button>
                        </div>
                        <div className='rows'>
                            <p>Create a one time order for each of the {selectedItems.length} selected products</p>
                            <button

                            >
                                <FontAwesomeIcon
                                    icon={faShoppingBag}>
                                </FontAwesomeIcon>
                            </button>
                        </div>


                    </section>
                )}
                <section>
                    <button id="close" onClick={(event) => handleClosePopup(event)} className={popup === "close" ? "hide" : "show"}>Close</button>
                </section>
            </div>
            {
                message && (
                    <div className="popup-message popup">
                        <p>{message}</p>
                    </div>
                )
            }
        </>
    )
}
