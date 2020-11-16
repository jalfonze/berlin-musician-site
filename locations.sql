DROP TABLE IF EXISTS locations CASCADE;

CREATE TABLE locations (
     id SERIAL PRIMARY KEY,
     venue VARCHAR NOT NULL,
     address VARCHAR NOT NULL UNIQUE,
     lat NUMERIC,
     lng NUMERIC,
     payment VARCHAR[],
     provide VARCHAR []
);

INSERT INTO locations (venue, address, lat, lng, payment, provide)
VALUES ('Toast Hawaii', 'Danziger Str. 1, 10435 Berlin', 52.541090, 13.412900, '{Hat (Donation basis), Cash payment, Door deal, Catering (Food and/or drinks)}', '{Sound technician, Space for merchandise, PA, Backline, Drums, Online promotion, Monitors, Backstage / Dressing room, Professional stage lighting}'),
('Deriva', 'Mainzer Str. 23, 12053 Berlin', 52.480700, 13.427690, '{Hat (Donation basis)}', '{PA}'),
('YAAM', 'Schillingbrücke 3, 10243 Berlin', 52.509730, 13.429990, '{Cash payment (specify below), Free food and/or drinks, GEMA fees (or any performance rights organisation)}', '{PA (sound system and mixer), Sound technician, Drums, Monitors, Online promotion, Stage, Space for merchandise, Backstage / dressing room, Professional stage lighting}'),
('Posh Teckel', 'Pflügerstraße 4, 12047 Berlin', 52.491100, 13.424890, '{Hat (Donation basis), Catering (Food and/or drinks)}', '{PA (sound system and mixer), Sound technician, Monitors, Stage}'),
('Prachtwerk', 'Ganghoferstraße 2, 12043 Berlin', 52.479050, 13.438790, '{Cash payment (specify below), Door deal (specify split below), Free food and/or drinks, GEMA fees (or any performance rights organisation)}', '{PA (sound system and mixer), Sound technician, Monitors, Stage, Backstage / dressing room}'),
('SWART', 'Dreysestraße 17, 10559 Berlin', 52.528080, 13.352590, '{Hat (Donation basis) Free food and/or drinks, GEMA fees (or any performance rights organisation)}', '{PA (sound system and mixer), Stage, Space for merchandise}'),
('DODO', 'Großbeerenstraße 32, 10965 Berlin
', 52.492230, 13.382800, '{Hat (Donation basis), Free food and/or drinks, GEMA fees (or any performance rights organisation)}', '{PA (sound system and mixer), Space for merchandise, Piano / keyboard}'),
('Madame Claude', 'Lübbener Str. 19, 10997 Berlin
', 52.499590, 13.437380, '{Cash payment (specify below), Free food and/or drinks, GEMA fees (or any performance rights organisation)}', '{PA (sound system and mixer), Space for merchandise, Piano / keyboard}'),
('ART Stalker', 'Kaiser-Friedrich-Straße 67, 10627 Berlin
', 52.509200, 13.302170, '{Door deal, GEMA fees (or any performance rights organisation)}', '{PA (sound system and mixer), Sound technician, Backline (amps), Drums, Monitors, Online promotion, Stage, Space for merchandise, Professional stage lighting, Piano / keyboard}'),
('Brotfabrik', 'Caligariplatz 1, 13086 Berlin
', 52.552550, 13.430560, '{Cash payment (specify below), Hat (Donation basis), Free food and/or drinks, GEMA fees (or any performance rights organisation)}', '{PA (sound system and mixer)}'),
('800a', 'Stettiner Straße 19, 13357 Berlin
', 52.553840, 13.387410, '{Hat (Donation basis)}', '{PA (sound system and mixer)}'),
('Space Meduza', 'Skalitzer Str. 80, 10997 Berlin', 52.500730, 13.439310, '{Hat (Donation basis)}', '{PA (sound system and mixer)}');

DROP TABLE IF EXISTS reviews CASCADE;

CREATE TABLE reviews (
     id SERIAL PRIMARY KEY,
     sender VARCHAR NOT NULL,
     review VARCHAR NOT NULL,
     review_id INT REFERENCES locations(id) NOT NULL,
     created TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

DROP TABLE IF EXISTS collab CASCADE;

CREATE TABLE collab (
     id SERIAL PRIMARY KEY,
     img VARCHAR NOT NULL,
     name VARCHAR NOT NULL,
     code VARCHAR NOT NULL
);