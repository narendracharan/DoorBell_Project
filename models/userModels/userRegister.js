const mongoose=require("mongoose")
const jwt=require("jsonwebtoken")
const schema=new mongoose.Schema({
    userName:{
        type:String,
        require:true
    },
    userEmail:{
        type:String,
        require:true
    },
    password:{
        type : String ,
        required:true
    },
    passwordApp:{
        type : String ,
        required:true
    },
    otp:{
        type : Number ,
        required:true 
    },
    userAppOtp:{
        type : Number ,
        required:true 
    },
    totalafterDiscount:Number
})
schema.methods.userAuthToken = function () {
    const token = jwt.sign({ _id: this._id }, "ultra-security", {
      expiresIn: "365d",
    });
    return token;
  };
schema.set("timestamps",true)
module.exports=mongoose.model("user",schema)