import React, { useState } from 'react';
import { createInventoryItem } from '../../services/inventoryAPIcalls'

export default function AddProductRow({ rowAdded, handleHideRow, handleHeaderChange }) {

    const [addProdRow, setAddProdRow] = useState([]);
    const [addProdInfo, setAddProdInfo] = useState({
        sku: '',
        brand: '',
        productName: '',
        description: '',
        inStock: '',
        reorderAt: '',
        orderQty: '',
        unitPrice: ''
    });

    // ---------------- add product functions start ---------------------
    const handleAddProd_InputChange = (e) => {
        // (e) represents the event - the exact input that changed
        const { name, value } = e.target;
        setAddProdInfo((prevState) => ({ ...prevState, [name]: value }));
    };

    async function handleCreateItem(e) {
        e.preventDefault();
        const response = await createInventoryItem(addProdInfo)
        console.log(response)
        // clear fields after response succeeds
        clearProdInputFields()
    }

    function clearProdInputFields() {
        setAddProdInfo(prevState => {
            return Object.fromEntries(Object.keys(prevState).map(key => [key, '']));
        });
    }


    return (<>
        {rowAdded && (
            <tr>
                <td>
                    <input
                        type="text" className="dynamic-inputs sku"
                        name="sku"
                        value={addProdInfo.sku}
                        onChange={handleAddProd_InputChange} />
                </td>
                <td>
                    <input
                        type="text" className="dynamic-inputs brand"
                        name="brand"
                        value={addProdInfo.brand}
                        onChange={handleAddProd_InputChange} />
                </td>
                <td>
                    <input
                        type="text" className="dynamic-inputs name"
                        name="productName"
                        value={addProdInfo.productName}
                        onChange={handleAddProd_InputChange} />
                </td>
                <td>
                    <input
                        type="text" className="dynamic-inputs desc"
                        name="description"
                        value={addProdInfo.description}
                        onChange={handleAddProd_InputChange} />
                </td>
                <td>
                    <input
                        type="text" className="dynamic-inputs"
                        name="inStock"
                        value={addProdInfo.inStock}
                        onChange={handleAddProd_InputChange} />
                </td>
                <td>
                    <input
                        type="text" className="dynamic-inputs"
                        name="reorderAt"
                        value={addProdInfo.reorderAt}
                        onChange={handleAddProd_InputChange} />
                </td>
                <td>
                    <input
                        type="text" className="dynamic-inputs"
                        name="orderQty"
                        value={addProdInfo.orderQty}
                        onChange={handleAddProd_InputChange} />
                </td>
                <td>
                    <input
                        type="text" className="dynamic-inputs unit-price"
                        name="unitPrice"
                        value={addProdInfo.unitPrice}
                        onChange={handleAddProd_InputChange} />
                </td>
                <td>
                    <form onSubmit={handleCreateItem}>
                        <button type="submit">Save</button>
                    </form>
                </td>
                <td>
                    <button onClick={() => {
                        handleHideRow()
                        handleHeaderChange(null, true);
                        clearProdInputFields()
                    }
                    }>Cancel</button>
                </td>
            </tr>
        )}
    </>
    )

}