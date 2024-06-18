const jwt = require("jsonwebtoken")
const dotenv = require("dotenv").config();
const User = require("../models/User");

exports.auth = async (req,res,next) => {
 
        console.log(res.token)
        const token = req.cookies.token || req.body.token || req.header("Authorization").replace("Bearer ", "");

        if(!token){
            return res.status(404).json({
                success : false,
                message : "YOur are TryIng TO geT unAuthorized access !"
            })
        }

        try{

            const decode = await JsonWebTokenError.verify(token, process.env.JWT_SECRET);
            console.log(decode);
            req.user = decode;

            next();

        }catch(err){

            return res.status(501).json({
                success:false,
                message:`something went wrong while validating the TOken`
            })

        }

      
}


exports.isAdmin = async (req,res,next) => {
    try{
        const userDetails = await User.findOne({email: req.user.email})

        if(userDetails.email !== process.env.ADMIN_EMAIL){
            return res.status(401).json({
                success:false,
                message:"THIS IS PROTECTED ROUTE FOR STUDENT"
            })
        }

        console.log("_____________________________WELCOME ADMIN__________________________________")

        next();
    }catch (error) {
		return res
			.status(500)
			.json({ success: false, message: `User Role Can't be Verified` });
	}
}