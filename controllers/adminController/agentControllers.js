const agentSchema = require("../../models/adminModels/deliveryAgent");
const orderModels = require("../../models/userModels/orderModels");
const { error, success } = require("../../response");

exports.addAgent = async (req, res) => {
  try {
    const { userName, userEmail, password, mobileNumber, idNumber, address } =
      req.body;
    if (!userName) {
      return res
        .status(201)
        .json(error("Please Provide UserName", res.statusCode));
    }
    if (!userEmail) {
      return res
        .status(201)
        .json(error("Please Provide userEmail", res.statusCode));
    }
    if (!password) {
      return res
        .status(201)
        .json(error("Please Provide password", res.statusCode));
    }
    if (!mobileNumber) {
      return res
        .status(201)
        .json(error("Please Provide mobileNumber", res.statusCode));
    }
    if (!idNumber) {
      return res
        .status(201)
        .json(error("Please Provide idNumber", res.statusCode));
    }
    if (!address) {
      return res
        .status(201)
        .json(error("Please Provide address", res.statusCode));
    }
    const newUser = new agentSchema({
      userName: userName,
      userEmail: userEmail,
      password: password,
      mobileNumber: mobileNumber,
      idNumber: idNumber,
      address: address,
    });
    if (req.files) {
      for (let i = 0; i < req.files.length; i++) {
        // if (req.files[i].fieldname == "profile_Pic") {
        //   newUser.profile_Pic = `${process.env.BASE_URL}/${req.files[i].filename}`;
        // }
        if (req.files[i].fieldname == "document") {
          newUser.document.push(
            `${process.env.BASE_URL}/${req.files[i].filename}`
          );
        }
      }
    }
    await newUser.save();
    res.status(200).json(success(res.statusCode, "Success", { newUser }));
  } catch (err) {
    res.status(400).json(error("Error in Add Agent", res.statusCode));
  }
};

exports.agentlist = async (req, res) => {
  try {
    const list = await agentSchema.find({});
    if (list.length > 0) {
      res.status(200).json(success(res.statusCode, "Success", { list }));
    } else {
      res.status(201).json(error("No Data Found", res.statusCode));
    }
  } catch (err) {
    res.status(400).json(error("Error In Agent List", res.statusCode));
  }
};

exports.agentUpdate = async (req, res) => {
  try {
    const { userName, userEmail, password, mobileNumber, idNumber, address } =
      req.body;
    const agent = await agentSchema.findById(req.params.id);
    if (userName) {
      agent.userName = userName;
    }
    if (userEmail) {
      agent.userEmail = userEmail;
    }
    if (password) {
      agent.password = password;
    }
    if (mobileNumber) {
      agent.mobileNumber = mobileNumber;
    }
    if (idNumber) {
      agent.idNumber = idNumber;
    }
    if (address) {
      agent.address = address;
    }
    if (req.files) {
      for (let i = 0; i < req.files.length; i++) {
        if (req.files[i].fieldname == "profile_Pic") {
          agent.profile_Pic = `${process.env.BASE_URL}/${req.files[i].filename}`;
        }
      }
    }
    await agent.save();
    res.status(200).json(success(res.statusCode, "Success", { agent }));
  } catch (err) {
    res.status(400).json(error("Error in Agent Update", res.statusCode));
  }
};

exports.deleteAgent = async (req, res) => {
  try {
    const deleteAgent = await agentSchema.findByIdAndDelete(req.params.id);
    res.status(200).json(success(res.statusCode, "Success", { deleteAgent }));
  } catch (err) {
    res.status(400).json(error("Error in Agent Details", res.statusCode));
  }
};

exports.assignOrder = async (req, res) => {
  try {
    const id = req.params.id;
    const { deliverdBy, deviceId } = req.body;
    if (!deliverdBy) {
      return res
        .status(201)
        .json(error("Please Provide Deliverd_Id", res.statusCode));
    }
    let status = "Assign";
    const order = await orderModels.findById(id);

    if (deliverdBy) {
      order.deliverdBy = deliverdBy;
    }
    if (status) {
      order.assignStatus = status;
    }
    await order.save();
    res.status(200).json(success(res.statusCode, "Success", { order }));
  } catch (err) {
    res.status(400).json(error("Error In Assign Order", res.statusCode));
  }
};
