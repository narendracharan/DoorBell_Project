const express=require("express")
const { agentOrderList, orderDetails, updateOrderStatus, agentLogin, sendEmail, agentOtpVerify, agentPasswordReset, agentEditProfile, agentOrderHistory, agentDetails, orderUploadImage } = require("../controllers/adminController/agentControllers")
const upload = require("../middleware/multer")
const agentAuthorisationUser = require("../middleware/agentAuthentication")
const router=express.Router()


router.post("/agent-order/:id",agentAuthorisationUser,agentOrderList)
router.post("/order-details/:id",agentAuthorisationUser,orderDetails)
router.post("/agent-order-history/:id",agentAuthorisationUser,agentOrderHistory)
router.post("/order-status/:id",agentAuthorisationUser,updateOrderStatus)
router.post("/agent-login",agentLogin)
router.post("/send-Email",sendEmail)
router.post("/otp-verify",agentOtpVerify)
router.post("/reset-password",agentPasswordReset,)
router.post("/edit-profile/:id",agentAuthorisationUser,upload.single("profile_Pic"),agentEditProfile)
router.post("/agent-details/:id",agentAuthorisationUser,agentDetails)
router.post("/upload-order-img/:id",agentAuthorisationUser,upload.single("delivered_Img"),orderUploadImage)
 module.exports=router