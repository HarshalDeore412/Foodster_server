const mongoose = require("mongoose");

const foodSchema = new mongoose.Schema({
    category:{
        type:String,
        required:true,
    },
    name:{
        type:String,
        required:true,
    },
    image:{
        type:String,
        required:true,
    },
    price : {
        type: Number,
        required:true
    },
    description : {
        type : String,
        required : true,
    }
})

module.exports = mongoose.model("Food" , foodSchema);