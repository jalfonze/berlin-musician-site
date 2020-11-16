import axios from "./axios";

export async function getRev(id) {
    console.log(id);
    const { data } = await axios.get("/get-rev/" + id + ".json");
    console.log(data);
    return {
        type: "GET_REV",
        rev: data,
    };
}
export async function postRev(id, name, review) {
    console.log(id, name, review);
    const reviewInfo = {
        id: id,
        name: name,
        review: review,
    };
    const { data } = await axios.post("/post-rev", reviewInfo);
    console.log(data);
    return {
        type: "POST_REV",
        lastRev: data,
    };
}
