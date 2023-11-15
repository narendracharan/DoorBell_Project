const mongoose = require("mongoose");

const schema = new mongoose.Schema({
  name: {
    type: String,
    require: true,
  },
  message: {
    type: String,
    require: true,
  },
  clinicianId:{
    type: mongoose.Schema.Types.ObjectId,
    ref: "Doorbeluser",
    require: true,
  }
});

schema.set("timestamps", true);
module.exports = mongoose.model("adminChat", schema);
