const { PrismaClient } = require('@prisma/client');
const prisma = new PrismaClient();
const argon2 = require('argon2');

module.exports = {
  createCompany: async (req, res) => {
    res.header('Access-Control-Allow-Origin', `${process.env.CORS_ORIGIN}`);
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
  getCompany: async (req, res) => {
    const { id } = req.params;
    console.log('ID:', id);
    let company;
    try {
      companyData = await prisma.Company.findUnique({
        where: {
          //Prisma is expecting a string value so I converted the id param from string to Number
          companyId: Number(id),
        },
        include: {
          products: true, // Return all fields
        },
      });
      company = companyData;
    } catch (error) {
      console.log('Error Found: ', error);
      return res.json(error);
    }
    if (company) {
      return res.json(company);
    } else {
      return res.json({
        message: `There are no companies with the ID ${id}`,
      });
    }
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
