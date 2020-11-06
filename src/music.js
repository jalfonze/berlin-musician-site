import React, { useEffect, useState } from "react";
import Releases from "./releases";
import Musicians from "./musicians";

export default function Music() {
    return (
        <React.Fragment>
            <div className="music">
                <h3>
                    Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed
                    do eiusmod tempor incididunt ut labore et dolore magna
                    aliqua. Risus nec feugiat in fermentum posuere urna nec
                    tincidunt. Curabitur vitae nunc sed velit. Volutpat lacus
                    laoreet non curabitur gravida. Cursus turpis massa tincidunt
                </h3>
            </div>
            <Releases />
            <Musicians />
        </React.Fragment>
    );
}
