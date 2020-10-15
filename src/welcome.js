import React from "react";
import { BrowserRouter, Route } from "react-router-dom";

import Registration from "./registration";
import Login from "./login";

export default function Welcome() {
    return (
        <React.Fragment>
            <Login />
            <div className="welcome-page">
                <div className="welcome-logo">
                    <img className="logo" src="/logo.png"></img>
                </div>
                <Registration />
            </div>
        </React.Fragment>
    );
}
