import { useContext } from "react";
import { InventoryContext } from "../../../contexts/inventory.context";
import { deleteInventoryItems } from "../../../services/inventoryAPIcalls";

export default function SelectedRowsModal({ isOpen, onClose, selectedRows, }) {
    const {
        inventory,
        reloadInventory,
        isUsingStock,
        selectedItems,
        setSelectedItems,
        toggleSelectedItem,
      } = useContext(InventoryContext);



      async function handleDeleteProducts() {
        console.log("Selected rows:", selectedRows); // Debugging line
    
        const result = window.confirm("Are you sure you want to delete the selected items?");
        
        if (result) {
          try {
            const itemIdsToDelete = selectedRows.map(row => row.id);
            await deleteInventoryItems(itemIdsToDelete);
            reloadInventory();
          } catch (error) {
            console.error("Error deleting products:", error);
            throw new Error("An error occurred while deleting products.");
          }
        }
    }
    
      

      
  if (!isOpen) {
    return null;
  }

  return (
    <div className="fixed z-10 inset-0 overflow-y-auto">
      <div className="flex items-center justify-center min-h-screen pt-4 px-4 pb-20 text-center">
        <div className="fixed inset-0 transition-opacity" aria-hidden="true">
          <div className="absolute inset-0 bg-black/50"></div>
        </div>

        <span
          className="hidden sm:inline-block sm:align-middle sm:h-screen"
          aria-hidden="true"
        >
          &#8203;
        </span>

        <div className="inline-block align-bottom bg-white rounded-lg text-left overflow-hidden shadow-xl transform transition-all sm:my-8 sm:align-middle sm:max-w-lg sm:w-full">
          <div className="bg-white px-4 pt-5 pb-4 sm:p-6 sm:pb-4">
            <div className="sm:flex sm:items-start">
              <div className="mt-3 text-center sm:mt-0 sm:ml-4 sm:text-left">
                <h3 className="text-lg leading-6 font-medium text-gray-900">
                  Options
                </h3>
                <div className="mt-2">
                  <ul>
                    {selectedRows.map((row) => (
                      <li key={row.id}>
                        {row.id} - {row.sku} - {row.productName}
                      </li>
                    ))}
                  </ul>
                  <button
    type="button"
    className="bg-red-600 hover:bg-red-700 ..."
    onClick={() => handleDeleteProducts(selectedItems)}
>
    Delete
</button>

                </div>
              </div>
            </div>
          </div>
          <div className="bg-gray-50 px-4 py-3 sm:px-6 sm:flex sm:flex-row-reverse">
            <button
              type="button"
              className="bg-emerald-400/80 hover:bg-emerald-400 w-full inline-flex justify-center rounded-md border border-transparent shadow-sm px-4 py-2 text-base font-medium text-white focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-emerald-500 sm:ml-3 sm:w-auto sm:text-sm"
              onClick={onClose}
            >
              Close
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
