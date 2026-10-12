import { useNavigate } from "react-router-dom";
import ProjectForm from "./ProjectForm";

function ProjectAdd(){
    const navigate = useNavigate();
    return(
            <div>
                <ProjectForm onSaved={() => navigate("/projects")}/> 
            </div>
        );
}
export default ProjectAdd;