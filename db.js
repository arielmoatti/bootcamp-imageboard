let spicedPg = require("spiced-pg");
let db = spicedPg("postgres:postgres:postgres@localhost:5432/imageboard");

exports.getImages = () => {
    return db.query(`
    SELECT * FROM images
    ORDER BY id DESC
    `);
};

exports.getImageById = (imageId) => {
    return db.query(
        `
    SELECT * FROM images
    WHERE id=$1
    `,
        [imageId]
    );
};

exports.addImage = (url, username, title, description) => {
    return db.query(
        `
        INSERT INTO images (url, username, title, description)
        VALUES ($1, $2, $3, $4)
        RETURNING *
        `,
        [url, username, title, description]
    );
};

exports.getComments = (imageId) => {
    return db.query(
        `
        SELECT *
        FROM comments
        WHERE image_id = $1
        ORDER BY id DESC
        `,
        [imageId]
    );
};
