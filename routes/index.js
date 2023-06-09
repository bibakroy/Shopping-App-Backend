import express from "express";
const router = express.Router();

import { register, login } from "../controllers/user.js";
import {
  getItems,
  addItem,
  updateItem,
  deleteItem,
} from "../controllers/item.js";
import { verifyToken } from "../controllers/verifyToken.js";

// routes for authentication
router.post("/auth/register", register);
router.post("/auth/login", login);

// routes for CRUD operations on items
router.get("/get-items", verifyToken, getItems);
router.post("/add-item", verifyToken, addItem);
router.put("/update-item/:id", verifyToken, updateItem);
router.delete("/delete-item/:id", verifyToken, deleteItem);

export default router;
