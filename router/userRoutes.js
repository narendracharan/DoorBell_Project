const express=require("express")
const { UserRegister, loginUser, sendUserResetPassword, OtpVerify, resetPassword } = require("../controllers/userController/userController")
const userAuthorisationUser = require("../middleware/userAuthentication")
const { addToCarts, revomeCarts, cartsList, applyCoupan } = require("../controllers/userController/cartsControllers")
const { createOrder } = require("../controllers/userController/orderControllers")
const router=express.Router()



router.post("/register-user",UserRegister)
router.post("/user-login",loginUser)
router.post("/send-Email",sendUserResetPassword)
router.post("/verify-otp",OtpVerify)
router.post("/reset-password",resetPassword)
router.post("/add-to-carts",userAuthorisationUser,addToCarts)
router.post("/remove-carts",userAuthorisationUser,revomeCarts)
router.post("/carts-list",userAuthorisationUser,cartsList)
router.post("/apply-coupan",userAuthorisationUser,applyCoupan)
router.post("/create-order",createOrder)
module.exports=router