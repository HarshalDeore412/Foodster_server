const express = require("express")
const router = express.Router();
const { isAdmin , auth } =  require("../middlewares/Auth")


const { getAllData , addData } = require("../controllers/Data");

router.get("/get-all-data" , getAllData );
router.post("/food-upload" , addData);


module.exports = router;