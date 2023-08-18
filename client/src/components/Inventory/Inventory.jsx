import React, { useState, useContext, useMemo, useEffect } from "react";
import { useTable } from "react-table";
import { InventoryContext } from "../../contexts/inventory.context";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { library } from "@fortawesome/fontawesome-svg-core";
import { faBagShopping, faThumbTack } from "@fortawesome/free-solid-svg-icons";
library.add(faThumbTack);
import { truncateString } from "../../utils/truncateString";
import Order from "./popups/OrderNow";
import { OrdersContext } from "../../contexts/orders.context";
import calculateTotal from "../../utils/calcShippingAndTotal";
import { CustomCheckbox } from "./CustomCheckbox";
import AddProductButton from "./popups/AddProductButton";
import OrdersPreview from "../Orders/OrdersPreview";
import OrderHistory from "../Orders/OrderHistory";
import ActiveOrders from "../Orders/ActiveOrders";

export default function Inventory({
  inventoryListScrollRef,
  ordersListScrollRef,
  rowHeightState,
  lastScrolledListRef,
}) {
  const {
    inventory,
    reloadInventory,
    isUsingStock,
    tempInStock,
    setTempInStock,
    selectedItems,
    toggleSelectedItem,
    isLoading,
  } = useContext(InventoryContext);
  const {
    activeOrders,
    reloadOrders,
    setDisplayOrderedDeliveredPopup,
    setOrderedDeliveryPopupContent,
  } = useContext(OrdersContext);

  const [popup, setPopup] = useState(null);
  const [activeTab, setActiveTab] = useState("inventory");

  const handleShowPopup = (product) => {
    setProductForPopup(product);
    setPopup("order");
  };
  const [productForPopup, setProductForPopup] = useState("");

  const handleOpenPopup = (product = null, event) => {
    if (event && event.target) {
      if (event.target.classList.contains("custom-checkbox")) {
        setPopup("selectedCheckboxOptions");
      } else {
        const targetId = event.target.id;
        setPopup(targetId);
        setProductForPopup(product);
      }
    }
  };

  const handleClosePopup = () => {
    setPopup(null);
    setProductForPopup(null);
  };

  // -------------------- Trigger orders at reorder at points ------------------------------

  const handleCalculateTotals = (orderQty, unitPrice) => {
    const qty = parseFloat(orderQty);
    const price = parseFloat(unitPrice);

    if (isNaN(qty) || isNaN(price)) {
      return 0;
    } else {
      const { total } = calculateTotal(qty, price);
      return total;
    }
  };

  const handleReloadInventory = () => {
    reloadInventory();
  };

  // keeping this old inventoryUsage code for now as backup
  useEffect(() => {
    if (!Array.isArray(inventory)) return;

    const createOrders = async () => {
      const promises = []; // Store promises for each order

      for (const item of inventory) {
        const totalCost = handleCalculateTotals(item.orderQty, item.unitPrice);
        if (
          (tempInStock[item.id] === item.reorderAt ||
            tempInStock[item.id] === item.reorderAt * 0.8) &&
          isUsingStock &&
          item.reorderAt !== 0
        ) {
          const orderInfo = {
            sku: item.sku,
            orderQty: item.orderQty,
            totalCost: totalCost,
          };

          promises.push(
            createOrders(orderInfo).then(() => {
              const updatedItem = { inStock: Number(tempInStock[item.id]) };
              return updateInventoryItem(item.id, updatedItem);
            })
          );
        }
      }

      try {
        await Promise.all(promises);
        reloadOrders();
      } catch (error) {
        console.error("Error creating order items:", error);
      }
    };

    createOrders();
  }, [tempInStock, isUsingStock, inventory]);

  const data = useMemo(
    () => (Array.isArray(inventory) ? inventory : []),
    [inventory]
  );

  const columns = useMemo(
    () => [
      {
        Header: "SKU",
        accessor: "sku",
      },
      {
        Header: "Brand",
        accessor: "brand",
      },
      {
        Header: "Item Name",
        accessor: "productName",
      },
      {
        Header: "Description",
        accessor: "description",
        // Cell: ({ value }) => {
        //   // return truncateString(value, 30);
        //   {value}
        // }
      },
      {
        Header: "In Stock",
        accessor: "inStock",
      },
      {
        Header: "Threshold",
        accessor: "reorderAt",
      },
      {
        Header: "Order Qty",
        accessor: "orderQty",
      },
      {
        Header: "Order",
        accessor: "order",
        Cell: ({ row }) => (
          <button onClick={() => handleShowPopup(row.original)} className="">
            <FontAwesomeIcon
              icon={faBagShopping}
              className="text-zinc-400/80 text-xl"
            />
          </button>
        ),
      },
      {
        Header: "Options",
        accessor: "checkbox",
        Cell: ({ row }) => (
          <CustomCheckbox
            itemId={row.original.id}
            onChange={toggleSelectedItem}
            selectedItems={selectedItems}
            sx={{
              "&.Mui-checked": {
                "& .MuiSvgIcon-root": {
                  fill: "var(--accent-color)",
                },
              },
            }}
          />
        ),
      },
      // {
      //   Header: () => null,
      //   accessor: "pin",
      //   Cell: ({ row }) => {
      //     const itemId = row.original.id;
      //     return isPinned(itemId) ? (
      //       <button onClick={() => unpinItem(itemId)}>
      //         <FontAwesomeIcon className="pin-icon" icon={faThumbTack} rotation={90} />
      //       </button>
      //     ) : (
      //       <button onClick={() => pinItem(itemId)}>
      //         <FontAwesomeIcon className="pin-icon" icon={faThumbTack} />
      //       </button>
      //     );
      //   }
      // }
    ],
    []
  );

  const { getTableProps, getTableBodyProps, headerGroups, rows, prepareRow } =
    useTable({ columns, data });

  return (
    <div>
      {isLoading ? (
        <div>Loading...</div>
      ) : (
        <div className="bg-zinc-100 rounded-2xl p-4">
          <div className="flex mb-4 space-x-2">
            <button
              className={`px-4 py-2 ${
                activeTab === "inventory"
                  ? "bg-zinc-300 rounded-2xl text-zinc-800"
                  : ""
              }`}
              onClick={() => setActiveTab("inventory")}
            >
              Inventory
            </button>
            <button
              className={`px-4 py-2 ${
                activeTab === "tab2"
                  ? "bg-zinc-300 rounded-2xl text-zinc-800"
                  : ""
              }`}
              onClick={() => setActiveTab("Active Orders")}
            >
              Active Orders
            </button>
            <button
              className={`px-4 py-2 ${
                activeTab === "tab3"
                  ? "bg-zinc-300 rounded-2xl text-zinc-800"
                  : ""
              }`}
              onClick={() => setActiveTab("Order History")}
            >
              Order History
            </button>
          </div>

          {activeTab === "inventory" && (
            <>
              <div className="flex justify-between mx-4 mb-3">
                <h1 className="text-2xl text-zinc-800 ">Inventory</h1>
                <AddProductButton />
              </div>
              <table
                {...getTableProps()}
                id="inventory"
                className="w-full table-auto text-black/80"
              >
                <thead className="border-b border-zinc-200 h-14 text-base">
                  {headerGroups.map((headerGroup) => (
                    <tr {...headerGroup.getHeaderGroupProps()}>
                      {headerGroup.headers.map((column) => (
                        <th {...column.getHeaderProps()} className="px-4">
                          {column.render("Header")}{" "}
                        </th>
                      ))}
                    </tr>
                  ))}
                </thead>
                <tbody {...getTableBodyProps()} className="">
                  {rows.map((row) => {
                    prepareRow(row);
                    return (
                      <tr
                        {...row.getRowProps()}
                        className="text-sm h-12 border-b border-zinc-200 hover:bg-zinc-50"
                      >
                        {row.cells.map((cell) => (
                          <td {...cell.getCellProps()} className="px-8">
                            {cell.render("Cell")}
                          </td>
                        ))}
                      </tr>
                    );
                  })}
                </tbody>
              </table>
            </>
          )}
          {activeTab === "Active Orders" && <ActiveOrders />}
          {activeTab === "Order History" && <OrderHistory />}
        </div>
      )}

      {popup === "order" && (
        <Order
          handleClosePopup={handleClosePopup}
          popup={popup}
          item={productForPopup}
          reloadOrders={reloadOrders}
          handleReloadInventory={handleReloadInventory}
        />
      )}
    </div>
  );
}
