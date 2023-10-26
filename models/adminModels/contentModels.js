const monoose=require("mongoose")

const schema=new monoose.Schema({
    title_en:{
        type:String,
        require:true
    },
    Description_en:{
        type:String,
        require:true
    },
    title_ar:{
        type:String,
        require:true
    },
    Description_ar:{
        type:String,
        require:true
    },
    Desption_ar:{
        type:String,
        require:true
    }

})

schema.set("timestamps",true)
module.exports=monoose.model("Doorbelcontent",schema)