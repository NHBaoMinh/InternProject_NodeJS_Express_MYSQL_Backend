const db = require("../config/connectDB.js");

const getAllBrand = () => {
    return new Promise((resolve, reject) => {
        let sql = "SELECT * FROM brand;";
        try {
            db.connection.query(sql, function (err, result, fields) {
                if (err) {
                    reject(
                        "This is getAllBrand function error, happened when querying: " +
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
            reject("This is getAllBrand function error: " + err);
        }
    });
};

const createBrand = (name, description, image) => {
    console.log("Called createBrand");

    return new Promise((resolve, reject) => {
        let sql =
            "INSERT INTO brand (BrandName, BrandDescription, BrandImg) VALUES ( '" +
            name +
            "' , '" +
            description +
            "' , '" +
            image +
            "' );";

        try {
            db.connection.query(sql, function (err, result, fields) {
                if (err) {
                    reject(
                        "This is createBrand function error, happened when querying: " +
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
            reject("This is createBrand function error: " + err);
        }
    });
};

const updateBrand = (id, name, description, image) => {
    console.log("Called createBrand");
    console.log(id, name, description, image);

    return new Promise((resolve, reject) => {
        let sql =
            "UPDATE brand SET BrandName = '" +
            name +
            "' , BrandDescription = '" +
            description +
            "' , BrandImg = '" +
            image +
            "' WHERE BrandID ='" +
            id +
            "';";

        try {
            db.connection.query(sql, function (err, result, fields) {
                if (err) {
                    reject(
                        "This is updateBrand function error, happened when querying: " +
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
            reject("This is updateBrand function error: " + err);
        }
    });
};

const getBrand = (id) => {
    return new Promise((resolve, reject) => {
        let sql = "SELECT * FROM brand WHERE BrandID ='" + id + "';";
        try {
            db.connection.query(sql, function (err, result, fields) {
                if (err) {
                    reject(
                        "This is getBrand function error, happened when querying: " +
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
            reject("This is getBrand function error: " + err);
        }
    });
};

module.exports = { getAllBrand, createBrand, updateBrand, getBrand };
