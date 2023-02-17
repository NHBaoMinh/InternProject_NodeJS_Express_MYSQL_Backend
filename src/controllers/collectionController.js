const Collection = require("../models/collectionModel.js");

const handleGetAllCollections = async (req, res) => {
    console.log("Called handleGetAllCollections");

    const data = await Collection.getAllCollection();

    console.log(data);

    return res.status(200).json({
        data,
        errCode: 0,
        message: "Success!",
    });
};

const handleCreateCollection = async (req, res) => {
    console.log("Called handleCreateCollection");

    try {
        if (req.body.name == "" && !req.body.name) {
            return res
                .status(200)
                .json({ errCode: 1, message: "Missing Collection's name." });
        }
        if (req.body.description == "" && !req.body.description) {
            return res.status(200).json({
                errCode: 1,
                message: "Missing Collection's description.",
            });
        }

        await Collection.createCollection(
            req.body.name,
            req.body.description,
            "/images/collection/" + req.file.filename
        );

        return res.status(200).json({ errCode: 0, message: "Success" });
    } catch (error) {
        return res.status(200).json({
            errCode: 1,
            message: "Error At Create Collection Function: " + error,
        });
    }
};

const handleUpdateCollection = async (req, res) => {
    try {
        if (req.body.name == "" && !req.body.name) {
            return res
                .status(200)
                .json({ errCode: 1, message: "Missing Collection's name." });
        }
        if (req.body.description == "" && !req.body.description) {
            return res.status(200).json({
                errCode: 1,
                message: "Missing Collection's description.",
            });
        }

        let image;
        if (req.file === undefined) {
            image = req.body.image;
        } else {
            image = "/images/collection/" + req.file.filename;
        }

        await Collection.updateCollection(
            req.body.id,
            req.body.name,
            req.body.description,
            image
        );

        return res.status(200).json({ errCode: 0, message: "Success" });
    } catch (error) {
        return res.status(200).json({
            errCode: 1,
            message: "Error At Update Collection Function: " + error,
        });
    }
};

const handleGetCollectionWithID = async (req, res) => {
    try {
        let data = await Collection.getCollection(req.body.id);
        if (data.length === 0) {
            return res.status(200).json({
                errCode: 1,
                message: "The Collection Does Not Exist!",
            });
        }
        return res.status(200).json({ data, errCode: 0, message: "Success" });
    } catch (error) {
        return res.status(200).json({
            errCode: 1,
            message: "Error At Get Collection With ID Function: " + error,
        });
    }
};

module.exports = {
    handleGetAllCollections,
    handleCreateCollection,
    handleUpdateCollection,
    handleGetCollectionWithID,
};
