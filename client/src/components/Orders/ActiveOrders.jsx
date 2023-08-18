import React, { useContext, useState } from "react";
import { OrdersContext } from "../../contexts/orders.context";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faEdit } from "@fortawesome/free-solid-svg-icons";
import EditPopup from "./EditPopup";
import { useTable } from "react-table";

function ActiveOrders() {
  /*   const { data, isLoading, isError } = useQuery(
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
  const { orders, activeOrders, reloadOrders, deliveriesOn } =
    useContext(OrdersContext);

  /* useEffect(() => {
        console.log(activeOrders)
    }, [activeOrders]);

    useEffect(() => {
        console.log(deliveriesOn)
    }, [deliveriesOn]);

    const simulateDelivery = async (order) => {
        const deliveryTime = Math.floor(Math.random() * (15000 - 5000 + 1)) + 5000;

        setTimeout(async () => {
            // Update the tempStockamount for this product
            console.log(order.shcedArrivalDate)
            console.log('sim prod delivered')

            // Send an update request to the backend to change the order status
            // await updateOrderStatusInBackend(order.id, "delivered");

            // Update the "in stock" amount for the inventory item in the React context
            // updateInventoryStock(order.inventoryItemId, order.quantity);

            // Send an update request to the backend to update the inventory
            // await updateInventoryStockInBackend(order.inventoryItemId, order.quantity);
        }, deliveryTime);
    };

    useEffect(() => {
        if (deliveriesOn) {
            activeOrders.forEach(order => {
                simulateDelivery(order);
            });
        }
    }, [activeOrders, deliveriesOn]);
 */

  // ---------- handle popup --------------------------

  const [orderForPopup, setOrderForPopup] = useState(null);

  const handleOpenPopup = (order) => {
    setOrderForPopup(order);
  };

  const handleClosePopup = () => {
    setOrderForPopup(null);
  };

  const columns = React.useMemo(
    () => [
      {
        Header: "ID",
        accessor: "id",
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
        Header: "Arrival",
        accessor: (row) => row.schedArrivalDate || "n/a",
      },
      {
        Header: "QTY",
        accessor: "orderQty",
      },
      {
        Header: "Shipper",
        accessor: (row) => row.product.shipper,
      },
      {
        Header: "Total",
        accessor: (row) => `$${row.totalCost}`,
      },
      {
        Header: "Edit",
        id: "edit",
        Cell: ({ row }) => (
          <button id="settings" onClick={() => handleOpenPopup(row.original)}>
            <FontAwesomeIcon
              icon={faEdit}
              className="text-zinc-500 text-base"
              style={{ pointerEvents: "none" }}
            />
          </button>
        ),
      },
    ],
    []
  );

  const { getTableProps, getTableBodyProps, headerGroups, rows, prepareRow } =
    useTable({ columns, data: orders });

  return (
    <>
      <div className="px-4">
        <table {...getTableProps()} className="table-auto w-full text-black/80 ">
          <thead>
            {headerGroups.map((headerGroup) => (
              <tr {...headerGroup.getHeaderGroupProps()} className="h-14 text-sm font-semibold border-b border-zinc-200">
                {headerGroup.headers.map((column) => (
                  <td {...column.getHeaderProps()} className="px-4">
                    {column.render("Header")}
                  </td>
                ))}
              </tr>
            ))}
          </thead>
          <tbody {...getTableBodyProps()} className="text-sm ">
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

      {orderForPopup && (
        <EditPopup handleClosePopup={handleClosePopup} order={orderForPopup} />
      )}
    </>
  );
}

export default ActiveOrders;
