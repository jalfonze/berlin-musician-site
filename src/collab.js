import React from "react";

export default function Collaboration() {
    return (
        <React.Fragment>
            <div className="sponsors-title">
                <h1>Berlin-Made Local Specials</h1>
                <p>
                    With every local special purchased, you'll be supporting
                    both a Berlin-based musician and a Berlin-based company. All
                    money goes to the artist who has already purchased the local
                    product at retail cost and then creates the bundle for you
                    purchase. If you're an artist wanting to participate, please{" "}
                    <a href="mailto:berlinmusicscene@gmail.com">contact us</a>
                </p>
            </div>
            <div className="sponsors-container">
                <div>
                    <h2>Artist</h2>
                    <p>Nate Bernardini</p>
                </div>
                <div>
                    <h2>The Local Special</h2>
                    <p>
                        Twisted Nut Peanut Butter{" "}
                        <a href="twistednut.de">(Twisted Nut Website)</a> + CD
                        {""}
                    </p>
                </div>
                <div>
                    <h2>Price</h2>
                    <p>15 EUR</p>
                </div>
                <div>
                    <h2>Contact</h2>
                    <a href="mailto:nate.bernardini@gmail.com">
                        Nate Bernardini
                    </a>
                </div>
            </div>
        </React.Fragment>
    );
}
