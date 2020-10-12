import React from "react";
import { BrowserRouter, Route } from "react-router-dom";

import Registration from "./registration";
import Login from "./login";

export default function Welcome() {
    return (
        <React.Fragment>
            <Login />
            <img className="logo" src="/logo.png"></img>
            <Registration />
        </React.Fragment>
    );
}
