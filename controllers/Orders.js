const Orders = require("../models/Orders");


exports.orderData = async (req, res) => {
    try {
      console.log("ORDER REQUEST ARRIVED...");
  
      const data = req.body.order_data;
      data.splice(0, 0, { Order_date: req.body.order_date });
      let eId = await Orders.findOne({ 'email': req.body.email });
      console.log("Email: ", req.body.email);
  
      if (eId === null) {
        await Orders.create({
          email: req.body.email,
          order_data: [data]
        });
        res.status(200).json({ success: true, message: "ORDER CREATED SUCCESSFULLY" });
      } else {
        await Orders.findOneAndUpdate(
          { email: req.body.email },
          { $push: { order_data: data } },
          { new: true }
        );
        res.status(200).json({ success: true, message: "ORDER UPDATED SUCCESSFULLY" });
      }
    } catch (err) {
      console.error("Error while processing the order:", err);
  
      // Determine the status code based on the error type
      let statusCode = 500;
      let errorMessage = "INTERNAL SERVER ERROR";
  
      if (err.name === 'ValidationError') {
        statusCode = 400;
        errorMessage = "Validation Error: " + err.message;
      }
  
      res.status(statusCode).json({
        success: false,
        message: errorMessage,
        error: err.message
      });
    }
};
   

exports.myOrders = async (req,res) => {
    try{

        const myData = await Orders.findOne({'email':req.body.email})

        if(!myData){
            return res.status(404).json({
                success:false,
                message:"NO DATA FOUND"
            })
        }


        return res.status(200).json({
            success:true,
            message:"My Orders Get Successfully...",
            data : myData
        })

    }catch(err){

        return res.status(500).json({
            success:false,
            message:"CANT NOT FETCH MY ORDERS"
        })

    }
}