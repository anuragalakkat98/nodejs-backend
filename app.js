const express = require("express");
const app = express();
const cors = require("cors");
const userController = require("./controllers/userController");
const auth = require("./auth");
const bodyParser = require("body-parser");
const dbConnect = require("./db/dbConnect");
const authorizeUser = require("./authorizeUser");

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

// Execute database connection
dbConnect();

app.use(cors());

app.listen(3001, () => {
  console.log("Server is running on port 3001");
});

app.post("/register", userController.registerUser);

app.post("/login", userController.loginUser);

app.post("/update/:email", authorizeUser, userController.updateUserByEmail);

module.exports = app;
