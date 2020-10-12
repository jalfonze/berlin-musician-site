const spicedPg = require("spiced-pg");

const db = spicedPg("postgres:postgres:postgres@localhost:5432/food-user");

module.exports.createUser = (username, email, pw) => {
    return db.query(
        `
        INSERT INTO users (username, email, password)
        VALUES ($1, $2, $3)
        RETURNING id
        `,
        [username, email, pw]
    );
};

module.exports.getUser = (username) => {
    return db.query(
        `
        SELECT * FROM users WHERE username = ($1)
        `,
        [username]
    );
};
module.exports.getUserInfo = (id) => {
    return db.query(
        `
        SELECT username, bio, img_url FROM users WHERE id = ($1)
        `,
        [id]
    );
};

module.exports.addToFave = (
    label,
    ingredientLines,
    health,
    image,
    url,
    yeeld,
    userId
) => {
    return db.query(
        `
        INSERT INTO favourites (label, ingredients, health_label, img_url, url, yield, user_id )
        VALUES ($1, $2, $3, $4, $5, $6, $7)
        RETURNING label
        `,
        [label, ingredientLines, health, image, url, yeeld, userId]
    );
};

module.exports.getFave = (id) => {
    return db.query(
        `
        SELECT * FROM favourites
        WHERE user_id = ($1)
        `,
        [id]
    );
};

module.exports.deleteFave = (id) => {
    return db.query(
        `
        DELETE FROM favourites
        WHERE id = ($1)
        `,
        [id]
    );
};

module.exports.createRecipe = (label, ingredients, yeeld, method, id) => {
    return db.query(
        `
        INSERT INTO myrecipes (label, ingredients, yield, method, user_id )
        VALUES ($1, $2, $3, $4, $5)
        RETURNING *
        `,
        [label, ingredients, yeeld, method, id]
    );
};

module.exports.getMyRecipes = (id) => {
    return db.query(
        `
        SELECT * FROM myrecipes WHERE user_id = ($1)
        `,
        [id]
    );
};
