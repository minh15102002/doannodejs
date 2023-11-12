const db = require("../../models");
const partial = require("./partial");

let getMenuList = async (req, res) => {
  try {
    let data = await db.Menu.findAll({
      raw: true,
    });
    partial.recurse(data, 0, "");
    res.json(data);
  } catch (error) {
    res.status(500).json({ error: "Internal Server Error" });
  }
};

let createNewMenu = async (req, res) => {
  try {
    await db.Menu.create({
      name: req.body.name,
      parent_id: req.body.parent_id,
    });
    res.json({ message: "New menu created successfully" });
  } catch (error) {
    res.status(500).json({ error: "Internal Server Error" });
  }
};

let getAllMenu = async (req, res) => {
  try {
    let data = await db.Menu.findAll({
      raw: true,
    });
    res.json(data);
  } catch (error) {
    res.status(500).json({ error: "Internal Server Error" });
  }
};

let getEditMenu = async (req, res) => {
  try {
    let data = await db.Menu.findOne({
      where: { id: req.params.id },
      raw: true,
    });
    res.json(data);
  } catch (error) {
    res.status(500).json({ error: "Internal Server Error" });
  }
};

let updateMenu = async (req, res) => {
  try {
    let menu = await db.Menu.findOne({
      where: {
        id: req.params.id,
      },
      raw: false,
    });
    if (menu) {
      menu.name = req.body.name;
      menu.parent_id = req.body.parent_id;
      await menu.save();
    } else {
      menu = {};
    }
    res.json({ message: "Menu updated successfully" });
  } catch (error) {
    res.status(500).json({ error: "Internal Server Error" });
  }
};

let deleteMenu = async (req, res) => {
  try {
    let data = await db.Menu.findOne({
      where: { id: req.body.id },
      raw: false,
    });
    if (data) {
      await data.destroy();
    }
    res.json({ message: "Menu deleted successfully" });
  } catch (error) {
    res.status(500).json({ error: "Internal Server Error" });
  }
};

module.exports = {
  createNewMenu,
  getAllMenu,
  getEditMenu,
  updateMenu,
  deleteMenu,
  getMenuList,
};