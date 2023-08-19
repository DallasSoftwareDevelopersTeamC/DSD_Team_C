import React, { useContext } from "react";
import { OrdersContext } from "../../contexts/orders.context";
import { clearAllOrderHistory } from "../../services/ordersAPIcalls";
import { useTable } from "react-table";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faTrash } from "@fortawesome/free-solid-svg-icons";

function OrderHistory() {
  const { orders, reloadOrders } = useContext(OrdersContext);

  const handleClearHistory = async () => {
    await clearAllOrderHistory();
    reloadOrders();
  };

  const columns = React.useMemo(
    () => [
      {
        Header: "ID",
        accessor: "id",
        Cell: ({ value }) => <>{value}</>,
      },
      {
        Header: "SKU",
        accessor: "SKU",
      },
      {
        Header: "Name",
        accessor: (row) => row.product.productName,
      },
      {
        Header: "Date",
        accessor: "orderedDate",
      },
      {
        Header: "Arrived",
        accessor: (row) => row.delivered || "n/a",
      },
      {
        Header: "QTY",
        accessor: "orderQty",
      },
      {
        Header: "Total",
        accessor: (row) => `$${row.totalCost}`,
      },
    ],
    []
  );

  const { getTableProps, getTableBodyProps, headerGroups, rows, prepareRow } =
    useTable({ columns, data: orders });

  return (
    <div className="px-4">
      <div className="flex justify-end">
        <button
          className="bg-zinc-200 hover:bg-zinc-300/80 py-2 px-4 rounded-full text-zinc-700 font-semibold text-sm flex items-center gap-2"
          onClick={handleClearHistory}
        >
          <FontAwesomeIcon
            icon={faTrash}
            className=" text-zinc-500 text-base"
          />{" "}
          Clear History
        </button>
      </div>

      <table {...getTableProps()} className="w-full table-auto text-black/80">
        <thead className="border-b border-zinc-200 text-sm font-semibold">
          {headerGroups.map((headerGroup) => (
            <tr {...headerGroup.getHeaderGroupProps()} className="h-14 ">
              {headerGroup.headers.map((column) => (
                <td {...column.getHeaderProps()} className="px-6">
                  {column.render("Header")}
                </td>
              ))}
            </tr>
          ))}
        </thead>
        <tbody {...getTableBodyProps()} className="order-history-body text-sm">
          {rows.map((row) => {
            prepareRow(row);
            return (
              <tr
                {...row.getRowProps()}
                className="h-12 border-b last:border-none border-zinc-200 hover:bg-zinc-50"
              >
                {row.cells.map((cell) => (
                  <td {...cell.getCellProps()} className="px-4">
                    {cell.render("Cell")}
                  </td>
                ))}
              </tr>
            );
          })}
        </tbody>
      </table>
    </div>
  );
}

export default OrderHistory;
