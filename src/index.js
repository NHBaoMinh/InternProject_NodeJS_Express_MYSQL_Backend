const express = require("express");
const session = require("express-session");
const cookieParser = require("cookie-parser");
const bodyParser = require("body-parser");
const cors = require("cors");
const database = require("./config/connectDB.js");
const webRoutes = require("./routes/index.js");
const path = require("path");
let MySQLStore = require("express-mysql-session")(session);

require("dotenv").config();

database.connectDB();

const app = express();

app.use(express.static("public"));

//config app

app.use(
    bodyParser.urlencoded({
        extended: true,
    })
);
app.use(bodyParser.json());

app.use(cookieParser());

let whitelist = ["http://localhost:3000/"];

const corsConfig = {
    credentials: true,
    // origin: function (origin, callback) {
    //     if (whitelist.indexOf(origin) !== -1) {
    //         callback(null, true);
    //     } else {
    //         callback(new Error("Not allowed by CORS"));
    //     }
    // },
    origin: "http://localhost:3000",
};
app.use(cors(corsConfig));

//session config
var sessionStore = new MySQLStore(
    {
        clearExpired: true,
        checkExpirationInterval: 900000,
        expiration: 86400000,
        createDatabaseTable: true,
        schema: {
            tableName: "shop_session",
            columnNames: {
                session_id: "sesssion_id",
                expires: "expires",
                data: "data",
            },
        },
    },
    database.connection
);

app.use(
    session({
        key: "session_cookie_key",
        secret: "session_cookie_secret",
        store: sessionStore,
        resave: false,
        saveUninitialized: true,
    })
);

//init routes
webRoutes(app);

app.listen(process.env.PORT, () => {
    console.log(`Example app listening on port ${process.env.PORT}`);
});
