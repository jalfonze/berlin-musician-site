import React, { useEffect, useState } from "react";
import L from "leaflet";
import { MapContainer, TileLayer, Marker, Popup } from "react-leaflet";
import axios from "./axios";

export default function Events() {
    const [marker, setMarker] = useState([]);
    const [info, setInfo] = useState([]);
    console.log("INFO", info);

    useEffect(() => {
        axios.get("/locations").then((response) => {
            // console.log(response.data);
            setMarker(
                response.data.sort((a, b) => a.venue.localeCompare(b.venue))
            );
        });
    }, []);

    const highlightName = (i) => {
        console.log(i);
        setInfo(marker[i]);
    };

    const back = () => {
        setInfo([]);
    };

    const showInfo = (index) => {
        // console.log(index);
        console.log(marker[index]);
        setInfo(marker[index]);
    };

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
                        width: "50vw",
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
                                        <h2>{loc.venue}</h2>
                                        <h3>{loc.address}</h3>
                                        <p onClick={() => showInfo(i)}>
                                            more info
                                        </p>
                                    </Popup>
                                </Marker>
                            );
                        })}
                </MapContainer>
                <div className="marker-info">
                    {(info.length == 0 && (
                        <div>
                            {marker &&
                                marker.map((loc, i) => {
                                    return (
                                        <div key={i}>
                                            <h3
                                                onClick={() => highlightName(i)}
                                            >
                                                {loc.venue}
                                            </h3>
                                        </div>
                                    );
                                })}
                        </div>
                    )) ||
                        (info && (
                            <div>
                                <h2>{info.venue}</h2>
                                <h3>{info.address}</h3>
                                <div className="payment-provide">
                                    <div className="payment">
                                        <h4>Payment Options</h4>
                                        {info.payment.map((payment, i) => {
                                            return <p key={i}>{payment}</p>;
                                        })}
                                    </div>
                                    <div className="payment">
                                        <h4>What the venue provides</h4>
                                        {info.provide.map((provide, i) => {
                                            return <p key={i}>{provide}</p>;
                                        })}
                                    </div>
                                    <p onClick={back}>back</p>
                                </div>
                            </div>
                        ))}
                </div>
            </div>
        </React.Fragment>
    );
}
