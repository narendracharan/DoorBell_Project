const mongoose = require("mongoose");

const schema = new mongoose.Schema({
  firstName: {
    type: String,
    require: true,
  },
  lastName: {
    type: String,
    require: true,
  },
  companyName: {
    type: String,
    require: true,
  },
  address: {
    type: String,
    require: true,
  },
  city: {
    type: String,
    require: true,
  },
  country: {
    type: String,
    require: true,
  },
  postalCode: {
    type: Number,
    require: true,
  },
  orderNotes: {
    type: String,
    require: true,
  },
  paymentMethod: {
    type: String,
    default: "Paid",
    enum: ["Paid", "Refund", "Cancelled"],
  },
  orderStatus: {
    type: String,
    default: "InProgress",
    enum: ["InProgress", "Cancel", "Delivered"],
  },
  products: [
    {
      products_Id: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "doorBellProduct",
        require: true,
      },
      Price:{
        type: Number,
      },
      quantity: {
        type: Number,
        default: 1,
      },
    },
  ],
  total: Number,
  user_Id: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Doorbeluser",
    require: true,
  },
  address_Id: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "userAddress",
    require: true,
  },
});

schema.set("timestamps", true);
module.exports = mongoose.model("userorders", schema);
