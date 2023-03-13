const { PrismaClient } = require('@prisma/client');
const prisma = new PrismaClient();

module.exports = {
  getAllActiveOrders: async (req, res) => {
    let orderList;
    try {
      orderList = await prisma.Order.findMany({
        include: {
          product: true, // Return all fields
        },
      });
    } catch (error) {
      console.log('Error Found: ', error);
      return res.json(error);
    }
    return res.json(orderList);
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
      shipperName,
      shippingCost,
      shipperAddress,
      shipperPhone,
      orderQty,
      totalCost,
    } = req.body;
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
          shipperName: shipperName,
          shippingCost: shippingCost,
          shipperAddress: shipperAddress,
          shipperPhone: shipperPhone,
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
