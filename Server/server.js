const express = require("express");
const app = express();
const PORT = process.env.PORT || 7000;
const bodyParser = require("body-parser");
const ItemsRoutes = require("../Routes/ItemsRoutes");
const OrderRoutes = require("../Routes/OrderRoutes");
const UsersRoutes = require("../Routes/UsersRoutes");
const mongoose = require("mongoose");
const OrderModel = require("../Models/OrderModel");

// mongoose.connect("mongodb://127.0.0.1:27017/CRUD");
mongoose.connect("mongodb://localhost:27017/CRUD");

app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

app.use("/api/orders", OrderRoutes);
app.use("/api/items", ItemsRoutes);
app.use("/api/users", UsersRoutes);

app.listen(PORT, () => {
  console.log("http://localhost:" + PORT);
});
