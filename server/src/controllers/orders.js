const { PrismaClient } = require('@prisma/client');
const formatDate = require('../utils/formatDate');
const prisma = new PrismaClient();

module.exports = {
  getAllOrders: async (req, res) => {
    let orderList;
    let formattedOrderList
    try {
      orderList = await prisma.Order.findMany({
        include: {
          product: true, // Return all fields
        },
      });
      formattedOrderList = orderList.map((order) => {
        const fOrderedDate = formatDate(order.orderedDate);
        const fSchedArrivalDate = formatDate(order.schedArrivalDate);
        const fDelivered = formatDate(order.delivered);
        return {
          ...order,
          orderedDate: fOrderedDate,
          schedArrivalDate: fSchedArrivalDate,
          delivered: fDelivered,
        };
      });

    } catch (error) {
      console.log('Error Found: ', error);
      return res.json(error);
    }
    return res.json(formattedOrderList);
  },
  getOrderItem: async (req, res) => {
    const { id } = req.params;
    let orderItem;
    try {
      const getOrderItem = await prisma.Order.findUnique({
        where: {
          //Prisma is expecting a string value so I converted the id param from string to Number
          id: Number(id),
        },
        include: {
          product: true, // Return all fields
        },
      });
      orderItem = getOrderItem;
    } catch (err) {
      console.log('Error Found: ', err);
      return res.json(err);
    }
    if (orderItem) {
      return res.json(orderItem);
    } else {
      return res.json({
        message: `No orders with the ID ${id}`,
      });
    }
  },
  createOrder: async (req, res) => {
    const {
      sku,
      schedArrivalDate,
      shipper,
      orderQty,
      totalCost,
    } = req.body;
    console.log(req.body);
    //ADD NEW ITEM TO temp_data folder
    /*
    const newItem = req.body;
    inventoryData.push(newItem);
    const newId = inventoryData.length;
    newItem.id = newId;
    res.status(201).json(newItem);
    */
    let orderItem;
    try {
      const createOrderItem = await prisma.Order.create({
        data: {
          SKU: sku,
          schedArrivalDate: schedArrivalDate,
          shipper: shipper,
          orderQty: orderQty,
          totalCost: totalCost,
        },
      });
      orderItem = createOrderItem;
    } catch (err) {
      console.log('Error Found: ', err);
      return res.json(err);
    }
    return res.json(orderItem);
  },
  updateOrderItem: async (req, res) => {
    const { id } = req.params;
    const updatedOrderData = req.body;
    let order;
    try {
      updatedOrder = await prisma.Order.update({
        where: {
          id: Number(id),
        },
        data: {
          ...updatedOrderData,
        },
      });
      order = updatedOrder;
    } catch (err) {
      if (err.code === 'P2025') {
        return res.json({ message: 'Order not found' });
      } else {
        console.log('Error Found: ', err);
        return res.json(err);
      }
    }
    return res.json(order);
  },
  deleteOrderItem: async (req, res) => {
    const { id } = req.params;
    try {
      await prisma.Order.delete({
        where: {
          id: Number(id),
        },
      });
    } catch (err) {
      if (err.code === 'P2025') {
        return res.json({ message: 'Order not found' });
      } else {
        console.log('Error Found: ', err);
        return res.json(err);
      }
    }
    return res.json({ message: 'Order deleted!' });
  },
};
