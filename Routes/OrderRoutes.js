const express = require("express");
const Routes = new express.Router();
const Order_Con = require("../Controllers/Orders.Controller");

Routes.delete("/:id", Order_Con.DeleteOrder);
//#region Courses
Routes.get("/", Order_Con.GetAllOrders);

Routes.get("/:id", Order_Con.GetOrderByID);

Routes.post("/", Order_Con.AddOrder);

Routes.put("/:id", Order_Con.UpdateOrder);

//#endregion

module.exports = Routes;
