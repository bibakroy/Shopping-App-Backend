import Item from "../models/item.js";

export const getItems = async (req, res) => {
  try {
    const items = await Item.find({ created_by: req.user.userId }).sort({
      created_at: -1,
    });

    return res.status(200).json(items);
  } catch (err) {
    return res.status(500).json({ message: err.message });
  }
};

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

export const updateItem = async (req, res) => {
  const { name } = req.body;

  try {
    const item = await Item.findById(req.params.id).exec();
    if (!item) {
      return res.status(404).json({ message: "Item not found" });
    }

    if (item.created_by != req.user.userId) {
      return res.status(403).json({ message: "Forbidden" });
    }

    item.name = name;
    await item.save();

    return res.status(204).json({
      message: "Item updated successfully",
    });
  } catch (err) {
    return res.status(500).json({ message: err.message });
  }
};
