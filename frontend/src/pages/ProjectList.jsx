import { getProjects,deleteProject } from "../services/projectService";
import { useState, useEffect } from "react";
import { Link } from "react-router-dom";

function ProjectList() {
    //declare usestate vars to store dept list , loading status, error
    const[projects,setProjects] = useState([]);
    const[loading, setLoading] = useState(true);
    const[error, setError] = useState("");
    // // declare a usestate var to store the dept that is currently being editable
    // const[projectToEdit, setProjectToEdit] = useState(null);
    
    // declare a function to get the list of depts by asynchoronosly
    // calling the getProjects() fn from projectService
    const loadProjects = async() => {
        try{
            const response = await getProjects();
            setProjects(response.data);
        } catch {
            setError("Unable to load Projects!!")
        } finally {
            setLoading(false);
        }
    };

    //create a function to handle delete
    const handleDelete = async(id) => {
        const confirmed = window.confirm("Do you want to Delete Project");
        if(!confirmed){ //if user cancelles
            return;
        }
        await deleteProject(id);
        loadProjects();
    }


    // use the useEffect() hook with blank dependent array[]
    // to run the loadProjects() fn only once the page loadProjects
    useEffect(()=> {
        loadProjects();
    },[]);

    return(
        <>
            <h2>Project List</h2>
            {loading && <div className="alert alert-info">Loading....</div>}
            {error && <div className="alert alert-danger">{error}</div>}
            <Link to="/projects/add" className="btn btn-primary mb-3">Add Projects</Link>
            {/* <pre>{JSON.stringify(projects)}</pre> */}
            <table className="table table-bordered table-hover ">
                <thead>
                    <tr>
                    <th>Project ID</th>
                    <th>Project Name</th>
                    <th>Employee Included</th>
                    <th>Actions</th>
                    </tr>
                </thead>
                <tbody>
                    {projects.map(project =>(
                        <tr key={project.id}>
                            <td>{project.id}</td>
                            <td>{project.name}</td>
                            <td>{project.employee_details.map(employee=>
                                employee.EmployeeName).join(",")}</td>
                            <td>
                            <Link className="btn btn-warning btn-sm"
                            to={`/projects/edit/${project.id}`}>Edit</Link>
                            <button className="btn btn-danger btn-sm ms-2"
                            onClick={()=>handleDelete(project.id)}>Delete</button>
                            </td>
                        </tr>
                    ))}
                </tbody>
            </table>
        </>
        ); 
}
export default ProjectList;
