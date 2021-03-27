import "./project.css";
import { FaGithub, FaDownload } from "react-icons/fa";

const Project = ({ project, onClick }) => {
    if(!project) return '';

    return (
        <div className="project">
            <LinkTitle project={project} onClick={onClick} />
            <img src={project.img} alt=""/>
            <div className="date">{project.lang}</div>
            <div dangerouslySetInnerHTML={{__html: project.description}}></div>
            <div className="links">
                <span><FaGithub /> <a href={project.code}>Source Code</a></span>
                <span><FaDownload /> <a href={project.download}>Latest release</a></span>
            </div>
        </div>
    )
}

const LinkTitle = ({ project, onClick }) => {
    return (
        <>
            { onClick === undefined ?
                <h3>{project.title}</h3>
                :
                <h3 onClick={() => onClick(project)} className="hover">{project.title}</h3>
            }
        </>
    )
}

export default Project
