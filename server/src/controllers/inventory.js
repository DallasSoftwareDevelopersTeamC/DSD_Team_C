const { PrismaClient } = require('@prisma/client');
const prisma = new PrismaClient();

const inventoryData = require('../temp_data/inventory.json');

module.exports = {
  getInventoryList: async (req, res) => {
    let inventoryList;
    try {
      inventoryList = await prisma.Product.findMany();
    } catch (error) {
      console.log('Error Found: ', error);
      return res.json(error);
    }
    return res.json(inventoryList);
  },
  getInventoryItem: async (req, res) => {
    const { id } = req.params;
    let inventoryItem;
    try {
      const getInventoryItem = await prisma.Product.findUnique({
        where: {
          //Prisma is expecting a string value so I converted the id param from string to Number
          id: Number(id),
        },
      });
      inventoryItem = getInventoryItem;
    } catch (err) {
      console.log('Error Found: ', err);
      return res.json(err);
    }
    if (inventoryItem) {
      return res.json(inventoryItem);
    } else {
      return res.json({
        message: `No products in inventory with the ID ${id}`,
      });
    }
    // GETS INVENTORY ITEM FROM THE temp_data folder
    // pull the "id" out of the route's dynamic params. Names must
    // const item = inventoryData.find((item) => item.id === Number(id));
    // console.log(id);
    // console.log(item);
    // if (!item) {
    //   return res.status(404).json({ error: 'Item not found' });
    // }
  },
  createInventoryItem: async (req, res) => {
    const {
      sku,
      brand,
      productName,
      description,
      inStock,
      reorderAt,
      orderQty,
    } = req.body;
    //ADD NEW ITEM TO temp_data folder
    /*
    const newItem = req.body;
    inventoryData.push(newItem);
    const newId = inventoryData.length;
    newItem.id = newId;
    res.status(201).json(newItem);
    */
    let inventoryItem;
    try {
      const createInventoryItem = await prisma.Product.create({
        data: {
          sku: sku,
          brand: brand,
          productName: productName,
          description: description,
          inStock: inStock,
          reorderAt: reorderAt,
          orderQty: orderQty,
        },
      });
      inventoryItem = createInventoryItem;
    } catch (err) {
      if (err.code === 'P2002') {
        if (err.meta.target[0] === 'sku') {
          return res.json({
            message:
              'There is a unique constraint violation, a new product cannot be created with this sku',
          });
        }
      }
      console.log('Error Found: ', err);
      return res.json(err);
    }
    return res.json(inventoryItem);
  },

  updateInventoryItem: async (req, res) => {
    const { id } = req.params;
    const updatedItem = req.body;
    const index = inventoryData.findIndex((item) => item.id === Number(id));
    if (index === -1) {
      return res.status(404).json({ error: 'Item not found' });
    }
    // using spreads to create a new object that contains all of the original properties
    // but with any updated properties from updatedItem (whichever properties are defined in the front-end's PUT request)
    inventoryData[index] = { ...inventoryData[index], ...updatedItem };
    res.json(inventoryData[index]);
  },
  deleteInventoryItem: async (req, res) => {
    const { id } = req.params;
    const index = inventoryData.findIndex((item) => item.id === Number(id));
    if (index === -1) {
      return res.status(404).json({ error: 'Item not found' });
    }
    const deletedItem = inventoryData.splice(index, 1);
    res.json(deletedItem[0]);
  },
};
