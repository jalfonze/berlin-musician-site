import React, { useEffect } from "react";
import axios from "./axios";

export default function Welcome() {
    useEffect(() => {
        axios
            .get("/playlist-info")
            .then((response) => {
                console.log("Musicians data", response.data);
            })
            .catch((err) => console.log("ERR IN PLAYLIST", err));
    }, []);
    return (
        <React.Fragment>
            <div className="music">
                <h1>Musicians</h1>
            </div>
        </React.Fragment>
    );
}
