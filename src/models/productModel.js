const db = require("../config/connectDB.js");

const getAllProducts = () => {
    return new Promise((resolve, reject) => {
        let sql = "SELECT * FROM product;";
        try {
            db.connection.query(sql, function (err, result, fields) {
                if (err) {
                    reject(
                        "This is getAllProducts function error, happened when querying: " +
                            err
                    );
                }
                if (result) {
                    resolve(result);
                } else {
                    resolve({});
                }
            });
        } catch (err) {
            console.log(err);
            reject("This is getAllProducts function error: " + err);
        }
    });
};

const createProduct = (name, description, brand, category, image, price) => {
    console.log(name, description, brand, category, image);
    return new Promise((resolve, reject) => {
        let sql =
            "INSERT INTO product (ProductName, ProductDescription, ProductImg, ProductBrand, ProductCategory, ProductPrice) VALUES ( '" +
            name +
            "' , '" +
            description +
            "' , '" +
            image +
            "' , '" +
            brand +
            "' , '" +
            category +
            "' , '" +
            price +
            "');";
        console.log(sql);
        try {
            db.connection.query(sql, function (err, result, fields) {
                if (err) {
                    reject(
                        "This is createProduct function error, happened when querying: " +
                            err
                    );
                } else {
                    resolve({});
                }
            });
        } catch (err) {
            console.log(err);
            reject("This is createProduct function error: " + err);
        }
    });
};

const getProductsByCollection = (arrayID, number) => {
    return new Promise((resolve, reject) => {
        let sql =
            "SELECT * FROM product WHERE ProductCategory IN (" +
            arrayID.toString() +
            ");";
        try {
            db.connection.query(sql, function (err, result, fields) {
                if (err) {
                    reject(
                        "This is getProductsByCollection function error, happened when querying: " +
                            err
                    );
                }
                if (result) {
                    resolve(result);
                } else {
                    resolve({});
                }
            });
        } catch (err) {
            console.log(err);
            reject("This is getProductsByCollection function error: " + err);
        }
    });
};

const getProductsByCollectionID = (id) => {
    return new Promise((resolve, reject) => {
        let sql =
            "SELECT ProductID, ProductName, ProductPrice, ProductBrand, ProductCategory, ProductImg,ProductDescription, ProductAvailable FROM product JOIN category ON category.CategoryID = product.ProductCategory JOIN collection ON category.CategoryCollection = collection.CollectionID Where collection.CollectionID =" +
            id +
            ";";
        try {
            db.connection.query(sql, function (err, result, fields) {
                if (err) {
                    reject(
                        "This is getProductsByCollectionID function error, happened when querying: " +
                            err
                    );
                }
                if (result) {
                    resolve(result);
                } else {
                    resolve({});
                }
            });
        } catch (err) {
            console.log(err);
            reject("This is getProductsByCollectionID function error: " + err);
        }
    });
};

const getProduct = (id) => {
    return new Promise((resolve, reject) => {
        let sql = "SELECT * FROM product WHERE ProductID = ('" + id + "');";
        try {
            db.connection.query(sql, function (err, result, fields) {
                if (err) {
                    reject(
                        "This is getProduct function error, happened when querying: " +
                            err
                    );
                }
                if (result) {
                    resolve(result);
                } else {
                    resolve({});
                }
            });
        } catch (err) {
            console.log(err);
            reject("This is getProduct function error: " + err);
        }
    });
};

module.exports = {
    getAllProducts,
    createProduct,
    getProductsByCollection,
    getProduct,
    getProductsByCollectionID,
};
