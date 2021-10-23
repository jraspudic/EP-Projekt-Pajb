const express = require("express");
const router = express.Router();
const bodyParser = require("body-parser");
const mongoose = require("mongoose");
const cors = require("cors");
const path = require("path");
const dotenv = require("dotenv");
const users = require("./routes/users")(router);
const tasks = require("./routes/tasks");
require("dotenv").config();
const app = express();

const uri = `mongodb://localhost:27017/pajbDatabase`;
// connects mongoose to the uri and sets some mongoose keys to true to combat mongoose's deprecation warnings
mongoose.connect(uri, {
  useNewUrlParser: true,

  useUnifiedTopology: true,
});
const connection = mongoose.connection;
// make sure that MongoDB connected successfully
app.use((req, res, next) => {
  res.header("Access-Control-Allow-Origin", "*");
  res.header("Access-Control-Allow-Methods", "GET, PUT, POST, DELETE");
  res.header(
    "Access-Control-Allow-Headers",
    "Origin, X-Requested-With, Content-Type, authorization, Accept"
  );
  next();
});

connection.once("open", () => {
  console.log("MongoDB database connected!!");
});

app.use(bodyParser.urlencoded({ extended: false })); // parse application/x-www-form-urlencoded
app.use(bodyParser.json()); // parse application/json

app.use("/users", users);
app.use("/tasks", tasks);

app.listen(3000, (req, res) => {
  console.log("SERVER JE STARTOVAN NA PORTU 3000");
});
