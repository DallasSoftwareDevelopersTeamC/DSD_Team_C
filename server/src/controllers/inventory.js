/* const { PrismaClient } = require('@prisma/client');
const prisma = new PrismaClient(); */

const inventoryData = require('../temp_data/inventory.json');

module.exports = {
  getInventoryList: async (req, res) => {
    let inventoryList;
    try {
      inventoryList = await prisma.Product.findMany();
    } catch (error) {
      console.log(error);
      return res.json(error);
    }
    return res.json(inventoryList);
  },
  getInventoryItem: async (req, res) => {
    const { id } = req.params;
    /*try {
        const collectionLikes = yield prisma.Product.findUnique({
          where: {
            contractAddress: id,
          },
          select: { likes: true },
        });
        likes = collectionLikes;
      } catch (err) {
        console.log(err);
        return res.json(err);
      }*/
    // GETS INVENTORY ITEM FROM THE temp_data folder

    // pull the "id" out of the route's dynamic params. Names must
    const item = inventoryData.find((item) => item.id === Number(id));
    console.log(id);
    console.log(item);
    if (!item) {
      return res.status(404).json({ error: 'Item not found' });
    }
    res.json(item);
  },
  createInventoryItem: async (req, res) => {
    const newItem = req.body;
    inventoryData.push(newItem);
    const newId = inventoryData.length;
    newItem.id = newId;
    res.status(201).json(newItem);
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
