const { PrismaClient } = require('@prisma/client');
const prisma = new PrismaClient();
const argon2 = require('argon2');
const API_URL = import.meta.env.VITE_REACT_APP_API_URL;

module.exports = {
  createCompany: async (req, res) => {
    res.header('Access-Control-Allow-Origin', `${API_URL}`);
    const { companyName } = req.body;
    const randomNumber = Math.floor(Math.random() * 90000) + 10000;
    let company;
    try {
      const createCompany = await prisma.Company.create({
        data: {
          companyName: companyName,
          companyId: randomNumber,
        },
      });
      company = createCompany;
    } catch (err) {
      console.log('Error Found: ', err);
      return res.json(err);
    }
    return res.json(company);
  },
  getCompanies: async (req, res) => {
    let companies;
    try {
      companies = await prisma.Company.findMany({
        include: {
          products: true, // Return all fields
        },
      });
    } catch (error) {
      console.log('Error Found: ', error);
      return res.json(error);
    }
    return res.json(companies);
  },
  deleteCompany: async (req, res) => {
    const { id } = req.params;
    try {
      await prisma.Company.delete({
        where: {
          companyId: Number(id),
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
    return res.json({ message: 'Company deleted!' });
  },
};
