const mongoose=require("mongoose")

const schema=new mongoose.Schema({
    userName:{
        type:String,
        require:true
    },
    userName_ar:{
        type:String,
        require:true
    },
    userEmail:{
        type:String,
        require:true
    },
    mobileNumber:{
        type:Number,
        require:true
    },
    descripation:{
        type:String,
        require:true
    },
    descripation_ar:{
        type:String,
        require:true
    },
    status:{
        type:String,
       default:"Pending",
       enum:[
        "Pending",
        "progress",
        "Fixed"
       ]
    },
    status_ar:{
        type:String,
       default:"قيد الانتظار",
       enum:[
        "قيد الانتظار",
        "تقدم",
        "مُثَبَّت"
       ]
    },
    user_Id: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Doorbeluser",
        require: true,
      },
})
schema.set("timestamps",true)
module.exports = mongoose.model('DoorbellContact',schema);