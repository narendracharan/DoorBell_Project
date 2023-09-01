const userModels=require("../../models/userModels/userRegister");
const validator=require("validator")
const { error, success } = require("../../response");
const { transporter } = require("../../services/mailServices");


exports.UserRegister=async(req,res)=>{
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
        const checkMail = await userModels.findOne({ userEmail: userEmail });
        if (checkMail) {
          return res.status(201).json(error("userEmail are already register"));
        }
       // const passwordHash = await bcrypt.hash(password, 10);
        const newUser = new userModels({
          userName: userName,
          userEmail: userEmail,
          password: password,
        });
        const admin = await newUser.save();
        res.status(200).json(success(res.statusCode, "Success", { admin }));
      } catch (err) {
        console.log(err);
        res.status(400).json(error("Failed", res.statusCode));
      }
}


//------> User Login Api
exports.loginUser= async (req, res) => {
    try {
      const { userEmail, password } = req.body;
      if (userEmail && password) {
        const verifyUser = await userModels.findOne({
          userEmail: userEmail,
        });
        if (verifyUser != null) {
          const isMatch = await userModels.findOne({password:password})
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
              .status(403)
              .json(error("User Password Are Incorrect", res.statusCode));
          }
        } else {
          res.status(403).json(error("UserEmail Are Incorrect", res.statusCode));
        }
      } else {
        res
          .status(403)
          .json(error("UserEmail and Password Are empty", res.statusCode));
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
     const message=   await userModels.findOneAndUpdate(
          { userEmail: userEmail },
          { otp: otp }
        );

        return res.status(200).json(success(res.statusCode, "Success", {message}));
      } else {
        res.status(400).json(error("userEmail are empty", res.statusCode));
      }
    } catch (err) {
      console.log(err);
      res.status(500).json(error("Failed", res.statusCode));
    }
  };

  exports.OtpVerify = async (req, res) => {
    try {
      const { userEmail, otp } = req.body;
      if (!userEmail || !otp) {
        return res
          .status(201)
          .json(error("Empty Otp Details Are Not Allowed", res.statusCode));
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
      if(!match){
        res.status(200).json(error("userEmail are incorrect",res.statusCode))
      }else{
      if (newPassword && confirmPassword && userEmail) {
        if (newPassword !== confirmPassword) {
          return res
            .status(401)
            .json(error("newPassword Or confirmPassword Could Not Be Same"));
        } else {
         // const passwordHash = await bcrypt.hash(newPassword, 10);
          const createPassword = await userModels.findOneAndUpdate(
            { userEmail: userEmail },
            {
              $set: { password: confirmPassword },
            }
          );
          res
            .status(200)
            .json(success(res.statusCode, "Success", { createPassword }));
        }
      } else {
        res.status(201).json(error("All Filed are required", res.statusCode));
      }
    }
    } catch (err) {
      console.log(err);
      res.status(400).json(error("Failed", res.statusCode));
    }
  };