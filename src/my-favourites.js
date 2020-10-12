import React, { useEffect, useState } from "react";
import axios from "./axios";
import { useDispatch, useSelector } from "react-redux";
import { getFave, delFave } from "./actions";

export default function MyFavourite() {
    const dispatch = useDispatch();
    const favourites = useSelector((state) => state.fave && state.fave);

    console.log(favourites);

    // const [fave, setFave] = useState([]);
    useEffect(() => {
        dispatch(getFave());
    }, []);

    const deleteFave = (e) => {
        console.log(e.target.value);
        let id = {
            id: e.target.value,
        };
        dispatch(delFave(id));
        // axios.post("/delete-fave", id).then((response) => {
        //     console.log(response.rows);
        // });
    };
    return (
        <React.Fragment>
            <h1>here are your favourites</h1>
            <div>
                {favourites &&
                    favourites.map((item, i) => {
                        return (
                            <div key={i}>
                                <h1>{item.label}</h1>
                                <h3>Yields: {item.yield}</h3>
                                <img src={item.img_url}></img>
                                <button value={item.id} onClick={deleteFave}>
                                    delete
                                </button>
                            </div>
                        );
                    })}
            </div>
        </React.Fragment>
    );
}
