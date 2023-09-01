require("dotenv").config();
const express = require("express");
const morgan = require("morgan");
const bodyParser = require("body-parser");
const app = express();
const cors = require("cors");
require("./config/connection");
app.use(bodyParser.json());
app.use(morgan("dev"));
const corsoptions = {
  origin: "*",
  credentials: true,
  optionSuccessStatus: 200,
};
app.use(cors(corsoptions));
const adminRouter = require("./router/adminRouter");
const userRouter = require("./router/userRoutes");

app.use("/admin", adminRouter);
app.use("/user", userRouter);

app.listen(5000, () => {
  console.log(`Server is running port no:5000`);
});
