const chatMessagesSchema = require("../../models/userModels/chatMessagesSchema");
const chatModels = require("../../models/userModels/chatModels");
const clinicianModels = require("../../models/userModels/clinicianModels");
const userRegister = require("../../models/userModels/userRegister");

exports.getMessages = async (chatId) => {
  try {
    const messages = await chatMessagesSchema
      .find({
        chatId: chatId,
      })
      .sort({ createdAt: 1 })
      .lean();
    return messages;
  } catch (err) {
    console.log(err);
    return;
  }
};

exports.getClinicianChats = async (_id) => {
  try {
    const chats = await chatModels
      .find({
        _id: _id,
      })
      .populate(["user1", "user2"])
      .sort({ updatedAt: -1 });
    return chats;
  } catch (err) {
    console.log(err);
    return;
  }
};

exports.getClinicianChatsByChatId = async (chatId) => {
  try {
    const chat = await chatModels.findById(chatId);
    const chats = await chatModels
      .find({
        _id: chat.user1,
      })
      .sort({ updatedAt: -1 });
    return chats;
  } catch (err) {
    console.log(err);
    return;
  }
};

exports.sendMessage = async (data) => {
  try {
    await chatModels.create(data);
    const messages = await chatModels
      .find({
        id: data.id,
      })
      .sort({ createdAt: 1 })
      .lean();
    await chatModels
      .findByIdAndUpdate(data.id, {
        lastMessage: data.message,
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
