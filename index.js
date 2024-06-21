const express = require("express")
const app = express();
const PORT = process.env.PORT || 4000;
const DBConnect = require("./config/DB")
const dotenv = require("dotenv").config();
const userRoutes = require("./Routes/User")
const DataRoutes = require("./Routes/Data")
const OrderRoutes = require("./Routes/Orders")
const cors = require("cors");


DBConnect();

app.use(express.json());

app.use(
	cors({
		origin:"https://foodster-frontend.vercel.app/",
		methods:["POST","GET"],
		credentials:true,
	})
)

app.use('/api/user' , userRoutes);
app.use('/api/data' , DataRoutes);
app.use('/api/order' , OrderRoutes);

app.get("/" , (req,res) => {
    res.send("hellow world")
})



app.listen(PORT , () => {
    console.log(`app is live on ${PORT}`);
})
