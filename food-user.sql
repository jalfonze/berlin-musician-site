DROP TABLE IF EXISTS users CASCADE;

CREATE TABLE users (
     id SERIAL PRIMARY KEY,
     username VARCHAR NOT NULL UNIQUE,
     email VARCHAR NOT NULL UNIQUE,
     password VARCHAR NOT NULL,
     img_url VARCHAR,
     bio VARCHAR,
     created TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

DROP TABLE IF EXISTS favourites CASCADE;

CREATE TABLE favourites (
     id SERIAL PRIMARY KEY,
     label VARCHAR,
     ingredients VARCHAR[],
     health_label VARCHAR[],
     img_url VARCHAR,
     url VARCHAR,
     yield INT,
     user_id INT REFERENCES users(id) NOT NULL,
     created TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

DROP TABLE IF EXISTS topfave CASCADE;

CREATE TABLE topfave (
     id SERIAL PRIMARY KEY,
     label VARCHAR,
     img_url VARCHAR,
     url VARCHAR,
     fave_id INT REFERENCES favourites(id) NOT NULL,
     created TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

DROP TABLE IF EXISTS myrecipes CASCADE;

CREATE TABLE myrecipes (
     id SERIAL PRIMARY KEY,
     label VARCHAR,
     ingredients VARCHAR,
     img_url VARCHAR,
     yield INT,
     method VARCHAR,
     user_id INT REFERENCES users(id) NOT NULL,
     created TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);