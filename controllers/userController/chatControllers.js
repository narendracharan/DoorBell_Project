const chatMessagesSchema = require("../../models/userModels/chatMessagesSchema");
const chatModels = require("../../models/userModels/chatModels");
const clinicianModels = require("../../models/userModels/clinicianModels");
const userRegister = require("../../models/userModels/userRegister");



exports.getMessages = async (chatId) => {
    try {
      const messages = await chatMessagesSchema.find({
        chatId:chatId,
      })
        .sort({ createdAt: 1 })
        .lean();
      for (const message of messages) {
        if (message.sentBy == "Clinician") {
          const user = await clinicianModels.findById(message.senderId);
          message.user = {
            name: user.name,
            id: user._id,
            profile_image: user.profile_image,
          };
        } else {
          const user = await userRegister.findById(message.senderId);
          message.user = {
            name: user.userName,
            id: user._id,
            profile_image: user.profilePic,
          };
        }
      }
      return messages;
    } catch (err) {
      console.log(err);
      return;
    }
  };
  
  exports.getClinicianChats = async (clinicianId) => {
    try {
      const chats = await chatModels.find({
        clinicianId: clinicianId,
      }).sort({ updatedAt: -1 });
  
      return chats;
    } catch (err) {
      console.log(err);
      return;
    }
  };
  
  exports.getClinicianChatsByChatId = async (chatId) => {
    try {
      const chat = await chatModels.findById(chatId);
      const chats = await chatModels.find({
        clinicianId: chat.clinicianId,
      }).sort({ updatedAt: -1 });
      return chats;
    } catch (err) {
      console.log(err);
      return;
    }
  };
  
  exports.sendMessage = async (data) => {
    try {
      await chatModels.create(data);
      const messages = await chatModels.find({
        id:data.id,
      })
        .sort({ createdAt: 1 })
        .lean();
      await chatModels.findByIdAndUpdate(data.id, {
        lastMessage: data.message,
        timestamp: new Date(),
      });
      const chat = await chatModels.findById(data.id).populate([
        // "mother",
        // "daughter",
        "clinicianId",
      ]);
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
      for (const message of messages) {
        if (message.sentBy == "Clinician") {
          const user = await clinicianModels.findById(message.senderId);
          message.user = {
            name: user.name,
            id: user._id,
            profile_image: user.profile_image,
          };
        } else {
          const user = await userRegister.findById(message.senderId);
          message.user = {
            name: user.userName,
            id: user._id,
            profile_image: user.profilePic,
          };
        }
      }
      return messages;
    } catch (err) {
      console.log(err);
      return;
    }
  };
  