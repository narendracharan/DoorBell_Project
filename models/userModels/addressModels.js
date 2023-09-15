const mongoose=require("mongoose")

const schema=new mongoose.Schema({
    title:{
        type:String,
        require:true
    },
    address:{
        type:String,
        require:true
    },
    country:{
        type:String,
        require:true
    },
    locality:{
        type:String,
        require:true
    },
    pincode:{
        type:Number,
        require:true
    },
    user_Id: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Doorbeluser",
        require: true,
      },

})
schema.set("timestamps",true)
module.exports=mongoose.model("userAddress",schema)