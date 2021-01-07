const spicedPg = require("spiced-pg");
let secrets;

if (process.env.NODE_ENV == "production") {
    secrets = process.env;
} else {
    secrets = require("./secrets.json");
}

const db = spicedPg(
    process.env.DATABASE_URL ||
        `postgres:${secrets.dbUser}:${secrets.dbPass}@localhost:5432/berlin-muso`
);
module.exports.getLocation = () => {
    return db.query(
        `
        SELECT * FROM locations
        `
    );
};
module.exports.getKiez = (val) => {
    return db.query(
        `
        SELECT * FROM locations WHERE kiez = ($1)
        `,
        [val]
    );
};
module.exports.getRev = (id) => {
    return db.query(
        `
        SELECT *,
        TO_CHAR(created, 'HH24:MI DD-MON-YYYY')
        FROM reviews 
        WHERE review_id = ($1)
        ORDER BY id DESC
        `,
        [id]
    );
};
module.exports.postRev = (id, name, rev) => {
    return db.query(
        `
        INSERT INTO reviews (review_id, sender, review)
        VALUES ($1, $2, $3)
        RETURNING * ,TO_CHAR(created, 'HH24:MI DD-MON-YYYY')
        `,
        [id, name, rev]
    );
};
