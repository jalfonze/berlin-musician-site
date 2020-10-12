import axios from "./axios";

export async function getFave() {
    const { data } = await axios.get("/get-fave");
    console.log(data);
    return {
        type: "GET_FAVE",
        fave: data,
    };
}

export async function delFave(id) {
    const { data } = await axios.post("/delete-fave", id);
    console.log("NEW DATA", data);
    return {
        type: "DEL_FAVE",
        faveDel: data,
    };
}
