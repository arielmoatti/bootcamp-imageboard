let spicedPg = require("spiced-pg");
let db = spicedPg("postgres:postgres:postgres@localhost:5432/imageboard");

exports.getImages = () => {
    return db.query(`SELECT * FROM images`);
};
