import "../common.css";
import Post from "./Post"
import {Redirect} from 'react-router-dom';
import {useState} from 'react';

const DeletePost = ({post, onDelete}) => {
    const [submitted, setSubmitted] = useState(false);

    return (
        <>
            {submitted ? <Redirect to="/dashboard"/> : 'Not today!'}
            <form className="form" onSubmit={(e) => {
                e.preventDefault();
                onDelete(e);
                setSubmitted(true);
            }}>
                <p style={{color:"red"}}>Delete this masterpiece?</p>
                <Post post={post} synopsis={false}/>
                <div>
                    <button>Delete</button>
                </div>
            </form>
        </>
    )
}

export default DeletePost
