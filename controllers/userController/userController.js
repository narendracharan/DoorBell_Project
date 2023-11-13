const userModels = require("../../models/userModels/userRegister");
const validator = require("validator");
const { error, success } = require("../../response");
const { transporter } = require("../../services/mailServices");
const userRegister = require("../../models/userModels/userRegister");
const bcrypt = require("bcrypt");



exports.UserRegister = async (req, res) => {
  try {
    const { userName, userEmail, password ,longitude,latitude} = req.body;
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
    const checkMail = await userModels.findOne({ userEmail: userEmail });
    const checkNAME = await userModels.findOne({ userName: userName });
    if (checkNAME) {
      return res.status(201).json(error("userName is already register",res.statusCode));
    }

    if (checkMail) {
      return res.status(201).json(error("userEmail is already register",res.statusCode));
    }
    const passwordHash = await bcrypt.hash(password, 10);
    const newUser = new userModels({
      websiteName: userName,
      userEmail: userEmail,
      password: passwordHash,
      latitude:latitude,
      longitude:longitude
    });
    const user = await newUser.save();
    res.status(200).json(success(res.statusCode, "Success", { user }));
  } catch (err) {
    console.log(err);
    res.status(400).json(error("Failed", res.statusCode));
  }
};

//------> User Login Api
exports.loginUser = async (req, res) => {
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

    const verifyUser = await userModels.findOne({
      userEmail: userEmail,
    });
    if (!verifyUser) {
      return res
        .status(201)
        .json(error("User Email Not Register", res.statusCode));
    }
    if (verifyUser.status == "true") {
      const isMatch = await bcrypt.compare(password, verifyUser.password);
      if (!isMatch) {
        return res
          .status(201)
          .json(error("User Password is Incorrect", res.statusCode));
      }
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
      res.status(201).json(error("You Are Block By Admin", res.statusCode));
    }
  } catch (err) {
    console.log(err);
    res.status(400).json(error("Failed", res.statusCode));
  }
};

exports.sendUserResetPassword = async (req, res) => {
  try {
    const { userEmail } = req.body;
    const user = await userModels.findOne({ userEmail: userEmail });
    if (user) {
      const otp = `${Math.floor(1000 + Math.random() * 9000)}`;
      let info = await transporter.sendMail({
        from: "s04450647@gmail.com",
        to: userEmail,
        subject: "Email Send For Reset Password",
        text: `This ${otp} Otp Verify To Email`,
      });
      const message = await userModels.findOneAndUpdate(
        { userEmail: userEmail },
        { otp: otp }
      );

      return res
        .status(200)
        .json(success(res.statusCode, "Success", { message }));
    } else {
      res.status(201).json(error("userEmail is empty", res.statusCode));
    }
  } catch (err) {
    console.log(err);
    res.status(400).json(error("Failed", res.statusCode));
  }
};

exports.OtpVerify = async (req, res) => {
  try {
    const { userEmail, otp } = req.body;
    if (!userEmail || !otp) {
      return res
        .status(201)
        .json(error("Empty Otp Details is Not Allowed", res.statusCode));
    }
    const userOtpVerify = await userModels.findOne({ userEmail: userEmail });
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

exports.resetPassword = async (req, res) => {
  try {
    const { newPassword, confirmPassword, userEmail } = req.body;
    const match = await userModels.findOne({ userEmail: userEmail });
    if (!match) {
      res.status(200).json(error("userEmail are incorrect", res.statusCode));
    } else {
      if (newPassword && confirmPassword && userEmail) {
        if (newPassword !== confirmPassword) {
          return res
            .status(401)
            .json(error("newPassword Or confirmPassword Could Not Be Same"));
        } else {
          const passwordHash = await bcrypt.hash(newPassword, 10);
          const createPassword = await userModels.findOneAndUpdate(
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
    }
  } catch (err) {
    console.log(err);
    res.status(400).json(error("Failed", res.statusCode));
  }
};

exports.editProfile = async (req, res) => {
  try {
    const id = req.params.id;
    const { websiteName, mobileNumber, userEmail } = req.body;
    if (!websiteName) {
      res.status(201).json(error("please provide name", res.statusCode));
    }
    // if (!websiteProfile) {
    //   res.status(201).json(error("please provide profile", res.statusCode));
    // }
    const data = {
      websiteName: websiteName,
      mobileNumber: mobileNumber,
      userEmail: userEmail,
      websiteProfile: `${process.env.BASE_URL}/${req.file.filename}`,
    };
    const user = await userModels.findById(id, {
      userName: 0,
      profilePic: 0,
      userAppOtp: 0,
      password: 0,
      passwordApp: 0,
    });
    const updateProfile = await userModels.findByIdAndUpdate(id, data, {
      new: true,
    });
    res.status(200).json(success(res.statusCode, "Success", { updateProfile }));
  } catch (err) {
    res.status(400).json(error("Failed", res.statusCode));
  }
};

exports.changepassword = async (req, res) => {
  try {
    const id = req.params.id;
    const { password, newPassword, confirmPassword } = req.body;
    if (!password) {
      res.status(201).json(error("please provide password", res.statusCode));
    }
    if (!newPassword) {
      res.status(201).json(error("please provide newPassword", res.statusCode));
    }
    if (!confirmPassword) {
      res
        .status(201)
        .json(error("please provide confirmPassword", res.statusCode));
    }
    if (newPassword == confirmPassword) {
      const match = await userModels.findById(id);
      console.log(match);
      if (!(await match.checkPassword(password, match.password))) {
        return res
          .status(201)
          .json(error("Password not matched", res.statusCode));
      }
      const passwordHash = await bcrypt.hash(newPassword, 10);
      match.password = passwordHash;
      await match.save();
      res.status(200).json(success(res.statusCode, "Success", { match }));
    } else {
      res
        .status(201)
        .json(error("newPassword and confirmPassword connot be same"));
    }
  } catch (err) {
    console.log(err);
    res.status(400).json(error("Failed", res.statusCode));
  }
};

exports.userDetails = async (req, res) => {
  try {
    const userDetails = await userModels.findById(req.params.id);
    res.status(200).json(success(res.statusCode, "Success", { userDetails }));
  } catch (err) {
    res.status(400).json(error("Error in User Profile", res.statusCode));
  }
};
