const Order = require("../models/orderModel.js");
const Auth = require("../models/authModel.js");

const createNewOrder = (req, res) => {
    console.log("createNewOrder");
    console.log(req.body);
};

module.exports = { createNewOrder };
