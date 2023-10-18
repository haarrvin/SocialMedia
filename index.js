const express = require("express");
const app = express();

const mongoose = require("mongoose");
const dotenv = require("dotenv");
const helmet = require("helmet");
const morgan = require("morgan");

dotenv.config();

const username = encodeURIComponent(process.env.mongo_db_username);
const password = encodeURIComponent(process.env.mongo_db_password);
const servername = process.env.mongo_db_servername;
const MONGO_URL = `mongodb+srv://${username}:${password}${servername}`;

mongoose.connect(MONGO_URL, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  })
.then(() => {
    console.log("Connected MongoDB");
})
.catch((error) => {
    console.error("Error connecting to MongoDB:", error);
});

const port = process.env.PORT || 8800;

app.listen(port, () => {
  console.log(`Backend server is running on port ${port}!`);
});

