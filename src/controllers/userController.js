const User = require("../models/userModel.js");
let validator = require("validator");
const bcrypt = require("bcrypt");
const saltRounds = 10;

const handleLogin = async (req, res) => {
    let email = req.body.email;
    let password = req.body.password;

    if (!email || !password) {
        return res.status(200).json({
            errCode: 1,
            message: "Missing Information",
        });
    }

    if (!validator.isEmail(email)) {
        return res.status(200).json({
            errCode: 1,
            message: "Not Email",
        });
    }

    const data = await User.getUser(email);

    console.log(data);

    if (data === {}) {
        return res.status(200).json({
            errCode: 1,
            message:
                "User doesn't exist! Please try another account or sign up.",
        });
    }

    let checkedPassword = await bcrypt.compare(
        req.body.password,
        data[0].password
    );

    if (!checkedPassword) {
        return res.status(200).json({
            errCode: 1,
            message: "Wrong Information!",
        });
    }

    if (checkedPassword) {
        req.session.UserID = data[0].UserID;
        console.log(req.session.id);
        let test = new Object();
        test.SessionID = req.session.id;
        test.UserSurname = data[0].UserSurname;
        test.UserLastname = data[0].UserLastname;
        return res.status(200).json({
            data: test,
            errCode: 0,
            message: "Success!",
        });
    }
};

const handleSignUp = async (req, res) => {
    if (
        !req.body.email ||
        !req.body.password ||
        !req.body.confirmPass ||
        !req.body.surname ||
        !req.body.lastname ||
        !req.body.birthDate
    ) {
        return res.status(200).json({
            errCode: 1,
            message: "Missing Information!",
        });
    }

    if (req.body.password !== req.body.confirmPass) {
        return res.status(200).json({
            errCode: 1,
            message: "Password and Confirmed Password are not matched!",
        });
    }

    let checkUsedEmail = await User.getUser(req.body.email);

    if (checkUsedEmail.length !== 0) {
        return res.status(200).json({
            errCode: 1,
            message:
                "Email is used. Please use another email or Login with this email!",
        });
    }

    if (checkUsedEmail.length === 0) {
        let hash = await bcrypt.hash(req.body.password, saltRounds);

        await User.createUser(
            req.body.email,
            hash,
            req.body.surname,
            req.body.lastname,
            req.body.birthDate
        );

        return res.status(200).json({
            errCode: 0,
            message: "Success.",
        });
    }
};

module.exports = {
    handleLogin,
    handleSignUp,
};
