const db = require("../config/connectDB.js");

const createOrder = (data) => {
    return new Promise((resolve, reject) => {
        let sql =
            "INSERT INTO user_purchase (ProductName, ProductDescription, ProductImg, ProductBrand, ProductCategory, ProductPrice) VALUES ( '" +
            "');";
        console.log(sql);
        try {
            db.connection.query(sql, function (err, result, fields) {
                if (err) {
                    reject(
                        "This is createOrder function error, happened when querying: " +
                            err
                    );
                } else {
                    resolve({});
                }
            });
        } catch (err) {
            console.log(err);
            reject("This is createOrder function error: " + err);
        }
    });
};

module.export = { createOrder };
