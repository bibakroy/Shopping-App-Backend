import jwt from "jsonwebtoken";
import bcrypt from "bcrypt";

import User from "../models/user.js";

export const register = async (req, res) => {
  const { name, email, password } = req.body;

  try {
    const saltRounds = 10;
    const hashedPassword = await bcrypt.hash(password, saltRounds);

    const user = new User({ name, email, password: hashedPassword });
    await user.save();

    res.status(201).json(user);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

export const login = async (req, res) => {
  const { email, password } = req.body;

  return res.status(200).json({ message: "User logged in" });
};
