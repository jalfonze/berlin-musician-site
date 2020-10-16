import React, { useEffect, useState, useRef } from "react";
import axios from "./axios";
import { useDispatch, useSelector } from "react-redux";
import { getMyRecipe, addRecipe, delRecipe } from "./actions";

export default function MyRecipes() {
    const dispatch = useDispatch();
    const myRecipes = useSelector((state) => state.myRecipes);
    const [inputValues, setInputValues] = useState({
        label: "",
        ingred: "",
        yield: 0,
        method: "",
    });
    const [errMsg, setErrMsg] = useState("");

    const input = useRef();
    const input1 = useRef();
    const input2 = useRef();
    const input3 = useRef();

    const [modal, setModal] = useState(false);
    let [modalInfo, setModalInfo] = useState();
    // console.log("MY RECIPES", myRecipes);

    useEffect(() => {
        dispatch(getMyRecipe());
    }, []);

    const showModal = (num) => {
        console.log("click");
        console.log(num);
        setModal(true);
        console.log(myRecipes[num]);
        setModalInfo(myRecipes[num]);
    };

    const closeModal = () => {
        setModal(false);
    };

    const handleChange = (e) => {
        // console.log(e.target.name.value);
        let { name, value } = e.target;
        // console.log(name, value);
        setInputValues({ ...inputValues, [name]: value });
    };

    const submitRecipe = (e) => {
        e.preventDefault();
        if (
            inputValues.label == "" ||
            inputValues.ingred == "" ||
            inputValues.yield == 0 ||
            inputValues.method == ""
        ) {
            axios.post("/create-recipe", inputValues).then((response) => {
                console.log(response.data);
                if (response.data.success == false) {
                    setErrMsg(response.data.errMsg);
                }
            });
        } else {
            dispatch(addRecipe(inputValues));
        }
        input.current.value = "";
        input1.current.value = "";
        input2.current.value = "";
        input3.current.value = "";
    };

    const deleteRecipe = (num) => {
        console.log("click");
        console.log(myRecipes[num].id);
        dispatch(delRecipe(myRecipes[num].id));
    };

    // console.log(inputValues);

    return (
        <React.Fragment>
            <h1 className="recipes-page-title">Create a recipe here</h1>
            <div className="my-recipe-page">
                <div className="my-recipe-form">
                    <h2 className="errmsg">{errMsg}</h2>
                    <label htmlFor="label">Name of dish</label>
                    <input
                        ref={input}
                        onChange={handleChange}
                        type="text"
                        id="label"
                        name="label"
                        placeholder="name of your dish"
                    ></input>
                    <label htmlFor="ingred">Ingredients</label>
                    <textarea
                        ref={input1}
                        onChange={handleChange}
                        rows="10"
                        cols="30"
                        id="ingred"
                        name="ingred"
                        placeholder="ingredients"
                    ></textarea>
                    <label htmlFor="yield">Yield (Amount of dishes)</label>
                    <input
                        ref={input2}
                        onChange={handleChange}
                        type="number"
                        id="yield"
                        name="yield"
                        min="1"
                    ></input>
                    <label htmlFor="method">Method</label>
                    <textarea
                        ref={input3}
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
                    <h2 className="recipes-title">Here are you recipes</h2>
                    {(myRecipes && myRecipes.length == 0 && (
                        <h1>You currently have no recipes</h1>
                    )) ||
                        (myRecipes &&
                            myRecipes.map((recipe, i) => {
                                return (
                                    <div className="my-recipe-info" key={i}>
                                        <h1
                                            className="my-recipe-title"
                                            onClick={() => showModal(i)}
                                        >
                                            {recipe.label}
                                        </h1>
                                        <p onClick={() => deleteRecipe(i)}>
                                            delete
                                        </p>
                                    </div>
                                );
                            }))}
                    <div className="my-recipe-modal-parent">
                        {modal && modalInfo && (
                            <div className="my-recipe-modal">
                                <div className="my-rec-nav">
                                    <p onClick={closeModal}>
                                        <i className="fas fa-times close-modal-btn"></i>
                                    </p>
                                </div>
                                <div className="my-rec-info">
                                    <h3>Name: {modalInfo.label}</h3>
                                    <h4>
                                        Ingredients <br></br>
                                        {modalInfo.ingredients}
                                    </h4>
                                    <h4>
                                        Method <br></br>
                                        {modalInfo.method}
                                    </h4>
                                </div>
                            </div>
                        )}
                    </div>
                </div>
            </div>
        </React.Fragment>
    );
}
