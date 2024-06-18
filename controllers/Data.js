const { FaUserLargeSlash } = require("react-icons/fa6");
const Data = require("../models/Data");

exports.getAllData = async (req, res) => {
  try {
    console.log("requested");

    const response = await Data.find({});

    return res.status(200).json({
      success: true,
      message: "Data get successfully",
      data: response,
    });
  } catch (err) {
    console.error("Error while getting data:", err.message);
    
    // Determine the status code based on the error
    const statusCode = err.name === 'ValidationError' ? 400 : 500;

    return res.status(statusCode).json({
      success: false,
      message: `ERROR WHILE GETTING DATA: ${err.message}`,
    });
  }
};


exports.addData = async (req, res) => {
  console.log("Request come to server");
  try {
    const { name, description, price, category, image } = req.body;

    if (!name || !description || !price || !category || !image) {
      return res.status(400).json({ message: "Please fill all the details" });
    }

    // Additional validation can be added here

    const newData = await Data.create({ category, name, image, price, description });

    console.log("Data uploaded successfully");

    return res.status(200).json({
      success: true,
      message: "Data uploaded successfully",
      data: newData,
    });
  } catch (err) {
    console.error("Error while uploading the data:", err);

    // Determine the status code based on the error type
    let statusCode = 500;
    let errorMessage = "Error while uploading the data";

    if (err.name === 'ValidationError') {
      statusCode = 400;
      errorMessage = err.message;
    } else if (err.code === 11000) {
      statusCode = 409; // Conflict
      errorMessage = "Duplicate entry detected";
    }

    return res.status(statusCode).json({
      success: false,
      message: errorMessage,
      error: err.message,
    });
  }
};


exports.deleteP = async (req, res) => {
  try {
    const id = req.params.id;
    const product = await Data.findByIdAndDelete({ _id: id });

    if (!product) {
      return res.status(404).json({
        success: false,
        message: "Product not found",
      });
    }

    return res.status(200).json({
      success: true,
      message: "Product data deleted successfully",
    });
  } catch (err) {
    console.error("Error while deleting the product:", err);

    // Determine the status code based on the error type
    let statusCode = 500;
    let errorMessage = "Error while deleting the product";

    if (err.name === 'CastError') {
      statusCode = 400;
      errorMessage = "Invalid product ID";
    }

    return res.status(statusCode).json({
      success: false,
      message: errorMessage,
    });
  }
};

