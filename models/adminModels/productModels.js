const mongoose = require("mongoose");

const schema = new mongoose.Schema({
  productName: {
    type: String,
    require: true,
  },
  color: {
    type: String,
    require: true,
  },
  productModel: {
    type: String,
    require: true,
  },
  protocol: {
    type: String,
    require: true,
  },
  certification: {
    type: String,
    require: true,
  },
  maxResolution: {
    type: String,
    require: true,
  },
  Price: {
    type: Number,
    require: true,
  },
  oldPrice: {
    type: Number,
    require: true,
  },
  quantity: {
    type: Number,
    require: true,
  },
  productImage: {
    type: Array,
    require: true,
  },
  description: {
    type: String,
    require: true,
  },
  user_Id: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "admin",
    require: true,
  },
});
schema.set("timestamps", true);
module.exports = mongoose.model("product", schema);
