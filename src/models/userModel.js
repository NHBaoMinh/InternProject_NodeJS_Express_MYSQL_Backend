const db = require("../config/connectDB.js");

const getUser = (email) => {
    return new Promise((resolve, reject) => {
        let sql = "SELECT * FROM user WHERE email = '" + email + "';";
        try {
            db.connection.query(sql, function (err, result, fields) {
                if (err) {
                    reject(
                        "This is getUser function error, happened when querying: " +
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
            reject("This is getUser function error: " + err);
        }
    });
};

const getUserByID = (id) => {
    return new Promise((resolve, reject) => {
        let sql = "SELECT * FROM user WHERE UserID = '" + id + "';";
        try {
            db.connection.query(sql, function (err, result, fields) {
                if (err) {
                    reject(
                        "This is getUserByID function error, happened when querying: " +
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
            reject("This is getUserByID function error: " + err);
        }
    });
};

const createUser = (email, password, surname, lastname, birthDate) => {
    return new Promise((resolve, reject) => {
        let sql =
            "INSERT INTO user (email, UserSurname, UserLastname, password, DateOfBirth) VALUES ('" +
            email +
            "' , '" +
            surname +
            "' , '" +
            lastname +
            "' , '" +
            password +
            "' , '" +
            birthDate +
            "');";
        try {
            db.connection.query(sql, function (err, result, fields) {
                if (err) {
                    reject(
                        "This is createUser function error, happened when querying: " +
                            err
                    );
                }

                resolve({});
            });
        } catch (err) {
            console.log(err);
            reject("This is createUser function error: " + err);
        }
    });
};

module.exports = { getUser, getUserByID, createUser };
