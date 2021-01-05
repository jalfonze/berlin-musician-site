import React, { useEffect, useState, useRef } from "react";
// import L from "leaflet";
import { MapContainer, TileLayer, Marker, Popup, useMap } from "react-leaflet";
import axios from "./axios";
import { useDispatch, useSelector } from "react-redux";
import { getRev, postRev } from "./actions";

export default function Venues() {
    const dispatch = useDispatch();
    const [marker, setMarker] = useState([]);
    const [info, setInfo] = useState([]);
    const [zoom, setZoom] = useState(12);
    const [position, setPosition] = useState({
        lat: 52.520008,
        lng: 13.404954,
    });
    const [all, setAll] = useState(false);
    const [inputValue, setInputValue] = useState("");
    const inputRev = useRef("");
    const inputName = useRef("");
    const reviews = useSelector((state) => state.review && state.review);
    console.log("REVIEWS", reviews);

    useEffect(() => {
        axios.get("/locations").then((response) => {
            // console.log(response.data);
            setMarker(
                response.data.sort((a, b) => a.venue.localeCompare(b.venue))
            );
        });
    }, [all]);

    const getAll = () => {
        if (all === true) {
            setAll(false);
        } else {
            setAll(true);
        }
    };

    const getLocations = (loc) => {
        axios.get("/kiez/" + loc + ".json").then((response) => {
            setMarker(
                response.data.sort((a, b) => a.venue.localeCompare(b.venue))
            );
        });
    };

    const back = () => {
        setInfo([]);
        setPosition({
            lat: 52.520008,
            lng: 13.404954,
        });
        setZoom(12);
    };

    const showInfo = (index, lat, lng, id) => {
        setInfo(marker[index]);
        setZoom(16);
        setPosition({ lat: lat, lng: lng });
        dispatch(getRev(id));
    };
    const MyComponent = () => {
        const map = useMap();
        // console.log(map);
        map.flyTo(position, zoom);
        return null;
    };

    const inputVal = (e) => {
        // console.log("INPUT", e.target.name, "INPUT VALUE", e.target.value);
        const { name, value } = e.target;
        setInputValue({ ...inputValue, [name]: value });
    };

    const submitReveiw = (e) => {
        e.preventDefault();
        const { sender, comment } = inputValue;
        const { id } = info;
        dispatch(postRev(id, sender, comment));
        inputName.current.value = "";
        inputRev.current.value = "";
    };

    return (
        <React.Fragment>
            <div className="venue-head">
                <h3>
                    Here are a list of Live Music venues dotted all over Berlin.
                    If you would like to add more information, please click this
                    link to take part in the survey{" "}
                    <a
                        href="https://docs.google.com/forms/d/1DiBcKWtlZ9ZyHxKdeBXdjRpCnwrwtKqBPijqW1fbZos/viewform?edit_requested=true"
                        target="_blank"
                        rel="noreferrer"
                    >
                        LINK
                    </a>{" "}
                    alternatively please feel free to write constructive
                    comments that will help the relationships between musicians
                    and venues.
                </h3>
            </div>
            <div className="map-container">
                <MapContainer
                    center={[52.520008, 13.404954]}
                    zoom={12}
                    scrollWheelZoom={false}
                >
                    <MyComponent />
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
                                        <p
                                            onClick={() =>
                                                showInfo(
                                                    i,
                                                    loc.lat,
                                                    loc.lng,
                                                    loc.id
                                                )
                                            }
                                        >
                                            more info
                                        </p>
                                    </Popup>
                                </Marker>
                            );
                        })}
                </MapContainer>
                <div className="marker-info">
                    <div className="kiez">
                        <h3 onClick={() => getAll()}>All</h3>
                        <h3 onClick={() => getLocations("moabit")}>Moabit</h3>
                        <h3 onClick={() => getLocations("kberg")}>Kreuzberg</h3>
                        <h3 onClick={() => getLocations("nk")}>Neukölln</h3>
                        <h3 onClick={() => getLocations("pberg")}>
                            Prenzlauer Berg
                        </h3>
                        <h3 onClick={() => getLocations("cburg")}>
                            Charlottenburg
                        </h3>
                        <h3 onClick={() => getLocations("wedding")}>Wedding</h3>
                        <h3 onClick={() => getLocations("fshain")}>
                            Friedrichshain
                        </h3>
                        <h3 onClick={() => getLocations("sberg")}>
                            Schöneberg
                        </h3>
                        <h3 onClick={() => getLocations("mitte")}>Mitte</h3>
                        <h3 onClick={() => getLocations("panko")}>Pankow</h3>
                    </div>
                    {(info.length == 0 && (
                        <div className="venue-names">
                            {marker &&
                                marker.map((loc, i) => {
                                    return (
                                        <div key={i}>
                                            <h3
                                                className="venueName"
                                                onClick={() =>
                                                    showInfo(
                                                        i,
                                                        loc.lat,
                                                        loc.lng,
                                                        loc.id
                                                    )
                                                }
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
                                <p className="back-button" onClick={back}>
                                    back
                                </p>
                                <div className="info-div">
                                    <div className="venue-info-head">
                                        <h2>{info.venue}</h2>
                                        <h3>{info.address}</h3>
                                    </div>
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
                                                return (
                                                    <div key={i}>
                                                        <p>{provide}</p>
                                                    </div>
                                                );
                                            })}
                                        </div>
                                    </div>
                                </div>
                                <div className="comment-div">
                                    <label>Your name</label>
                                    <input
                                        ref={inputName}
                                        type="text"
                                        className="name-input"
                                        name="sender"
                                        placeholder="write something"
                                        onChange={inputVal}
                                    ></input>
                                    <label>
                                        What do you think of this venue?
                                    </label>
                                    <input
                                        ref={inputRev}
                                        className="review-input"
                                        type="text"
                                        name="comment"
                                        placeholder="write something"
                                        onChange={inputVal}
                                    ></input>
                                    <button
                                        onClick={submitReveiw}
                                        type="submit"
                                    >
                                        Submit
                                    </button>
                                    {reviews &&
                                        reviews.map((rev, i) => {
                                            return (
                                                <div
                                                    key={i}
                                                    className="comment-section"
                                                >
                                                    <h2>{rev.review}</h2>
                                                    <h3>{rev.sender}</h3>
                                                    <p>{rev.to_char}</p>
                                                    <div className="linebreak"></div>
                                                </div>
                                            );
                                        })}
                                </div>
                            </div>
                        ))}
                </div>
            </div>
        </React.Fragment>
    );
}
