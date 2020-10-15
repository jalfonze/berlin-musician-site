import React, { useEffect, useState } from "react";
import axios from "./axios";
import { useDispatch, useSelector } from "react-redux";
import {
    getFave,
    delFave,
    getTop,
    addTop,
    remTop,
    getMostViewed,
} from "./actions";

export default function MyFavourite() {
    const dispatch = useDispatch();
    const favourites = useSelector((state) => state.fave && state.fave);
    const top = useSelector((state) => state.top && state.top);
    const mostViewed = useSelector(
        (state) => state.mostViewed && state.mostViewed
    );

    console.log("FAVURITES FROM STATE", favourites);
    console.log("TOP FROM STATE", top);

    // const [fave, setFave] = useState([]);
    useEffect(() => {
        dispatch(getFave());
        dispatch(getTop());
        dispatch(getMostViewed());
    }, []);

    const deleteFave = (e) => {
        console.log(e.target.value);
        let id = {
            id: e.target.value,
        };
        dispatch(delFave(id));
    };

    const addToTop = (e) => {
        dispatch(addTop(favourites[e.target.value]));
    };

    const removeTop = (e) => {
        console.log(e.target.value);
        dispatch(remTop(e.target.value));
    };

    const clickCount = (i) => {
        let counter = 0;
        let counterItem = favourites[i].id;
        if (clickCount) {
            counter = 1;
        }
        let count = {
            counter: counter,
            item: counterItem,
        };
        console.log(i, counterItem);
        axios.post("/counter", count).then((response) => {
            console.log(response.data);
        });
    };

    return (
        <React.Fragment>
            <div className="favourite-top">
                <div className="most-viewed-list">
                    <div className="favourites-title">
                        <h3>Top 3 Most Viewed</h3>
                    </div>
                    <div className="each-view">
                        {(mostViewed && mostViewed.length == 0 && (
                            <h4>You have not viewed enough ingredients</h4>
                        )) ||
                            (mostViewed &&
                                mostViewed.map((view, i) => {
                                    return (
                                        <div key={i}>
                                            <img
                                                src={view.img_url}
                                                width="100px"
                                            ></img>
                                        </div>
                                    );
                                }))}
                    </div>
                </div>
                <div className="top-list">
                    <div className="favourites-title">
                        <h3>Your Top Picks</h3>
                    </div>
                    <div className="each-top">
                        {(top && top.length == 0 && (
                            <h4>No current Top Picks</h4>
                        )) ||
                            (top &&
                                top.map((top, i) => {
                                    return (
                                        <div key={i}>
                                            <img
                                                src={top.img_url}
                                                width="100px"
                                            ></img>
                                            <button
                                                value={top.fave_id}
                                                onClick={removeTop}
                                            >
                                                <i className="fas fa-times"></i>
                                            </button>
                                        </div>
                                    );
                                }))}
                    </div>
                </div>
            </div>
            <div className="favourites-title">
                <h1>Saved Recipes</h1>;
            </div>
            <div className="favourites">
                {favourites &&
                    favourites.map((item, i) => {
                        return (
                            <div className="each-fave" key={i}>
                                <h3>{item.label}</h3>
                                <h5>Yields: {item.yield}</h5>
                                <a target="__blank" href={item.url}>
                                    <img
                                        onClick={() => clickCount(i)}
                                        src={item.img_url}
                                    ></img>
                                </a>
                                <div className="trash-star">
                                    <button
                                        className="trash-btn"
                                        value={item.id}
                                        onClick={deleteFave}
                                    >
                                        <i className="fas fa-trash-alt"></i>
                                    </button>
                                    <button
                                        className="star-btn"
                                        value={i}
                                        onClick={addToTop}
                                    >
                                        <i className="fas fa-star"></i>
                                    </button>
                                </div>
                            </div>
                        );
                    })}
            </div>
        </React.Fragment>
    );
}
