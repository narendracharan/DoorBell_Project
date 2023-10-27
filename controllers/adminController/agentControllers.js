const agentSchema = require("../../models/adminModels/deliveryAgent");
const orderModels = require("../../models/userModels/orderModels");
const { error, success } = require("../../response");
const { transporter } = require("../../services/mailServices");

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
    // if (req.files) {
    //   for (let i = 0; i < req.files.length; i++) {
    //     // if (req.files[i].fieldname == "profile_Pic") {
    //     //   newUser.profile_Pic = `${process.env.BASE_URL}/${req.files[i].filename}`;
    //     // }
    //     if (req.files[i].fieldname == "document") {
    //       newUser.document.push(
    //         `${process.env.BASE_URL}/${req.files[i].filename}`
    //       );
    //     }
    //   }
    //   }
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

exports.agentOrderList = async (req, res) => {
  try {
    const id = req.params.id;
    const orderList = await orderModels.find({ deliverdBy: id });
    orderList.filter(
      (x) => x.orderStatus == "In-Progress" || x.orderStatus == "Delivered"
    );
    res.status(200).json(success(res.statusCode, "Success", { orderList }));
  } catch (err) {
    res.status(400).json(error("Error in Agent Order", res.statusCode));
  }
};

exports.orderDetails = async (req, res) => {
  try {
    const orderDetails = await orderModels
      .findById(req.params.id)
      .populate(["user_Id", "deliverdBy", "products.products_Id"]);
    res.status(200).json(success(res.statusCode, "Success", { orderDetails }));
  } catch (err) {
    console.log(err);
    res.status(400).json(error("Error In Order Details", res.statusCode));
  }
};

exports.updateOrderStatus = async (req, res) => {
  try {
    const id = req.params.id;
    var status = req.body.status;
    if (!status) {
      return res
        .status(201)
        .json(error("please provide  status", res.statusCode));
    }
    const order = await orderModels.findById(id);
    if (status) {
      order.orderStatus = status;
    }
    await order.save();
    res.status(200).json(success(res.statusCode, "Success", { order }));
  } catch (err) {
    res.status(400).json(error("Error In Order Status", res.statusCode));
  }
};

exports.agentLogin = async (req, res) => {
  try {
    const { userEmail, password } = req.body;
    if (!userEmail) {
      return res
        .status(201)
        .json(error("Please Provide UserEmail", res.statusCode));
    }
    if (!password) {
      return res
        .status(201)
        .json(error("Please Provide Password", res.statusCode));
    }
    const verifyUser = await agentSchema.findOne({
      userEmail: userEmail,
    });
    if (!verifyUser) {
      return res
        .status(201)
        .json(error("UserEmail is Not Register", res.statusCode));
    }

    const isMatch = await agentSchema.findOne({
      password: password,
    });
    if (!isMatch) {
      return res.status(201).json(error("User is Not Matched", res.statusCode));
    }

    const token = await verifyUser.AgentAuthToken();
    return res
      .header("x-auth-token-agent", token)
      .header("access-control-expose-headers", "x-auth-token-agent")
      .status(201)
      .json(
        success(res.statusCode, "login SuccessFully", {
          token,
        })
      );
  } catch (err) {
    console.log(err);
    res.status(400).json(error("Error in Login", res.status));
  }
};

exports.sendEmail = async (req, res) => {
  try {
    const { userEmail } = req.body;
    if (!userEmail) {
      return res
        .status(201)
        .json(error("Please Provide UserEmail", res.statusCode));
    }
    const user = await agentSchema.findOne({ userEmail: userEmail });
    if (!user) {
      return res
        .status(201)
        .json(error("UserEmail Not Register", res.statusCode));
    }
    const otp = `${Math.floor(1000 + Math.random() * 9000)}`;
    let info = await transporter.sendMail({
      from: "s04450647@gmail.com",
      to: userEmail,
      subject: "Email Send For Reset Password",
      text: `This ${otp} Otp Verify To Email`,
    });
    await agentSchema.findOneAndUpdate({ userEmail: userEmail }, { otp: otp });
    return res
      .status(200)
      .json(success(res.statusCode, "Send Email Successfully"));
  } catch (err) {
    console.log(err);
    res.status(400).json(error("Error In Send Email", res.statusCode));
  }
};

exports.agentOtpVerify = async (req, res) => {
  try {
    const { userEmail, otp } = req.body;
    if (!userEmail) {
      return res
        .status(201)
        .json(error("Please Provide UserEmail", res.statusCode));
    }
    if (!userEmail) {
      return res.status(201).json(error("Please Provide OTP", res.statusCode));
    }
    const userOtpVerify = await agentSchema.findOne({ userEmail: userEmail });
    if (!userOtpVerify) {
      return res
        .status(201)
        .json(error("userEmail Not Register", res.statusCode));
    }
    if (userOtpVerify.otp === +otp && new Date() > userOtpVerify.expiresAt) {
      return res.status(201).json(error("OTP Expired", res.statusCode));
    }
    if (userOtpVerify.otp == otp) {
      return res
        .status(200)
        .json(success(res.statusCode, "Verify Otp Successfully", {}));
    } else {
      return res.status(201).json(error("Invalid Otp", res.statusCode));
    }
  } catch (err) {
    console.log(err);
    res.status(400).json(error("Error In Verify Otp", res.statusCode));
  }
};

exports.agentPasswordReset = async (req, res) => {
  try {
    const { newPassword, confirmPassword, userEmail } = req.body;
    if (!newPassword) {
      return res
        .status(201)
        .json(error("Please Provide newPassword", res.statusCode));
    }
    if (!confirmPassword) {
      return res
        .status(201)
        .json(error("Please Provide confirmPassword", res.statusCode));
    }
    if (!userEmail) {
      return res
        .status(201)
        .json(error("Please Provide userEmail", res.statusCode));
    }
    const match = await agentSchema.findOne({ userEmail: userEmail });
    if (!match) {
      res.status(201).json(error("userEmail are incorrect", res.statusCode));
    }

    if (newPassword !== confirmPassword) {
      return res
        .status(201)
        .json(
          error(
            "newPassword Or confirmPassword Could Not Be Same",
            res.statusCode
          )
        );
    } else {
      // const passwordHash = await bcrypt.hash(newPassword, 10);
      await agentSchema.findOneAndUpdate(
        { userEmail: userEmail },
        {
          $set: { password: newPassword },
        }
      );
      res
        .status(200)
        .json(success(res.statusCode, "Reset Password Successfully", {}));
    }
  } catch (err) {
    console.log(err);
    res.status(400).json(error("Error In Reset Password", res.statusCode));
  }
};

exports.agentEditProfile = async (req, res) => {
  try {
    const { userName, mobileNumber, userEmail } = req.body;
    if (!userName) {
      res.status(201).json(error("please provide userName", res.statusCode));
    }
    if (!mobileNumber) {
      res
        .status(201)
        .json(error("please provide mobileNumber", res.statusCode));
    }
    if (!userEmail) {
      res.status(201).json(error("please provide userName", res.statusCode));
    }
    const agent = await agentSchema.findById(req.params.id);
    if (userName) {
      agent.userName = userName;
    }
    if (userEmail) {
      agent.userEmail = userEmail;
    }
    if (mobileNumber) {
      agent.mobileNumber = mobileNumber;
    }
    if (req.file) {
      agent.profile_Pic = `${process.env.BASE_URL}/${req.file.filename}`;
    }
    await agent.save()
    res.status(200).json(success(res.statusCode, "Success", {}));
  } catch (err) {
    res.status(400).json(error("Error In Update Profile", res.statusCode));
  }
};
