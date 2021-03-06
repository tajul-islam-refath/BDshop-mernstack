const router = require("express").Router();

const {
  registerUser,
  loginUser,
  logoutUser,
  getUser,
  updateUser,
  updateUserPassword,
  createBillingAddress,
  createShippingAddress,
  getAddresses,
  getValidCoupon,
  sendUserOTP,
  verifyUserOTP,
  sendTokenInEmail,
  emailVerify,
} = require("../controllers/userRouteController");

const { isAuthintecated } = require("../midlewares/authMidleware");
//login , signup, logout
router.post("/register", registerUser);
router.post("/login", loginUser);
router.get("/logout", logoutUser);

//  isAuthintecated user routes
router.get("/me", isAuthintecated, getUser);
router.put("/update/profile", isAuthintecated, updateUser);
router.put("/update/password", isAuthintecated, updateUserPassword);
router.post("/address/billing-address", isAuthintecated, createBillingAddress);
router.post(
  "/address/shipping-address",
  isAuthintecated,
  createShippingAddress
);

router.post("/sendOTP", sendUserOTP);
router.post("/verifyOTP", verifyUserOTP);
router.post("/sendTokenInEmail", isAuthintecated, sendTokenInEmail);
router.post("/emailVerify", isAuthintecated, emailVerify);

router.get("/addresses", isAuthintecated, getAddresses);
router.get("/coupon/:couponCode", isAuthintecated, getValidCoupon);
module.exports = router;
