const db = require("../config/connectDB.js");

const getAllCategory = () => {
    return new Promise((resolve, reject) => {
        let sql = "SELECT * FROM category;";
        try {
            db.connection.query(sql, function (err, result, fields) {
                if (err) {
                    reject(
                        "This is getAllCategory function error, happened when querying: " +
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
            reject("This is getAllCategory function error: " + err);
        }
    });
};

const getAllCategoryID = (collectionID) => {
    return new Promise((resolve, reject) => {
        let sql =
            "SELECT CategoryID FROM category WHERE CategoryCollection = '" +
            collectionID +
            "';";
        try {
            db.connection.query(sql, function (err, result, fields) {
                if (err) {
                    reject(
                        "This is ggetAllCategoryID function error, happened when querying: " +
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
            reject("This is getAllCategoryID function error: " + err);
        }
    });
};

const createCategory = (name, collectionId) => {
    console.log(name, collectionId);
    return new Promise((resolve, reject) => {
        let sql =
            "INSERT INTO category (`CategoryName`, `CategoryCollection`) VALUES ('" +
            name +
            "', '" +
            collectionId +
            "');";

        try {
            db.connection.query(sql, function (err, result, fields) {
                if (err) {
                    reject(
                        "This is createCategory function error, happened when querying: " +
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
            reject("This is createCategory function error: " + err);
        }
    });
};

const updateCategory = (id, name) => {
    return new Promise((resolve, reject) => {
        let sql =
            "UPDATE category SET CategoryName = '" +
            name +
            "' " +
            "WHERE CategoryID = '" +
            id +
            "';";
        try {
            db.connection.query(sql, function (err, result, fields) {
                if (err) {
                    reject(
                        "This is updateCategory function error, happened when querying: " +
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
            reject("This is updateCategory function error: " + err);
        }
    });
};

module.exports = {
    getAllCategory,
    createCategory,
    updateCategory,
    getAllCategoryID,
};
