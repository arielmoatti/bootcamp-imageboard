DROP TABLE IF EXISTS comments CASCADE;
CREATE TABLE comments (
    id          SERIAL PRIMARY KEY,
    comment     TEXT NOT NULL,
    username    VARCHAR NOT NULL,
    image_id    INT NOT NULL REFERENCES images(id),
    created_at  TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

INSERT INTO comments (username, comment, image_id) VALUES (
    'Johnny', 'This is spinning my head!', 20
);

INSERT INTO comments (username, comment, image_id) VALUES (
    'Teresa', 'wow... I remember that, Johnny!', 20
);

INSERT INTO comments (username, comment, image_id) VALUES (
    'Jean B.', 'No way... stairway!', 20
);

INSERT INTO comments (username, comment, image_id) VALUES (
    'slammm', 'That''s what I thought... It could be the very place we''ve been to together, dear!', 20
);

INSERT INTO comments (username, comment, image_id) VALUES (
    'clubber', 'yes!', 20
);

INSERT INTO comments (username, comment, image_id) VALUES (
    'arielmo', 'Red red red.... Just like I remember it!', 20
);

INSERT INTO comments (username, comment, image_id) VALUES (
    'Johhny', ' ok, that''s what I''m talking about.... look at all these colors!', 20
);

INSERT INTO comments (username, comment, image_id) VALUES (
    'arielmo', 'forever!', 20
);

