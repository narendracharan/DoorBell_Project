const orderModels = require("../../models/userModels/orderModels")
const userModels=require("../../models/userModels/userRegister")
const { error } = require("../../response")

exports.UserList=async(req,res)=>{
    try{
const {from,to}=req.body
const userList=await orderModels.find({}).populate("user_Id")
//console.log(userlist);
console.log(userList);
orderModels.aggregate([
    {
      $lookup: {
        from: "activities",
        localField: "activity",
        foreignField: "_id",
        as: "lookup_activities",
      },
    }
  ])

    }catch(err){
        res.status(400).json(error("Failed",res.statusCode))
    }
}