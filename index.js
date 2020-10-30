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
    let lowestId;
    db.getLowestId()
        .then(({ rows }) => {
            lowestId = rows[0].id;
            // console.log("lowestId", lowestId);
        })
        .catch((err) => {
            console.log("error in GET /images getLowestId()", err);
        });

    db.getImages()
        .then(({ rows }) => {
            res.json({ rows, lowestId });
        })
        .catch((err) => {
            console.log("error in GET /images getImages()", err);
        });
});

app.get("/getall/:imageid", (req, res) => {
    const { imageid } = req.params;
    db.getAllDetails(imageid)
        .then(({ rows }) => {
            // console.log("rows", rows);
            res.json(rows);
        })
        .catch((err) => {
            console.log("error in GET /getall/:imageid getAllDetails()", err);
        });
});

app.post("/upload", uploader.single("file"), s3.upload, (req, res) => {
    if (req.file) {
        const { username, title, description } = req.body;
        if (title !== "" && username !== "") {
            const url = `${s3Url}${req.file.filename}`;
            db.addImage(url, username, title, description).then(({ rows }) => {
                res.json({
                    success: true,
                    rows,
                });
            });
        } else {
            res.json({
                success: false,
            });
            console.log("empty fields in image form!");
        }
    } else {
        res.json({
            success: false,
        });
        console.log("no image selected in image form!");
    }
});

// app.post("/addcomment", commentObj, (req, res) => {
app.post("/addcomment", (req, res) => {
    const { comment, username, imageid } = req.body;
    // console.log("comment, username, imageid", comment, username, imageid);
    if (comment !== "" && username !== "") {
        db.addComment(comment, username, imageid).then(({ rows }) => {
            // console.log("index.js - rows", rows);
            res.json({
                success: true,
                rows,
            });
            console.log("comment added!");
        });
    } else {
        res.json({
            success: false,
        });
        console.log("empty fields in comment form!");
    }
});

app.get("/moreimages/:lastid", (req, res) => {
    const { lastid } = req.params;
    // console.log("lastid: ", lastid);

    db.getMoreImages(lastid)
        .then(({ rows }) => {
            res.json(rows);
        })
        .catch((err) => {
            console.log("error in GET /moreimages getMoreImages()", err);
        });
});
//
app.listen(8080, () => console.log("image board up and running"));
