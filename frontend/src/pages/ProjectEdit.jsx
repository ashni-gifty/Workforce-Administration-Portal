import { useParams } from "react-router-dom";
import ProjectForm from "./ProjectForm";
import { useEffect,useState } from "react";
import { getProject } from "../services/projectService";
import { useNavigate } from "react-router-dom";

function ProjectEdit() {
    //get the id from the url from the constant
    const {id} = useParams();
    //to save the details of the project obatined by using the id
    const [project, setProject] = useState(null);
    const navigate = useNavigate();

    //using useEffect() load the projecr details using id asynchronosouly
    useEffect(()=>{
        const loadProject = async()=>{
            const response = await getProject(id);
            setProject(response.data);
        };
        loadProject();
    },[id]);

    if(!project){
        return <p>Loading....</p>
    }

    return (
        <div>
            <ProjectForm projectToEdit={project}
            onSaved={()=>
                navigate("/projects")
            }>
            </ProjectForm>
        </div>
    );
}
export default ProjectEdit;