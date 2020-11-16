import React, { useEffect, useState } from "react";
import { BrowserRouter, Link, Route } from "react-router-dom";
import Nav from "./nav";
import Welcome from "./welcome";
import Music from "./music";
import Venues from "./venues";
import Collaboration from "./collab";
import NotFound from "./notfound";

export default function App() {
    useEffect(() => {}, []);

    return (
        <React.Fragment>
            <BrowserRouter>
                <Nav />
                <Route exact path="/" render={() => <Welcome />} />
                <Route path="/music" render={() => <Music />} />
                <Route path="/venues" render={() => <Venues />} />
                <Route path="/collaboration" render={() => <Collaboration />} />
                <Route path="/notfound" render={() => <NotFound />} />
                <div className="footer">
                    <h3>
                        website created by{" "}
                        <a
                            target="_blank"
                            rel=" noreferrer"
                            href="https://www.facebook.com/berlinmusiciansunion"
                        >
                            Berlin Musicians Union
                        </a>
                    </h3>
                </div>
            </BrowserRouter>
        </React.Fragment>
    );
}
