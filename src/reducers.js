export default function (state = {}, action) {
    if (action.type == "GET_FAVE") {
        console.log(action.fave);
        state = Object.assign({}, state, {
            fave: action.fave,
        });
    }

    if (action.type == "DEL_FAVE") {
        console.log("DEL FAVE", action.faveDel);
        state.fave = action.faveDel;
    }
    console.log(state.fave);
    return state;
}
