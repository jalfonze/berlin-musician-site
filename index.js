const express = require("express");
const app = express();
const compression = require("compression");
const db = require("./db");
const bc = require("./bc");
const cookieSession = require("cookie-session");
const csurf = require("csurf");
const secrets = require("./secrets.json");
const axios = require("axios");

app.use(compression());

const cookieSessionMiddleware = cookieSession({
    secret: `I'm always angry.`,
    maxAge: 1000 * 60 * 60 * 24 * 90,
});

const APP_ID = secrets.APP_ID;
const APP_KEY = secrets.APP_KEY;

// console.log(API_ID, API_KEY);

app.use(cookieSessionMiddleware);

app.use(csurf());

app.use(function (req, res, next) {
    res.cookie("myToken", req.csrfToken());
    next();
});

app.use(express.json());

if (process.env.NODE_ENV != "production") {
    app.use(
        "/bundle.js",
        require("http-proxy-middleware")({
            target: "http://localhost:8081/",
        })
    );
} else {
    app.use("/bundle.js", (req, res) => res.sendFile(`${__dirname}/bundle.js`));
}

app.use(express.static("./public"));

/// ALL OUR CODE GOES HERE

app.get("/", (req, res) => {
    if (!req.session.userId) {
        res.redirect("/welcome");
    } else {
        res.sendFile(__dirname + "/index.html");
    }
});

app.post("/createUser", (req, res) => {
    console.log(req.body);
    let { username, email, password } = req.body;
    bc.hash(password).then((hashedPw) => {
        req.body.password = hashedPw;
        let newPass = req.body.password;
        console.log("AFTER HASH", req.body);
        if (username === "" || email === "" || password === "") {
            res.json({
                success: false,
                errMsg: "Fields cannot be empty!",
            });
        } else {
            db.createUser(username, email, newPass)
                .then((response) => {
                    console.log(response.rows[0].id);
                    req.session.userId = response.rows[0].id;
                    let sessionUserId = req.session;
                    res.json({ sessionUserId });
                })
                .catch((err) => {
                    console.log("ERROR IN CREATE USER", err);
                    res.json({
                        success: false,
                        errMsg: err.detail,
                    });
                });
        }
    });
});

app.post("/login", (req, res) => {
    console.log(req.body);
    let { username, password } = req.body;
    if (username === "" || password === "") {
        res.json({
            success: false,
            errMsg: "Fields cannot be empty",
        });
    } else {
        db.getUser(username).then((response) => {
            console.log(response.rows);
            if (response.rows) {
                bc.compare(password, response.rows[0].password)
                    .then((result) => {
                        if (result) {
                            req.session.userId = response.rows[0].id;
                            res.json({
                                success: true,
                            });
                        } else {
                            res.json({
                                success: false,
                                errMsg: "Email or password not valid",
                            });
                        }
                    })
                    .catch((err) => {
                        console.log("ERROR IN COMPARE", err);
                    });
            }
        });
    }
});

app.get("/user", (req, res) => {
    db.getUserInfo(req.session.userId).then((response) => {
        console.log(response.rows);
        res.json({
            userInfo: response.rows[0],
        });
    });
});

app.post("/get-recipe", (req, res) => {
    console.log(req.body);
    let filteredOptions = req.body.filteredArr
        .map((option) => {
            return `&health=${option}`;
        })
        .join("");
    console.log(filteredOptions);
    axios
        .get(
            `https://api.edamam.com/search?q=${req.body.searched}&app_id=${APP_ID}&app_key=${APP_KEY}${filteredOptions}`
        )
        .then((response) => {
            // console.log(response.data);
            // console.log(response.data.hits);
            res.json(response.data.hits);
        })
        .catch((err) => console.log("ERROR IN GET RECIPE", err));
});

app.post("/add-to-fave", (req, res) => {
    console.log(req.body);
    const { label, ingredientLines, healthLabels, image, url } = req.body;
    let yeeld = req.body.yield;
    db.addToFave(
        label,
        ingredientLines,
        healthLabels,
        image,
        url,
        yeeld,
        req.session.userId
    ).then((response) => {
        console.log(response.rows);
    });
});

app.get("/get-fave", (req, res) => {
    db.getFave(req.session.userId).then((response) => {
        console.log(response.rows);
        res.json(response.rows);
    });
});

app.post("/delete-fave", (req, res) => {
    console.log(req.body);
    db.deleteFave(req.body.id).then(() => {
        db.getFave(req.session.userId).then((response) => {
            res.json(response.rows);
        });
    });
});

app.post("/create-recipe", (req, res) => {
    console.log(req.body);
    const { label, ingred, method } = req.body;
    let yeeld = parseInt(req.body.yield);
    db.createRecipe(label, ingred, yeeld, method, req.session.userId)
        .then((response) => {
            console.log(response.rows);
        })
        .catch((err) => console.log("ERROR IN CREATE RECIPE", err));
});

app.get("/get-my-recipes", (req, res) => {
    db.getMyRecipes(req.session.userId).then((response) => {
        console.log(response.rows);
        res.json(response.rows);
    });
});

app.get("*", function (req, res) {
    res.sendFile(__dirname + "/index.html");
});

app.listen(8080, function () {
    console.log("I'm listening.");
});