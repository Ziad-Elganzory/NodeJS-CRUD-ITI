const mongoose = require("mongoose");
const OrderSchema = new mongoose.Schema({
  id: { type: Number, required: true },
  totalprice: { type: Number, required: true },
  items: [{ type: Number, required: true }],
});

module.exports = mongoose.model("Orders", OrderSchema);
