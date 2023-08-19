import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

export async function createSettings(username) {
  try {
    const newSettings = await prisma.Settings.create({
      data: {
        userName: username || "username",
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

export const getSettings = async (req, res) => {
  console.log("here");
  const { username } = req.params;
  console.log(username);
  let settings;
  try {
    const settingsData = await prisma.Settings.findUnique({
      where: {
        userName: username || "username",
      },
    });
    settings = settingsData;
    console.log("settings:  ", settings);
  } catch (err) {
    console.log("Error Found: ", err);
    return res.json(err);
  }
  if (settings) {
    return res.json(settings);
  } else {
    return res.json({
      message: `No settings available`,
    });
  }
};

export const updateSetting = async (req, res) => {
  const { username } = req.params;
  const updatedSetting = req.body;
  let settings;
  try {
    const updatedSettingsData = await prisma.Settings.update({
      where: {
        userName: username || "username",
      },
      data: {
        ...updatedSetting,
      },
    });
    settings = updatedSettingsData;
  } catch (err) {
    if (err.code === "P2025") {
      return res.json({ message: "Settings not found" });
    } else {
      console.log("Error Found: ", err);
      return res.json(err);
    }
  }
  return res.json(settings);
};
