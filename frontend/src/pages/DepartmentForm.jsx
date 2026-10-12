import { useEffect, useState } from "react";
import { addDepartment, updateDepartment } from "../services/departmentService";

function DepartmentForm({loadDepartments,departmentToEdit,setDepartmentToEdit}){
    // usestate var to hold the dept name 
    const [departmentName, setDepartmentName] = useState("");

    // using the useEffect() hook with the dependent variable is set as
    //departmentToEdit, we will populate the textbox with their dept name
    useEffect(()=>{
        if(departmentToEdit){
            // populate the textbox
            setDepartmentName(departmentToEdit.DepartmentName);
        }
        else{
            setDepartmentName("");
        }
    },[departmentToEdit]);

    //fn to save departments
    const saveDepartment = async()=>{
        if(departmentName.trim() === ""){
            alert("Department Name is required");
            return;
        }
        if(departmentToEdit) {
            await updateDepartment(
                departmentToEdit.DepartmentId,
                {DepartmentName:departmentName}
            );
            setDepartmentToEdit(null);
            loadDepartments();
        } else{
            await addDepartment(
                {DepartmentName:departmentName}
            );
            setDepartmentName("");
            loadDepartments();
        }
    }

    return(
        <div>
            <h3>{departmentToEdit ? "Edit Department":"Add Department"}</h3>
            <input className="form-control" placeholder="Enter Dept Name"
            onChange={(e)=> setDepartmentName(e.target.value)}
            value={departmentName}/>
            <button className="btn btn-primary mt-3" 
            onClick={saveDepartment}>
                {departmentToEdit ? "Update":"Add"}
            </button>
        </div>
    );
}
export default DepartmentForm