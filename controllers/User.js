const User = require("../models/User");
const bcryptjs = require("bcryptjs");
const jwt = require("jsonwebtoken");
const dotenv = require("dotenv").config();
const OTP = require("../models/OTP");
const mailSender = require("../utils/mailSender");



exports.sendOtp = async (req, res) => {
  try {
    const e = req.body.email;
    const email = e.toLowerCase()

    const user = await User.findOne({ email });

    if (user) {
      return res.status(301).json({
        success: false,
        message: "USER ALREDY REGISTERED PLEASE LOGIN -->",
      });
    }

    const otp = Math.random() * 10000;
    const newOtp = Math.round(otp);
    console.log(newOtp);

    await OTP.create({
      otp: newOtp,
    });

    mailSender(email , ` OTP FOR FOODSTER REGISTRATION ` , `YOUR OTP IS ${newOtp} `)

    return res.status(200).json({
      success: true,
      message: "OTP SEND SUCCESSFULLY",
      OTP: newOtp,
    });
  } catch (err) {
    return res.status(500).json({
      success: false,
      message: "INTERNAL SERVER ERROR !!",
    });
  }
};

exports.createUser = async (req, res) => {
  try {
    const { name, location, password, otp } = req.body;
    const e = req.body.email;
    console.log(req.body)
    
    const email = e.toLowerCase();

    
    
    isOtpAvailble = await OTP.findOne({otp:otp});
    console.log(isOtpAvailble)

    if (!isOtpAvailble) {
      return res.status(404).json({
        success: false,
        message: "OTP DOES NOT MATCHED",
      });
    }

    console.log("i got the OTP")

    const hash = await bcryptjs.hash(password, 10);
    console.log("password is hashed")
    const response = await User.create({
      name,
      location,
      email,
      password: hash,
    })
      .then(console.log("good to go"))
      .catch((err) => {
        console.log("error : ", err);
      });

    console.log("RESPONSE : ", response);
    return res.status(200).json({
      success: true,
      message: "user created successfully",
      data: response,
    });
  } catch (err) {
    return res.status(500).json({
      success: false,
      message: "Can not create user ",
      error:err.message
    });
  }
};

exports.loginUser = async (req, res) => {
  try {
    const {password } = req.body;
    const e = req.body.email;

    const email = e.toLowerCase();

    const isUser = await User.findOne({ email });

    console.log("USER : ", isUser);

    if (!isUser) {
      return res.status(404).json({
        success: false,
        message: "user not exist please sign up",
      });
    }

    if (await bcryptjs.compare(password, isUser.password)) {
      console.log("PASSWORD MATCHED");
      const data = {
        user: {
          id: isUser._id,
        },
      };
      const authToken = jwt.sign(data, process.env.JWT_SECRET);

      console.log("TOKEN CREATED");

      return res.status(200).json({
        success: true,
        message: "USER LOG IN SUCCESSFULL",
        data: isUser,
        token: authToken,
      });
    } else {
      return res.status(401).json({
        success: false,
        message: "WRONG PASSWORD !",
      });
    }
  } catch (err) {
    return res.status(500).json({
      success: false,
      message: "ERROR WHILE LOG IN...",
    });
  }
};
