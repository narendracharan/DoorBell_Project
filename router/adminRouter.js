const express = require("express");


const {
  adminRegister,
  loginAdmin,
  sendUserResetPassword,
  OtpVerify,
  resetPassword,
  adminEditProfile,
  addLanguage,
  updateLanguage,
} = require("../controllers/adminController/adminController");
const adminAuthorisationUser = require("../middleware/adminAuthentication");
const upload = require("../middleware/multer");


const {
  createContent,
  contentListing,
  editContent,
} = require("../controllers/adminController/contentController");


const {
  createProduct,
  productList,
  updateProduct,
  productDelete,
  createCoupan,
  coupanList,
  editCoupan,
  deleteCoupan,
} = require("../controllers/adminController/productControllers");


const {
  addTutorial,
  tutorialList,
  tutorialUpdate,
  deleteTutorilas,
} = require("../controllers/adminController/tutorialController");
const router = express.Router();

//-admin Routes 
router.post("/admin-signup", adminRegister);
router.post("/admin-login", loginAdmin);
router.post("/send-mail", sendUserResetPassword);
router.post("/otp-verify", OtpVerify);
router.post("/admin-resetPassword", resetPassword);
router.post(
  "/edit-profile/:id",
  adminAuthorisationUser,
  upload.single("adminProfile"),
  adminEditProfile
);

//----> Language Routes
router.post("/add-language", addLanguage);
router.post("/update-language/:id", updateLanguage);

//---> Content Routes
router.post("/add-content", adminAuthorisationUser, createContent);
router.get("/content-list", contentListing);
router.post("/edit-content/:id", adminAuthorisationUser, editContent);


//------> Product Routes
router.post(
  "/create-product",
  adminAuthorisationUser,
  upload.any(),
  createProduct
);
router.post("/product-list", adminAuthorisationUser, productList);
router.post(
  "/update-product/:id",
  adminAuthorisationUser,
  upload.any(),
  updateProduct
);
router.post("/delete-product/:id", adminAuthorisationUser, productDelete);

//----> Tutorials Routes
router.post(
  "/add-tutorials",
  adminAuthorisationUser,
  upload.any(),
  addTutorial
);
router.post("/tutorial-list", adminAuthorisationUser, tutorialList);
router.post("/update-tutorials/:id", adminAuthorisationUser, tutorialUpdate);
router.post("/delete-tutorials/:id", adminAuthorisationUser, deleteTutorilas);


router.post("/create-coupan",adminAuthorisationUser,createCoupan)
router.post("/coupan-list",adminAuthorisationUser,coupanList)
router.post("/edit-coupan/:id",adminAuthorisationUser,editCoupan)
router.post("/delete-coupan/:id",adminAuthorisationUser,deleteCoupan)
module.exports = router;
