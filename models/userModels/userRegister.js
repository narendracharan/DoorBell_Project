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
        require:true
    },
    profilePic:{
        type : String ,
        require:true
    },
    mobileNumber:{
        type : Number ,
       require:true 
    },
    passwordApp:{
        type : String ,
       require:true
    },
    otp:{
        type : Number ,
        require:true 
    },
    userAppOtp:{
        type : Number ,
        require:true 
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
module.exports=mongoose.model("Doorbeluser",schema)