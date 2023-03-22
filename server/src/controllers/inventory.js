const { PrismaClient } = require('@prisma/client');
const prisma = new PrismaClient();
const csvtojson = require('csvtojson');
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
      inventoryList = await prisma.Product.findMany({
        include: {
          orders: true,
          company: true, // Return all fields
        },
        orderBy: {
          sku: 'asc', // Order by SKU in ascending order
        },
      });
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
        include: {
          orders: true,
          company: true, // Return all fields
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
  },
  createInventoryItem: async (req, res) => {
    const {
      sku,
      brand,
      productName,
      description,
      inStock,
      reorderAt,
      shipper,
      orderQty,
      unitPrice,
      companyID,
    } = req.body;
    let inventoryItem;
    try {
      const createInventoryItem = await prisma.Product.create({
        data: {
          sku: sku,
          brand: brand,
          productName: productName,
          description: description,
          inStock: inStock,
          shipper: shipper,
          reorderAt: reorderAt,
          orderQty: orderQty,
          unitPrice: unitPrice,
          companyID: companyID,
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
    let inventoryItem;
    try {
      const createInventoryItem = await prisma.Product.createMany({
        data: req.body.products,
      });
      inventoryItem = createInventoryItem;
    } catch (err) {
      console.log('Error Found: ', err);
      return res.json(err);
    }
    return res.json(inventoryItem);
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
  },
  deleteInventoryItems: async (req, res) => {
    const { ids } = req.body;
    try {
      const result = await prisma.product.deleteMany({
        where: {
          id: {
            in: ids,
          },
        },
      });
      console.log(`Deleted ${result.count} products`);
      return res.json({ message: `Deleted ${result.count} products` });
    } catch (err) {
      console.log('Error deleting products:', err);
      return res.status(500).json({ message: 'Error deleting products' });
    }
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
          res.status(200).json(json);
        });
    });
  },
};
