const adminSchema = require("../../models/adminModels/register");
const bcrypt = require("bcrypt");
const { error, success } = require("../../response");
const validator = require("validator");
const { transporter } = require("../../services/mailServices");
const languageModels = require("../../models/adminModels/languageModels");

///-------> admin Signup Api
exports.adminRegister = async (req, res) => {
  try {
    const { userName, userEmail, password } = req.body;
    if (!userName) {
      return res.status(201).json(error("Please enter  name", res.statusCode));
    }
    if (!validator.isEmail(userEmail)) {
      return res
        .status(201)
        .json(error("Please enter  userEmail", res.statusCode));
    }
    if (!password) {
      return res
        .status(201)
        .json(error("Please enter password", res.statusCode));
    }
    const checkMail = await adminSchema.findOne({ userEmail: userEmail });
    if (checkMail) {
      return res.status(201).json(error("userEmail are already register"));
    }
    const passwordHash = await bcrypt.hash(password, 10);
    const newUser = new adminSchema({
      userName: userName,
      userEmail: userEmail,
      password: passwordHash,
    });
    const admin = await newUser.save();
    res.status(200).json(success(res.statusCode, "Success", { admin }));
  } catch (err) {
    console.log(err);
    res.status(400).json(error("Failed", res.statusCode));
  }
};

//------> admin Login Api
exports.loginAdmin = async (req, res) => {
  try {
    const { userName, password } = req.body;
    if (userName && password) {
      const verifyUser = await adminSchema.findOne({
        userName: userName,
      });
      if (verifyUser != null) {
        const isMatch = await bcrypt.compare(password, verifyUser.password);
        if (isMatch) {
          const token = await verifyUser.AdminAuthToken();
          return res
            .header("x-auth-token-admin", token)
            .header("access-control-expose-headers", "x-auth-token-admin")
            .status(201)
            .json(
              success(res.statusCode, "login SuccessFully", {
                verifyUser,
                token,
              })
            );
        } else {
          res
            .status(201)
            .json(error("User Password is Incorrect", res.statusCode));
        }
      } else {
        res.status(201).json(error("userName is Incorrect", res.statusCode));
      }
    } else {
      res
        .status(201)
        .json(error("UserName and Password is empty", res.statusCode));
    }
  } catch (err) {
    console.log(err);
    res.status(400).json(error("Failed", res.statusCode));
  }
};

//send-mail for-resetpassword
exports.sendUserResetPassword = async (req, res) => {
  try {
    const { userEmail } = req.body;
    const user = await adminSchema.findOne({ userEmail: userEmail });
    if (user) {
      const otp = `${Math.floor(1000 + Math.random() * 9000)}`;
      let info = await transporter.sendMail({
        from: "s04450647@gmail.com",
        to: userEmail,
        subject: "Email Send For Reset Password",
        text: `This ${otp} Otp Verify To Email`,
      });
      await adminSchema.findOneAndUpdate(
        { userEmail: userEmail },
        { otp: otp }
      );
      return res.status(200).json(success(res.statusCode, "Success", {}));
    } else {
      res.status(201).json(error("userEmail is empty", res.statusCode));
    }
  } catch (err) {
    console.log(err);
    res.status(500).json(error("Failed", res.statusCode));
  }
};

//---> admin reset password Api
exports.resetPassword = async (req, res) => {
  try {
    const { newPassword, confirmPassword, userEmail } = req.body;
    if (newPassword && confirmPassword && userEmail) {
      if (newPassword !== confirmPassword) {
        return res
          .status(201)
          .json(error("newPassword Or confirmPassword Could Not Be Same"));
      } else {
        const passwordHash = await bcrypt.hash(newPassword, 10);
        const createPassword = await adminSchema.findOneAndUpdate(
          { userEmail: userEmail },
          {
            $set: { password: passwordHash },
          }
        );
        res
          .status(200)
          .json(success(res.statusCode, "Success", { createPassword }));
      }
    } else {
      res.status(201).json(error("All Filed is required", res.statusCode));
    }
  } catch (err) {
    console.log(err);
    res.status(400).json(error("Failed", res.statusCode));
  }
};

//----> otp verify admin
exports.OtpVerify = async (req, res) => {
  try {
    const { userEmail, otp } = req.body;
    if (!userEmail || !otp) {
      return res
        .status(201)
        .json(error("Empty Otp Details is Not Allowed", res.statusCode));
    }
    const userOtpVerify = await adminSchema.findOne({ userEmail: userEmail });
    if (userOtpVerify.otp == otp) {
      return res
        .status(200)
        .json(success(res.statusCode, "Verify Otp Successfully", {}));
    } else {
      return res.status(200).json(error("Invalid Otp", res.statusCode));
    }
  } catch (err) {
    res.status(400).json(error("Failed", res.statusCode));
  }
};

//---> edit Profile
exports.adminEditProfile = async (req, res) => {
  try {
    const id = req.params.id;
    const userId = await adminSchema.findById({ _id: id });
    if (userId) {
      const data = {
        userName: req.body.userName,
        adminProfile: `${process.env.BASE_URL}/${req.file.filename}`,
      };
      if (!data) {
        return res.status(200).json(error("Provide all Filed", res.statusCode));
      }
      const updateData = await adminSchema.findByIdAndUpdate(id, data, {
        new: true,
      });
      res.status(200).json(success(res.statusCode, "Success", { updateData }));
    } else {
      res.status(200).json(error("Invalid UserId ", res.statusCode));
    }
  } catch (err) {
    res.status(400).json(error("Failed", res.statusCode));
  }
};

exports.addLanguage = async (req, res) => {
  try {
    const { language, deviceOs, device_Id } = req.body;
    if (!language) {
      res.status(200).json(error("please provide language", res.statusCode));
    }
    const newLanguage = new languageModels({
      language: language,
      deviceOs: deviceOs,
      device_Id: device_Id,
    });
    const saveData = await newLanguage.save();
    res.status(200).json(success(res.statusCode, "Success", { saveData }));
  } catch (err) {
    res.status(400).json(error("Failed", res.statusCode));
  }
};

exports.updateLanguage = async (req, res) => {
  try {
    const id = req.params.id;
    const data = {
      language: req.body.language,
      deviceOs: req.body.deviceOs,
      device_Id: req.body.device_Id,
    };
    const updateLanguage = await languageModels.findByIdAndUpdate(id, data, {
      new: true,
    });
    res
      .status(200)
      .json(success(res.statusCode, "Success", { updateLanguage }));
  } catch (err) {
    res.status(400).json(error("Failed", res.statusCode));
  }
};

exports.adminDetails = async (req, res) => {
  try {
    const id = req.params.id;
    const adminDetail = await adminSchema.findById(id);
    if (adminDetail) {
      res.status(200).json(success(res.statusCode, "Success", { adminDetail }));
    } else {
      res.status(201).json(error("No Data Found", res.statusCode));
    }
  } catch (err) {
    res.status(400).json(error("Failed", res.statusCode));
  }
};
