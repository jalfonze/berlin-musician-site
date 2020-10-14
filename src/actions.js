import axios from "./axios";

export async function getFave() {
    const { data } = await axios.get("/get-fave");
    console.log(data);
    return {
        type: "GET_FAVE",
        fave: data,
    };
}

export async function getTop() {
    let { data } = await axios.get("/get-top");
    console.log("ACTIO TOP", data);
    return {
        type: "GET_TOP",
        top: data,
    };
}

export async function getMostViewed() {
    let { data } = await axios.get("/get-most-vewied");
    console.log(data, "MOSTVIEWED");
    return {
        type: "MOST_VIEWED",
        mostViewed: data,
    };
}

export async function delFave(id) {
    const { data } = await axios.post("/delete-fave", id);
    console.log("NEW DATA AFTER DELETE", data);
    return {
        type: "DEL_FAVE",
        faveDel: data[0],
        topDel: data[1],
    };
}

export async function addTop(obj) {
    // console.log("obj", obj);
    const { data } = await axios.post("/add-top", obj);
    console.log("NEW DATA", data);
    return {
        type: "ADD_TOP",
        addTop: data,
    };
}

export async function remTop(id) {
    let fave_id = {
        id: id,
    };
    const { data } = await axios.post("/rem-top", fave_id);
    console.log("NEW DATA", data);
    return {
        type: "REM_TOP",
        remTop: data,
    };
}
export async function saveItem(itemObj) {
    // console.log("ITEM OBJE", itemObj);
    const { data } = await axios.post("/save-item", itemObj);
    console.log("SAVE ITEM DATA", data);
    return {
        type: "SAVE_ITEM",
        savedItem: data,
    };
}
export async function getList() {
    const { data } = await axios.get("/get-list");
    console.log("LISTS ITEM DATA", data);
    return {
        type: "GET_LIST",
        shoppingList: data,
    };
}
export async function delList() {
    const { data } = await axios.get("/del-list");
    console.log("DELETE LIST DEFAULT", data);
    return {
        type: "DEL",
        empty: data,
    };
}
