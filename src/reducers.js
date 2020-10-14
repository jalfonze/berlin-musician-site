export default function (state = {}, action) {
    if (action.type == "GET_FAVE") {
        console.log(action.fave);
        state = Object.assign({}, state, {
            fave: action.fave,
        });
    }

    if (action.type == "GET_TOP") {
        // console.log("REDUCER TOP", action.top);
        state = {
            ...state,
            top: [...action.top],
        };
    }

    if (action.type == "MOST_VIEWED") {
        state = {
            ...state,
            mostViewed: action.mostViewed,
        };
    }
    if (action.type == "ADD_TOP") {
        // console.log("ADD_TOP", action.addTop);
        state = {
            ...state,
            top: [action.addTop, ...state.top],
        };
    }

    if (action.type == "REM_TOP") {
        state.top = action.remTop;
    }

    if (action.type == "DEL_FAVE") {
        // console.log("DEL FAVE", action.faveDel);
        // console.log("DEL TOP", action.topDel);
        state.fave = action.faveDel;
        state.top = action.topDel;
    }

    if (action.type == "SAVE_ITEM") {
        console.log("SAVED ITEM", action.savedItem);
        state.shopping = action.savedItem[0].item;
    }

    if (action.type == "GET_LIST") {
        console.log("LIST!", action.shoppingList);
        state = {
            ...state,
            shopping: action.shoppingList[0].item,
        };
    }

    if (action.type == "DEL") {
        state.shopping = action.empty[0].item;
    }

    console.log("SSTATE", state);
    return state;
}
