let spicedPg = require("spiced-pg");
let db = spicedPg("postgres:postgres:postgres@localhost:5432/imageboard");

//// SELECT /////
exports.getImages = () => {
    return db.query(`
    SELECT * FROM images
    ORDER BY id DESC
    `);
};

exports.getAllDetails = (imageId) => {
    return db.query(
        `
        SELECT 
        images.id, images.username, images.title, images.description, images.url, images.created_at,
        comments.comment, comments.image_id,
        comments.created_at AS cmnt_time, comments.id AS cmnt_id, comments.username AS cmnt_writer
        FROM images
        LEFT JOIN comments
        ON images.id = comments.image_id
        WHERE images.id = $1
        ORDER BY comments.id DESC
        `,
        [imageId]
    );
};

//// INSERT /////

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

exports.addComment = (comment, username, imageId) => {
    return db.query(
        `
        INSERT INTO comments (comment, username, image_id)
        VALUES ($1, $2, $3)
        RETURNING
        id AS cmnt_id, comment, created_at AS cmnt_time, username AS cmnt_writer
        `,
        [comment, username, imageId]
    );
};
