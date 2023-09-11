const mongoose=require("mongoose")

const local="mongodb+srv://narendracharan25753:PSua04aw4ok0ikdx@cluster0.xqwyyu9.mongodb.net/"
mongoose
  .connect(local)
  .then(() => {
    console.log("Successfully connected to mongoDB");
  })
  .catch((err) => {
    console.log(err);
  });