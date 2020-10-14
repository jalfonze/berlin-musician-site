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
     click_count INT DEFAULT 1,
     user_id INT REFERENCES users(id) NOT NULL,
     created TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

DROP TABLE IF EXISTS topfave CASCADE;

CREATE TABLE topfave (
     id SERIAL PRIMARY KEY,
     label VARCHAR,
     img_url VARCHAR,
     url VARCHAR,
     user_id INT REFERENCES users(id) NOT NULL,
     fave_id INT NOT NULL REFERENCES favourites(id) ON DELETE CASCADE,
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

DROP TABLE IF EXISTS shopping CASCADE;

CREATE TABLE shopping (
     id SERIAL PRIMARY KEY,
     item VARCHAR[] DEFAULT null,
     user_id INT REFERENCES users(id) NOT NULL,
     created TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);