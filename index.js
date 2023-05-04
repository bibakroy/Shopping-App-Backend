const express = require("express");
const bodyParser = require("body-parser");
const cors = require("cors");

const app = express();

// Middleware
app.use(bodyParser.json());
app.use(cors());

// Start server
app.listen(5000, () => {
  console.log("Server started on port 5000");
});
