require("dotenv").config();
const express = require("express");
const morgan = require("morgan");
const bodyParser = require("body-parser");
const app = express();
const cors = require("cors");
const http = require("http");
const server = http.createServer(app);
const { Server } = require("socket.io");
const io = new Server(server);

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
const agentRouter = require("./router/agentRouter");
const path = require("path");
const {
  getMessages,
  sendMessage,
  getClinicianChats,
  getClinicianChatsByChatId,
} = require("./controllers/userController/chatControllers");

//process.env["BASE_URL"] = "http://ec2-16-171-57-155.eu-north-1.compute.amazonaws.com:3001";

app.use("/admin", adminRouter);
app.use("/user", userRouter);
app.use("/agent", agentRouter);
const staticPath = path.join(__dirname, "./public");
app.use(express.static("./public"));

app.get("/", (req, res) => {
  console.log("i am a beautiful butterfly");
  res.status(200).send("i am a beautiful butterfly");
});

io.on("connection", (socket) => {
  console.log(`⚡: ${socket.id} user just connected!`);
  socket.on("createRoom", async (chatId) => {
    console.log("createRoom", chatId);
    socket.join(chatId);
    const messages = await getMessages(chatId);
    console.log(messages);
    io.to(chatId).emit("messageList", messages);
  });
  socket.on("sendMessage", async (data) => {
    console.log("sendMessage", data);
    const messages = await sendMessage(data);
    io.to(data.chatId).emit("messageList", messages);
    const chats = await getClinicianChatsByChatId(data.chatId);
    io.to(data.chatId).emit("chatList", chats);
  });
  socket.on("clinicians", async (clinicianId) => {
    console.log("clinicians", clinicianId);
    socket.join(clinicianId);
    const chats = await getClinicianChats(clinicianId);
    io.emit("chatList", chats);
  });

  socket.on("disconnect", () => {
    socket.disconnect();
    console.log("🔥: A user disconnected");
  });
});

app.listen(process.env.PORT, () => {
  console.log(`Server is running port no:2053`);
});
