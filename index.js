const express = require("express");
const app = express();
const compression = require("compression");
const cookieSession = require("cookie-session");
const csurf = require("csurf");
// let secrets;
const secrets = require("./secrets.json");
const base64 = require("base-64");
const axios = require("axios");

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
            // console.log("TOKEN", response.data.access_token);
            let token = response.data.access_token;
            let artistId = [];
            axios({
                method: "GET",
                url: `https://api.spotify.com/v1/playlists/${playlist_id}/tracks?limit=20`,
                headers: {
                    Authorization: `Bearer ${token}`,
                },
            }).then((response) => {
                // console.log(response.data.items);
                let musicians = [];
                // let artist = [];
                let info = response.data.items;
                info.map((infos) => {
                    let musoInfo = infos.track.album;
                    musicians.push(musoInfo);
                    artistId.push(musoInfo.artists[0].id);
                });
                // console.log("ART ID", artistId);
                let id = artistId.join(",");
                console.log(id);
                axios({
                    method: "GET",
                    url: `https://api.spotify.com/v1/artists?ids=${id}`,
                    headers: {
                        Authorization: `Bearer ${token}`,
                    },
                })
                    .then((response) => {
                        console.log("ARTISTS", response.data);
                        res.json({
                            playlist: musicians,
                            artists: response.data.artists,
                        });
                    })
                    .catch((err) => console.log("ERR IN GET ID", err));
            });
        })
        .catch((err) => console.log("ERR", err));
});

app.get("*", function (req, res) {
    res.sendFile(__dirname + "/index.html");
});

app.listen(process.env.PORT || 8080, function () {
    console.log("I'm listening.");
});
