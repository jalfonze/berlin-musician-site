import React, { useEffect, useState } from "react";
import { BrowserRouter, Link, Route } from "react-router-dom";
import Profile from "./profile";
import Search from "./search";
import MyFavourites from "./my-favourites";
import MyRecipes from "./my-recipes";
import axios from "./axios";

export default function App() {
    return (
        <React.Fragment>
            <BrowserRouter>
                <div className="nav">
                    <img src="/logo.png" width="100px"></img>
                    <h5>
                        <Link to="/search">Search</Link>
                    </h5>
                    <h5>
                        <Link to="/">Profile</Link>
                    </h5>
                    <h5>
                        <Link to="/my-fave">Favourites</Link>
                    </h5>
                    <h5>
                        <Link to="/my-recipes">My Recipes</Link>
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
