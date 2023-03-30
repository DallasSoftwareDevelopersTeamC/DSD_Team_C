const { PrismaClient } = require('@prisma/client');
const prisma = new PrismaClient();

module.exports = {
  getSettings: async (req, res) => {
    const { id } = req.params;
    let settings;
    try {
      const settingsData = await prisma.Settings.findUnique({
        where: {
          userName: id,
        },
      });
      settings = settingsData;
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
    const { id } = req.params;
    const updatedSetting = req.body;
    let settings;
    try {
      updatedSettingsData = await prisma.Setting.update({
        where: {
          userName: id,
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
