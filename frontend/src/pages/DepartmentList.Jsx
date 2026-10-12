import { getDepartments,deleteDepartment } from "../services/departmentService";
import { useState, useEffect } from "react";
import DepartmentForm from "./DepartmentForm";

function DepartmentList() {
    //declare usestate vars to store dept list , loading status, error
    const[departments,setDepartments] = useState([]);
    const[loading, setLoading] = useState(true);
    const[error, setError] = useState("");
    // declare a usestate var to store the dept that is currently being editable
    const[departmentToEdit, setDepartmentToEdit] = useState(null);
    
    // declare a function to get the list of depts by asynchoronosly
    // calling the getDepartments() fn from departmentService
    const loadDepartments = async() => {
        try{
            const response = await getDepartments();
            setDepartments(response.data);
        } catch {
            setError("Unable to load departments!!")
        } finally {
            setLoading(false);
        }
    };

    //create a function to handle delete
    const handleDelete = async(id) => {
        const confirmed = window.confirm("Do you wnnat to Delete Department");
        if(!confirmed){ //if user cancelles
            return;
        }
        await deleteDepartment(id);
        loadDepartments();
    }


    // use the useEffect() hook with blank dependent array[]
    // to run the loadDepartments() fn only once the page loadDepartments
    useEffect(()=> {
        loadDepartments();
    },[]);

    return(
        <>
            <h2>Department List</h2>
            {loading && <div className="alert alert-info">Loading....</div>}
            {error && <div className="alert alert-danger">{error}</div>}
            <table className="table table-bordered table-hover">
                <thead>
                    <th>Dept Id</th>
                    <th>Dept Name</th>
                    <th>Actions</th>
                </thead>
                <tbody>
                    {
                        departments.map(department => (
                            <tr key={department.DepartmentId}>
                                <td>{department.DepartmentId}</td>
                                <td>{department.DepartmentName}</td> 
                                <td>
                                    <button className="btn btn-warning btn-sm"
                                    onClick={()=>setDepartmentToEdit(department)}>Edit</button>
                                    <button className="btn btn-danger btn-sm ms-2"
                                    onClick={()=>handleDelete(department.DepartmentId)}>Delete</button>
                                </td>
                            </tr>
                        ))
                    }
                </tbody>
            </table>
            {/* <pre>{JSON.stringify(departments)}</pre> */}
            <DepartmentForm 
            loadDepartments={loadDepartments}
            departmentToEdit={departmentToEdit}
            setDepartmentToEdit={setDepartmentToEdit}
            />
        </>
    );
}

export default DepartmentList;