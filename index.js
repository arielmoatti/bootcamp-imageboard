const express = require("express");
const app = express();
const db = require("./db");
const s3 = require("./s3");
const { s3Url } = require("./config.json");

/////// MULTER ////////
// handles files and stores them in the "uploads" folder
const multer = require("multer");
const uidSafe = require("uid-safe");
const path = require("path");

const diskStorage = multer.diskStorage({
    destination: function (req, file, callback) {
        callback(null, __dirname + "/uploads");
    },
    filename: function (req, file, callback) {
        uidSafe(24).then(function (uid) {
            callback(null, uid + path.extname(file.originalname));
        });
    },
});

const uploader = multer({
    storage: diskStorage,
    limits: {
        fileSize: 2097152,
    },
});
////////////////////////////////////////////

///MIDDLEWARE/////
app.use(express.static("public"));
app.use(express.json());
//////////////////

// ROUTES ///////
app.get("/images", (req, res) => {
    db.getImages()
        .then(({ rows }) => {
            res.json(rows);
        })
        .catch((err) => {
            console.log("error in GET /images getImages()", err);
        });
});

app.get("/getall/:imageId", (req, res) => {
    const { imageId } = req.params;
    db.getAllDetails(imageId)
        .then(({ rows }) => {
            // console.log("rows", rows);
            res.json(rows);
        })
        .catch((err) => {
            console.log("error in GET /getall/:imageId getAllDetails()", err);
        });
});

app.post("/upload", uploader.single("file"), s3.upload, (req, res) => {
    if (req.file) {
        const { username, title, description } = req.body;
        const url = `${s3Url}${req.file.filename}`;
        // console.log("url", url);
        db.addImage(url, username, title, description).then(({ rows }) => {
            // console.log("index.js - rows", rows);
            res.json({
                success: true,
                rows,
            });
        });
    } else {
        res.json({
            success: false,
        });
    }
});
//
app.listen(8080, () => console.log("image board up and running"));
