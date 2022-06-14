
import React, { useEffect, useState } from "react";
import axios from "axios";
import "../App.css";
import { Link, useNavigate } from "react-router-dom";

const AllBreeds = (props) => {  

    const [breedList, setBreedList] = useState([]);
    const [user, setUser] = useState({});


    const navigate = useNavigate();

    useEffect(() => {
        axios.get(`http://localhost:8000/api/breeds`)  //BREEDS
            .then((res) => {
                console.log(res);
                console.log(res.data);
                setBreedList(res.data);
            })
            .catch((err) => console.log(err))
    }, [])

    const deleteHandler = (idFromBelow) =>{
        axios.delete(`http://localhost:8000/api/breeds/${idFromBelow}`)   //DELETE BREED

        .then((res) => {
            console.log(res);
            console.log(res.data);
            setBreedList(breedList.filter(breed => breed._id !== idFromBelow))
        })
        .catch((err) => console.log(err))
    }

    useEffect(() => {
        axios.get(`http://localhost:8000/api/users`,   //USERS  Loged In user from getLoggedInUser
                    {withCredentials: true}
        ).then((res) => {
            console.log(res.data);
            setUser(res.data);
        })
        .catch((err) => {
            console.log(err);
        })
    }, [])

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


    return(

        <div>
            <div className="container">

                <nav className="navbar navbar-expand-sm my-3 navbar-light bg-light">
                    <form className="container-fluid justify-content-end">
                        <button className="btn btn-outline-success me-2" type="button" onClick = {() => navigate (`/new`)}>Add New Breed</button>
                        <button className="btn  btn-outline-success me-2" type="button" onClick = {logout}>Logout</button>
                    </form>
                </nav>


                <div className="row">
                        <div>
                            <h1 className=" my-3 mb-5"> Favorite Dog Breeds</h1>
                        </div>
                </div>

                <table className=" table table-striped  border-start  border-end border-secondaryp-2 border-opacity-10 mb-2  mt-3">
                        <thead>
                            <tr>
                                <th scope="col">Picture</th>
                                <th scope="col">Breed</th>
                                <th scope="col">Easy to train</th>
                                <th scope="col">Dog-friendly</th>
                                <th scope="col">Kid-friendly</th>
                                <th scope="col">Actions</th>
                            </tr>
                        </thead>

                        <tbody>
                            {breedList.map((breed, index) => {
                                return (
                                    <tr key={index}>
                                            <td>
                                                <img className = "rounded-3" style={{ height: "200px" }} src={breed.picture} alt="" />
                                            </td>

                                            <td>{breed.breed}</td>

                                        {breed.easyTrain ? <td>Yes</td> : <td>No</td>}
                                        

                                        {breed.dogFriendly ? <td>Yes</td> : <td>No</td>}
                                    

                                        {breed.kidFriendly ? <td>Yes</td> : <td>No</td>}
                                        

                                            <td>

                                                <div className="btn-group mt-5">

                                                    <button className="btn btn-outline-success me-2" type="button" onClick = {() => navigate (`/breed/${breed._id}`)}>About</button>

                                                    {breed.createdBy._id === user._id && (
                                                        <div>
                                                            <button className="btn btn-outline-success me-2" type="button" onClick = {() => navigate (`/breed/edit/${breed._id}`)}>Edit</button>
                                        
                                                            <button className="btn btn-outline-success me-2" type="button" onClick={() => deleteHandler(breed._id)}>Delete</button>
                                                        </div>

                                                    )}

                                                </div>

                                                <div className="mt-5">
                                                    <Link to={`/user/profile/${breed.createdBy?.username}`}>Added by {breed.createdBy?.username}</Link> 
                                                </div>

                                                

                                            </td>
                                    </tr>
                                );
                            })}
                        </tbody>
                    </table>




            </div>
        </div>






    );

};







    export default AllBreeds;

    /*

    return (
        <div className="container">
            <div className="row col-12 mx-auto">
                <div className="d-flex justify-content-between align-items-center col-6 mx-auto my-3">

                    <h1> Favorite Dog Breeds</h1>
                    <Link to="/new">Add a New Breed </Link>
                    <button onClick = {logout}>Logout</button>
                </div>

                    

                    <table className=" table table-striped mt-3">
                        <thead>
                            <tr>
                                <th scope="col">Picture</th>
                                <th scope="col">Breed</th>
                                <th scope="col">Easy to train</th>
                                <th scope="col">Dog-friendly</th>
                                <th scope="col">Kid-friendly</th>
                                <th scope="col">Actions</th>
                            </tr>
                        </thead>

                        <tbody>
                            {breedList.map((breed, index) => {
                                return (
                                    <tr key={index}>
                                        <td>
                                            <img style={{ height: "200px" }} src={breed.picture} alt="" />
                                        </td>

                                        <td>{breed.breed}</td>

                                        {breed.easyTrain ? <td>Yes</td> : <td>No</td>}
                                        

                                        {breed.dogFriendly ? <td>Yes</td> : <td>No</td>}
                                    

                                        {breed.kidFriendly ? <td>Yes</td> : <td>No</td>}
                                        

                                        <td className="d-flex  justify-content-around">

                                            <Link to={`/breed/${breed._id}`}>Details  </Link>

                                            <Link to={`/breed/edit/${breed._id}`}>   Edit</Link>

                                            
                                            <Link to={`/user/profile/${breed.createdBy?.username}`}>Added by {breed.createdBy?.username}</Link> 

                                            <button onClick={() => deleteHandler(breed._id)}>Delete</button>
                                            
                                    
                                        </td>
                                    </tr>
                                );
                            })}
                        </tbody>
                    </table>
                </div>
            </div>
        
    );
};



export default AllBreeds;

*/