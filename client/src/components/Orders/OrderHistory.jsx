import React, { useContext, useEffect, useState, useRef } from "react";
import { useNavigate } from "react-router-dom";
import { OrdersContext } from "../../contexts/orders.context";
import { clearAllOrderHistory } from "../../services/ordersAPIcalls";
import { authenticateUser } from "../../services/authenticationAPIcalls";
import { useQuery } from "react-query";
import Swal from "sweetalert2";
import { useTable } from "react-table";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faHistory } from "@fortawesome/free-solid-svg-icons";

function OrderHistory() {
  const navigate = useNavigate();
  /*  const { data, isLoading, isError } = useQuery(
    'authenticateUser',
    authenticateUser,
    {
      onSuccess: (data) => {
        if (data === 'JsonWebTokenError' || data === 'TokenExpiredError') {
          navigate('/login');
        }
      },
    }
  );
  if (isError) {
    return Swal.fire({
      icon: 'error',
      title: 'Oops...',
      text: `Unable to communicate with the server. Please refresh the webpage.`,
      background: '#333',
      color: '#fff',
      confirmButtonColor: '#3b9893',
    });
  } */
  const { orders, reloadOrders } = useContext(OrdersContext);
  const orderHistory = orders.filter(
    (item) => item.orderStatus === "delivered"
  );

  const handleClearHistory = async () => {
    await clearAllOrderHistory();
    reloadOrders();
  };
  /*     useEffect(() => {
            console.log(orderHistory)
        }, [orderHistory]);
     */

  const columns = React.useMemo(
    () => [
      {
        Header: "ID",
        accessor: "id",
        Cell: ({ value }) => (
          <>
            <span className="mobile-span">ID</span>
            {value}
          </>
        ),
      },
      {
        Header: "SKU",
        accessor: "SKU",
      },
      {
        Header: "Name",
        accessor: (row) => row.product.productName,
        Cell: ({ value }) => (
          <>
            <span className="mobile-span">Name</span>
            {value}
          </>
        ),
      },
      {
        Header: "Date",
        accessor: "orderedDate",
        Cell: ({ value }) => (
          <>
            <span className="mobile-span">Date</span>
            {value}
          </>
        ),
      },
      {
        Header: "Arrived",
        accessor: (row) => row.delivered || "n/a",
      },
      {
        Header: "QTY",
        accessor: "orderQty",
        Cell: ({ value }) => (
          <>
            <span className="mobile-span">QTY</span>
            {value}
          </>
        ),
      },
      {
        Header: "Total",
        accessor: (row) => `$${row.totalCost}`,
        Cell: ({ value }) => (
          <>
            {value}
          </>
        ),
      },
    ],
    []
  );

  const { getTableProps, getTableBodyProps, headerGroups, rows, prepareRow } =
    useTable({ columns, data: orders });

  return (
    <div className="px-4">
      <div className="flex justify-end">

        <button className="bg-zinc-200 hover:bg-zinc-300/80 py-2 px-4 rounded-full text-zinc-700 font-semibold text-sm flex items-center gap-2" onClick={handleClearHistory}>
          <FontAwesomeIcon icon={faHistory} className=" text-zinc-500 text-lg" /> Clear History
        </button>
      </div>

      <table {...getTableProps()} className="w-full table-auto text-black/80">
        <thead className="border-b border-zinc-200 text-sm font-semibold">
          {headerGroups.map((headerGroup) => (
            <tr {...headerGroup.getHeaderGroupProps()} className="h-14 ">
              {headerGroup.headers.map((column) => (
                <td {...column.getHeaderProps()} className="px-6">{column.render("Header")}</td>
              ))}
            </tr>
          ))}
        </thead>
        <tbody {...getTableBodyProps()} className="order-history-body text-sm">
          {rows.map((row) => {
            prepareRow(row);
            return (
              <tr {...row.getRowProps()} className="h-12 border-b border-zinc-200">
                {row.cells.map((cell) => (
                  <td {...cell.getCellProps()} className="px-4">{cell.render("Cell")}</td>
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
