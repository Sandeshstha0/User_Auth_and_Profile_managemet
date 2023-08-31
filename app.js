require("express-async-errors");

const express = require("express");
const cors = require("cors");
const mongoose = require("mongoose");
const userRoutes = require("./Routes/users.routes");
const errorHandler = require("./handlers/errorhandlers");

require("dotenv").config();

const app = express();

mongoose
  .connect(process.env.mongo_connection, {})
  .then(() => {
    console.log("connnected to mongodb successful");
  })
  .catch(() => {
    console.log("connection to the mongodb failed");
  });

 //Models intialization
 require("./models/userModels")

app.use(express.json());

//routes
app.use("/api/users", userRoutes);

app.use(errorHandler);

app.listen(10000, () => {
  console.log("server is running");
});
