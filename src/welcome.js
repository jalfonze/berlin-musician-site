import React from "react";
import Carousell from "./carousel";
import { Link } from "react-router-dom";

export default function Welcome() {
    return (
        <React.Fragment>
            <Carousell />
            <div className="about">
                <h1>Welcome to the Berlin Music Scene</h1>
                <p>
                    The BERLIN MUSIC SCENE is a network of Berlin-based
                    <Link to="/music"> musicians</Link> working to provide their
                    community with independent music and live concert events. In
                    an effort to support our community, musicians have the
                    option to work with local businesses to establish a fruitful
                    collaboration that enables both sides to thrive in ways they
                    couldn't do on their own. To demonstrate this collaboration,
                    we publish local specials offered by Berlin-based musicians.
                    Local specials are bundles comprised of Berlin-based music
                    and a Berlin-made product. See our{" "}
                    <Link to="/collaboration">offers</Link> to find out more and
                    participate
                    <br></br>
                    <br></br>
                    We also offer a compilation CD featuring 16 different
                    Berlin-based artists. 100% of proceeds go to the artist when
                    purchased from them. Any donations made will go into a fund
                    to creates fairly-paid, locally-sponsored events for Berlin
                    based musicians.
                    <br></br>
                    <br></br>
                    For musicians looking for gigs, we also provide a venue
                    review system, allowing musicians to see which payment
                    options, technical equipment, and services each venue
                    provides. <br></br> For independent music lovers, this site
                    is a great way to discover and support the underground
                    talent flourishing in Germany's capital.
                    <br></br>
                    <br></br>
                    With this site, we hope to inspire the general public to see
                    the value in local startups and independent music and offer
                    an alternative to the mainstream.
                    <br></br>
                    <br></br>
                    Peace, love, and porridge.
                    <br></br>
                    Nate Bernardini
                    <br></br>
                    Songwriter and Project Founder
                </p>
            </div>
        </React.Fragment>
    );
}
