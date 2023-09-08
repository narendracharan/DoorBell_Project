require("dotenv").config();
const express = require("express");
const morgan = require("morgan");
const bodyParser = require("body-parser");
const app = express();
const cors = require("cors");
require("./config/connection");
app.use(bodyParser.json());
app.use(morgan("dev"));
// const corsoptions = {
//   origin: "*",
//   credentials: true,
//   optionSuccessStatus: 200,
// };
app.use(cors());
const adminRouter = require("./router/adminRouter");
const userRouter = require("./router/userRoutes");
process.env["BASE_URL"] = "http://ec2-16-171-57-155.eu-north-1.compute.amazonaws.com:3001";
app.use("/admin", adminRouter);
app.use("/user", userRouter);
app.use(express.static("./public"));
app.get("/", (req, res) => {
  console.log("i am a beautiful butterfly");
  res.status(200).send("i am a beautiful butterfly");
});

app.listen(process.env.PORT, () => {
  console.log(`Server is running port no:3001`);
});
