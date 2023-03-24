import React, { useState, useContext } from 'react';
import './popup.css';
import './AddProductRow.css';
import { createInventoryItem } from '../../../services/inventoryAPIcalls';
import { InventoryContext } from '../../../contexts/inventory.context';

const AddProductPopup = ({ onClose }) => {
  const { reloadInventory } = useContext(InventoryContext);

  const [addProdInfo, setAddProdInfo] = useState({
    sku: '',
    brand: '',
    productName: '',
    description: '',
    inStock: '',
    reorderAt: '',
    orderQty: '',
    unitPrice: '',
  });
  const [popupMsg, setPopupMsg] = useState('');

  // ---------------- add product functions start ---------------------
  const handleAddProd_InputChange = (e) => {
    // (e) represents the event - the exact input that changed
    const { name, value } = e.target;
    setAddProdInfo((prevState) => ({ ...prevState, [name]: value }));
  };

  async function handleCreateItem(e) {
    e.preventDefault();
    const response = await createInventoryItem(addProdInfo);
    console.log(response);
    // clear fields after response succeeds
    clearProdInputFields();
    reloadInventory();

    // set popup message
    setPopupMsg('Saved successfully.');
    // clear popup message after 3 seconds
    setTimeout(() => {
      setPopupMsg('');
    }, 3000);
  }

  function clearProdInputFields() {
    setAddProdInfo((prevState) => {
      return Object.fromEntries(Object.keys(prevState).map((key) => [key, '']));
    });
  }

  return (
    <div className="popup-container">
      <div className="popup-content">
        <form onSubmit={handleCreateItem}>
          <table className="product-table">
            <thead>
              <tr>
                <td className="td-title-add">
                  <h2>Add Product</h2>
                </td>
              </tr>
              <tr className="product-header">
                <td>SKU</td>
                <td>Brand</td>
                <td>Name</td>
                <td>Description</td>
                <td>Stock</td>
                <td>Reorder at</td>
                <td>Order QTY</td>
                <td>Cost</td>
                <td></td>
                <td></td>
              </tr>
            </thead>
            <tbody>
              <tr className="product-row">
                <td>
                  <input
                    type="text"
                    name="sku"
                    placeholder="SKU"
                    value={addProdInfo.sku}
                    onChange={handleAddProd_InputChange}
                  />
                </td>
                <td>
                  <input
                    type="text"
                    name="brand"
                    placeholder="Brand"
                    value={addProdInfo.brand}
                    onChange={handleAddProd_InputChange}
                  />
                </td>
                <td>
                  <input
                    type="text"
                    name="productName"
                    placeholder="Name"
                    value={addProdInfo.productName}
                    onChange={handleAddProd_InputChange}
                  />
                </td>
                <td>
                  <input
                    type="text"
                    name="description"
                    placeholder="Description"
                    value={addProdInfo.description}
                    onChange={handleAddProd_InputChange}
                  />
                </td>
                <td>
                  <input
                    type="text"
                    name="inStock"
                    placeholder="0"
                    value={addProdInfo.inStock}
                    onChange={handleAddProd_InputChange}
                  />
                </td>
                <td>
                  <input
                    type="text"
                    name="reorderAt"
                    placeholder="0"
                    value={addProdInfo.reorderAt}
                    onChange={handleAddProd_InputChange}
                  />
                </td>
                <td>
                  <input
                    type="text"
                    name="orderQty"
                    placeholder="0"
                    value={addProdInfo.orderQty}
                    onChange={handleAddProd_InputChange}
                  />
                </td>
                <td>
                  <input
                    type="text"
                    name="unitPrice"
                    placeholder="$ 0.00"
                    value={addProdInfo.unitPrice}
                    onChange={handleAddProd_InputChange}
                  />
                </td>
                <td>
                  {popupMsg && <div className="save-popup">{popupMsg}</div>}
                  <button className="popup-btn" type="submit" onSubmit={handleCreateItem}>
                    Save
                  </button>
                </td>
                <td>
                  <button className="popup-btn" onClick={onClose}>
                    Close
                  </button>
                </td>
              </tr>
            </tbody>
          </table>
        </form>
      </div>
    </div>
  );
};

export default AddProductPopup;
