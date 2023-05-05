import express from "express";
import bodyParser from "body-parser";
import cors from "cors";
import mongoose from "mongoose";
import dotenv from "dotenv";
dotenv.config();
import router from "./routes/index.js";

const app = express();

// Middleware
app.use(bodyParser.json());
app.use(cors());

// Connect to MongoDB database
mongoose
  .connect(process.env.MONGO_URI)
  .then(() => {
    console.log("Connected to MongoDB");
  })
  .catch((err) => {
    console.log("Error: ", err.message);
  });

app.use("/api", router);

// Start server
const port = process.env.PORT || 5000;
app.listen(port, () => {
  console.log("Server started on port " + port);
});
