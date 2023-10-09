const mongoose = require("mongoose");

const schema = new mongoose.Schema({
  title: {
    type: String,
    require: true,
  },
  title_ar: {
    type: String,
    require: true,
  },
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
  mobileNumber: {
    type: Number,
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
  locality: {
    type: String,
    require: true,
  },
  locality_ar: {
    type: String,
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
  city: {
    type: String,
    require: true,
  },
  city_ar: {
    type: String,
    require: true,
  },
  pincode: {
    type: Number,
    require: true,
  },
  user_Id: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Doorbeluser",
    require: true,
  },
});
schema.set("timestamps", true);
module.exports = mongoose.model("userAddress", schema);
