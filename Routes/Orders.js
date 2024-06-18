const express = require("express");
const router = express.Router();
const Order = require("../models/Orders")
const { isAdmin , auth } =  require("../middlewares/Auth")


const { orderData , myOrders } = require("../controllers/Orders")


router.post("/order-data" ,   orderData);
router.post("/my-orders" ,  myOrders)


module.exports = router;