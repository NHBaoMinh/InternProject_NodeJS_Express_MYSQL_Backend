const Brand = require("../models/brandModel.js");

const handleGetAllBrand = async (req, res) => {
    console.log("Called handleGetAllBrand");

    try {
        const data = await Brand.getAllBrand();

        console.log(data);

        return res.status(200).json({
            data,
            errCode: 0,
            message: "Success!",
        });
    } catch (err) {
        return res.status(200).json({
            errCode: 1,
            message: "Error At Get All Brand Function: " + err,
        });
    }
};

const handleCreateBrand = async (req, res) => {
    console.log("Called handleCreateBrand");
    try {
        if (req.body.name == "" && !req.body.name) {
            return res
                .status(200)
                .json({ errCode: 1, message: "Missing Brand's name." });
        }
        if (req.body.description == "" && !req.body.description) {
            return res.status(200).json({
                errCode: 1,
                message: "Missing Brand's description.",
            });
        }

        await Brand.createBrand(
            req.body.name,
            req.body.description,
            "/images/brand/" + req.file.filename
        );

        return res.status(200).json({ errCode: 0, message: "Success" });
    } catch (error) {
        return res.status(200).json({
            errCode: 1,
            message: "Error At Create Brand Function: " + error,
        });
    }
};

const handleUpdateBrand = async (req, res) => {
    try {
        if (req.body.name == "" && !req.body.name) {
            return res
                .status(200)
                .json({ errCode: 1, message: "Missing Brand's name." });
        }
        if (req.body.description == "" && !req.body.description) {
            return res.status(200).json({
                errCode: 1,
                message: "Missing Brand's description.",
            });
        }

        let image;
        if (req.file === undefined) {
            image = req.body.image;
        } else {
            image = "/images/brand/" + req.file.filename;
        }

        await Brand.updateBrand(
            req.body.id,
            req.body.name,
            req.body.description,
            image
        );

        return res.status(200).json({ errCode: 0, message: "Success" });
    } catch (error) {
        return res.status(200).json({
            errCode: 1,
            message: "Error At Update Brand Function: " + error,
        });
    }
};

const handleGetBrand = async (req, res) => {
    try {
        if (req.body.id == "" && !req.body.id) {
            return res.status(200).json({
                errCode: 1,
                message: "Missing Brand's ID",
            });
        }
        let data = await Brand.getBrand(req.body.id);

        if (data.length == 0) {
            return res.status(200).json({
                errCode: 1,
                message: "Brand Not Found",
            });
        }

        return res.status(200).json({
            data,
            errCode: 0,
            message: "Success",
        });
    } catch (error) {
        return res.status(200).json({
            errCode: 1,
            message: "Error At Get Brand Function: " + error,
        });
    }
};

module.exports = {
    handleGetAllBrand,
    handleCreateBrand,
    handleUpdateBrand,
    handleGetBrand,
};
