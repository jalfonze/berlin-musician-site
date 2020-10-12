import React, { useEffect, useState } from "react";
import axios from "./axios";

export default function Profile() {
    const [info, setInfo] = useState();
    useEffect(() => {
        axios.get("/user").then((response) => {
            // console.log(response.data);
            setInfo(response.data.userInfo);
        });
    }, []);

    console.log(info);

    return (
        <React.Fragment>
            {info && <h1>Here is your profile {info.username}</h1>}
        </React.Fragment>
    );
}
