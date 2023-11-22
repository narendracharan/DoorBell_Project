const chatMessagesSchema = require("../../models/userModels/chatMessagesSchema");
const chatModels = require("../../models/userModels/chatModels");
const clinicianModels = require("../../models/userModels/clinicianModels");
const userRegister = require("../../models/userModels/userRegister");

exports.getMessages = async (chatId) => {
  try {
    const messages = await chatMessagesSchema
      .find({ chatId: chatId })
      .populate("senderId").populate("chatId")
      .sort({ createdAt: 1 })
      .lean();
    const msg = await chatMessagesSchema.find().populate("senderId").populate("chatId")
    console.log(msg);
    return [messages,msg];
  } catch (err) {
    console.log(err);
    return;
  }
};

exports.getClinicianChats = async (_id) => {
  try {
    const chats = await chatMessagesSchema
      .find({
        senderId: senderId,
      })
      .populate(["senderId", "chatId"])
      .sort({ updatedAt: -1 });
    return chats;
  } catch (err) {
    console.log(err);
    return;
  }
};

exports.getClinicianChatsByChatId = async (chatId) => {
  try {
    const chat = await chatModels
      .findById(chatId)
      .populate([["user1", "user2"]]);
    const chats = await chatModels
      .find({
        user1: chat._id,
      })
      .sort({ updatedAt: -1 });
    return chat;
  } catch (err) {
    console.log(err);
    return;
  }
};

exports.sendMessage = async (data) => {
  try {
    await chatMessagesSchema.create(data);
    const messages = await chatMessagesSchema
      .find({
        chatId: data.chatId,
      })
      .sort({ createdAt: 1 })
      .lean();
    await chatModels
      .findByIdAndUpdate(data.chatId, {
        lastMessage: data.text,
        timestamp: new Date(),
      })
      .populate(["user1", "user2"]);

    const chat = await chatModels
      .findById(data.id)
      .populate(["user1", "user2"]);
    //   if (data.sentBy === "clinicianId") {
    //     if (chat.mother.deviceId && chat.mother.notification_status) {
    //       await sendNotification(
    //         "Chat",
    //         chat.clinician.name,
    //         {
    //           text: data.text,
    //           type: "Chat",
    //         },
    //         chat.mother.deviceId
    //       );
    //     }
    //     if (chat.daughter.deviceId && chat.daughter.notification_status) {
    //       await sendNotification(
    //         "Chat",
    //         chat.clinician.name,
    //         {
    //           text: data.text,
    //           type: "Chat",
    //         },
    //         chat.daughter.deviceId
    //       );
    //     }
    //   } else if (data.sentBy === "Mother") {
    //     if (chat.daughter.deviceId && chat.daughter.notification_status) {
    //       await sendNotification(
    //         "Chat",
    //         chat.mother.full_name,
    //         {
    //           text: data.text,
    //           type: "Chat",
    //         },
    //         chat.daughter.deviceId
    //       );
    //     }
    //   } else {
    //     if (chat.mother.deviceId && chat.mother.notification_status) {
    //       await sendNotification(
    //         "Chat",
    //         chat.daughter.full_name,
    //         {
    //           text: data.text,
    //           type: "Chat",
    //         },
    //         chat.mother.deviceId
    //       );
    //     }
    //   }
    // for (const message of messages) {
    //   if (message.sentBy == "Clinician") {
    //     const user = await clinicianModels.findById(message.senderId);
    //     message.user = {
    //       name: user.name,
    //       id: user._id,
    //       profile_image: user.profile_image,
    //     };
    //   } else {
    //     const user = await userRegister.findById(message.senderId);
    //     message.user = {
    //       name: user.userName,
    //       id: user._id,
    //       profile_image: user.profilePic,
    //     };
    //   }
    // }
    return messages;
  } catch (err) {
    console.log(err);
    return;
  }
};
