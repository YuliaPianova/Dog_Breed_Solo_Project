import axios from "axios";
import React, { useState } from "react";
import {  useParams } from "react-router-dom";




const NewComment = () => {

    const [text, setText] = useState("");
    const [textList, setTextList] = useState("");

    const [errors, setErrors] = useState({});
    


    const handleAddComment = (e) => {
        //e.preventDefault();
        
        console.log({
            text:text
        });
        setTextList([...textList, text]);

        axios.post(`http://localhost:8000/api/comments`, {

            text: text
        },

            { withCredentials: true }

        )
            .then((response) => {
                console.log("Comment added", response);
                
            })
            .catch((err) => {
                console.log("error with adding comment", err.response);
                setErrors(err.response.data.errors);
            });
    };

    return(



    <div>
        
        <form onSubmit={handleAddComment} >
                    <div className="row">

                        <div className="col-6">

                            <div className="form-group">
                                <label htmlFor="text">Comment: </label>
                                <input type="text" id="text" value={text} className="form-control" onChange={(e) => setText(e.target.value)} />

                                {errors.text && <p style={{ color: "red" }}>{errors.text.message}</p>}
                            </div>
                        </div>
                    </div>
                    <button className="btn btn-primary mt-3" type="submit">Add Comment</button>
        </form>

        </div> 

    )


};




export default NewComment;