const mongoose=require("mongoose")

const schema=new mongoose.Schema({
    userName:{
        type:String,
        require:true
    },
    userEmail:{
        type:String,
        require:true
    },
    subject:{
        type:String,
        require:true
    },
    descripation:{
        type:String,
        require:true
    },
    status:{
        type:String,
       default:true
    },
    user_Id: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Doorbeluser",
        require: true,
      },
})
schema.set("timestamps",true)
module.exports = mongoose.model('DoorbellContact',schema);