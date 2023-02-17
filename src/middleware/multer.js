//Image Handle Middleware
const path = require("path");
const multer = require("multer");

const handleImage = (location, image) => {
  
    const storage = multer.diskStorage({
        destination: function (req, file, cb) {
            cb(null, path.join(__dirname, location));
        },
        filename: function (req, file, cb) {
            const filename =
                Math.round(Math.random() * 1e9) +
                "_" +
                Math.round(Math.random() * 1e9) +
                ".png";
            cb(null, filename);
        },
    });

    const upload = multer({ storage: storage });
    return upload.single(image);
};

module.exports = { handleImage };
