/* const { PrismaClient } = require('@prisma/client');
const prisma = new PrismaClient(); */

module.exports = {
    getAllInventoryItems: async (req, res) => {
        res.json("get inventory works up to contoller");
    },
    getSingleItem: async (req, res) => {
        res.json("get single item works up to controller");
    },
    createItem: async (req, res) => {
        res.json("post item works up to controller");
    }
}