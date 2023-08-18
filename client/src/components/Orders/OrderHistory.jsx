import React, { useContext, useEffect, useState, useRef } from "react";
import { useNavigate } from "react-router-dom";
import { OrdersContext } from "../../contexts/orders.context";
import { clearAllOrderHistory } from "../../services/ordersAPIcalls";
import { authenticateUser } from "../../services/authenticationAPIcalls";
import { useQuery } from "react-query";
import Swal from "sweetalert2";
import { useTable } from "react-table";

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
            <span className="mobile-span">Total</span>
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
    <>
      <div className="flex justify-between">
        <h1>Order History</h1>

        <button className="small-blue-button" onClick={handleClearHistory}>
          Clear History
        </button>
      </div>

      <table {...getTableProps()} className="w-full table-auto">
        <thead>
          {headerGroups.map((headerGroup) => (
            <tr {...headerGroup.getHeaderGroupProps()} className="h-14">
              {headerGroup.headers.map((column) => (
                <td {...column.getHeaderProps()}>{column.render("Header")}</td>
              ))}
            </tr>
          ))}
        </thead>
        <tbody {...getTableBodyProps()} className="order-history-body">
          {rows.map((row) => {
            prepareRow(row);
            return (
              <tr {...row.getRowProps()} className="h-12">
                {row.cells.map((cell) => (
                  <td {...cell.getCellProps()}>{cell.render("Cell")}</td>
                ))}
              </tr>
            );
          })}
        </tbody>
      </table>
    </>
  );
}

export default OrderHistory;
