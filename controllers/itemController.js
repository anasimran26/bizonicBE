const { Item, User } = require("../models");

// Create Item
exports.createItem = async (req, res) => {
  try {
    const { item_name, date, stock, purchase_price, sale_price } = req.body;
    const user = await User.findByPk(req.user.id);
    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }

    const item = await Item.create({
      user_id: user.user_id,
      item_name,
      date,
      stock,
      purchase_price,
      sale_price,
    });

    res.status(201).json({
      message: "Item created successfully",
      item,
    });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

// Get Items for logged-in user
exports.getItems = async (req, res) => {
  try {
    const user = await User.findByPk(req.user.id);
    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }

    const items = await Item.findAll({
      where: { user_id: user.user_id },
      order: [["createdAt", "DESC"]],
    });

    res.json({ items });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};
