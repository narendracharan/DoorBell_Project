const express = require("express");
const {
  UserRegister,
  loginUser,
  sendUserResetPassword,
  OtpVerify,
  resetPassword,
  editProfile,
  changepassword,
  userDetails,
} = require("../controllers/userController/userController");
const userAuthorisationUser = require("../middleware/userAuthentication");
const {
  addToCarts,
  revomeCarts,
  cartsList,
  productList,
  updateQuantity,
  coupanApply,
  coupanList,
  UsercoupanApply,
} = require("../controllers/userController/cartsControllers");
const {
  createOrder,
  userOrder,
  orderDetails,
  orderDelete,
} = require("../controllers/userController/orderControllers");
const {
  tutorialList,
} = require("../controllers/adminController/tutorialController");
const {
  loginUserApp,
  sendMailOtp,
  userAppVerify,
  resetUserAppPassword,
  userProfile,
  editUserProfile,
  aboutUserApp,
  userforgetPassword,
  faqsList,
  editImage,
  chetingAdmin,
  updateUserMode,
  updatefalseMode,
} = require("../controllers/userController/userAppControllers");
const upload = require("../middleware/multer");
const {
  createContact,
  createAddress,
  addressList,
  addressEdit,
  deleteAddress,
} = require("../controllers/userController/contactController");
const router = express.Router();


///---> User Signup Routes
router.post("/register-user", UserRegister);
router.post("/user-login", loginUser);
router.post("/send-Email", sendUserResetPassword);
router.post("/verify-otp", OtpVerify);
router.post("/reset-password", resetPassword);
router.post(
  "/update-profile/:id",
  upload.single("websiteProfile"),
  userAuthorisationUser,
  editProfile
);
router.post("/user-Details/:id",userAuthorisationUser,userDetails)


//----> Add To Carts Routes
router.post("/add-to-carts", userAuthorisationUser, addToCarts);
router.post("/remove-carts", userAuthorisationUser, revomeCarts);
router.post("/carts-list/:id", userAuthorisationUser, cartsList);


//----> Apply Coupan Routes
router.post("/apply-coupan", userAuthorisationUser, coupanApply);
router.post("/apply-universal-coupan",userAuthorisationUser,UsercoupanApply)
router.post("/universal-coupan-list",userAuthorisationUser,coupanList)
router.post("/update-quantity/:id", userAuthorisationUser,updateQuantity);


///------> Create Order Routes
router.post("/create-order",userAuthorisationUser, createOrder);
router.post("/user-order/:id", userAuthorisationUser, userOrder);
router.post("/order-details/:id", userAuthorisationUser, orderDetails);
router.post("/delete-order/:id",userAuthorisationUser,orderDelete)
router.post("/change-password/:id", userAuthorisationUser, changepassword);


///----> Add Address Routes
router.post("/add-address", userAuthorisationUser, createAddress);
router.post("/address-list/:id", userAuthorisationUser, addressList);
router.post("/edit-address/:id", userAuthorisationUser, addressEdit);
router.post("/delete-address/:id", userAuthorisationUser, deleteAddress);
router.post("/product-list", productList);


/// User App Routes
router.post("/tutorials-screen", tutorialList);
router.post("/user-app-login", loginUserApp);
router.post("/send-mail-otp", sendMailOtp);
router.post("/verify-user-otp", userAppVerify);
router.post("/resetPassword-user", resetUserAppPassword);
router.post("/app-user-profile/:id", userAuthorisationUser, userProfile);
router.post("/app-user-update/:id", userAuthorisationUser, upload.single("profilePic"), editUserProfile);
router.post(
  "/edit-profile/:id",
  userAuthorisationUser,
  upload.single("profilePic"),
  editImage
);
router.post("/user-app-about", userAuthorisationUser, aboutUserApp);
router.post("/user-app-productList", userAuthorisationUser, productList);
router.post("/online-mode/:id",updateUserMode)
router.post("/offline-mode/:id",updatefalseMode)

router.post("/create-contact", userAuthorisationUser, createContact);
router.post("/user-forgetpassword", userAuthorisationUser, userforgetPassword);
router.post("/faqs-list", userAuthorisationUser, faqsList);
module.exports = router;
