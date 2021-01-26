import React, { Fragment } from "react";
import { Link } from "react-router-dom";

export default function Nav() {
    return (
        <Fragment>
            <div className="navbar">
                <Link to="/">
                    <i className="fas fa-home"></i>
                </Link>
                <h3>
                    <Link to="/music">Local Musicians</Link>
                </h3>
                <h3>
                    <Link to="/venues">Venue Reviews</Link>
                </h3>
                <h3>
                    <Link to="/collaboration">Local Specials</Link>
                </h3>
                <h3>
                    {/* <Link to="/contact-us">Contact Us</Link> */}
                    <a href="mailto:berlinmusicscene@gmail.com">Email Us</a>
                </h3>
            </div>
        </Fragment>
    );
}
