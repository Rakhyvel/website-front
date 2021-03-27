/*
    Confusingly handles both adding and editing posts, since they share pretty
    much all functionality. 
*/

import "../common.css";
import {useState, useEffect} from 'react';
import {Redirect} from 'react-router-dom';
import Project from './Project';

const AddProject = ({ project, onPost, setProject }) => {
    const [id] = useState(project?._id)
    const [title, setTitle] = useState(project?.title)
    const [img, setImg] = useState(project?.img)
    const [lang, setLang] = useState(project?.lang)
    const [desc, setDesc] = useState(project?.description)
    const [code, setCode] = useState(project?.code)
    const [down, setDown] = useState(project?.download)
    const [submitted, setSubmitted] = useState(false);

    const updateTitle = (e) => {
        setTitle(e.target.value);
    }

    const updateImg = (e) => {
        setImg(e.target.value);
    }

    const updateLang = (e) => {
        setLang(e.target.value);
    }

    const updateDesc = (e) => {
        setDesc(e.target.value);
    }

    const updateCode = (e) => {
        setCode(e.target.value);
    }

    const updateDown = (e) => {
        setDown(e.target.value);
    }

    useEffect(() => {
        setProject({_id: id, title: title, img: img, lang: lang, description: desc, code: code, download: down});
    }, [id, setProject, title, img, lang, desc, code, down]);

    return (
        <>
            {submitted ? <Redirect to="/dashboard"/> : ''}
            <form className="form" onSubmit={async (e) => {
                e.preventDefault();
                onPost(e);
                setSubmitted(true);
            }}>
                <label>
                    <p>Project title</p>
                    <input type="text" value={title} onChange={updateTitle} onBlur={updateTitle} required/>
                </label>
                <label>
                    <p>Image URL</p>
                    <input type="text" value={img} onChange={updateImg} onBlur={updateImg} required/>
                </label>
                <label>
                    <p>Language</p>
                    <input type="text" value={lang} onChange={updateLang} onBlur={updateLang} required/>
                </label>
                <label>
                    <p>Description</p>
                    <textarea rows="20" cols="" value={desc} onChange={updateDesc} onBlur={updateDesc} required/>
                </label>
                <label>
                    <p>GitHub URL</p>
                    <input type="text" value={code} onChange={updateCode} onBlur={updateCode} required/>
                </label>
                <label>
                    <p>Release URL</p>
                    <input type="text" value={down} onChange={updateDown} onBlur={updateDown} required/>
                </label>
                <div>
                    <button>Post</button>
                </div>
            </form>
            <p><u>Preview:</u></p>
            <Project project={project}/>
        </>
    )
}

export default AddProject
