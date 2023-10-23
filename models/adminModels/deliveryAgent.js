const mongoose = require("mongoose");

const schema = new mongoose.Schema({
  userName: {
    type: String,
    require: true,
  },
  userEmail: {
    type: String,
    require: true,
  },
  password: {
    type: String, 
    require: true,
  },
  profile_Pic: {
    type: String,
    require: true,
  },
  mobileNumber: {
    type: String,
    require: true,
  },
  idNumber: {
    type: Number,
    require: true,
  },
  document: {
    type: Array,
    require: true,
  },
  //   otp: {
  //     type: Number,
  //     require: true,
  //   },
  address: {
    type: String,
    require: true,
  },
  //   jobStatus: {
  //     type: String,
  //     default: "Available",
  //   },
  expiresAt: {
    type: Date,
    require: true,
  },
});

schema.set("timestamps", true);
module.exports = mongoose.model("agent", schema);
