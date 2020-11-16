import React from "react";
import ReactDOM from "react-dom";
import { createStore, applyMiddleware } from "redux";
import reduxPromise from "redux-promise";
import { Provider } from "react-redux";
import { composeWithDevTools } from "redux-devtools-extension";
import Reducer from "./reducers";
import App from "./app";

const store = createStore(
    Reducer,
    composeWithDevTools(applyMiddleware(reduxPromise))
);

let component = (
    <Provider store={store}>
        <App />
    </Provider>
);

ReactDOM.render(component, document.querySelector("main"));
