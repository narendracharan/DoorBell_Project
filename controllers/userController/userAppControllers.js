const contentModels = require("../../models/adminModels/contentModels");
const faqsModels = require("../../models/adminModels/faqsModels");
const productModels = require("../../models/adminModels/productModels");
const tutorialModels = require("../../models/adminModels/tutorialScreen");
const userRegister = require("../../models/userModels/userRegister");
const { error, success } = require("../../response");
const { transporter } = require("../../services/mailServices");

///------> Tutorilas Screen Api
exports.TutorialScreen = async (req, res) => {
  try {
    const listTutorials = await tutorialModels.find({});
    res.status(200).json(success(res.statusCode, "Success", { listTutorials }));
  } catch (err) {
    res.status(400).json(error("Failed", res.statusCode));
  }
};

///---> Login User APi
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
            .json(error("User Password is Incorrect", res.statusCode));
        }
      } else {
        res.status(201).json(error("UserEmail is Incorrect", res.statusCode));
      }
    } else {
      res
        .status(201)
        .json(error("UserEmail and Password is empty", res.statusCode));
    }
  } catch (err) {
    res.status(400).json(error("Failed", res.status));
  }
};

//--> Send Otp In Email
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
      res.status(201).json(error("userEmail is empty", res.statusCode));
    }
  } catch (err) {
    console.log(err);
    res.status(400).json(error("Failed", res.statusCode));
  }
};

// ---> Verify Otp
exports.userAppVerify = async (req, res) => {
  try {
    const { userEmail, otp } = req.body;
    if (!userEmail) {
      return res
        .status(201)
        .json(error("Please Provide User Email", res.statusCode));
    }
    if (!otp) {
      return res.status(201).json(error("Please Provide Otp", res.statusCode));
    }
    const userOtpVerify = await userRegister.findOne({ userEmail: userEmail });
    if (!userOtpVerify) {
      return res.status(200).json(error("Invalid userEmail", res.statusCode));
    }
    if (userOtpVerify.userAppOtp == otp) {
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

///  -----> Reset Password Api
exports.resetUserAppPassword = async (req, res) => {
  try {
    const { newPassword, confirmPassword, userEmail } = req.body;
    if (!newPassword) {
      return res
        .status(200)
        .json(error("Please Provide NewPassword", res.statusCode));
    }
    if (!confirmPassword) {
      return res
        .status(200)
        .json(error("Please Provide confirmPassword", res.statusCode));
    }
    if (!userEmail) {
      return res
        .status(200)
        .json(error("Please Provide userEmail", res.statusCode));
    }
    const match = await userRegister.findOne(
      { userEmail: userEmail },
      { password: 0, totalafterDiscount: 0, userAppOtp: 0, otp: 0 }
    );
    if (!match) {
      return res
        .status(200)
        .json(error("userEmail are incorrect", res.statusCode));
    }
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
  } catch (err) {
    res.status(400).json(error("Failed", res.statusCode));
  }
};

//-------> User Profile

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

///-------> Edit User Profile
exports.editUserProfile = async (req, res) => {
  try {
    const id = req.params.id;
    const { userName, userEmail, mobileNumber, userName_ar } = req.body;
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
    const profile = await userRegister.findById(id);
    if (userName) {
      profile.userName = userName;
    }
    if (userEmail) {
      profile.userEmail = userEmail;
    }
    if (userName_ar) {
      profile.userName_ar = userName_ar;
    }
    //if (req.file.length) {
    profile.profilePic = `${process.env.BASE_URL}/${req.file.filename}`;
    // }
    await profile.save();
    res.status(200).json(success(res.statusCode, "Success", { profile }));
  } catch (err) {
    res.status(400).json(error("Failed", res.statusCode));
  }
};

///---------> Edit Image Api
exports.editImage = async (req, res) => {
  try {
    const id = req.params.id;
    const profile = await userRegister.findById(id);
    profile.profilePic = `${process.env.BASE_URL}/${req.file.filename}`;
    res.status(200).json(success(res.statusCode, "success", { profile }));
  } catch (err) {
    res.status(400).json(error("Failed", res.statusCode));
  }
};

///--------> About User APi
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

//---> Home Kit User App APi
exports.homeKitUserApp = async (req, res) => {
  try {
    const productList = await productModels.find({});
    if (productList) {
      res.status(200).json(success(res.statusCode, "Success", { productList }));
    } else {
      res.status(400).json(error("No Data Found", res.statusCode));
    }
  } catch (err) {
    res.status(400).json(error("Failed", res.statusCode));
  }
};

//---------> Forget Password Api
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
      res.status(201).json(error("Password is incorrect", res.statusCode));
    }
  } catch (err) {
    res.status(400).json(error("Failed", res.statusCode));
  }
};

//--------> Faqs List Api
exports.faqsList = async (req, res) => {
  try {
    const faqsList = await faqsModels.find({}).sort({ createdAt: -1 });
    if (faqsList) {
      res.status(200).json(success(res.statusCode, "Success", { faqsList }));
    } else {
      res.status(201).json(error("No Data Found", res.statusCode));
    }
  } catch (err) {
    res.status(400).json(error("Failed", res.statusCode));
  }
};

exports.updateUserMode = async (req, res) => {
  try {
    const userDetails = await userRegister.findByIdAndUpdate(
      req.params.id,
      {
        userMode: true,
      },
      { new: true }
    );
    res.status(200).json(success(res.statusCode, "Success", { userDetails }));
  } catch (err) {
    res.status(400).json(error("Failed", res.statusCode));
  }
};

exports.updatefalseMode = async (req, res) => {
  try {
    const userDetails = await userRegister.findByIdAndUpdate(
      req.params.id,
      {
        userMode: false,
      },
      { new: true }
    );
    res.status(200).json(success(res.statusCode, "Success", { userDetails }));
  } catch (err) {
    res.status(400).json(error("Failed", res.statusCode));
  }
};

