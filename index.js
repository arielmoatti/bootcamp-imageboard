const express = require("express");
const app = express();
const db = require("./db");
const s3 = require("./s3");

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
//////////////////

///// ROUTES ///////
app.get("/images", (req, res) => {
    db.getImages()
        .then(({ rows }) => {
            res.json(rows);
        })
        .catch((err) => {
            console.log("error in GET /images getImages()", err);
        });
});

app.post("/upload", uploader.single("file"), s3.upload, (req, res) => {
    // console.log("input values: ", req.body);
    // console.log("file: ", req.file);

    if (req.file) {
        //at this point you will want to add
        res.json({
            success: true,
        });
    } else {
        res.json({
            success: false,
        });
    }
});
//
app.listen(8080, () => console.log("image board up and running"));
