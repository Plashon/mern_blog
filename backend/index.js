const express = require("express");
const cors = require("cors");
const mongoose = require("mongoose");
const userRouter = require("./router/user.router")

require("dotenv").config();

const app = express();
const BASE_URL = process.env.BASE_URL;
const PORT = process.env.PORT;
const DB_URL = process.env.DB_URL;

//connect to mongoose mongo DB
try {
  mongoose.connect(DB_URL);
  console.log("connect to mongo db successfully");
} catch (error) {
    console.log("connect failed "+ error);
}

app.use(cors({ origin: BASE_URL, credentials: true }));
app.use(express.json());

app.get("/", (req, res) => {
  res.send("<h1>welcome to se npru blog restful api</h1>");
});

//router
app.use("/api/v1/auth",userRouter)

app.listen(PORT, () => {
  console.log("Server is running on http://localhost:" + PORT);
});
