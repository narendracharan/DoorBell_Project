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

app.get("/", (req, res) => {
  console.log("i am a beautiful butterfly");
  res.status(200).send("i am a beautiful butterfly");
});

app.listen(3001, () => {
  console.log(`Server is running port no:5000`);
});
