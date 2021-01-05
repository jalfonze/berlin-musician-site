import React, { useState } from "react";
import Carousel from "react-bootstrap/Carousel";

export default function Carousell() {
    return (
        <React.Fragment>
            <Carousel>
                <Carousel.Item>
                    <img
                        className="d-block w-100"
                        src="/06.png"
                        alt="Third slide"
                    />

                    {/* <Carousel.Caption>
                        <p>
                            Click here to go to a Spotify playlist showcasing
                            Berlin's underground talent! Regularly updated
                            <br></br>
                            <a
                                target="_blank"
                                rel="noreferrer"
                                href="https://open.spotify.com/playlist/2zaPudFYwrOReyPD3Sw0l3?si=3r5VrvkVTzqowQsGWWgqAg"
                            >
                                Click here for more info
                            </a>
                        </p>
                    </Carousel.Caption> */}
                </Carousel.Item>
                {/* <Carousel.Item>
                    <img
                        className="d-block w-100"
                        src="/05.png"
                        alt="Third slide"
                    />

                    <Carousel.Caption>
                        <p>
                            Praesent commodo cursus magna, vel scelerisque nisl
                            consectetur.
                            <br></br>
                            <a
                                target="_blank"
                                rel="noreferrer"
                                href="https://www.twistednut.de/"
                            >
                                Click here for more info
                            </a>
                        </p>
                    </Carousel.Caption>
                </Carousel.Item> */}
            </Carousel>
        </React.Fragment>
    );
}
