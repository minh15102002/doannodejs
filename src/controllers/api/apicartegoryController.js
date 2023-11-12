const db = require("../../models");
const partial = require("./partial");

let getCartegoryList = async (req, res) => {
  try {
    let data = await db.Cartegory.findAll({});
    partial.recurse(data, 0, "");
    res.json(data);
  } catch (error) {
    res.status(500).json({ error: "Internal Server Error" });
  }
};

let createNewCartegory = async (req, res) => {
  try {
    await db.Cartegory.create({
      name: req.body.name,
      parent_id: req.body.parent_id,
    });
    res.json({ message: "New category created successfully" });
  } catch (error) {
    res.status(500).json({ error: "Internal Server Error" });
  }
};

let getAllCartegory = async (req, res) => {
  try {
    let data = await db.Cartegory.findAll({
      offset: 0,
      limit: 10,
      raw: true,
    });
    res.json(data);
  } catch (error) {
    res.status(500).json({ error: "Internal Server Error" });
  }
};

let getEditCartegory = async (req, res) => {
  try {
    let data = await db.Cartegory.findOne({
      where: { id: req.params.id },
      raw: false,
    });
    res.json(data);
  } catch (error) {
    res.status(500).json({ error: "Internal Server Error" });
  }
};

let updateCartegory = async (req, res) => {
  try {
    let cartegory = await db.Cartegory.findOne({
      where: {
        id: req.params.id,
      },
      raw: false,
    });
    if (cartegory) {
      cartegory.name = req.body.name;
      cartegory.parent_id = req.body.parent_id;
      await cartegory.save();
    } else {
      cartegory = {};
    }
    res.json({ message: "Category updated successfully" });
  } catch (error) {
    res.status(500).json({ error: "Internal Server Error" });
  }
};

let deleteCartegory = async (req, res) => {
  try {
    let data = await db.Cartegory.findOne({
      where: { id: req.body.id },
      raw: false,
    });
    if (data) {
      await data.destroy();
    }
    res.json({ message: "Category deleted successfully" });
  } catch (error) {
    res.status(500).json({ error: "Internal Server Error" });
  }
};

module.exports = {
  createNewCartegory,
  getAllCartegory,
  getEditCartegory,
  updateCartegory,
  deleteCartegory,
  getCartegoryList,
};