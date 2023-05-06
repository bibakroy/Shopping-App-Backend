import Item from "../models/item.js";

export const addItem = async (req, res) => {
  const { name } = req.body;

  try {
    const newItem = new Item({ name, created_by: req.user.userId });
    await newItem.save();

    return res.status(201).json(newItem);
  } catch (err) {
    return res.status(500).json({ message: err.message });
  }
};
