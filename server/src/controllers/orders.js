/* const { PrismaClient } = require('@prisma/client');
const prisma = new PrismaClient(); */

module.exports = {
    getAllActiveOrders: async (req, res) => {
        res.json("get orders works up to controller");
        console.log('controller')
    },
    createOrder: async (req, res) => {
        res.json("post order works up to controller");
    }

}