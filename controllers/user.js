import jwt from "jsonwebtoken";
import bcrypt from "bcrypt";

import User from "../models/user.js";

export const register = async (req, res) => {
  const { name, email, password } = req.body;

  try {
    const user = await User.findOne({ email });
    if (user) {
      return res.status(409).json({ message: "Email already exists" });
    }

    const saltRounds = 10;
    const hashedPassword = await bcrypt.hash(password, saltRounds);

    const newUser = new User({ name, email, password: hashedPassword });
    await newUser.save();

    const payload = {
      userId: newUser._id,
      name: newUser.name,
      email: newUser.email,
    };
    const token = jwt.sign(payload, process.env.JWT_SECRET);
    return res.status(201).json({ token });
  } catch (err) {
    return res.status(500).json({ message: err.message });
  }
};

export const login = async (req, res) => {
  const { email, password } = req.body;

  try {
    const user = await User.findOne({ email });
    if (!user) {
      return res.status(401).json({ message: "Unauthorized" });
    }

    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) {
      return res.status(401).json({ message: "Unauthorized" });
    }

    const payload = { userId: user._id, name: user.name, email: user.email };
    const token = jwt.sign(payload, process.env.JWT_SECRET);

    return res.status(200).json({ token });
  } catch (err) {
    return res.status(500).json({ message: err.message });
  }
};
