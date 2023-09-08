const mongoose=require("mongoose")

const schema = new mongoose.Schema({
    title_en:{
        type:String,
        require:true
    },
    title_ar:{
        type:String,
        require:true
    },
    tutorialVideo:{
        type:Array,
        require:true
    },
    tutorialVideoTwo:{
        type:Array,
        require:true
    }
    
})
schema.set("timestamps",true)
module.exports=mongoose.model("Doorbeltutorial",schema)