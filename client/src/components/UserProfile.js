import axios from "axios";
import React, {useState, useEffect} from "react";
import { Link, useParams, useNavigate } from "react-router-dom";



const UserProfile = (props) => {

    const { username } = useParams();

    const [userBreedList, setUserBreedList] = useState([]);

    const navigate = useNavigate();

    useEffect(() => {
        axios.get(`http://localhost:8000/api/breedsbyuser/${username}`,

        { withCredentials: true}
        )
        .then ((res) => {
            console.log(res.data);
            setUserBreedList(res.data);
        })
        .catch((err) => {
            console.log(err)
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
                <nav className="navbar navbar-expand-sm navbar-light bg-light my-3">
                    <form className="container-fluid justify-content-end">
                        <button className="btn btn-outline-success me-2" type="button" onClick = {() => navigate (`/home`)}>Home</button>
                        <button className="btn  btn-outline-success me-2" type="button" onClick = {logout}>Logout</button>
                        
                    </form>
                </nav>
            </div>


            <div className=" container-sm mx-auto">

            <div className="row">
                        <div>
                            <h1 className=" my-3 mb-5"> {username} Profile</h1>

                            <h3 className="mb-5">There are breeds {username} added:</h3>


                        </div>

                        { userBreedList.map((breed, index) => {
                            return(
                                    <div key = {index}>

                                        <Link to={`/breed/${breed._id}`}>{breed.breed}</Link> 

                                        

                                        <p>
                                            <img style={{ height: "200px" }} src={breed.picture} alt="" />
                                        </p>
                                    </div>
                            )
                        })
            
                        }
            </div>







            </div>

        </div>





    );




}

export default UserProfile


    /*
    return(
        <div>
            <h1>{username} Profile</h1>
            <h3>There are breeds {username} added:</h3>

            
            { userBreedList.map((breed, index) => {
                return(
                    <div key = {index}>
                        <p>{breed.breed}</p>
                        <p>
                                            <img style={{ height: "200px" }} src={breed.picture} alt="" />
                                    </p>
                    </div>
                )
                })
            
            }



        </div>
    )  */
