const contentModels = require("../../models/userModels/contactUs");
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
            from ? { createdAt: { $gte: new Date(from) } } : {},
            to ? { createdAt: { $lte: new Date(`${to}T23:59:59`) } } : {},
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
    const orderRevenue = await orderModels.aggregate([
      {
        $match: {
          orderStatus: "Delivered",
          // createdAt: { $gte: new Date(moment(new Date()).startOf("month")) },
          // createdAt: { $lte: new Date(moment(new Date()).endOf("month")) },
        },
      },
    ]);
    const supportsTicket = await contentModels.find().count();
    if (countUser) {
      res.status(200).json(
        success(res.statusCode, "Success", {
          countUser,
          orderRevenue,
          supportsTicket,
        })
      );
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

exports.transactionList = async (req, res) => {
  try {
    const { from, to } = req.body;
    const listaData = await orderModels.find({
      $and: [
        from ? { createdAt: { $gte: new Date(from) } } : {},
        to ? { createdAt: { $lte: new Date(`${to}T23:59:59`) } } : {},
      ],
    });
    if (listaData) {
      res.status(200).json(success(res.statusCode, "Success", { listaData }));
    } else {
      res.status(400).json(error("Failed", res.statusCode));
    }
  } catch (err) {
    res.status(400).json(error("Failed", res.statusCode));
  }
};

exports.editOrder = async (req, res) => {
  try {
    const id = req.params.id;
    var { status, status_ar } = req.body;
    if (!status) {
      res.status(201).json(error("Please provide status", res, statusCode));
    }
    const changeStatus = await orderModels.findByIdAndUpdate(
      id,
      { orderStatus: status, orderStatus_ar: status_ar },
      { new: true }
    );
    res.status(200).json(success(res.statusCode, "Success", { changeStatus }));
  } catch (err) {
    res.status(400).json(error("Failed", res.statusCode));
  }
};

exports.blockUser = async (req, res) => {
  try {
    const id = req.params.id;
    const status = req.body.status;
    if (!status) {
      res.status(201).json(error("Please provide status", res.statusCode));
    }
    const updateUser = await userModels.findByIdAndUpdate(
      id,
      { status: status },
      { new: true }
    );
    res.status(200).json(success(res.statusCode, "Success", { updateUser }));
  } catch (err) {
    res.status(400).json(error("Failed", res.statusCode));
  }
};
