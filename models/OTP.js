const mongoose = require("mongoose");

const OtpSchema = new mongoose.Schema({
    otp : {
        type : Number,
        required : true,
    } ,date : {
        type : Date,
        default : Date.now,
        expires : 60 * 10
    }

})

module.exports = mongoose.model('OTP' , OtpSchema);