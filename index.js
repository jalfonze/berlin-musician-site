const express = require("express");
const app = express();
const compression = require("compression");
const cookieSession = require("cookie-session");
const csurf = require("csurf");
// let secrets;
const secrets = require("./secrets.json");
const base64 = require("base-64");
const axios = require("axios");
const qs = require("querystring");

app.use(compression());

const cookieSessionMiddleware = cookieSession({
    secret: `I'm always angry.`,
    maxAge: 1000 * 60 * 60 * 24 * 90,
});

// if (process.env.NODE_ENV == "production") {
//     secrets = process.env;
// } else {
//     secrets = require("./secrets.json");
// }

const CLIENT_ID = secrets.CLIENT_ID;
const CLIENT_SECRET = secrets.CLIENT_SECRET;

let idSec = base64.encode(`${CLIENT_ID}:${CLIENT_SECRET}`);

// console.log(id, sec);
// console.log("ID:", CLIENT_ID, "SECRET", CLIENT_SECRET);

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

app.get("/playlist-info", (req, res) => {
    // console.log("PLAYLIST");
    // res.json({
    //     playlist: "yes",
    // });
    const playlist_id = "2zaPudFYwrOReyPD3Sw0l3";
    axios({
        method: "POST",
        url: "https://accounts.spotify.com/api/token",
        headers: {
            Authorization: `Basic ${idSec}`,
        },
        data: "grant_type=client_credentials",
    })
        .then((response) => {
            console.log("TOKEN", response.data.access_token);
            let token = response.data.access_token;
            axios({
                method: "GET",
                url: `https://api.spotify.com/v1/playlists/${playlist_id}/tracks?limit=5`,
                headers: {
                    Authorization: `Bearer ${token}`,
                },
            }).then((response) => {
                // console.log(response.data.items);
                let musicians = [];
                let info = response.data.items;
                info.map((infos) => {
                    // console.log("track info", infos.track.name);
                    let musoInfo = infos.track.album;
                    musicians.push(musoInfo);
                });
                // console.log("MUSICIANS", musicians);
                res.json(musicians);
            });
        })
        .catch((err) => console.log("ERR", err));
});

//spotify:playlist:2zaPudFYwrOReyPD3Sw0l3

app.get("*", function (req, res) {
    res.sendFile(__dirname + "/index.html");
});

app.listen(process.env.PORT || 8080, function () {
    console.log("I'm listening.");
});
