const express = require("express")
const router = express.Router();


const { createUser  ,loginUser , sendOtp} = require("../controllers/User");

router.post("/create-user" , createUser);
router.post("/login-user" , loginUser);
router.post("/send-otp" , sendOtp );

module.exports = router