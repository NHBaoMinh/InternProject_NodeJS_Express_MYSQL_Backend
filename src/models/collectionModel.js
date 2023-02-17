const db = require("../config/connectDB.js");

const getAllCollection = () => {
    return new Promise((resolve, reject) => {
        let sql = "SELECT * FROM collection;";
        try {
            db.connection.query(sql, function (err, result, fields) {
                if (err) {
                    reject(
                        "This is getAllCollection function error, happened when querying: " +
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
            reject("This is getAllCollection function error: " + err);
        }
    });
};

const createCollection = (name, description, image) => {
    console.log("Called createCollection");
    console.log(name, description, image);

    return new Promise((resolve, reject) => {
        let sql =
            "INSERT INTO collection (CollectionName, CollectionDescription, CollectionImg) VALUES ( '" +
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
                        "This is createCollection function error, happened when querying: " +
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
            reject("This is createCollection function error: " + err);
        }
    });
};

const updateCollection = (id, name, description, image) => {
    console.log("Called createCollection");
    console.log(id, name, description, image);

    return new Promise((resolve, reject) => {
        let sql =
            "UPDATE collection SET CollectionName = '" +
            name +
            "' , CollectionDescription = '" +
            description +
            "' , CollectionImg = '" +
            image +
            "' WHERE CollectionID ='" +
            id +
            "';";

        try {
            db.connection.query(sql, function (err, result, fields) {
                if (err) {
                    reject(
                        "This is updateCollection function error, happened when querying: " +
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
            reject("This is updateCollection function error: " + err);
        }
    });
};

const getCollection = (id) => {
    return new Promise((resolve, reject) => {
        let sql = "SELECT * FROM collection WHERE CollectionID ='" + id + "';";
        try {
            db.connection.query(sql, function (err, result, fields) {
                if (err) {
                    reject(
                        "This is getCollection function error, happened when querying: " +
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
            reject("This is getCollection function error: " + err);
        }
    });
};

module.exports = {
    getAllCollection,
    createCollection,
    updateCollection,
    getCollection,
};
