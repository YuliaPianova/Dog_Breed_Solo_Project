
import axios from "axios";
import React, { useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";

const NewBreed = () => {

    const [breed, setBreed] = useState("");
    const [picture, setPicture] = useState("");
    const [characteristics, setCharacteristics] = useState("");

    const [easyTrain, setEasyTrain] = useState(false);
    const [dogFriendly, setDogFriendly] = useState(false);
    const [kidFriendly, setKidFriendly] = useState(false);

    const [errors, setErrors] = useState({});
    const navigate = useNavigate();


    const handleAddBreed = (e) => {
        e.preventDefault();
        console.log({
            breed: breed,
            picture: picture,
            characteristics: characteristics,
            easyTrain: easyTrain,
            dogFriendly: dogFriendly,
            kidFriendly: kidFriendly
        });

        axios.post("http://localhost:8000/api/breeds", {

            breed: breed,
            picture: picture,
            characteristics: characteristics,
            easyTrain: easyTrain,
            dogFriendly: dogFriendly,
            kidFriendly: kidFriendly

        },

            { withCredentials: true }

        )
            .then((response) => {
                console.log("Breed added", response);
                navigate("/home")
            })
            .catch((err) => {
                console.log("error with adding breed", err.response);
                setErrors(err.response.data.errors);
            });
    };

    const logout = (e) => {
        axios.post(`http://localhost:8000/api/users/logout`, {},  // empty {} for clearing cookies
        { withCredentials: true},
        )
        .then((res) => {
            console.log(res);
            console.log(res.data);
            navigate("/");
        })
        .catch((err) => {
            console.log(err);
        });
    };

    return (

        <div>
            <div className="container">
            <nav className="navbar navbar-expand-sm navbar-light bg-light my-3">
                <form className="container-fluid justify-content-end">
                    <button className="btn btn-outline-success me-2" type="button" onClick = {() => navigate (`/home`)}>Home</button>
                    <button className="btn  btn-outline-success" type="button" onClick = {logout}>Logout</button>
                </form>
            </nav>
            </div>


            <div className=" container-sm mx-auto">

                <div className="row ">
                    <div>
                        <h1 className=" my-3 mb-5"> Add Your Favorite Dog Breed</h1>
                    </div>
                </div>


                <div className="row pb-5 ps-5">



                    <form onSubmit={handleAddBreed} >
                    <div className="row">

                        <div className="col-6">

                            <div className="form-group">
                                <label htmlFor="breed">Breed: </label>
                                <input type="text" id="breed" value={breed} className="form-control" onChange={(e) => setBreed(e.target.value)} />

                                {errors.breed && <p style={{ color: "red" }}>{errors.breed.message}</p>}
                            </div>

                            <div>
                                <label htmlFor="picture">Picture URL</label>
                                <input type="text" id="picture" className="form-control" onChange={(e) => setPicture(e.target.value)}
                                />
                            </div>
                            {errors.picture && (
                                <p style={{ color: "red" }}>{errors.picture.message}</p> //---------------
                            )}

                            <div className="form-group">
                                <label htmlFor="characteristics">Characteristics:</label>
                                <textarea className="form-control" style={{ height: 150 }} id="characteristics" value={characteristics} onChange={(e) => setCharacteristics(e.target.value)}></textarea>
                            </div>

                            {errors.characteristics && (<p style={{ color: "red" }}>{errors.characteristics.message}</p>)}

                            

                        </div>

                        <div className="col-6 mt-4">

                            <div className=" mb-4">
                                <label htmlFor="easyTrain">Easy to train?</label>
                                <input
                                    type="checkbox"
                                    id="easyTrain"
                                    checked={easyTrain}
                                    onChange={(e) => setEasyTrain(!easyTrain)} />

                            </div>
                            {errors.easyTrain && (<p style={{ color: "red" }}>{errors.easyTrain.message}</p>)}

                            



                            <div className="  mb-4">
                                <label htmlFor="dogFriendly">Dog-friendly?</label>
                                <input
                                    type="checkbox"
                                    id="dogFriendly"
                                    checked={dogFriendly}
                                    onChange={(e) => setDogFriendly(!dogFriendly)} />
                            </div>
                            {errors.dogFriendly && (<p style={{ color: "red" }}>{errors.dogFriendly.message}</p>)}


                            <div className="mb-4">
                                <label htmlFor="kidFriendly">Kid-friendy?</label>
                                <input
                                    type="checkbox"
                                    id="kidFriendly"
                                    checked={kidFriendly}
                                    onChange={(e) => setKidFriendly(!kidFriendly)}
                                />
                                {errors.kidFriendly && (<p style={{ color: "red" }}>{errors.kidFriendly.message}</p>)}
                            </div>



                            <button className="btn btn-primary mt-3" type="submit">Add Breed</button>



                        </div>
                    </div>

                    </form>

                </div>


            </div >


        </div>


            );
};




export default NewBreed;










/*

<div className=" container-sm mx-auto">
        <div className="d-flex justify-content-between align-items-center col-6 mx-auto my-3">

            <h1> Add a New Breed</h1>



            <Link to="/home">back to home</Link>

        </div>


        <form onSubmit={handleAddBreed} >

            <div className="row d-flex justify-content-around col-12 mt-4">

                <div className="col-md-5">
                    <div className="form-group">
                        <label htmlFor="breed">Breed: </label>
                        <input type="text" id="breed" value={breed} className="form-control" onChange={(e) => setBreed(e.target.value)} />


                        {errors.breed && <p style={{ color: "red" }}>{errors.breed.message}</p>}
                    </div>
                    <div>
                        <label htmlFor="picture">Picture URL</label>
                        <input
                            type="text"
                            id="picture"
                            onChange={(e) => setPicture(e.target.value)}
                        />
                    </div>
                    {errors.picture && (
                        <p style={{ color: "red" }}>{errors.picture.message}</p>
                    )}


                    <div className="form-group">
                        <label htmlFor="characteristics">Characteristics: </label>
                        <input type="text" id="characteristics" value={characteristics} className="form-control" onChange={(e) => setCharacteristics(e.target.value)} />
                    </div>

                    {errors.characteristics && (<p style={{ color: "red" }}>{errors.characteristics.message}</p>)}
                </div>



                <div className="col-md-5">

                    <div>
                        <label htmlFor="easyTrain">Easy to train?</label>
                        <input
                            type="checkbox"
                            id="easyTrain"
                            checked={easyTrain}
                            onChange={(e) => setEasyTrain(!easyTrain)} />

                    </div>
                    {errors.easyTrain && (<p style={{ color: "red" }}>{errors.easyTrain.message}</p>)}

                    <div>
                        <label htmlFor="dogFriendly">Dog-friendly?</label>
                        <input
                            type="checkbox"
                            id="dogFriendly"
                            checked={dogFriendly}
                            onChange={(e) => setDogFriendly(!dogFriendly)} />
                    </div>
                    {errors.dogFriendly && (<p style={{ color: "red" }}>{errors.dogFriendly.message}</p>)}

                    <div>
                        <label htmlFor="kidFriendly">Kid-friendy?</label>
                        <input
                            type="checkbox"
                            id="kidFriendly"
                            checked={kidFriendly}
                            onChange={(e) => setKidFriendly(!kidFriendly)}
                        />
                        {errors.kidFriendly && (<p style={{ color: "red" }}>{errors.kidFriendly.message}</p>)}
                    </div>



                    <button className="btn btn-primary mt-3" type="submit">Add Breed</button>

                </div>





            </div>
        </form>

    </div>


    );
};
    */



