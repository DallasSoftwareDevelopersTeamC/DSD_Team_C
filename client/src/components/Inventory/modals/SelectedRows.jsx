import { useContext, useState } from "react";
import { InventoryContext } from "../../../contexts/inventory.context";
import { deleteInventoryItems } from "../../../services/inventoryAPIcalls";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faTimes, faTrash } from "@fortawesome/free-solid-svg-icons";
import ConfirmModal from "./ConfirmModal";

export default function SelectedRowsModal({ isOpen, onClose, selectedRows }) {
  const {
    inventory,
    reloadInventory,
    isUsingStock,
    selectedItems,
    setSelectedItems,
    toggleSelectedItem,
    setNeedStatsUpdate,
  } = useContext(InventoryContext);

  const [confirmModalOpen, setConfirmModalOpen] = useState(false);

  async function confirmDelete() {
    try {
      const itemIdsToDelete = selectedRows.map((row) => row.id);
      await deleteInventoryItems(itemIdsToDelete);
      reloadInventory();
      setNeedStatsUpdate(true);
      setConfirmModalOpen(false);
      onClose();
    } catch (error) {
      console.error("Error deleting products:", error);
      throw new Error("An error occurred while deleting products.");
    }
  }

  function handleDeleteProducts() {
    setConfirmModalOpen(true);
  }

  if (!isOpen) {
    return null;
  }

  return (
    <div className="fixed z-10 inset-0 overflow-y-auto">
      <div className="flex items-center justify-center min-h-screen pt-4 px-4 pb-20 text-center">
        <div
          className="fixed inset-0 bg-black/50 transition-opacity"
          aria-hidden="true"
        ></div>

        <div className="inline-block align-bottom bg-white rounded-lg text-left overflow-hidden shadow-xl transform transition-all sm:my-8 sm:align-middle sm:max-w-lg sm:w-full">
          <div className="bg-white px-4 pt-5 pb-4 sm:p-6 sm:pb-4 flex justify-between items-start">
            <h3 className="text-xl  font-bold text-zinc-700">Options</h3>
            <FontAwesomeIcon
              icon={faTimes}
              className="cursor-pointer text-xl text-zinc-500 hover:text-zinc-400"
              onClick={onClose}
            />
          </div>
          <div className="mt-2 px-4 py-4 sm:p-6">
            <table className="min-w-full">
              <thead>
                <tr>
                  <th>ID</th>
                  <th>SKU</th>
                  <th>Name</th>
                </tr>
              </thead>
              <tbody>
                {selectedRows.map((row) => (
                  <tr key={row.id}>
                    <td>{row.id}</td>
                    <td>{row.sku}</td>
                    <td>{row.productName}</td>
                  </tr>
                ))}
              </tbody>
            </table>
            <button
              type="button"
              className="mt-4 bg-rose-500 font-bold hover:bg-rose-500/80 text-rose-100 p-2 px-3 rounded-lg"
              onClick={() => handleDeleteProducts(selectedItems)}
            >
              <FontAwesomeIcon icon={faTrash} className="mr-1 text-rose-700" />{" "}
              Delete
            </button>
          </div>
        </div>
      </div>
      <ConfirmModal
        isOpen={confirmModalOpen}
        onClose={() => {
          setConfirmModalOpen(false);
          onClose();
        }}
        onConfirm={confirmDelete}
        message="Are you sure you want to delete the selected items?"
      />
    </div>
  );
}
