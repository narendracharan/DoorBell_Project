const mongoose=require("mongoose")


const schema=new mongoose.Schema({
    title:{
        type:String,
        require:true
    },
    description:{
        type:String,
        require:true
    },
    title_ar:{
        type:String,
        require:true
    },
    description_ar:{
        type:String,
        require:true
    }
})
schema.set("timestamps",true)
module.exports=mongoose.model("adminFaqs",schema)