import React, { Fragment } from "react";
import { BrowserRouter, Link, Route } from "react-router-dom";

export default function Nav() {
    return (
        <Fragment>
            <div className="navbar">
                <Link to="/">
                    <img src="./bmsclogo.png" height="60px"></img>
                </Link>
                <h3>
                    <Link to="/music">Local Music Scene</Link>
                </h3>
                <h3>
                    <Link to="/events">Events</Link>
                </h3>
                <h3>Sponsors</h3>
                <h3>Contact Us</h3>
            </div>
        </Fragment>
    );
}
