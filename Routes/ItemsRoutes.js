const express = require("express");
const Routes = new express.Router();
const Item_Con = require("../Controllers/Items.Controller");

Routes.get("/", Item_Con.GetAllItems);

Routes.get("/:id", Item_Con.GetItemByID);

Routes.post("/", Item_Con.AddItem);

Routes.put("/:id", Item_Con.UpdateItem);

Routes.delete("/:id", Item_Con.DeleteItem);

module.exports = Routes;
