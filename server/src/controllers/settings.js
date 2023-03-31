const { PrismaClient } = require('@prisma/client');


async function createSettings(username) {
  const prisma = new PrismaClient();
  try {
    const newSettings = await prisma.Settings.create({
      data: {
        userName: username,
        filterBy: "sku",
        sortOrder: "asc",
        usageSpeed: null,
        highlightSelected: true,
        pinned: [],
        selected: [],
      },
    });
    return newSettings;
  } catch (error) {
    console.log("Error creating settings: ", error);
    throw error;
  }
}



module.exports = {
  createSettings,
  getSettings: async (req, res) => {
    const prisma = new PrismaClient();
    console.log('here')
    const { username } = req.params;
    console.log(username)
    let settings;
    try {
      const settingsData = await prisma.Settings.findUnique({
        where: {
          userName: username,
        },
      });
      settings = settingsData;
      console.log('settings:  ', settings)
    } catch (err) {
      console.log('Error Found: ', err);
      return res.json(err);
    }
    if (settings) {
      return res.json(settings);
    } else {
      return res.json({
        message: `No settings available`,
      });
    }
  },
  updateSetting: async (req, res) => {
    const prisma = new PrismaClient();
    const { username } = req.params;
    const updatedSetting = req.body;
    let settings;
    try {
      const updatedSettingsData = await prisma.Settings.update({
        where: {
          userName: username,
        },
        data: {
          ...updatedSetting,
        },
      });
      settings = updatedSettingsData;
    } catch (err) {
      if (err.code === 'P2025') {
        return res.json({ message: 'Settings not found' });
      } else {
        console.log('Error Found: ', err);
        return res.json(err);
      }
    }
    return res.json(settings);
  },
};
