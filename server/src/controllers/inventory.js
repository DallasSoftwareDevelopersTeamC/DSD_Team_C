const { PrismaClient } = require('@prisma/client');
const prisma = new PrismaClient();
const csvtojson = require('csvtojson');
const inventoryData = require('../temp_data/inventory.json');
const multer = require('multer');
const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, 'uploads/');
  },
  filename: (req, file, cb) => {
    cb(null, file.originalname);
  },
});

const upload = multer({ storage }).single('csvFile');

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
      priceEA,
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
          priceEA: priceEA,
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
  createManyInventoryItems: async (req, res) => {
    console.log(req.body);
    // const {
    //   sku,
    //   brand,
    //   productName,
    //   description,
    //   inStock,
    //   reorderAt,
    //   orderQty,
    // } = req.body;
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
      const createInventoryItem = await prisma.Product.createMany({
        data: req.body,
      });
      inventoryItem = createInventoryItem;
    } catch (err) {
      // if (err.code === 'P2002') {
      //   if (err.meta.target[0] === 'sku') {
      //     return res.json({
      //       message:
      //         'There is a unique constraint violation, a new product cannot be created with this sku',
      //     });
      //   }
      // }
      console.log('Error Found: ', err);
      return res.json(err);
    }
    return res.json({ message: 'Products saved!' }, inventoryItem);
  },
  updateInventoryItem: async (req, res) => {
    const { id } = req.params;
    const updatedItem = req.body;
    let product;
    try {
      updatedProduct = await prisma.Product.update({
        where: {
          id: Number(id),
        },
        data: {
          ...updatedItem,
        },
      });
      product = updatedProduct;
    } catch (err) {
      if (err.code === 'P2025') {
        return res.json({ message: 'Product not found' });
      } else {
        console.log('Error Found: ', err);
        return res.json(err);
      }
    }
    return res.json(product);
    // const index = inventoryData.findIndex((item) => item.id === Number(id));
    // if (index === -1) {
    //   return res.status(404).json({ error: 'Item not found' });
    // }
    // using spreads to create a new object that contains all of the original properties
    // but with any updated properties from updatedItem (whichever properties are defined in the front-end's PUT request)
    // inventoryData[index] = { ...inventoryData[index], ...updatedItem };
  },
  deleteInventoryItem: async (req, res) => {
    const { id } = req.params;
    try {
      await prisma.Product.delete({
        where: {
          id: Number(id),
        },
      });
    } catch (err) {
      if (err.code === 'P2025') {
        return res.json({ message: 'Product not found' });
      } else {
        console.log('Error Found: ', err);
        return res.json(err);
      }
    }
    return res.json({ message: 'Product deleted!' });
    //     const index = inventoryData.findIndex((item) => item.id === Number(id));
    //     if (index === -1) {
    //       return res.status(404).json({ error: 'Item not found' });
    //     }
    //     const deletedItem = inventoryData.splice(index, 1);
    //     res.json(deletedItem[0]);
    //   },
  },
  convertCsvFileToJson: async (req, res) => {
    await upload(req, res, (err) => {
      if (err) {
        console.error(err);
        return res.status(400).json({ error: 'Upload failed' });
      }
      csvtojson()
        .fromFile(req.file.path)
        .then((json) => {
          console.log('csv json', json);
        });
      res.status(200).json({ message: 'Upload successful' });
    });
  },
};
