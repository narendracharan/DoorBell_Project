const mongoose=require("mongoose")


var schema=new mongoose.Schema({
    language:{
        type:String,
        require:true
    },
    deviceOs:{
        type:String,
        require:true
    },
    device_Id:{
        type:String,
        require:true
    }
})
schema.set("timestamps",true)
module.exports = mongoose.model('Device',schema);