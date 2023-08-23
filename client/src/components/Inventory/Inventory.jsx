import React, { useState, useContext, useMemo, useEffect } from "react";
import {
  useTable,
  useSortBy,
  usePagination,
  useRowSelect,
  disableSortBy,
} from "react-table";
import { InventoryContext } from "../../contexts/inventory.context";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faArchive,
  faBox,
  faCartShopping,
  faCheck,
  faCircleChevronLeft,
  faCircleChevronRight,
  faGear,
  faShoppingCart,
  faSort,
  faSortDown,
  faSortUp,
} from "@fortawesome/free-solid-svg-icons";
import Order from "./modals/OrderNow";
import { createOrderItem } from "../../services/ordersAPIcalls";
import { useAutomaticOrders } from "../../hooks/useAutomaticOrders";
import { OrdersContext } from "../../contexts/orders.context";
import AddProductButton from "./modals/AddProductButton";
import OrderHistory from "../Orders/OrderHistory";
import ActiveOrders from "../Orders/ActiveOrders";
import SelectedRowsModal from "./modals/SelectedRows";
import { updateInventoryItem } from "../../services/inventoryAPIcalls";
import { EditableCell } from "./EditableCell";
import DemoControls from "../DemoControls";

export default function Inventory() {
  const {
    inventory,
    reloadInventory,
    isUsingStock,
    tempInStock,
    setTempInStock,
    selectedItems,
    setSelectedItems,
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
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [modalData, setModalData] = useState([]);

  const handleShowPopup = (product) => {
    setProductForPopup(product);
    setPopup("order");
  };
  const [productForPopup, setProductForPopup] = useState("");

  const handleClosePopup = () => {
    setPopup(null);
    setProductForPopup(null);
  };

  const openModalWithSelectedRows = () => {
    setModalData(selectedRowsData);
    setIsModalOpen(true);
  };

  const handleReloadInventory = () => {
    reloadInventory();
  };

  useAutomaticOrders(
    inventory,
    isUsingStock,
    tempInStock,
    createOrderItem,
    reloadOrders,
    setOrderedDeliveryPopupContent,
    setDisplayOrderedDeliveredPopup
  );

  const IndeterminateCheckbox = React.forwardRef(
    ({ indeterminate, ...rest }, ref) => {
      const defaultRef = React.useRef();
      const resolvedRef = ref || defaultRef;

      React.useEffect(() => {
        resolvedRef.current.indeterminate = indeterminate;
      }, [resolvedRef, indeterminate]);

      return (
        <>
          <input type="checkbox" ref={resolvedRef} {...rest} />
        </>
      );
    }
  );

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
        Header: "Unit Price",
        accessor: "unitPrice",
        Cell: ({ value }) => (
          <span>
            {parseFloat(value).toLocaleString("en-US", {
              style: "currency",
              currency: "USD",
            })}
          </span>
        ),
      },
      {
        Header: "In Stock",
        accessor: "inStock",
        Cell: ({ value, row }) => {
          const item = row.original;
          return (
            <span className="">{tempInStock[item.id] || item.inStock}</span>
          );
        },
      },
      {
        Header: "Threshold",
        accessor: "reorderAt",
        Cell: ({ value, row }) => (
          <EditableCell
            value={value}
            row={row}
            accessor="reorderAt"
            updateFunction={updateInventoryItem}
            reloadFunction={reloadInventory}
          />
        ),
      },
      {
        Header: "Order Qty",
        accessor: "orderQty",
        Cell: ({ value, row }) => (
          <EditableCell
            value={value}
            row={row}
            accessor="orderQty"
            updateFunction={updateInventoryItem}
            reloadFunction={reloadInventory}
          />
        ),
      },
      {
        Header: "Order",
        accessor: "order",
        disableSortBy: true,
        Cell: ({ row }) => (
          <button onClick={() => handleShowPopup(row.original)} className="">
            <FontAwesomeIcon
              icon={faCartShopping}
              className="text-zinc-500/70 text-lg"
            />
          </button>
        ),
      },
    ],
    [tempInStock]
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
    nextPage,
    previousPage,
    setPageSize,
    selectedFlatRows,
    state: { pageIndex, pageSize },
  } = useTable(
    {
      columns,
      data,
      initialState: { pageIndex: 0, pageSize: 10 },
      disableSortBy,
    },
    useSortBy,
    usePagination,
    useRowSelect,
    (hooks) => {
      hooks.visibleColumns.push((columns) => [
        {
          id: "selection",
          Header: ({ getToggleAllRowsSelectedProps }) => (
            <div>
              <IndeterminateCheckbox {...getToggleAllRowsSelectedProps()} />
            </div>
          ),
          Cell: ({ row }) => (
            <IndeterminateCheckbox {...row.getToggleRowSelectedProps()} />
          ),
        },
        ...columns,
      ]);
    }
  );

  const selectedRowsData = React.useMemo(() => {
    return selectedFlatRows.map((row) => row.original);
  }, [selectedFlatRows]);

  // set selected items (rows) into inventory context
  useEffect(() => {
    setSelectedItems(selectedRowsData);
  }, [selectedRowsData]);

  return (
    <div>
      {isLoading ? (
        <div>Loading...</div>
      ) : (
        <>
          <SelectedRowsModal
            isOpen={isModalOpen}
            onClose={() => setIsModalOpen(false)}
            selectedRows={selectedRowsData}
          />
          <div className="bg-zinc-100 rounded-2xl p-4 overflow-x-auto">
            <div className="flex mb-4 gap-x-1 font-semibold text-zinc-800 px-2">
              <button
                className={`px-4 py-2 ${
                  activeTab === "inventory"
                    ? "bg-emerald-400/75 rounded-xl text-emerald-800"
                    : "text-zinc-700"
                }`}
                onClick={() => setActiveTab("inventory")}
              >
                <FontAwesomeIcon icon={faBox} className="mr-1 text-zinc-600" />{" "}
                Inventory
              </button>
              <button
                className={`px-4 py-2 ${
                  activeTab === "Active Orders"
                    ? "bg-emerald-400/75 rounded-xl text-emerald-800"
                    : "text-zinc-700"
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
                    ? "bg-emerald-400/75 rounded-xl text-emerald-800"
                    : "text-zinc-700"
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
                <div className="flex justify-between items-center">
                  <div className="">
                    {selectedFlatRows.length > 0 && (
                      <button
                        className="bg-zinc-200 hover:bg-zinc-300/70 p-2 px-4 rounded-full flex items-center gap-2 text-zinc-700 font-semibold text-sm"
                        onClick={openModalWithSelectedRows}
                      >
                        <FontAwesomeIcon
                          icon={faGear}
                          className=" text-base text-zinc-400 "
                        />{" "}
                        Bulk Actions
                      </button>
                    )}
                  </div>
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
                              {column.id !== "selection" &&
                              column.id !== "order" ? (
                                column.isSorted ? (
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
                                )
                              ) : null}
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
                            <td {...cell.getCellProps()} className="px-5">
                              {cell.render("Cell")}
                            </td>
                          ))}
                        </tr>
                      );
                    })}
                  </tbody>
                  <tfoot className="">
          <tr className="">
            <td className="" colSpan={columns.length + 1}><DemoControls/></td>
          </tr>
        </tfoot>
                </table>
                <div className="flex gap-4 justify-between p-2 mt-2">
                  <div className="flex gap-4 items-center">
                    <button
                      onClick={() => previousPage()}
                      disabled={!canPreviousPage}
                    >
                      {
                        <FontAwesomeIcon
                          icon={faCircleChevronLeft}
                          className="text-xl text-zinc-400 hover:text-zinc-400/80"
                        />
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
                        <FontAwesomeIcon
                          icon={faCircleChevronRight}
                          className="text-xl text-zinc-400 hover:text-zinc-400/80"
                        />
                      }
                    </button>{" "}
                  </div>

                  <select
                    value={pageSize}
                    onChange={(e) => {
                      setPageSize(Number(e.target.value));
                    }}
                    className="rounded-xl bg-zinc-300 text-zinc-800 text-sm outline-none p-1"
                  >
                    {[10, 20, 30, 50].map((pageSize) => (
                      <option key={pageSize} value={pageSize}>
                        Show {pageSize}
                      </option>
                    ))}
                  </select>
                </div>
              </>
            )}
            {activeTab === "Active Orders" && <ActiveOrders />}
            {activeTab === "Order History" && <OrderHistory />}
          </div>
        </>
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
