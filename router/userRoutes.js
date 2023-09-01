const express=require("express")
const { UserRegister, loginUser, sendUserResetPassword, OtpVerify, resetPassword } = require("../controllers/userController/userController")
const router=express.Router()



router.post("/register-user",UserRegister)
router.post("/user-login",loginUser)
router.post("/send-Email",sendUserResetPassword)
router.post("/verify-otp",OtpVerify)
router.post("/reset-password",resetPassword)
module.exports=router