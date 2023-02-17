const Product = require("../models/productModel.js");
const Category = require("../models/categoryModel.js");

const handleGetAllProducts = async (req, res) => {
    console.log("Called handleGetAllProducts");

    const data = await Product.getAllProducts();

    console.log(data);

    return res.status(200).json({
        data,
        errCode: 0,
        message: "Success!",
    });
};

const handleCreateProduct = async (req, res) => {
    try {
        if (req.body.name == "" && !req.body.name) {
            return res
                .status(200)
                .json({ errCode: 1, message: "Missing Product's name." });
        }
        if (req.body.description == "" && !req.body.description) {
            return res.status(200).json({
                errCode: 1,
                message: "Missing Product's description.",
            });
        }
        if (req.body.brand == "" && !req.body.brand) {
            return res.status(200).json({
                errCode: 1,
                message: "Missing Product's brand.",
            });
        }
        if (req.body.category == "" && !req.body.category) {
            return res.status(200).json({
                errCode: 1,
                message: "Missing Product's category.",
            });
        }
        if (req.body.price == "" && !req.body.price) {
            return res.status(200).json({
                errCode: 1,
                message: "Missing Product's price.",
            });
        }
        if (req.file.filename == "" && !req.file.filename) {
            return res.status(200).json({
                errCode: 1,
                message: "Missing Product's image.",
            });
        }

        await Product.createProduct(
            req.body.name,
            req.body.description,
            req.body.brand,
            req.body.category,
            "/images/product/" + req.file.filename,
            req.body.price
        );

        return res.status(200).json({ errCode: 0, message: "Success" });
    } catch (error) {
        return res.status(200).json({
            errCode: 1,
            message: "Error At Create Product Function: " + error,
        });
    }
};

const handleGetCollectionProducts = async (req, res) => {
    try {
        if (req.body.id == "" && !req.body.id) {
            return res.status(200).json({
                errCode: 1,
                message: "Collection's not found.",
            });
        }
        let categoryList = await Category.getAllCategoryID(req.body.id);
        let categoryArray = [];

        categoryList.forEach((category) => {
            categoryArray.push(category.CategoryID);
        });

        let data = await Product.getProductsByCollection(
            categoryArray,
            req.body.number
        );

        console.log(data);

        return res.status(200).json({
            data,
            errCode: 0,
            message: "Success",
        });
    } catch (error) {
        return res.status(200).json({
            errCode: 1,
            message: "Error At Get Collection's Products Function: " + error,
        });
    }
};

const handleGetProduct = async (req, res) => {
    try {
        if (req.body.id == "" && !req.body.id) {
            return res.status(200).json({
                data,
                errCode: 1,
                message: "Missing Information.",
            });
        }
        let data = await Product.getProduct(req.body.id);
        if (data.length == 0) {
            return res.status(200).json({
                data,
                errCode: 1,
                message: "Product Not Found",
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
            message: "Error At Get Product's Information Function: " + error,
        });
    }
};

module.exports = {
    handleGetAllProducts,
    handleCreateProduct,
    handleGetCollectionProducts,
    handleGetProduct,
};
