import React, { useEffect, useState } from "react";
import axios from "./axios";
import { Link } from "react-router-dom";

export default function Registration() {
    const [inputValues, setInputValues] = useState({
        username: "",
        email: "",
        password: "",
    });
    const [errMsg, setErrMsg] = useState("");

    const handleChange = (e) => {
        // console.log(e.target.name.value);
        const { name, value } = e.target;
        // console.log(name, value);
        setInputValues({ ...inputValues, [name]: value });
    };

    const createUser = (e) => {
        e.preventDefault();
        // console.log("click");
        axios.post("/createUser", inputValues).then((response) => {
            console.log(response.data);
            if (response.data.success == false) {
                setErrMsg(response.data.errMsg);
            } else if (response.data.sessionUserId) {
                location.replace("/");
            }
        });
    };
    console.log(errMsg);

    return (
        <React.Fragment>
            <form>
                <h2>{errMsg}</h2>
                <label>Username</label>
                <input
                    onChange={handleChange}
                    name="username"
                    type="text"
                    placeholder="Username"
                ></input>
                <label>Email</label>
                <input
                    onChange={handleChange}
                    name="email"
                    type="email"
                    placeholder="Your Email"
                ></input>
                <label>Password</label>
                <input
                    onChange={handleChange}
                    name="password"
                    type="password"
                    placeholder="Password"
                ></input>
                <label>Create Account</label>
                <button onClick={createUser} type="submit">
                    Submit
                </button>
            </form>
        </React.Fragment>
    );
}
