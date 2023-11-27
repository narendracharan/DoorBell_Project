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
  adminMessages,
} = require("./controllers/userController/chatControllers");
const chatMessagesSchema = require("./models/userModels/chatMessagesSchema");

//process.env["BASE_URL"] = "http://ec2-16-171-57-155.eu-north-1.compute.amazonaws.com:3001";

//----> Admin Routes
app.use("/admin", adminRouter);

//-----> User Routes
app.use("/user", userRouter);

//------> Agent Routes
app.use("/agent", agentRouter);
const staticPath = path.join(__dirname, "./public");
app.use(express.static("./public"));

app.get("/", (req, res) => {
  console.log("i am a beautiful butterfly");
  res.status(200).send("i am a beautiful butterfly");
});

io.on("connection", (socket) => {
  console.log(`⚡: ${socket.id} user just connected!`);
  socket.on("sendNotification", (data) => {
    socket.broadcast.emit("getNotification", data);
  });
  socket.on("createRoom", async (chatId) => {
    console.log("createRoom", chatId);
    socket.join(chatId);
    const messages = await getMessages(chatId);
    const adminMessage = await adminMessages(chatId);
    // console.log(messages);
    io.to(chatId).emit("messageList", messages);
    emit("adminMessage", adminMessage);
  });

  // socket.on("adminMessage", async (chatId) => {
  //   console.log("sendMessage", chatId);
  //   const adminMessage = await adminMessages(chatId);
  //   io.emit("adminMessage", adminMessage);
  // });

  socket.on("sendMessage", async (data) => {
    console.log("sendMessage", data);
    const messages = await sendMessage(data);
    io.to(data.chatId).emit("messageList", messages);
    // const chats = await getClinicianChatsByChatId(data.chatId);
    // io.to(data.chatId).emit("chatList", chats);
  });
  socket.on("senderMessage", async (data) => {
    console.log("updateData", data);
    const chats = await getClinicianChatsByChatId(data);
    io.to(data.chatId).emit("senderList", chats);
  });
  // socket.on("offline", () => {
  //   // remove user from active users
  //   onlineUsers = onlineUsers.filter((user) => user.socketId !== socket.id);
  //   console.log("user is offline", onlineUsers);
  //   // send all online users to all users
  //   io.emit("get-users", onlineUsers);
  // });

  socket.on("disconnect", () => {
    socket.disconnect();
    console.log("🔥: A user disconnected");
  });
});

server.listen(process.env.PORT, () => {
  console.log(`Server is running port no:2053`);
});
