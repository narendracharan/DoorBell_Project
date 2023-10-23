const mongoose = require("mongoose");

const schema = new mongoose.Schema({
  firstName: {
    type: String,
    require: true,
  },
  firstName_ar: {
    type: String,
    require: true,
  },
  lastName: {
    type: String,
    require: true,
  },
  lastName_ar: {
    type: String,
    require: true,
  },
  companyName: {
    type: String,
    require: true,
  },
  companyName_ar: {
    type: String,
    require: true,
  },
  address: {
    type: String,
    require: true,
  },
  address_ar: {
    type: String,
    require: true,
  },
  city: {
    type: String,
    require: true,
  },
  city_ar: {
    type: String,
    require: true,
  },
  country: {
    type: String,
    require: true,
  },
  country_ar: {
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
  orderNotes_ar: {
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
    default: "In-Progress",
    enum: ["In-Progress", "Cancelled", "Delivered"],
  },
  orderStatus_ar: {
    type: String,
    default: "في تَقَدم",
    enum: ["في تَقَدم", "ألغيت", "تم التوصيل"],
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
  deliverdBy: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "agent",
    require: true,
  },
  assignStatus: {
    type: String,
    default: "UnAssign",
    enum: ["Assign", "UnAssign", "Accepted", "Decline"],
  },
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
