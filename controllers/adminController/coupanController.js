const coupanSchema = require("../../models/adminModels/coupanModels");
const userCoupan = require("../../models/adminModels/userCoupan");
const { error, success } = require("../../response");

exports.createCoupan = async (req, res) => {
  try {
    const { coupanName, endDate, startDate, Discount, coupanCode } = req.body;
    if (!coupanName) {
      return res
        .status(201)
        .json(error("Please Provide CoupanName", res.statusCode));
    }
    if (!endDate) {
      return res
        .status(201)
        .json(error("Please Provide End Date ", res.statusCode));
    }
    if (!startDate) {
      return res
        .status(201)
        .json(error("Please Provide Start Date ", res.statusCode));
    }
    if (!Discount) {
      return res
        .status(201)
        .json(error("Please Provide Discount Amount ", res.statusCode));
    }
    if (!coupanCode) {
      return res
        .status(201)
        .json(error("Please Provide Coupan Code ", res.statusCode));
    }
    console.log(req.body);
    const newCoupan = new coupanSchema({
      coupanName: coupanName,
      startDate: startDate,
      endDate: endDate,
      Discount: Discount,
      coupanCode: coupanCode,
    });
    await newCoupan.save();
    res.status(200).json(success(res.statusCode, "Success", { newCoupan }));
  } catch (err) {
    res.status(400).json(error("Error in Create Coupan", res.statusCode));
  }
};

exports.coupanList = async (req, res) => {
  try {
    const { from, to } = req.body;
    const list = await coupanSchema.find({
      $and: [
        from ? { createdAt: { $gte: new Date(from) } } : {},
        to ? { createdAt: { $lte: new Date(`${to}T23:59:59`) } } : {},
      ],
    });
    if (list.length > 0) {
      res.status(200).json(success(res.statusCode, "Success", { list }));
    } else {
      res.status(200).json(error("Data are Not Found", res.statusCode));
    }
  } catch (err) {
    res.status(400).json("Failed", res.statusCode);
  }
};

exports.editCoupan = async (req, res) => {
  try {
    const id = req.params.id;
    const { coupanName, endDate, startDate, Discount, coupanCode } = req.body;
    const coupan = await coupanSchema.findById(id);
    console.log(coupan);
    if (coupanName) {
      coupan.coupanName = coupanName;
    }
    if (Discount) {
      coupan.Discount = Discount;
    }
    if (coupanCode) {
      coupan.coupanCode = coupanCode;
    }
    if (startDate) {
      coupan.startDate = startDate;
    }
    if (endDate) {
      coupan.endDate = endDate;
    }
    await coupan.save();

    res.status(200).json(success(res.statusCode, "Success", { coupan }));
  } catch (err) {
    res.status(400).json(error("Failed", res.statusCode));
  }
};
exports.deleteCoupan = async (req, res) => {
  try {
    const id = req.params.id;
    const deleteData = await coupanSchema.findByIdAndDelete(id);
    res.status(200).json(success(res.statusCode, "Success", { deleteData }));
  } catch (err) {
    console.log(err);
    res.status(400).json(error("Failed", res.statusCode));
  }
};

exports.userCoupan = async (req, res) => {
  try {
    const { coupanName, endDate, startDate, Discount } = req.body;
    if (!coupanName) {
      return res
        .status(201)
        .json(error("Please Provide CoupanName", res.statusCode));
    }
    if (!endDate) {
      return res
        .status(201)
        .json(error("Please Provide End Date ", res.statusCode));
    }
    if (!startDate) {
      return res
        .status(201)
        .json(error("Please Provide Start Date ", res.statusCode));
    }
    if (!Discount) {
      return res
        .status(201)
        .json(error("Please Provide Discount Amount ", res.statusCode));
    }

    const newCoupan = new userCoupan({
      coupanName: coupanName,
      endDate: endDate,
      startDate: startDate,
      Discount: Discount,
    });
    await newCoupan.save();
    res.status(201).json(success(res.statusCode, "Success", { newCoupan }));
  } catch (err) {
    res.status(400).json(error("Error in userCoupan", res.statusCode));
  }
};

exports.userCoupanList = async (req, res) => {
  try {
    const list = await userCoupan.find({});
    if (list.length > 0) {
      return res.status(200).json(success(res.statusCode, "Success", { list }));
    } else {
      return res.status(201).json(error("No Data Found", res.statusCode));
    }
  } catch (err) {
    res.status(400).json(error("Error In Coupan List", res.statusCode));
  }
};

exports.userUpdateCoupan = async (req, res) => {
  try {
    const { coupanName, endDate, startDate, Discount } = req.body;
    const coupan = await userCoupan.findById(req.params.id);
    if (coupanName) {
      coupan.coupanName = coupanName;
    }
    if (endDate) {
      coupan.endDate = endDate;
    }
    if (startDate) {
      coupan.startDate = startDate;
    }
    if (Discount) {
      coupan.Discount = Discount;
    }
    await coupan.save();
    res.status(200).json(success(res.statusCode, "Success", { coupan }));
  } catch (err) {
    res.status(400).json(error("Error In Update Coupan", res.statusCode));
  }
};

exports.userDeleteCoupan = async (req, res) => {
  try {
    const deleteCoupan = await userCoupan.findByIdAndDelete(req.params.id);
    res.status(200).json(success(res.statusCode, "Success", { deleteCoupan }));
  } catch (err) {
    res.status(400).json(error("Error In Delete Coupan", res.statusCode));
  }
};
