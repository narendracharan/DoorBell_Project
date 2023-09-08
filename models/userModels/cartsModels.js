const mongoose = require("mongoose");

const schema = new mongoose.Schema({
  products: [
    {
      products_Id: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "doorBellProduct",
        require: true,
      },
      quantity: {
        type: Number,
        default: 1,
      },
    },
  ],
  user_Id: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Doorbeluser",
    require: true,
  },
  cartsTotal:Number
});

schema.set("timestamps", true);
module.exports = mongoose.model("Doorbelcarts", schema);
