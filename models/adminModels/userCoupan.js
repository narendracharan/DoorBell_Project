const mongoose = require("mongoose");

const schema = new mongoose.Schema({
  coupanName: {
    type: String,
    required: true,
  },
  endDate: {
    type: Date,
    require: true,
  },
  startDate: {
    type: Date,
    require: true,
  },
  Discount: {
    type: Number,
    require: true,
  },
  user_Id: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Doorbeladmin",
    require: true,
  },
});
schema.set("timestamps", true);
module.exports = mongoose.model("usersCoupan", schema);
