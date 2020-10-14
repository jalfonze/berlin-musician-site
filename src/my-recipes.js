import React, { useEffect, useState } from "react";
import axios from "./axios";

export default function MyRecipes() {
    const [inputValues, setInputValues] = useState({
        label: "",
        ingredients: "",
        yield: 0,
        method: "",
    });
    // const [errMsg, setErrMsg] = useState("");

    const [myRecipes, setMyRecipes] = useState([]);

    useEffect(() => {
        axios.get("/get-my-recipes").then((response) => {
            console.log(response.data);
            setMyRecipes(response.data);
        });
    }, []);

    console.log("MY RECIPES", myRecipes);

    const handleChange = (e) => {
        // console.log(e.target.name.value);
        let { name, value } = e.target;
        // console.log(name, value);
        setInputValues({ ...inputValues, [name]: value });
    };

    // console.log(inputValues);

    const submitRecipe = (e) => {
        e.preventDefault();
        // console.log("SUBMIT", inputValues);
        axios.post("/create-recipe", inputValues).then(() => {});
    };

    return (
        <React.Fragment>
            {/* <h1>you currently have no peronal recipes</h1> */}
            <h2>Create a recipe here</h2>
            <div className="my-recipe-page">
                <div className="my-recipe-form">
                    <label htmlFor="label">Name of dish</label>
                    <input
                        onChange={handleChange}
                        type="text"
                        id="label"
                        name="label"
                        placeholder="name of your dish"
                    ></input>
                    <label htmlFor="ingred">Ingredients</label>
                    <textarea
                        onChange={handleChange}
                        rows="10"
                        cols="30"
                        id="ingred"
                        name="ingred"
                        placeholder="ingredients"
                    ></textarea>
                    <label htmlFor="yield">Yield</label>
                    <input
                        onChange={handleChange}
                        type="number"
                        id="yield"
                        name="yield"
                        min="1"
                    ></input>
                    <label htmlFor="method">Method</label>
                    <textarea
                        onChange={handleChange}
                        rows="10"
                        cols="40"
                        id="method"
                        name="method"
                        placeholder="method"
                    ></textarea>
                    <button onClick={submitRecipe}>Save this recipe</button>
                </div>
                <div>
                    <h2>Here are you recipes</h2>
                    {(!myRecipes && <h1>You currently have no recipes</h1>) ||
                        (myRecipes &&
                            myRecipes.map((recipe, i) => {
                                return (
                                    <div key={i}>
                                        <h1>{recipe.label}</h1>
                                    </div>
                                );
                            }))}
                </div>
            </div>
        </React.Fragment>
    );
}
