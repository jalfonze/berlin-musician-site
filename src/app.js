import React, { useEffect, useState } from "react";
import { BrowserRouter, Link, Route } from "react-router-dom";
import Profile from "./profile";
import Search from "./search";
import MyFavourites from "./my-favourites";
import MyRecipes from "./my-recipes";
import axios from "./axios";

export default function App() {
    const logOut = () => {
        axios.get("/logout");
    };

    return (
        <React.Fragment>
            <BrowserRouter>
                <div className="nav">
                    <img src="/logo.png" width="100px"></img>
                    <h5>
                        <Link to="/">
                            <i className="fas fa-user"></i>
                        </Link>
                    </h5>
                    <h5>
                        <Link to="/search">
                            <i className="fas fa-search"></i>
                        </Link>
                    </h5>
                    <h5>
                        <Link to="/my-fave">
                            <i className="fas fa-bookmark"></i>
                        </Link>
                    </h5>
                    <h5>
                        <Link to="/my-recipes">
                            <i className="fas fa-book"></i>
                        </Link>
                    </h5>
                    <h5>
                        <a href="/welcome" onClick={logOut}>
                            <i className="fas fa-sign-out-alt"></i>
                        </a>
                    </h5>
                </div>

                <Route exact path="/" render={() => <Profile />} />
                <Route path="/search" render={() => <Search />} />
                <Route path="/my-fave" render={() => <MyFavourites />} />
                <Route path="/my-recipes" render={() => <MyRecipes />} />
            </BrowserRouter>
        </React.Fragment>
    );
}
