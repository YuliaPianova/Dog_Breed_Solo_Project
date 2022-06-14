import { useState, useEffect } from "react";
import { useNavigate, useParams, Link } from "react-router-dom";
import axios from "axios";
import NewComment from "../views/NewComment";

const OneBreed = (props) => {

    const { breed } = useParams();
    
    const { id } = useParams();
    
    const navigate = useNavigate();
    const [oneBreed, setOneBreed] = useState({});
    const [user, setUser] = useState({});/////////
    //const [comment, setComment] = useState({});///////////
    const [commentList, setCommentList] = useState([]);///////////


    useEffect(() => {
        axios.get(`http://localhost:8000/api/breeds/${id}`)   //get one breed
            .then((res) => {
                console.log(res.data);
                setOneBreed(res.data);

            
                
            })
            .catch((err) => {
                console.log(err);
            });
    }, [id]);

    const deleteHandler = () => {                                 // delete breed
        axios.delete(`http://localhost:8000/api/breeds/${id}`)
            .then((res) => {
                console.log(res);
                console.log(res.data);

                navigate("/home");
            })
            .catch((err) => {
                console.log(err);
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

    
    
    useEffect(() => {
        axios.get(`http://localhost:8000/api/comments`)  //Comments
            .then((res) => {
                console.log(res);
                console.log(res.data);
                setCommentList(res.data);
            })
            .catch((err) => console.log(err))
    }, [])
    

    useEffect(() => {
        axios.get(`http://localhost:8000/api/commentsbybreed/${breed}`)  //Comments by Breed
            .then((res) => {
                console.log(res);
                console.log(res.data);
                //setComment(res.data); /////////????
                setCommentList(res.data);
            })
            .catch((err) => console.log(err))
    }, [])



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



    //////////////

    const deleteCommentHandler = (idFromBel) =>{
        axios.delete(`http://localhost:8000/api/comments/${idFromBel}`)   //DELETE Comment

        .then((res) => {
            console.log(res);
            console.log(res.data);
            setCommentList(commentList.filter(comment => comment._id !== idFromBel))
        })
        .catch((err) => console.log(err))
    }
    
        
    
    /////////////


    return(

    <div>

        <div className="container">
                <nav className="navbar navbar-expand-sm navbar-light bg-light my-3">
                    <form className="container-fluid justify-content-end">
                        <button className="btn btn-outline-success me-2" type="button" onClick = {() => navigate (`/home`)}>Home</button>
                        <button className="btn btn-outline-success me-2" type="button" onClick = {() => navigate (`/user/profile/${oneBreed.createdBy?.username}`)}>Added By</button>
                        <button className="btn  btn-outline-success me-2" type="button" onClick = {logout}>Logout</button>

                        {oneBreed.createdBy === user._id && (
                            <div>
                                <button className="btn btn-outline-success me-2" type="button" onClick = {() => navigate (`/breed/edit/${oneBreed._id}`)}>Edit</button>
                                <button className="btn  btn-outline-danger" type="button" onClick={deleteHandler}>Delete</button>
                            </div>
                        )}

                        
                    </form>
                </nav>
        </div>


        <div className=" container-sm mx-auto pb-5 px-4">
    
            <div className="row">
                <div>
                    <h1 className=" my-5"> About {oneBreed.breed} </h1>
                </div>
            </div>


            <div class="card border-dark mx-auto mb-3 ">

                <div className="row ">

                    <div className=" col-8 ">
                        <div class="clearfix"> 
                            <img  src={oneBreed.picture} alt=""  class="col-md-6 float-md-end mb-3 ms-md-3" />
                            <p className="card-title  fs-5 mt-3 ">Characteristics: {oneBreed.characteristics}</p>
                        </div>
                    </div>


                    <div className=" col-4 mt-5">
                        <h4 className="card-title  fs-5 mt-3 mb-4">Easy to Train?  {oneBreed.easyTrain ?  <p>Yes</p> : <p>No</p>}</h4>
                        <h4 className="card-title  fs-5 mt-3 mb-4">Dog-friendly? {oneBreed.dogFriendly ? <p>Yes</p> : <p>No</p>}</h4>
                        <h4 className="card-title  fs-5 mt-3">Kid-friendly? {oneBreed.kidFriendly ? <p>Yes</p> : <p>No</p>}</h4>
                    </div>

                </div>
                
            </div>

        </div>





        
        <div className="row ms-5 px-5">

            <div className="col-6 mt-5 "> 
            
                            <NewComment />
            </div>

            <div className="col-6 mt-5 ">
            
                


                {commentList.map((comment,index) => {
                    return(

                        <div className="row pe-5">
                            

                                <div className="col-6 "
                                    key={index}>
                                    {comment.text}
                                </div>

                                <div className="col-6 ">
                                    <button className="btn btn-outline-danger mb-2" type="button" onClick={() => deleteCommentHandler(comment._id)}>delete comment</button>
                                </div>

                            
                        </div>
                    )
            })}
            
            
            </div>

        </div>

    </div>

    );

    }

    export default OneBreed;