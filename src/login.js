import React, { useEffect, useState } from "react";
import axios from "./axios";
import { Link } from "react-router-dom";

export default function Login() {
    const [inputValues, setInputValues] = useState({
        username: "",
        password: "",
    });
    const [errMsg, setErrMsg] = useState("");

    const handleChange = (e) => {
        console.log();
        const { name, value } = e.target;
        setInputValues({ ...inputValues, [name]: value });
    };

    const login = (e) => {
        e.preventDefault();
        console.log("click");
        axios.post("/login", inputValues).then((response) => {
            console.log(response.data);
            if (response.data.success == false) {
                setErrMsg(response.data.errMsg);
            } else if (response.data.success) {
                location.replace("/");
            }
        });
    };

    return (
        <React.Fragment>
            <form className="login-form">
                <h2>{errMsg}</h2>
                <label>Username</label>
                <input
                    onChange={handleChange}
                    type="text"
                    name="username"
                    placeholder="Your Username"
                ></input>
                <label>Password</label>
                <input
                    onChange={handleChange}
                    type="password"
                    name="password"
                    placeholder="Your Password"
                ></input>
                <label className="loginBtn" onClick={login}>
                    Log In
                </label>
            </form>
        </React.Fragment>
    );
}
