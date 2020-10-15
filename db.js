const spicedPg = require("spiced-pg");

const db = spicedPg("postgres:postgres:postgres@localhost:5432/food-user");

module.exports.createUser = (username, email, img, pw) => {
    return db.query(
        `
        INSERT INTO users (username, email, img_url, password)
        VALUES ($1, $2, $3, $4)
        RETURNING id
        `,
        [username, email, img, pw]
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
        ORDER BY id DESC
        `,
        [id]
    );
};
module.exports.mostViewed = (id) => {
    return db.query(
        `
        SELECT * FROM favourites
        WHERE user_id = ($1)
        ORDER BY click_count DESC
        LIMIT 3
        `,
        [id]
    );
};
module.exports.updateFave = (num, fave_id) => {
    return db.query(
        `
        UPDATE favourites
        SET click_count = click_count + ($1)
        WHERE id = ($2)
        `,
        [num, fave_id]
    );
};

module.exports.getTop = (id) => {
    return db.query(
        `
        SELECT * FROM topfave
        WHERE user_id = ($1)
        ORDER BY id DESC
        `,
        [id]
    );
};

module.exports.addTop = (label, img_url, url, user_id, fave_id) => {
    return db.query(
        `
        INSERT INTO topfave (label, img_url, url, user_id, fave_id)
        VALUES ($1, $2, $3, $4, $5)
        RETURNING label, img_url, url, user_id, fave_id
        `,
        [label, img_url, url, user_id, fave_id]
    );
};

module.exports.remTop = (id) => {
    return db.query(
        `
         DELETE FROM topfave
         WHERE fave_id=($1)
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

module.exports.saveItem = (item, id) => {
    console.log(id);
    return db.query(
        `
        UPDATE shopping 
        SET item = ($1), user_id = ($2)
        RETURNING *
        `,
        [item, id]
    );
};
module.exports.getList = () => {
    return db.query(
        `
        SELECT * FROM shopping
        `
    );
};

module.exports.createRecipe = (label, ingredients, yeeld, method, id) => {
    return db.query(
        `
        INSERT INTO myrecipes (label, ingredients, yield, method, user_id )
        VALUES ($1, $2, $3, $4, $5)
        RETURNING label, ingredients, yield, method, user_id
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

module.exports.delRecipe = (id) => {
    return db.query(
        `
        DELETE FROM myrecipes
        WHERE id = ($1)
        `,
        [id]
    );
};
