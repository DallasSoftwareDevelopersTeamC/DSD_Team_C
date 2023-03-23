import React, { useState, useEffect, useContext } from 'react';
import { InventoryContext } from '../../../contexts/inventory.context';
import { OrdersContext } from '../../../contexts/orders.context';

import { deleteInventoryItems } from '../../../services/inventoryAPIcalls';
import { Switch } from "@mui/material";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faTrash } from '@fortawesome/free-solid-svg-icons';
import { faShoppingBag } from '@fortawesome/free-solid-svg-icons';


export default function SelectedCheckboxOptions({ handleClosePopup, popup }) {
    const { inventory, reloadInventory, isUsingStock, selectedItems, toggleSelectedItem } =
        useContext(InventoryContext);
    const { reloadOrders } = useContext(OrdersContext);
    const [displayConfirmation, setDisplayConfirmation] = useState(false);

    const handleDisplayConfirmationToggle = (event) => {
        setDisplayConfirmation(event.target.checked);
    };


    function findProductById(id) {
        return inventory.find(product => product.id === id);
    }

    async function handleDeleteProductsAndOrders(event) {
        await deleteInventoryItems(selectedItems)
        // await deleteOrders(selectedItems)
        handleClosePopup(event)
    }

    return (
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
                        <button>
                            <FontAwesomeIcon
                                icon={faTrash}
                                onClick={handleDeleteProductsAndOrders}
                            >
                            </FontAwesomeIcon>
                        </button>
                    </div>
                    <div className='rows'>
                        <p>Create a one time order for each of the {selectedItems.length} selected products</p>
                        <button>
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

    )
}
