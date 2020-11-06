import React, { useEffect, useState } from "react";
import L from "leaflet";
import { MapContainer, TileLayer, Marker, Popup } from "react-leaflet";

export default function Events() {
    const [marker, setMarker] = useState([
        {
            name: "Laksmi",
            address: "Wrangelstraße 93, 10997 Berlin, Germany",
            lat: 52.499748,
            lng: 13.43941,
        },
        {
            name: "La Minga",
            address: "Stargarder Str. 33, 10437 Berlin, Germany",
            lat: 52.54364,
            lng: 13.4244,
        },
        {
            name: "Bar Bobu",
            address: "Müggelstraße 9, 10247 Berlin, Germany",
            lat: 52.512009,
            lng: 13.47072,
        },
    ]);

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
            <div className="map-container">
                <MapContainer
                    style={{
                        height: "100%",
                        width: "100vw",
                    }}
                    center={[52.520008, 13.404954]}
                    zoom={12}
                    scrollWheelZoom={false}
                >
                    <TileLayer
                        attribution='&copy; <a href="http://osm.org/copyright">OpenStreetMap</a> contributors'
                        url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
                    />
                    {marker &&
                        marker.map((loc, i) => {
                            return (
                                <Marker key={i} position={[loc.lat, loc.lng]}>
                                    <Popup>
                                        A pretty CSS3 popup. <br /> Easily
                                        customizable.
                                    </Popup>
                                </Marker>
                            );
                        })}
                </MapContainer>
            </div>
        </React.Fragment>
    );
}
