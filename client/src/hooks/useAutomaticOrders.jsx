import { useEffect } from "react";
import calculateTotal from "../utils/calcShippingAndTotal";

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

export const useAutomaticOrders = (
  inventory,
  isUsingStock,
  tempInStock,
  createOrderItem,
  reloadOrders,
  setOrderedDeliveryPopupContent,
  setDisplayOrderedDeliveredPopup
) => {
  useEffect(() => {
    if (!Array.isArray(inventory)) return;

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
};
