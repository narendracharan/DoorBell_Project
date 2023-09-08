const mongoose=require("mongoose")

const local="mongodb+srv://narendracharan:MwXDBJTWBx3jPfQq@ecommerce.yonhe3a.mongodb.net/"
mongoose
  .connect(local)
  .then(() => {
    console.log("Successfully connected to mongoDB");
  })
  .catch((err) => {
    console.log(err);
  });
