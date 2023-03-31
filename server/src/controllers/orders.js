const { PrismaClient } = require('@prisma/client');
const formatDate = require('../utils/formatDate');
const createRandomArrivalDate = require('../utils/createRandomArrivalDate');
const prisma = new PrismaClient();

module.exports = {
  getAllOrders: async (req, res) => {
    let { companyID } = req.params
    companyID = Number(companyID)
    let orderList;
    let formattedOrderList;
    try {
      orderList = await prisma.Order.findMany({
        where: {
          product: {
            companyID: {
              equals: companyID // Filter orders by companyId inside the product field
            }
          }
        },
        include: {
          product: true, // Return all fields
        },
        orderBy: {
          SKU: 'asc', // Order by SKU in ascending order
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
    const { sku, orderQty, totalCost } = req.body;

    let orderItem;
    try {
      const randomArrivalDate = createRandomArrivalDate(); // Call the createRandomArrivalDate function from Utils
      const createOrderItem = await prisma.Order.create({
        data: {
          SKU: sku,
          schedArrivalDate: randomArrivalDate,
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
    let updatedOrder;
    try {
      if (updatedOrderData.orderStatus === 'delivered') {
        updatedOrderData.delivered = new Date().toISOString();
      }
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
  deleteAllOrderHistory: async (req, res) => {
    try {
      const deletedOrders = await prisma.Order.deleteMany({
        where: {
          orderStatus: 'delivered',
        },
      });
      return res.json(deletedOrders);
    } catch (err) {
      console.log('Error Found: ', err);
      return res.json(err);
    }
  },
  deleteAllActiveOrders: async (req, res) => {
    try {
      const deletedOrders = await prisma.Order.deleteMany({
        where: {
          orderStatus: 'active',
        },
      });
      return res.json(deletedOrders);
    } catch (err) {
      console.log('Error Found: ', err);
      return res.json(err);
    }
  }
};
