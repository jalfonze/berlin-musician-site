import React, { useEffect, useState } from "react";
import axios from "./axios";

export default function Search() {
    useEffect(() => {
        // axios.get("/get-recipe").then((response) => {
        //     console.log(response.data);
        // });
    }, []);

    let [searchInput, setSearchInput] = useState("");
    const [foodItems, setFoodItems] = useState([]);
    let [filteredOptions, setFilteredOptions] = useState([]);

    const handleSearch = (e) => {
        setSearchInput(e.target.value);
    };

    const foodSearch = () => {
        console.log("click");
        console.log("SEARCH INPUT!", searchInput);
        let searches = {
            searched: searchInput,
            filteredArr: filteredOptions,
        };
        axios.post("/get-recipe", searches).then((response) => {
            console.log(response.data);
            setFoodItems(response.data);
        });
        searchInput = "";
    };

    const checkBoxClick = (e) => {
        // console.log(e.target.value);
        if (e.target.checked) {
            setFilteredOptions([...filteredOptions, e.target.value]);
        } else if (!e.target.checked) {
            setFilteredOptions(
                filteredOptions.filter((option) => option !== e.target.value)
            );
        }
    };

    console.log(filteredOptions);

    const addToFave = (e) => {
        e.preventDefault();
        // console.log(e.target.value);
        // console.log(foodItems[e.target.value].recipe);
        const { label, ingredientLines, healthLabels, image, url } = foodItems[
            e.target.value
        ].recipe;

        let foodInfo = {
            label: label,
            ingredientLines: ingredientLines,
            yield: foodItems[e.target.value].recipe.yield,
            image: image,
            url: url,
            healthLabels: healthLabels,
        };
        axios.post("/add-to-fave", foodInfo).then((response) => {
            console.log(response.data);
        });
    };
    // console.log("FOOD ITEMS", foodItems);

    return (
        <React.Fragment>
            <div>
                <h1>Type an ingredient</h1>
            </div>
            <div>
                <input
                    onChange={handleSearch}
                    type="text"
                    name="search"
                    placeholder="type an ingredient"
                ></input>
                <label htmlFor="peanut-free">Peanut Free</label>
                <input
                    type="checkbox"
                    name="health"
                    value="peanut-free"
                    id="peanut-free"
                    onClick={checkBoxClick}
                ></input>
                <label htmlFor="alcohol-free">Alcohol Free</label>
                <input
                    type="checkbox"
                    name="health"
                    value="alcohol-free"
                    id="alcohol-free"
                    onClick={checkBoxClick}
                ></input>
                <label htmlFor="vegan">Vegan</label>
                <input
                    type="checkbox"
                    name="health"
                    value="vegan"
                    id="vegan"
                    onClick={checkBoxClick}
                ></input>
                <label htmlFor="vegetarian">Vegetarian</label>
                <input
                    type="checkbox"
                    name="health"
                    value="vegetarian"
                    id="vegetarian"
                    onClick={checkBoxClick}
                ></input>
                <button onClick={foodSearch} type="submit">
                    Submit
                </button>
            </div>
            <div>
                {foodItems &&
                    foodItems.map((item, i) => {
                        return (
                            <div key={i}>
                                <h1>{item.recipe.label}</h1>
                                {item.recipe.healthLabels.map((label, i) => {
                                    return <p key={i}>{label}</p>;
                                })}
                                <img src={item.recipe.image}></img>
                                {item.recipe.ingredientLines.map(
                                    (ingredients, i) => {
                                        return <p key={i}>{ingredients}</p>;
                                    }
                                )}
                                <a
                                    href={item.recipe.url}
                                    target="_blank"
                                    rel="noreferrer"
                                >
                                    Full recipe here!
                                </a>
                                <button value={i} onClick={addToFave}>
                                    add to favourites
                                </button>
                            </div>
                        );
                    })}
            </div>
        </React.Fragment>
    );
}
