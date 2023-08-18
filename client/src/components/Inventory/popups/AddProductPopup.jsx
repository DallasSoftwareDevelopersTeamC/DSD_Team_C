import React, { useState, useContext } from "react";
import "./popup.css";
import { createInventoryItem } from "../../../services/inventoryAPIcalls";
import { InventoryContext } from "../../../contexts/inventory.context";
import Swal from "sweetalert2";
import { useQuery } from "react-query";
import { authenticateUser } from "../../../services/authenticationAPIcalls";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faBox,
  faCancel,
  faSave,
  faX,
  faXmark,
  faXmarkCircle,
} from "@fortawesome/free-solid-svg-icons";

const AddProductPopup = ({ onClose }) => {
  const { reloadInventory } = useContext(InventoryContext);

  const [addProdInfo, setAddProdInfo] = useState({
    sku: "",
    brand: "",
    productName: "",
    description: "",
    inStock: "",
    reorderAt: "",
    orderQty: "",
    unitPrice: "",
  });

  const inputFields = [
    { label: "SKU", name: "sku", placeholder: "" },
    { label: "Brand", name: "brand", placeholder: "" },
    { label: "Name", name: "productName", placeholder: "" },
    { label: "Description", name: "description", placeholder: "" },
    { label: "Stock", name: "inStock", placeholder: "0" },
    { label: "Reorder at", name: "reorderAt", placeholder: "0" },
    { label: "Order QTY", name: "orderQty", placeholder: "0" },
    { label: "Cost", name: "unitPrice", placeholder: "$ 0.00" },
  ];

  // ---------------- add product functions start ---------------------
  const handleAddProd_InputChange = (e) => {
    const { name, value } = e.target;
    setAddProdInfo((prevState) => ({ ...prevState, [name]: value }));
  };

  async function handleCreateItem(e) {
    e.preventDefault();
    const response = await createInventoryItem(addProdInfo);
    if (!response.id) {
      onClose();
      return Swal.fire({
        icon: "error",
        title: "Oops...",
        text: `${response}`,
        background: "#333",
        color: "#fff",
        confirmButtonColor: "#3b9893",
      });
    }

    clearProdInputFields();
    reloadInventory();
    onClose();
    return Swal.fire({
      icon: "success",
      title: "Success!",
      text: `${response.productName} added to database`,
      background: "#333",
      color: "#fff",
      confirmButtonColor: "#3b9893",
    });
  }

  function clearProdInputFields() {
    setAddProdInfo((prevState) => {
      return Object.fromEntries(Object.keys(prevState).map((key) => [key, ""]));
    });
  }

  return (
    <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50">
      <div className="bg-zinc-50 p-4 rounded-2xl w-80 drop-shadow-lg relative">
        <form onSubmit={handleCreateItem}>
          <div className="flex justify-start font-bold text-xl">
            <h2>
              <FontAwesomeIcon
                icon={faBox}
                className="mr-2 text-emerald-500/80"
              />{" "}
              Add Product
            </h2>
          </div>
          <div className="flex flex-col space-y-2 mt-4">
            <div className="flex flex-col space-y-2">
              {inputFields.map((field) => (
                <label key={field.name} className="text-zinc-600">
                  {field.label}
                  <input
                    type="text"
                    name={field.name}
                    placeholder={field.placeholder || ""}
                    value={addProdInfo[field.name]}
                    onChange={handleAddProd_InputChange}
                    className="w-full p-2 mt-1 text-zinc-700 bg-zinc-300/70  rounded-lg outline-emerald-500/80"
                  />
                </label>
              ))}
            </div>
          </div>
          <div className="flex justify-evenly mt-4 space-x-4">
            <button
              className="bg-emerald-500/70 hover:bg-zinc-300/70 p-1.5 px-7 rounded-xl flex items-center gap-2 text-lg"
              type="submit"
              onSubmit={handleCreateItem}
            >
              <FontAwesomeIcon
                icon={faSave}
                className="text-lg text-zinc-700"
              />{" "}
              Save
            </button>
            <button
              className="bg-zinc-300/80 hover:bg-zinc-300/70 p-1.5 px-4 rounded-xl flex items-center gap-2 text-lg"
              onClick={onClose}
            >
              <FontAwesomeIcon
                icon={faXmarkCircle}
                className="text-lg text-zinc-500"
              />{" "}
              Cancel
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default AddProductPopup;
