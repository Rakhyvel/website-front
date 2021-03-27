import Project from './Project';

const Projects = ({ projects, onClick }) => {
    console.log(projects);
    return (
        <>
            {projects.map(project => {
                return (<Project project={project} onClick={onClick}/>)
            })}
        </>
    )
}

export default Projects
