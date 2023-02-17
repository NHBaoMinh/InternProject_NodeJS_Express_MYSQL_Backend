const express = require("express");
const userController = require("../controllers/userController.js");
const categoryController = require("../controllers/categoryController.js");
const collectionController = require("../controllers/collectionController.js");
const brandController = require("../controllers/brandController.js");
const productController = require("../controllers/productController.js");
const authController = require("../controllers/authController.js");
const orderController = require("../controllers/orderController.js");

const multer = require("../middleware/multer.js");

const router = express.Router();

const initWebRoutes = (app) => {
    //API Authenticate
    router.post("/api/login", userController.handleLogin);
    router.post("/api/signup", userController.handleSignUp);
    router.post("/api/auth_session", authController.handleCheckUserSession);

    //API collection
    router.get(
        "/api/get_all_collection",
        collectionController.handleGetAllCollections
    );

    router.post(
        "/api/get_collection_data_with_id",
        collectionController.handleGetCollectionWithID
    );

    router.post(
        "/api/create_collection",
        multer.handleImage("../../public/images/collection", "image"),
        collectionController.handleCreateCollection
    );

    router.put(
        "/api/update_collection",
        collectionController.handleUpdateCollection
    );

    router.put(
        "/api/update_collection_2",
        multer.handleImage("../../public/images/collection", "image"),
        collectionController.handleUpdateCollection
    );

    //API category
    router.get(
        "/api/get_all_category",
        categoryController.handleGetAllCategories
    );

    router.post(
        "/api/create_category",
        categoryController.handleCreateCategory
    );

    router.put("/api/update_category", categoryController.handleUpdateCategory);

    //API Brand
    router.get("/api/get_all_brand", brandController.handleGetAllBrand);

    router.post(
        "/api/create_brand",
        multer.handleImage("../../public/images/brand", "image"),
        brandController.handleCreateBrand
    );

    router.post("/api/get_brand", brandController.handleGetBrand);

    router.put("/api/update_brand", brandController.handleUpdateBrand);

    router.put(
        "/api/update_brand_2",
        multer.handleImage("../../public/images/brand", "image"),
        brandController.handleUpdateBrand
    );

    //API product
    router.get("/api/get_all_product", productController.handleGetAllProducts);

    router.post(
        "/api/get_products_by_collection",
        productController.handleGetCollectionProducts
    );

    router.post(
        "/api/create_product",
        multer.handleImage("../../public/images/product", "image"),
        productController.handleCreateProduct
    );

    router.post("/api/get_product_by_id", productController.handleGetProduct);

    //API Order:
    router.post("/api/order_process", orderController.createNewOrder);

    return app.use("/", router);
};

module.exports = initWebRoutes;
