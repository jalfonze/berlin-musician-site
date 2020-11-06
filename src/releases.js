import React, { useEffect, useState } from "react";
import axios from "./axios";

export default function Releases() {
    const [playlistInfo, setPlaylistInfo] = useState([]);
    console.log("PLAYLIST INFO", playlistInfo);
    useEffect(() => {
        axios
            .get("/playlist-info")
            .then((response) => {
                // console.log("Musicians data ID", response.data.artists);
                setPlaylistInfo(response.data.playlist);
            })
            .catch((err) => console.log("ERR IN PLAYLIST", err));
    }, []);
    return (
        <React.Fragment>
            <div className="music">
                <h1>Latest Releases from the Local Music Scene from Spotify</h1>
                <div className="release-list">
                    {(playlistInfo.length === 0 && <h1>Loading...</h1>) ||
                        (playlistInfo &&
                            playlistInfo.map((info, i) => {
                                return (
                                    <div key={i}>
                                        <h3>{info.name}</h3>
                                        <p>{info.album_type}</p>
                                        <a
                                            target="_blank"
                                            rel="noopener noreferrer"
                                            href={info.external_urls.spotify}
                                        >
                                            <img src={info.images[1].url}></img>
                                        </a>
                                    </div>
                                );
                            }))}
                </div>
            </div>
        </React.Fragment>
    );
}
