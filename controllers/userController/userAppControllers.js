const contentModels = require("../../models/adminModels/contentModels");
const faqsModels = require("../../models/adminModels/faqsModels");
const productModels = require("../../models/adminModels/productModels");
const tutorialModels = require("../../models/adminModels/tutorialScreen");
const userRegister = require("../../models/userModels/userRegister");
const { error, success } = require("../../response");
const { transporter } = require("../../services/mailServices");

exports.TutorialScreen = async (req, res) => {
  try {
    const listTutorials = await tutorialModels.find({});
    res.status(200).json(success(res.statusCode, "Success", { listTutorials }));
  } catch (err) {
    res.status(400).json(error("Failed", res.statusCode));
  }
};

exports.loginUserApp = async (req, res) => {
  try {
    const { userEmail, passwordApp } = req.body;
    if (userEmail && passwordApp) {
      const verifyUser = await userRegister.findOne(
        {
          userEmail: userEmail,
        },
        { password: 0, totalafterDiscount: 0, otp: 0 }
      );
      if (verifyUser != null) {
        const isMatch = await userRegister.findOne({
          passwordApp: passwordApp,
        });
        if (isMatch) {
          const token = await verifyUser.userAuthToken();
          return res
            .header("x-auth-token-user", token)
            .header("access-control-expose-headers", "x-auth-token-user")
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
            .json(error("User Password Are Incorrect", res.statusCode));
        }
      } else {
        res.status(201).json(error("UserEmail Are Incorrect", res.statusCode));
      }
    } else {
      res
        .status(201)
        .json(error("UserEmail and Password Are empty", res.statusCode));
    }
  } catch (err) {
    res.status(400).json(error("Failed", res.status));
  }
};

exports.sendMailOtp = async (req, res) => {
  try {
    const { userEmail } = req.body;
    const user = await userRegister.findOne({ userEmail: userEmail });
    if (user) {
      const otp = `${Math.floor(1000 + Math.random() * 9000)}`;
      let info = await transporter.sendMail({
        from: "s04450647@gmail.com",
        to: userEmail,
        subject: "Email Send For Reset Password",
        text: `This ${otp} Otp Verify To Email`,
      });
      const message = await userRegister.updateMany(
        { userEmail: userEmail },
        { userAppOtp: otp }
      );
      return res
        .status(200)
        .json(success(res.statusCode, "Mail send SuccessFully", {}));
    } else {
      res.status(201).json(error("userEmail are empty", res.statusCode));
    }
  } catch (err) {
    console.log(err);
    res.status(400).json(error("Failed", res.statusCode));
  }
};

exports.userAppVerify = async (req, res) => {
  try {
    const { userEmail, otp } = req.body;
    if (!userEmail || !otp) {
      return res
        .status(201)
        .json(error("Empty Otp Details Are Not Allowed", res.statusCode));
    }
    const userOtpVerify = await userRegister.findOne({ userEmail: userEmail });
    if (userOtpVerify) {
      if (userOtpVerify.userAppOtp == otp) {
        return res
          .status(200)
          .json(success(res.statusCode, "Verify Otp Successfully", {}));
      } else {
        return res.status(200).json(error("Invalid Otp", res.statusCode));
      }
    } else {
      return res.status(200).json(error("Invalid userEmail", res.statusCode));
    }
  } catch (err) {
    res.status(400).json(error("Failed", res.statusCode));
  }
};

exports.resetUserAppPassword = async (req, res) => {
  try {
    const { newPassword, confirmPassword, userEmail } = req.body;
    const match = await userRegister.findOne(
      { userEmail: userEmail },
      { password: 0, totalafterDiscount: 0, userAppOtp: 0, otp: 0 }
    );
    if (!match) {
      res.status(200).json(error("userEmail are incorrect", res.statusCode));
    } else {
      if (newPassword && confirmPassword && userEmail) {
        if (newPassword !== confirmPassword) {
          return res
            .status(401)
            .json(error("newPassword Or confirmPassword Could Not Be Same"));
        } else {
          // const passwordHash = await bcrypt.hash(newPassword, 10);
          const createPassword = await userRegister.findOneAndUpdate(
            { userEmail: userEmail },
            {
              $set: { passwordApp: confirmPassword },
            }
          );
          res.status(200).json(success(res.statusCode, "Success", { match }));
        }
      } else {
        res.status(201).json(error("All Filed are required", res.statusCode));
      }
    }
  } catch (err) {
    res.status(400).json(error("Failed", res.statusCode));
  }
};

exports.userProfile = async (req, res) => {
  try {
    const id = req.params.id;
    const userDetails = await userRegister.findById(id, {
      userAppOtp: 0,
      totalafterDiscount: 0,
      otp: 0,
      password: 0,
      passwordApp: 0,
    });
    if (userDetails) {
      res.status(200).json(success(res.statusCode, "Success", { userDetails }));
    } else {
      res.status(201).json(error("Invalid userId", res.statusCode));
    }
  } catch (err) {
    res.status(400).json(error("Failed", res.statusCode));
  }
};

exports.editUserProfile = async (req, res) => {
  try {
    const id = req.params.id;
    const { userName, userEmail, mobileNumber } = req.body;
    if (!userName) {
      res.status(201).json(error("please provide userName", res.statusCode));
    }
    if (!userEmail) {
      res.status(201).json(error("please provide userEmail", res.statusCode));
    }
    if (!mobileNumber) {
      res
        .status(201)
        .json(error("please provide mobileNumber", res.statusCode));
    }
    const updateData = {
      userName: userName,
      userEmail: userEmail,
      mobileNumber: mobileNumber,
      profilePic: `${process.env.BASE_URL}/${req.file.filename}`,
    };
    const updateUser = await userRegister.findByIdAndUpdate(
      { _id: id },
      updateData,
      { new: true }
    );
    res.status(200).json(success(res.statusCode, "Success", { updateUser }));
  } catch (err) {
    res.status(400).json(error("Failed", res.statusCode));
  }
};

exports.aboutUserApp = async (req, res) => {
  try {
    const aboutUsList = await contentModels.find({});
    if (aboutUsList) {
      res.status(200).json(success(res.statusCode, "Success", { aboutUsList }));
    } else {
      res.status(200).json(error("No Data Found", res.statusCode));
    }
  } catch (err) {
    res.status(400).json(error("Failed", res.statusCode));
  }
};

exports.homeKitUserApp = async (req, res) => {
  try {
    const productList = await productModels.find({});
    if (productList) {
      res.status(200).json(success(res.statusCode, "Success", { productList }));
    } else {
      res.status(400).json(error("Np Data Found", res.statusCode));
    }
  } catch (err) {
    res.status(400).json(error("Failed", res.statusCode));
  }
};

exports.userforgetPassword = async (req, res) => {
  try {
    const { userEmail, password, newPassword, confirmPassword } = req.body;
    if (!userEmail) {
      res.status(201).json(error("please provide userEmail", res.statusCode));
    }
    if (!password) {
      res.status(201).json(error("please provide password", res.statusCode));
    }
    if (!newPassword) {
      res.status(201).json(error("please provide newPassword", res.statusCode));
    }
    if (!confirmPassword) {
      res
        .status(201)
        .json(error("please provide confirmpassword", res.statusCode));
    }
    if (!(newPassword === confirmPassword)) {
      res
        .status(201)
        .json(error("newPassword and confirmPassword not be same"));
    }
    const match = await userRegister.findOne({ userEmail: userEmail });
    if (match.passwordApp == password) {
      const createPassword = await userRegister.findOneAndUpdate(
        { userEmail: userEmail },
        {
          $set: { passwordApp: confirmPassword },
        }
      );
      res
        .status(200)
        .json(success(res.statusCode, "Success", { createPassword }));
    } else {
      res.status(201).json(error("Password are incorrect", res.statusCode));
    }
  } catch (err) {
    res.status(400).json(error("Failed", res.statusCode));
  }
};

exports.faqsList = async (req, res) => {
  try {
    const faqsList = await faqsModels.find({});
    if (faqsList) {
      res.status(200).json(success(res.statusCode, "Success", { faqsList }));
    } else {
      res.status(201).json(error("No Data Found", res.statusCode));
    }
  } catch (err) {
    res.status(400).json(error("Failed", res.statusCode));
  }
};
