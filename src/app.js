import React, { useEffect, useState } from "react";
import { BrowserRouter, Link, Route } from "react-router-dom";
import Nav from "./nav";
import Welcome from "./welcome";

export default function App() {
    return (
        <React.Fragment>
            <BrowserRouter>
                <Nav />
                <Route exact path="/" render={() => <Welcome />} />
            </BrowserRouter>
        </React.Fragment>
    );
}
