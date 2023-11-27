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
  adminDetails,
  updateadminMode,
  updatefalseMode,
} = require("../controllers/adminController/adminController");
const adminAuthorisationUser = require("../middleware/adminAuthentication");
const upload = require("../middleware/multer");

const {
  createContent,
  contentListing,
  editContent,
  createFaqs,
  editFaqs,
  deleteFaq,
  Orderlist,
  adminOrderDetails,
  OrderDelete,
  CompletedOrder,
} = require("../controllers/adminController/contentController");

const {
  createProduct,
  productList,
  updateProduct,
  productDelete,
  addImage,
} = require("../controllers/adminController/productControllers");

const {
  addTutorial,
  tutorialList,
  tutorialUpdate,
  deleteTutorilas,
} = require("../controllers/adminController/tutorialController");
const {
  UserList,
  DashBordsHome,
  CountUser,
  OrderDetails,
  transactionList,
  editOrder,
  blockUser,
} = require("../controllers/adminController/userManagement");
const {
  contactList,
  viewDetails,
  contactDelete,
  editContact,
} = require("../controllers/userController/contactController");
const {
  faqsList,
} = require("../controllers/userController/userAppControllers");
const {
  createCoupan,
  coupanList,
  editCoupan,
  deleteCoupan,
  userCoupan,
  userCoupanList,
  userUpdateCoupan,
  userDeleteCoupan,
} = require("../controllers/adminController/coupanController");
const {
  addAgent,
  agentlist,
  agentUpdate,
  deleteAgent,
  assignOrder,
  agentOrder,
} = require("../controllers/adminController/agentControllers");
const router = express.Router();

//-admin Routes
router.post("/admin-signup", adminRegister);
router.post("/admin-login", loginAdmin);
router.post("/send-mail", sendUserResetPassword);
router.post("/otp-verify", OtpVerify);
router.post("/admin-resetPassword", resetPassword);
router.post("/admin-details/:id", adminDetails);
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
router.post("/content-list", contentListing);
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

//Delivery Agent Routes
router.post("/create-agent", adminAuthorisationUser,upload.any(), addAgent);
router.post("/agent-list",adminAuthorisationUser, agentlist);
router.post("/agent-update/:id",adminAuthorisationUser, upload.any(), agentUpdate);
router.post("/agent-delete/:id",adminAuthorisationUser, deleteAgent);
router.post("/agent-assign-order/:id",adminAuthorisationUser,assignOrder)


//Coupan Management Routes
router.post("/create-coupan", adminAuthorisationUser, createCoupan);
router.post("/coupan-list", adminAuthorisationUser, coupanList);
router.post("/edit-coupan/:id", adminAuthorisationUser, editCoupan);
router.post("/delete-coupan/:id", adminAuthorisationUser, deleteCoupan);
router.post("/user-coupan",adminAuthorisationUser, userCoupan);
router.post("/user-coupan-list",adminAuthorisationUser,userCoupanList)
router.post("/user-coupan-update/:id",adminAuthorisationUser,userUpdateCoupan)
router.post("/user-delete-coupan/:id",adminAuthorisationUser,userDeleteCoupan)
router.post("/user-list", adminAuthorisationUser, UserList);

//DashBoards Routes
router.post("/dashboards-home", adminAuthorisationUser, DashBordsHome);
router.post("/user-count", adminAuthorisationUser, CountUser);
router.post("/order-details/:id", adminAuthorisationUser, OrderDetails);
router.post("/order-list", adminAuthorisationUser, Orderlist);
router.post(
  "/admin-order-details/:id",
  adminAuthorisationUser,
  adminOrderDetails
);
router.post("/delete-order/:id", adminAuthorisationUser, OrderDelete);
router.post("/completed-order", adminAuthorisationUser, CompletedOrder);
router.post("/status-change/:id", adminAuthorisationUser, editOrder);
router.post("/user-block-admin/:id", adminAuthorisationUser, blockUser);

router.post("/transaction-list", adminAuthorisationUser, transactionList);
router.post("/contact-list", adminAuthorisationUser, contactList);
router.post("/contact-details/:id", adminAuthorisationUser, viewDetails);
router.post("/contact-deleted/:id", adminAuthorisationUser, contactDelete);
router.post("/edit-contact/:id", adminAuthorisationUser, editContact);
router.post("/create-faqs", adminAuthorisationUser, createFaqs);
router.post("/update-faqs/:id", adminAuthorisationUser, editFaqs);
router.post("/delete-faqs/:id", adminAuthorisationUser, deleteFaq);
router.post("/faqslist", adminAuthorisationUser, faqsList);
router.post("/upload-image",upload.any(),addImage)

router.post("/online-mode/:id",updateadminMode)
router.post("/offline-mode/:id",updatefalseMode)
module.exports = router;
