DROP TABLE IF EXISTS locations CASCADE;

CREATE TABLE locations (
     id SERIAL PRIMARY KEY,
     venue VARCHAR NOT NULL,
     address VARCHAR NOT NULL UNIQUE,
     lat NUMERIC,
     lng NUMERIC
);

INSERT INTO locations (venue, address, lat, lng)
VALUES ('La Minga', 'Stargarder Str. 33, 10437 Berlin, Germany', 52.54364, 13.42440),
       ('Bar Bobu', 'Müggelstraße 9, 10247 Berlin, Germany', 52.512009, 13.470720); 
       ('800A', 'Stettiner Straße 19,
13357 Berlin
Germany', 52.55390, 13.38740); 