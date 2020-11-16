export default function (state = {}, action) {
    if (action.type == "GET_REV") {
        console.log(action.rev);
        state = Object.assign({}, state, {
            review: action.rev,
        });
    }
    if (action.type == "POST_REV") {
        console.log(action.lastRev);
        if (state.review[0].review === "currently no reviews") {
            state = {
                review: [action.lastRev],
            };
        } else {
            state = {
                review: [action.lastRev, ...state.review],
            };
        }
    }

    console.log("CURRENT STATE", state);
    return state;
}
