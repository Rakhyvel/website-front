import Project from './Project'
import {Redirect} from 'react-router-dom';
import {useState} from 'react';

const DeleteProject = ({project, onDelete}) => {
    const [submitted, setSubmitted] = useState(false);

    return (
        <>
            {submitted ? <Redirect to="/dashboard"/> : ''}
            <form className="form" onSubmit={(e) => {
                e.preventDefault();
                onDelete(e);
                setSubmitted(true);
            }}>
                <p style={{color:"red"}}>Delete this masterpiece?</p>
                <Project project={project}/>
                <div>
                    <button>Delete</button>
                </div>
            </form>
        </>
    )
}

export default DeleteProject
