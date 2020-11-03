import React, { Fragment } from "react";

export default function Nav() {
    return (
        <Fragment>
            <div className="navbar">
                <img src="./bmsclogo.png" height="70px"></img>
                <h3>About</h3>
                <h3>Local Music Scene</h3>
                <h3>Events</h3>
                <h3>Sponsors</h3>
                <h3>Contact Us</h3>
            </div>
        </Fragment>
    );
}
