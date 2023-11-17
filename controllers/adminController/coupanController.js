const coupanSchema = require("../../models/adminModels/coupanModels");
const userCoupan = require("../../models/adminModels/userCoupan");
const { error, success } = require("../../response");


//--------> Create Coupan Api
exports.createCoupan = async (req, res) => {
  try {
    const { coupanName, endDate, startDate, Discount, user, coupanCode } =
      req.body;
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
    const newCoupan = new coupanSchema({
      coupanName: coupanName,
      startDate: startDate,
      endDate: endDate,
      Discount: Discount,
      coupanCode: coupanCode,
      user: user,
    });
    await newCoupan.save();
    res.status(200).json(success(res.statusCode, "Success", { newCoupan }));
  } catch (err) {
    res.status(400).json(error("Error in Create Coupan", res.statusCode));
  }
};


/// Coupan List Api
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

// Edit Coupan APi
exports.editCoupan = async (req, res) => {
  try {
    const id = req.params.id;
    const { coupanName, endDate, startDate, Discount, user, coupanCode } =
      req.body;
    const coupan = await coupanSchema.findById(id);
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
    if (user) {
      coupan.user = user;
    }
    await coupan.save();

    res.status(200).json(success(res.statusCode, "Success", { coupan }));
  } catch (err) {
    res.status(400).json(error("Failed", res.statusCode));
  }
};

//---> Delete Coupan APi
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

///----------> User Coupan Api
exports.userCoupan = async (req, res) => {
  try {
    const { coupanName, endDate, startDate, user, coupanCode, Discount } =
      req.body;
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
        .json(error("Please Provide Discount Amount ", res.statusCode));
    }
    const newCoupan = new userCoupan({
      coupanName: coupanName,
      endDate: endDate,
      startDate: startDate,
      Discount: Discount,
      user: user,
      coupanCode: coupanCode,
    });
    await newCoupan.save();
    res.status(201).json(success(res.statusCode, "Success", { newCoupan }));
  } catch (err) {
    res.status(400).json(error("Error in userCoupan", res.statusCode));
  }
};

///-----> User Coupan List
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

/// User Update Coupan
exports.userUpdateCoupan = async (req, res) => {
  try {
    const { coupanName, endDate, user, coupanCode, startDate, Discount } =
      req.body;
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
    if (user) {
      coupan.user = user;
    }
    if (coupanCode) {
      coupan.coupanCode = coupanCode;
    }
    await coupan.save();
    res.status(200).json(success(res.statusCode, "Success", { coupan }));
  } catch (err) {
    res.status(400).json(error("Error In Update Coupan", res.statusCode));
  }
};


//User Delete Coupan
exports.userDeleteCoupan = async (req, res) => {
  try {
    const deleteCoupan = await userCoupan.findByIdAndDelete(req.params.id);
    res.status(200).json(success(res.statusCode, "Success", { deleteCoupan }));
  } catch (err) {
    console.log(err);
    res.status(400).json(error("Error In Delete Coupan", res.statusCode));
  }
};
