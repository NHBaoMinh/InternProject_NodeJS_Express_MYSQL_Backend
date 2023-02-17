const Auth = require("../models/authModel.js");
const User = require("../models/userModel.js");

const handleCheckUserRole = async (userID) => {
    let data = await User.getUserByID(userID);
    if (data.length === 0) {
        return "Not Found";
    }
    if (data[0].Role === 0) {
        return "Admin";
    }
    if (data[0].Role === 1) {
        return "Customer";
    }
};

const handleCheckUserSession = async (req, res) => {
    console.log(req.body.sessionID);
    let data = await Auth.getSessionData(req.body.sessionID);
    if (data.length === 0) {
        return res.status(200).json({
            errCode: 1,
            errMessage: "Session Expired.",
        });
    } else {
        let role = await handleCheckUserRole(JSON.parse(data[0].data).UserID);
        if (role === "Not Found.") {
            return res.status(200).json({
                errCode: 1,
                errMessage: "User doesn't exist.",
            });
        }
        if (role === "User") {
            return res.status(200).json({
                errCode: 1,
                errMessage: "Not Authorized.",
            });
        }
        if (role === "Admin") {
            return res.status(200).json({
                errCode: 0,
                errMessage: "Success.",
            });
        }
    }
};

module.exports = {
    handleCheckUserRole,
    handleCheckUserSession,
};
