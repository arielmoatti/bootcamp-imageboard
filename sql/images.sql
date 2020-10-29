DROP TABLE IF EXISTS images CASCADE;
CREATE TABLE images(
    id          SERIAL PRIMARY KEY,
    url         VARCHAR NOT NULL,
    username    VARCHAR NOT NULL,
    title       VARCHAR NOT NULL,
    description TEXT,
    created_at  TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

DROP TABLE IF EXISTS comments CASCADE;
CREATE TABLE comments (
    id          SERIAL PRIMARY KEY,
    comment     TEXT NOT NULL,
    username    VARCHAR NOT NULL,
    image_id    INT NOT NULL REFERENCES images(id),
    created_at  TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

INSERT INTO images (url, username, title, description) VALUES (
    'https://s3.amazonaws.com/pimento-imageboard/EPoikF41MLmPEmDD0ouOMbtWBRaFXWCh.jpg',
    'arielmo',
    'Holding Hands',
    'Very powerful photo, tells many things'
);

INSERT INTO images (url, username, title, description) VALUES (
    ' https://s3.amazonaws.com/pimento-imageboard/pKE-buPrVigxICKdwm_Z1we7kHeR_xtu.jpg',
    'arielmo',
    'Marmot',
    'It looks like it''s about to pray'
);

INSERT INTO images (url, username, title, description) VALUES (
    'https://s3.amazonaws.com/pimento-imageboard/4BK4kZM2FPciLmz-GVI3x2JiQAz-5H61.jpg',
    'arielmo',
    'Village House',
    'Lot''s of grass all around'
);

INSERT INTO images (url, username, title, description) VALUES (
    'https://s3.amazonaws.com/pimento-imageboard/BRh3dgfLzx3rrsrCWX2b7TD2qkw85tRo.jpg',
    'ananda',
    'Black Bird',
    'bye bye.........'
);

INSERT INTO images (url, username, title, description) VALUES (
    'https://s3.amazonaws.com/pimento-imageboard/ScIKepllVR2Tg88Riv9sULh5ak-3Qne4.jpg',
    'ananda',
    'Night Sky',
    'There are so many galaxies out there'
);

INSERT INTO images (url, username, title, description) VALUES (
    'https://s3.amazonaws.com/pimento-imageboard/CVbgwwbwffJlRnV9GF9idsRlZz9sNYWg.jpg',
    'arielmo',
    'Iceberg',
    'Make sure it''s not your last sail'
);



INSERT INTO comments (username, comment, image_id) VALUES (
    'ariel', 'this is my first comment!', 6
);

INSERT INTO comments (username, comment, image_id) VALUES (
    'roni', 'and I am second to comment here...', 6
);

INSERT INTO comments (username, comment, image_id) VALUES (
    'ananda', 'I am third!', 6
);

INSERT INTO comments (username, comment, image_id) VALUES (
    'Angus McGyver', 'what a great place (fourth)', 6
);

INSERT INTO comments (username, comment, image_id) VALUES (
    'John', 'I''m also first here!', 5
);