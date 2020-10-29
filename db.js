let spicedPg = require("spiced-pg");
let db = spicedPg("postgres:postgres:postgres@localhost:5432/imageboard");

exports.getImages = () => {
    return db.query(`
    SELECT * FROM images
    ORDER BY id DESC
    `);
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
