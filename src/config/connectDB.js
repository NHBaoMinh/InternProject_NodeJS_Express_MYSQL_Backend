const mysql = require("mysql");

const connection = mysql.createConnection({
    host: "localhost",
    user: "root",
    database: "musical_instruments",
});

const connectDB = async () => {
    try {
        await connection.connect();
        console.log("Connection established successfully!");
    } catch (err) {
        console.error("Unable to connect to the database:", err);
    }
};

// exports.connectDB = connectDB ;
module.exports = { connectDB, connection };
