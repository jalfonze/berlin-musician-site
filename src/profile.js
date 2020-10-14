import React, { useEffect, useState } from "react";
import axios from "./axios";
// import Maps from "./map";
import Shopping from "./shopping";

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
            <div className="profile-main">
                {info && (
                    <div className="profile-image">
                        <h1>
                            Welcome{" "}
                            <span className="usercolor">{info.username}</span>!
                        </h1>
                        <img src={info.img_url} width="300px"></img>
                    </div>
                )}
                <Shopping />
                {/* <Maps /> */}
            </div>
        </React.Fragment>
    );
}
