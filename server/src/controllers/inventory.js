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
          // company: true, // Return all fields
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
    let emptyField;
    let inventoryItem;
    if (sku.length < 1) {
      emptyField = 'SKU';
    } else if (brand.length < 1) {
      emptyField = 'brand';
    } else if (productName.length < 1) {
      emptyField = 'name';
    }
    if (emptyField) {
      return res
        .status(400)
        .json({ error: `The ${emptyField} field cannot be left blank` });
    }
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
          return res.status(400).json({
            error:
              'There is a unique constraint violation, a new product cannot be created with this sku',
          });
        }
      } else if (err.code === 'P2009') {
        return res.status(400).json({
          error:
            'Unable to match input value to any allowed input type for the field',
        });
      }
      console.log('Error Found: ', err);
      return res.status(400).json(err);
    }
    return res.json(inventoryItem);
  },
  createManyInventoryItems: async (req, res) => {
    console.log(req.body.products);
    let inventoryItem;
    try {
      const createInventoryItem = await prisma.Product.createMany({
        data: req.body.products,
      });
      inventoryItem = createInventoryItem;
    } catch (err) {
      if (err.code === 'P2002') {
        if (err.meta.target[0] === 'sku') {
          return res.status(400).json({
            error:
              'There is a unique constraint violation, a new product cannot be created with this sku',
          });
        }
      } else if (err.code === 'P2009') {
        return res.status(400).json({
          error:
            'Unable to match input value to any allowed input type for the field',
        });
      }
      console.log('Error Found: ', err);
      return res.status(400).json(err);
    }
    return res.json(inventoryItem.count);
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

    // Get the products
    const products = await prisma.product.findMany({
      where: {
        id: {
          in: ids,
        },
      },
    });

    // Extract the SKUs
    const skus = products.map((product) => product.sku);
    try {
      // Delete the associated orders first
      const ordersResult = await prisma.order.deleteMany({
        where: {
          SKU: {
            in: skus,
          },
        },
      });
      // Then delete the products
      const productResult = await prisma.product.deleteMany({
        where: {
          id: {
            in: ids,
          },
        },
      });
      console.log(
        `Deleted ${productResult.count} products and ${ordersResult.count} orders`
      );
      return res.json({ message: `Deleted ${productResult.count} products` });
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
