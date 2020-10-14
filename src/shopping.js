import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { saveItem, getList, delList } from "./actions";

export default function Shopping() {
    const [items, setItems] = useState([]);
    const dispatch = useDispatch();
    const shoppingList = useSelector((state) => state.shopping);
    // const [ticked, setTicked] = useState(false);

    useEffect(() => {
        dispatch(getList());
    }, []);

    const addChange = (e) => {
        setItems({
            item: e.target.value,
        });
    };

    // console.log(items);

    const saveThisItem = (e) => {
        e.preventDefault();
        dispatch(saveItem(items));
    };

    const deleteList = (e) => {
        e.preventDefault();
        dispatch(delList());
    };

    const tickOff = (i) => {
        console.log("click", i);
    };

    // console.log("TICKED MARK", ticked);

    console.log("SHOPPING LIST", shoppingList);
    return (
        <React.Fragment>
            <div className="list-container">
                <div className="favourites-title">
                    <h3>Your Shopping List</h3>
                </div>
                <div className="add-item">
                    <input
                        className="list-input"
                        type="text"
                        name="item"
                        placeholder="Add an item"
                        onChange={addChange}
                    ></input>
                    <button className="list-button" onClick={saveThisItem}>
                        Save
                    </button>
                </div>
                <div className="item-list-parent">
                    {shoppingList &&
                        shoppingList.map((item, i) => {
                            return (
                                <div key={i} className="item-list">
                                    <p onClick={() => tickOff(i)}>{item}</p>

                                    {/* <p
                                        className="line-through"
                                        onClick={() => tickOff(i)}
                                    >
                                        {item}
                                    </p> */}
                                </div>
                            );
                        })}
                </div>
                <button className="list-del" onClick={deleteList}>
                    delete list
                </button>
            </div>
        </React.Fragment>
    );
}
