const db = require("../config/connectDB.js");

const getSessionData = (sessionID) => {
    console.log("Called")
    return new Promise((resolve, reject) => {
        let sql =
            "SELECT * FROM shop_session where sesssion_id = '" +
            sessionID +
            "';";
        try {
            db.connection.query(sql, function (err, result, fields) {
                if (err) {
                    reject(
                        "This is getSessionData function error, happened when querying: " +
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
            reject("This is getSessionData function error: " + err);
        }
    });
};

module.exports = { getSessionData };
