/*
    Confusingly handles both adding and editing posts, since they share pretty
    much all functionality. 
*/

import "../common.css";
import {useState} from 'react';
import {Redirect} from 'react-router-dom';
import Post from './Post';

const AddPost = ({post, onPost, setPost}) => {
    const [title, setTitle] = useState(post?.title ? post.title : '')
    const [desc, setDesc] = useState(post?.description ? post.description : '')
    const [text, setText] = useState(post?.content ? post.content : '')
    const [priv, setPrivate] = useState(post?.private ? post.private : false)
    const [submitted, setSubmitted] = useState(false);

    const updateTitle = (e) => {
        setTitle(e.target.value);
        update();
    }

    const updateDesc = (e) => {
        setDesc(e.target.value);
        update();
    }

    const updateText = (e) => {
        setText(e.target.value);
        update();
    }

    const updatePrivate = (e) => {
        setPrivate(e.currentTarget.checked);
        update();
    }

    const update = () => {
        setPost({_id: post?._id, title: title, description: desc, content: text, private: priv});
    }

    return (
        <>
            {submitted ? <Redirect to="/dashboard"/> : ''}
            <form className="form" onSubmit={async (e) => {
                e.preventDefault();
                update();
                onPost(e);
                await setSubmitted(true);
            }}>
                <label>
                    <p>Title</p>
                    <input type="text" value={title} onChange={updateTitle} onBlur={updateTitle} required/>
                </label>
                <label>
                    <p>Description</p>
                    <input type="text" value={desc} onChange={updateDesc} onBlur={updateDesc} required/>
                </label>
                <label>
                    <p>Content</p>
                    <textarea rows="20" cols="65" value={text} onChange={updateText} onBlur={updateText} required/>
                </label>
                <label>
                    <span>Private </span>
                    <input type="checkbox" value={priv} checked={priv} onChange={updatePrivate} onBlur={updatePrivate}/>
                </label>
                <div>
                    <button>Post</button>
                </div>
            </form>
            <p><u>Preview:</u></p>
            <Post post={{title: title, date: new Date(Date.now()).toISOString(), description: desc, content: text, private: priv}} synopsis={true}/>
            <Post post={{title: title, date: new Date(Date.now()).toISOString(), description: desc, content: text}} synopsis={false}/>
        </>
    )
}

export default AddPost
