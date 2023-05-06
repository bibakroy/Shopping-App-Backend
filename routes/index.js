import express from "express";
const router = express.Router();

import { register, login } from "../controllers/user.js";
import { addItem } from "../controllers/item.js";
import { verifyToken } from "../controllers/verifyToken.js";

router.post("/auth/register", register);
router.post("/auth/login", login);

router.post("/add-item", verifyToken, addItem);

export default router;
