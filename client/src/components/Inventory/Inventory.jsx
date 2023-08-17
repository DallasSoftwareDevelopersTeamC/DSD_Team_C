import React, { useState, useContext, useMemo, useEffect } from "react";
import { useTable } from 'react-table';
import { InventoryContext } from "../../contexts/inventory.context";
import { PinningContext } from "../../contexts/pinning.context";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { library } from "@fortawesome/fontawesome-svg-core";
import { faThumbTack } from "@fortawesome/free-solid-svg-icons";
library.add(faThumbTack);
import { truncateString } from "../../utils/truncateString";
import Order from "./popups/OrderNow";
import { OrdersContext } from "../../contexts/orders.context";
import calculateTotal from "../../utils/calcShippingAndTotal";
import { CustomCheckbox } from "./CustomCheckbox";

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

  const { pinnedItems, pinItem, unpinItem, isPinned } =
    useContext(PinningContext);
    const [popup, setPopup] = useState(null);

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
    // Check inventory for items that need to be re-ordered
    inventory.forEach((item) => {
      const totalCost = handleCalculateTotals(item.orderQty, item.unitPrice);
      // console.log(tempInStock[item.id], item.reorderAt);

      if (
        // when tempInStock hits the reorderAt or 80% of the reorderAt, trigger orders
        (tempInStock[item.id] === item.reorderAt ||
          tempInStock[item.id] === item.reorderAt * 0.8) &&
        isUsingStock &&
        item.reorderAt != 0
      ) {
        // Create order item
        const orderInfo = {
          sku: item.sku,
          orderQty: item.orderQty,
          totalCost: totalCost,
        };

        // Make API call to create order item
        createOrderItem(orderInfo)
          /*     .then(async () => {
                const updatedItem = { inStock: Number(tempInStock[item.id]) };
                await updateInventoryItem(item.id, updatedItem);
              }) */
          .then(() => {
            reloadOrders();
            console.log(item);
            setOrderedDeliveryPopupContent(["o", item, orderInfo]);
            setDisplayOrderedDeliveredPopup(true);

            // reloading inventory here will cause tempStock values to be lost unless we send update req first
          })
          .catch((error) => {
            console.error("Error creating order item:", error);
          });
      }
    });
  }, [tempInStock, isUsingStock]);


  const data = useMemo(() => inventory, [inventory]);

  const columns = useMemo(
    () => [
      {
        Header: () => null,
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
        )
      },
      {
        Header: "SKU",
        accessor: "sku"
      },
      {
        Header: "Brand",
        accessor: "brand"
      },
      {
        Header: "Name",
        accessor: "productName"
      },
      {
        Header: "Description",
        accessor: "description",
        Cell: ({ value }) => {
          // You can adjust truncateString function accordingly
          return truncateString(value, 30);
        }
      },
      {
        Header: "Stock",
        accessor: "inStock"
      },
      {
        Header: "Target",
        accessor: "reorderAt"
      },
      {
        Header: "Ord. Qty",
        accessor: "orderQty"
      },
      {
        Header: () => null,
        accessor: "order",
        Cell: ({ row }) => (
          <button onClick={() => handleShowPopup(row.original)}>Order</button>
        )
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

  const {
    getTableProps,
    getTableBodyProps,
    headerGroups,
    rows,
    prepareRow
  } = useTable({ columns, data });

  return (
    <div>
      {isLoading ? (
        <div>Loading...</div>
      ) : (
        <table {...getTableProps()} id="inventory" className=" table-auto text-black/80">
          <thead>
            {headerGroups.map(headerGroup => (
              <tr {...headerGroup.getHeaderGroupProps()}>
                {headerGroup.headers.map(column => (
                  <th {...column.getHeaderProps()}>{column.render('Header')}</th>
                ))}
              </tr>
            ))}
          </thead>
          <tbody {...getTableBodyProps()}>
            {rows.map(row => {
              prepareRow(row);
              return (
                <tr {...row.getRowProps()}>
                  {row.cells.map(cell => (
                    <td {...cell.getCellProps()}>{cell.render('Cell')}</td>
                  ))}
                </tr>
              );
            })}
          </tbody>
        </table>
      )}

{popup === "order" && (
  <Order
    handleClosePopup={handleClosePopup}
    popup={popup}
    item={productForPopup}
    reloadOrders={reloadOrders} // I assume this comes from props or context
    handleReloadInventory={handleReloadInventory} // I assume this comes from props or context
  />
)}

    </div>
  );
}
