const mongoose=require("mongoose")

const schema=new mongoose.Schema({
    coupanName:{
        type:String,
        required:[true,"please enter the name"]
    },
    endDate:{
        type:Date,
        required:[true,"please enter the name"]
    },
    startDate:{
        type:Date,
        required:[true,"please enter the name"]
    },
    Discount:{
        type:Number,
        required:[true,"please enter the name"]
    },
    coupanCode:{
        type:Number,
        required:[true,"please enter the name"]
    },
    user_Id:{
        type: mongoose.Schema.Types.ObjectId,
        ref: "admin",
        require: true,
    }

})
schema.set("timestamps",true)
module.exports=mongoose.model("Coupan",schema)