import { useEffect, useState } from "react";
import { getEmployees } from "../services/employeeService";
import { addProject,updateProject } from "../services/projectService";

function ProjectForm({projectToEdit, onSaved}) {
    // state var to store project name
    const[name,setName] = useState("");
    // state var array to store existing list to employees
    const [employees, setEmployees] = useState([]);
    //state var array to store the selected employees by the user
    const [selectedEmployees, setSelectedEmployees] = useState([]);

    //useEffect() to populate the edit form
    useEffect(
        () => {
            if(projectToEdit){
                setName(projectToEdit.name);
                setSelectedEmployees(projectToEdit.employees)
            }
        },[projectToEdit]);

    useEffect(
        () => {
            const loadEmployees = async() => {
                const response = await getEmployees();
                setEmployees(response.data);
                console.log(response.data);
            };
            loadEmployees();
        },[]
    );

    const saveProject = async () =>{
        if(name.trim() === ""){
                alert("Project Name is required");
                return;
            }
        if(selectedEmployees.length == 0){
                alert("Atleast one employee should be selected");
                return;
            }
        const project = {
            name:name,
            employees:selectedEmployees
        };
        if(projectToEdit){
            //edit operation
            await updateProject(projectToEdit.id,project);
        }else{
            //add operation
            await addProject(project);
        }
        //to tell the parent page that
        onSaved();
    }

    return (
        <div className="card p-3 mb-4">
            <h4>{projectToEdit ? "Edit" : "Add"} Project</h4>
            <div className="mb-3">
                <label className="form-label">Project Name</label>
                <input type="text" className="form-control" value={name}
                onChange={(e)=>setName(e.target.value)}/>
            </div>
            <div className="mb-3">
                <label className="form-label">Employees</label>
                {employees.map(employee => (
                    <div className="form-check" 
                    key={employee.EmployeeId}>
                        <input type="checkbox" className="form-check-input"
                        id={employee.EmployeeId}
                        checked={selectedEmployees.includes(employee.EmployeeId)}
                        onChange={(e)=>
                        {
                            if (e.target.checked){
                                //if checked add employee id to the selected employees list
                                // along with the existing employee ids
                                setSelectedEmployees([...selectedEmployees,employee.EmployeeId]);
                            }else{
                                //if not checked , remove the employee id from the setSelectedEmployees
                                //filter ()- returns the elements of an array that meet the condition specified in a callback function
                                //if an employee is unchecked return back the selectedEmployee list,
                                //after filtering out the id of the unchecked employee
                                setSelectedEmployees(
                                    selectedEmployees.filter(
                                        id=> id!==employee.EmployeeId
                                    )
                                )
                            }
                        }
                        }></input>
                        
                        <label className="form-check-label">
                            {employee.EmployeeName}
                        </label>
                    </div>
                ))}
            </div>
            <button className="btn btn-primary"
            onClick={saveProject}>{projectToEdit ? "Update" : "Create"} Project</button>
        </div>
    );
}

export default ProjectForm;