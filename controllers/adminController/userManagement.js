const orderModels = require("../../models/userModels/orderModels");
const userRegister = require("../../models/userModels/userRegister");
const userModels = require("../../models/userModels/userRegister");
const { error, success } = require("../../response");
const moment = require("moment");

exports.UserList = async (req, res) => {
  try {
    const { from, to } = req.body;
    // const userList = await orderModels.find({}).populate("user_Id");
    //console.log(userlist);
    //console.log(userList);
    const list = await userRegister.aggregate([
      {
        $match: {
          $and: [
            from
              ? { createdAt: { $gte: moment(new Date(from)).startOf("day") } }
              : {},
            to
              ? { createdAt: { $lte: moment(new Date(to)).endOf("day") } }
              : {},
          ],
        },
      },
      {
        $lookup: {
          from: "userorders",
          foreignField: "user_Id",
          localField: "_id",
          as: "userorders",
        },
      },
      { $addFields: { user: { $size: "$userorders" } } },
    ]);
    console.log(list);
    res.status(200).json(success(res.statusCode, "Success", { list }));
  } catch (err) {
    console.log(err);
    res.status(400).json(error("Failed", res.statusCode));
  }
};

exports.DashBordsHome = async (req, res) => {
  try {
    const { from, to } = req.body;
    const listData = await orderModels
      .find({
        $and: [
          from ? { createdAt: { $gte: new Date(from) } } : {},
          to ? { createdAt: { $lte: new Date(`${to}T23:59:59`) } } : {},
        ],
      })
      .populate("user_Id");
    if (listData) {
      res.status(200).json(success(res.status, "Success", { listData }));
    } else {
      res.status(201).json(error("NO Data Found", res.statusCode));
    }
  } catch (err) {
    res.status(400).json(error("Failed", res.statusCode));
  }
};

exports.CountUser = async (req, res) => {
  try {
    const countUser = await userModels.find().count();
    if (countUser) {
      res.status(200).json(success(res.statusCode, "Success", { countUser }));
    } else {
      res.status(400).json(error("No Data Found", res.statusCode));
    }
  } catch (err) {
    res.status(400).json(error("Failed", res.statusCode));
  }
};

exports.OrderDetails = async (req, res) => {
  try {
    const id = req.params.id;
    const orderDetails = await orderModels
      .findById(id)
      .populate("user_Id")
      .populate("products.products_Id");
    if (orderDetails) {
      res
        .status(200)
        .json(success(res.statusCode, "Success", { orderDetails }));
    } else {
      res.status(201).json(error("NO Data Found", res.statusCode));
    }
  } catch (err) {
    console.log(err);
    res.status(400).json(error("Failed", res.statusCode));
  }
};


exports.transactionList=async(req,res)=>{
  try{
    const {from,to}=req.body
    const listaData=await orderModels.find({
      $and: [
        from ? { createdAt: { $gte: new Date(from) } } : {},
        to ? { createdAt: { $lte: new Date(`${to}T23:59:59`) } } : {},
      ],
    })
    if(listaData){
      res.status(200).json(success(res.statusCode,"Success",{listaData}))
    }else{
      res.status(400).json(error("Failed",res.statusCode))
    }

  }catch(err){
    res.status(400).json(error("Failed",res.statusCode))
  }
}

