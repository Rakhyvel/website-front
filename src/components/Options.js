import "./options.css";
import {
    Link,
  } from "react-router-dom";

const Options = () => {
    return (
        <>
        <h1>Dashboard</h1>
        <div className="options">
            <p>Blog actions</p>
            <Link to="/dashboard/add-post">Add a post</Link>
            <Link to="/dashboard/edit-post">Edit a post</Link>
            <Link to="/dashboard/delete-post">Delete a post</Link>
        </div>
        <div className="options">
            <p>Portfolio action</p>
            <Link to="/dashboard/add-project">Add a project</Link>
            <Link to="/dashboard/edit-project">Edit a project</Link>
            <Link to="/dashboard/delete-project">Delete a project</Link>
        </div>
        </>

    )
}

export default Options
