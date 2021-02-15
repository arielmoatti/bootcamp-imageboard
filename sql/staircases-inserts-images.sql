DROP TABLE IF EXISTS images CASCADE;
CREATE TABLE images(
    id          SERIAL PRIMARY KEY,
    url         VARCHAR NOT NULL,
    username    VARCHAR NOT NULL,
    title       VARCHAR NOT NULL,
    description TEXT,
    created_at  TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);


INSERT INTO images (url, username, title, description) VALUES (
    'https://s3.amazonaws.com/pimento-imageboard/Wm6UppnefKaSj0DTdVbdT_fUEO6pCfa2.jpg',
    'Cecilia Gremmo',
    'Pink Staircase',
    'Shot in Budapest, Hungary'
);

INSERT INTO images (url, username, title, description) VALUES (
    'https://s3.amazonaws.com/pimento-imageboard/5dUam6NschvyAbwNFvu9ALvAAnaqoDi8.jpg',
    'Tangi Bertin',
    'Black Spiral Metal',
    'Collège Franco-Britannique, Boulevard Jourdan, Paris'
);

INSERT INTO images (url, username, title, description) VALUES (
    'https://s3.amazonaws.com/pimento-imageboard/YGzvrdlfCzSFtbqcg8Oxnw7m_2aDYEhC.jpg',
    'Won Young Park',
    'Mysterious Spiral',
    'L''Arc de Triomphe de l''Etoile, Paris'
);

INSERT INTO images (url, username, title, description) VALUES (
    'https://s3.amazonaws.com/pimento-imageboard/3fW12cgbnpfv8h7s4njZmNcZCYIrpcMu.jpg',
    'Thomas Serer',
    'Red Carpet',
    'Shot in Lyon, France'
);

INSERT INTO images (url, username, title, description) VALUES (
    'https://s3.amazonaws.com/pimento-imageboard/DTHcZgsc6TP9m2QISwhHeForZeIcemVs.jpg',
    'Paweł Bukowski',
    'Patterns In Perspectives',
    ''
);

INSERT INTO images (url, username, title, description) VALUES (
    'https://s3.amazonaws.com/pimento-imageboard/UXwHab3to1y9NRrW8Ntc-0F1ssq4K237.jpg',
    'Xiang Hu',
    'Going down',
    'Spiral staircase from above'
);

INSERT INTO images (url, username, title, description) VALUES (
    'https://s3.amazonaws.com/pimento-imageboard/8JDOT6pepBRRdi1TkzDILgUCx-BQVbKx.jpg',
    'Nicolas Hoizey',
    'Phare des Baleines',
    'Allée du Phare, Saint-Clément-des-Baleines, France'
);

INSERT INTO images (url, username, title, description) VALUES (
    'https://s3.amazonaws.com/pimento-imageboard/uukrHbvcn0lagSjRPwNnnw0rMSE1yQrS.jpg',
    'Roberto Carlos Roman',
    'Colorful Mexico',
    ''
);

INSERT INTO images (url, username, title, description) VALUES (
    'https://s3.amazonaws.com/pimento-imageboard/aQA3gek-3eomG6b2HIFY5ZMzb9BOAprs.jpg',
    'Jose Pereira',
    'Up the Alley',
    ''
);

INSERT INTO images (url, username, title, description) VALUES (
    'https://s3.amazonaws.com/pimento-imageboard/pDK_dkcWIn_gzmLJ6n3sxDnzjqKb0N8b.jpg',
    'Jaakko Kemppainen',
    'Eye Stair Into Abyss',
    ''
);

INSERT INTO images (url, username, title, description) VALUES (
    'https://s3.amazonaws.com/pimento-imageboard/u0DGeP7qMX6SFftjtuG1e_x4P_7kic8f.jpg',
    'Camille Minouflet',
    'Caltagirone, Italy',
    'Each step has different ceramic design, it looks crazy beautiful!'
);

INSERT INTO images (url, username, title, description) VALUES (
    'https://s3.amazonaws.com/pimento-imageboard/o3M4n2HsPFa4fuAtoOVpnjww3oeYvXuB.jpg',
    'Mitchell Luo',
    'Maze',
    'University of Melbourne'
);

INSERT INTO images (url, username, title, description) VALUES (
    'https://s3.amazonaws.com/pimento-imageboard/ex_j-5c4NARH-Bv8L9V9l-ux6ClQ2G1E.jpg',
    'Bekky Bekks',
    'Berliner U-Bahn',
    'Down the earth, Berlin, Germany'
);

INSERT INTO images (url, username, title, description) VALUES (
    'https://s3.amazonaws.com/pimento-imageboard/-46Sp7k84j1-CNyUWyGn_9SmVVABq_4l.jpg',
    'Octavio Da Silva',
    'Rua das Ladeiras',
    'Sobral de São Miguel, Portugal'
);

INSERT INTO images (url, username, title, description) VALUES (
    'https://s3.amazonaws.com/pimento-imageboard/kxpvL3HzPZKfwdYnurFyuC46mF4or4sF.jpg',
    'Tapio Haaja',
    'White Railings',
    'Finnish Museum of Natural History, Helsinki, Finland'
);

INSERT INTO images (url, username, title, description) VALUES (
    'https://s3.amazonaws.com/pimento-imageboard/CWqtxNOibyvAHgVzaxh2FXIJpDu_sjYF.jpg',
    'Viktor Paris',
    'Blue White Lines',
    ''
);

INSERT INTO images (url, username, title, description) VALUES (
    'https://s3.amazonaws.com/pimento-imageboard/pgpeZJR8jZCNQDR6qQf4mAms5v3hpqe1.jpg',
    'Miquel Estape',
    'Plaça de l''Ajuntament',
    '08870 Sitges, Barcelona, Spain'
);

INSERT INTO images (url, username, title, description) VALUES (
    'https://s3.amazonaws.com/pimento-imageboard/eap8nltpWzCbO5Pn3iCfd6h5Cq93OXqj.jpg',
    'Maria Bitencourt',
    'Tiles and Tiles',
    ''
);

INSERT INTO images (url, username, title, description) VALUES (
    'https://s3.amazonaws.com/pimento-imageboard/ar4x8JL4NCajj8HttW-PG14hNmDw-Vuk.jpg',
    'Nicolas Hoch',
    'Carrer dels Forcats',
    'Palafrugell, Girona, Spain'
);

INSERT INTO images (url, username, title, description) VALUES (
    'https://s3.amazonaws.com/pimento-imageboard/YruKy93-L2OsoCwvH3ExmttdXTg0fcJh.jpg',
    'Ingmar Küsel',
    'Going Red and Metallic',
    'Cape May, United States'
);

