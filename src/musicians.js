import React, { useEffect, useState } from "react";
import axios from "./axios";

export default function Musicians() {
    const [artistInfo, setArtistInfo] = useState([]);

    // console.log(artistInfo);
    useEffect(() => {
        axios
            .get("/playlist-info")
            .then((response) => {
                // console.log("Musicians data ID", response.data.artists);
                let newInfo = [];
                let uniqueArtist = response.data.artists;
                uniqueArtist.forEach((compareToArtist) => {
                    const potentialArtist = newInfo.find((artistA) => {
                        if (compareToArtist.id === artistA.id) {
                            return true;
                        } else {
                            return false;
                        }
                    });
                    if (!potentialArtist) {
                        newInfo.push(compareToArtist);
                    } else {
                        return;
                    }
                });
                console.log("newINFO", newInfo);
                setArtistInfo(newInfo);
            })
            .catch((err) => console.log("ERR IN PLAYLIST", err));
    }, []);
    return (
        <React.Fragment>
            <div className="artists">
                <h2>Local Berlin Artists</h2>
                <div className="artist-list">
                    {(artistInfo.length === 0 && (
                        <div className="spinner">
                            <div className="spinner-border" role="status">
                                <span className="sr-only">Loading...</span>
                            </div>
                        </div>
                    )) ||
                        (artistInfo &&
                            artistInfo.map((info, i) => {
                                return (
                                    <div className="artist-info" key={i}>
                                        <a
                                            target="_blank"
                                            rel="noopener noreferrer"
                                            href={info.external_urls.spotify}
                                        >
                                            <h3 className="info-name">
                                                {info.name}
                                            </h3>
                                            <img
                                                style={{
                                                    border: "solid black 1px",
                                                }}
                                                width="300px"
                                                src={info.images[1].url}
                                            ></img>
                                        </a>
                                    </div>
                                );
                            }))}
                </div>
            </div>
        </React.Fragment>
    );
}
