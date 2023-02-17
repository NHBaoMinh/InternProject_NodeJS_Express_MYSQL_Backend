const Category = require("../models/categoryModel.js");

const handleGetAllCategories = async (req, res) => {
    console.log("Called handleGetAllCategories");

    const data = await Category.getAllCategory();

    console.log(data);

    return res.status(200).json({
        data,
        errCode: 0,
        message: "Success!",
    });
};

const handleCreateCategory = async (req, res) => {
    console.log("Called handleCreateCategory");

    try {
        if (req.body.name == "" && !req.body.name) {
            return res
                .status(200)
                .json({ errCode: 1, message: "Missing Category's name." });
        }

        await Category.createCategory(req.body.name, req.body.collectionID);
        return res.status(200).json({ errCode: 0, message: "Success" });
    } catch (error) {
        return res.status(200).json({
            errCode: 1,
            message: "Error At Create Category Function: " + error,
        });
    }
};

const handleUpdateCategory = async (req, res) => {
    console.log("Called handleUpdateCategory");
    console.log(req.body.id, req.body.name);

    try {
        if (req.body.name == "" && !req.body.name) {
            return res
                .status(200)
                .json({ errCode: 1, message: "Missing Category's name." });
        }

        await Category.updateCategory(req.body.id, req.body.name);
        return res.status(200).json({ errCode: 0, message: "Success" });
    } catch (error) {
        return res.status(200).json({
            errCode: 1,
            message: "Error At Update Category Function: " + error,
        });
    }
};

module.exports = {
    handleGetAllCategories,
    handleCreateCategory,
    handleUpdateCategory,
};
