import React, { useEffect, useState } from "react";
import axios from "./axios";

export default function Musicians() {
    const [artistInfo, setArtistInfo] = useState([]);
    console.log(artistInfo);
    useEffect(() => {
        axios
            .get("/playlist-info")
            .then((response) => {
                // console.log("Musicians data ID", response.data.artists);
                setArtistInfo(response.data.artists);
            })
            .catch((err) => console.log("ERR IN PLAYLIST", err));
    }, []);
    return (
        <React.Fragment>
            <div className="artists">
                <h1>Local Berlin Artists</h1>
                <div className="artist-list">
                    {(artistInfo.length === 0 && <h1>Loading...</h1>) ||
                        (artistInfo &&
                            artistInfo.map((info, i) => {
                                return (
                                    <div key={i}>
                                        <h3>{info.name}</h3>
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
