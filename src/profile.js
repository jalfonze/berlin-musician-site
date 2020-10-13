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
            {info && (
                <div>
                    <h1>Welcome {info.username}!</h1>
                    <img src={info.img_url} width="200px"></img>
                </div>
            )}
        </React.Fragment>
    );
}
