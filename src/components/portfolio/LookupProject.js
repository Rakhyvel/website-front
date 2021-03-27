import Projects from './Projects'

const LookupProject = ({ projects, setProject }) => {
    return (
        <>
            <p>Click on the project you want:</p>
            <Projects projects={projects} onClick={setProject} />
        </>
    )
}

export default LookupProject
