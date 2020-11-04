import React, { useEffect, useState } from "react";
import { BrowserRouter, Link, Route } from "react-router-dom";
import Nav from "./nav";
import Welcome from "./welcome";
import Music from "./music";

export default function App() {
    useEffect(() => {}, []);

    return (
        <React.Fragment>
            <BrowserRouter>
                <Nav />
                <Route exact path="/" render={() => <Welcome />} />
                <Route path="/music" render={() => <Music />} />
            </BrowserRouter>
        </React.Fragment>
    );
}
