const mongoose = require("mongoose");

const ItemSchema = new mongoose.Schema({
  id: { type: Number, required: true },
  name: { type: String, required: true, minLength: 2 },
  price: { type: Number, required: true },
  desc: { type: String, required: false },
});

module.exports = mongoose.model("Items", ItemSchema);
