import React, { useState, useContext, useMemo, useEffect } from "react";
import { useTable, useSortBy, usePagination } from "react-table";
import { InventoryContext } from "../../contexts/inventory.context";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { library } from "@fortawesome/fontawesome-svg-core";
import {
  faArchive,
  faBox,
  faCartShopping,
  faCircleChevronLeft,
  faCircleChevronRight,
  faShoppingCart,
  faSort,
  faSortDown,
  faSortUp,
  faThumbTack,
} from "@fortawesome/free-solid-svg-icons";
library.add(faThumbTack);
import Order from "./popups/OrderNow";
import { OrdersContext } from "../../contexts/orders.context";
import calculateTotal from "../../utils/calcShippingAndTotal";
import { CustomCheckbox } from "./CustomCheckbox";
import AddProductButton from "./popups/AddProductButton";
import OrderHistory from "../Orders/OrderHistory";
import ActiveOrders from "../Orders/ActiveOrders";

export default function Inventory() {
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
        Cell: ({ value }) => <span className="">{value}</span>,
      },
      {
        Header: "Brand",
        accessor: "brand",
        Cell: ({ value }) => <span className="">{value}</span>,
      },
      {
        Header: "Item Name",
        accessor: "productName",
        Cell: ({ value }) => <span className="">{value}</span>,
      },
      {
        Header: "Description",
        accessor: "description",
        Cell: ({ value }) => <span className="">{value}</span>,
      },
      {
        Header: "In Stock",
        accessor: "inStock",
        Cell: ({ value }) => <span className="">{value}</span>,
      },
      {
        Header: "Threshold",
        accessor: "reorderAt",
        Cell: ({ value }) => <span className="">{value}</span>,
      },
      {
        Header: "Order Qty",
        accessor: "orderQty",
        Cell: ({ value }) => <span className="">{value}</span>,
      },
      {
        Header: "Order",
        accessor: "order",
        Cell: ({ row }) => (
          <button onClick={() => handleShowPopup(row.original)} className="">
            <FontAwesomeIcon
              icon={faCartShopping}
              className="text-zinc-500/70 text-lg"
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
    ],
    []
  );

  const {
    getTableProps,
    getTableBodyProps,
    headerGroups,
    page,
    prepareRow,
    canPreviousPage,
    canNextPage,
    pageOptions,
    pageCount,
    gotoPage,
    nextPage,
    previousPage,
    state: { pageIndex },
  } = useTable(
    { columns, data, initialState: { pageIndex: 0, pageSize: 10 } },
    useSortBy,
    usePagination
  );

  return (
    <div>
      {isLoading ? (
        <div>Loading...</div>
      ) : (
        <div className="bg-zinc-100 rounded-2xl p-4">
          <div className="flex mb-4 gap-x-3 font-semibold text-zinc-800">
            <button
              className={`px-4 py-2 ${
                activeTab === "inventory"
                  ? "bg-emerald-400/75 rounded-2xl "
                  : ""
              }`}
              onClick={() => setActiveTab("inventory")}
            >
              <FontAwesomeIcon icon={faBox} className="mr-1 text-zinc-600" />{" "}
              Inventory
            </button>
            <button
              className={`px-4 py-2 ${
                activeTab === "Active Orders"
                  ? "bg-emerald-400/75 rounded-2xl "
                  : ""
              }`}
              onClick={() => setActiveTab("Active Orders")}
            >
              <FontAwesomeIcon
                icon={faShoppingCart}
                className="mr-1 text-zinc-600"
              />{" "}
              Active Orders
            </button>
            <button
              className={`px-4 py-2 ${
                activeTab === "Order History"
                  ? "bg-emerald-400/75 rounded-2xl "
                  : ""
              }`}
              onClick={() => setActiveTab("Order History")}
            >
              <FontAwesomeIcon
                icon={faArchive}
                className="mr-1 text-zinc-600"
              />{" "}
              Order History
            </button>
          </div>

          {activeTab === "inventory" && (
            <>
              <div className="flex justify-end mx-4 mb-3">
                <AddProductButton />
              </div>
              <table
                {...getTableProps()}
                id="inventory"
                className="w-full table-auto text-black/80"
              >
                <thead className="border-b border-zinc-200 h-14 text-sm ">
                  {headerGroups.map((headerGroup) => (
                    <tr {...headerGroup.getHeaderGroupProps()}>
                      {headerGroup.headers.map((column) => (
                        <th
                          {...column.getHeaderProps(
                            column.getSortByToggleProps()
                          )}
                          className="px-1 font-semibold"
                        >
                          {column.render("Header")}
                          <span className="">
                            {column.isSorted ? (
                              column.isSortedDesc ? (
                                <FontAwesomeIcon
                                  icon={faSortDown}
                                  className="text-zinc-400 ml-2"
                                />
                              ) : (
                                <FontAwesomeIcon
                                  icon={faSortUp}
                                  className="text-zinc-400 ml-2"
                                />
                              )
                            ) : (
                              <FontAwesomeIcon
                                icon={faSort}
                                className="text-zinc-400 ml-2"
                              />
                            )}
                          </span>
                        </th>
                      ))}
                    </tr>
                  ))}
                </thead>
                <tbody {...getTableBodyProps()} className="tracking-wide">
                  {page.map((row) => {
                    prepareRow(row);
                    return (
                      <tr
                        {...row.getRowProps()}
                        className="text-sm h-12 border-b last:border-none border-zinc-200 hover:bg-zinc-50"
                      >
                        {row.cells.map((cell) => (
                          <td {...cell.getCellProps()} className="px-6">
                            {cell.render("Cell")}
                          </td>
                        ))}
                      </tr>
                    );
                  })}
                </tbody>
              </table>
              <div className="flex gap-4 justify-start p-2 mt-6">

                <button
                  onClick={() => previousPage()}
                  disabled={!canPreviousPage}
                >
                  {
                    <FontAwesomeIcon icon={faCircleChevronLeft} className="text-xl text-zinc-400 hover:text-zinc-400/80" />
                  }
                </button>{" "}

                <span className="text-sm text-zinc-700">
                  Page{" "}
                  <strong>
                    {pageIndex + 1} of {pageOptions.length}
                  </strong>{" "}
                </span>

                <button onClick={() => nextPage()} disabled={!canNextPage}>
                  {
                    <FontAwesomeIcon icon={faCircleChevronRight} className="text-xl text-zinc-400 hover:text-zinc-400/80"/>
                  }
                </button>{" "}
   

              </div>
              
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
