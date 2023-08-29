const express = require("express");
const {
  adminRegister,
  loginAdmin,
  sendUserResetPassword,
  OtpVerify,
  resetPassword,
  adminEditProfile,
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
} = require("../controllers/adminController/productControllers");
const {
  addTutorial,
} = require("../controllers/adminController/tutorialController");
const router = express.Router();

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
router.post("/add-content", adminAuthorisationUser, createContent);
router.post("/content-list", adminAuthorisationUser, contentListing);
router.post("/edit-content/:id", adminAuthorisationUser, editContent);

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

router.post(
  "/add-tutorials",
  adminAuthorisationUser,
  upload.any(),
  addTutorial
);
module.exports = router;
