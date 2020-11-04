import React, { Fragment } from "react";
import { BrowserRouter, Link, Route } from "react-router-dom";

export default function Nav() {
    return (
        <Fragment>
            <div className="navbar">
                <Link to="/">
                    <img src="./bmsclogo.png" height="70px"></img>
                </Link>
                <h3>About</h3>
                <h3>
                    <Link to="/music">Local Music Scene</Link>
                </h3>
                <h3>Events</h3>
                <h3>Sponsors</h3>
                <h3>Contact Us</h3>
            </div>
        </Fragment>
    );
}
