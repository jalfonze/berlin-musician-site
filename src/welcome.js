import React from "react";
import Carousell from "./carousel";

export default function Welcome() {
    return (
        <React.Fragment>
            <Carousell />
            <div className="about">
                <h1>Welcome to the Berlin Music Scene</h1>
                <p>
                    The Berlin Music Scene is a network of Berlin-based
                    musicians working to connect local musicians with local
                    businesses to establish a fruitful collaboration that
                    enables both sides to thrive in ways they couldn't do on
                    their own.
                    <br></br>
                    <br></br>
                    Our aim is to create fairly-paid, locally-sponsored events
                    for Berlin based musicians.
                    <br></br>
                    <br></br>
                    We also provide a venue review system for musicians to see
                    which payment options, technical equipment, and services
                    each establishment provides. <br></br> For independent music
                    lovers, this is a site to discover the underground talent
                    flourishing in Germany's capital, and to find out which
                    events are taking place both on and offline.
                    <br></br>
                    <br></br>
                    In doing so, we hope to inspire the general public to see
                    the value in local startups and independent music and offer
                    an alternative to the mainstream.
                    <br></br>
                    <br></br>
                    Peace, love, and porridge.
                </p>
            </div>
        </React.Fragment>
    );
}
