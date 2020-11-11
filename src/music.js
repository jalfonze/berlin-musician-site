import React, { useEffect, useState } from "react";
import Releases from "./releases";
import Musicians from "./musicians";

export default function Music() {
    return (
        <React.Fragment>
            <Musicians />
            {/* <Releases /> */}
        </React.Fragment>
    );
}
