const express = require("express");
const app = express();

const mongoose = require("mongoose");
const dotenv = require("dotenv");
const helmet = require("helmet");
const morgan = require("morgan");
const userRoute = require("./routes/users")
const authRoute = require("./routes/auth")
const postRoute = require("./routes/posts")

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

//middleware
app.use(express.json());
app.use(helmet());
app.use(morgan("common"));

app.use("/api/users", userRoute);
app.use("/api/auth", authRoute);
app.use("/api/posts", postRoute);

const port = process.env.PORT || 8800;

app.listen(port, () => {
  console.log(`Backend server is running on port ${port}!`);
});

