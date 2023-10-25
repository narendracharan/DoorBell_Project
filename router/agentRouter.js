const express=require("express")
const { agentOrderList, orderDetails, updateOrderStatus } = require("../controllers/adminController/agentControllers")
const router=express.Router()


router.post("/agent-order/:id",agentOrderList)
router.post("/order-details/:id",orderDetails)
router.post("/order-status/:id",updateOrderStatus)


 module.exports=router