import { useEffect, useState } from "react";
import { getDepartments } from "../services/departmentService";
import { addEmployee,updateEmployee } from "../services/employeeService";
import { useNavigate } from "react-router-dom";

function EmployeeForm({employeeToEdit, onSaved}){
    // usestate var to hold the dept name 
    const [EmployeeName, setEmployeeName] = useState("");
    const [DepartmentId, setDepartmentId]= useState("");
    const [Designation, setDesignation] = useState("");
    const [DateOfJoining, setDateOfJoining] = useState("");
    const [Contact, setContact] = useState("");
    const [IsActive, setIsActive] = useState(true);
    //usestate variable  to save the deaprtments got from getdepartments
    const [departments,setDepartments] = useState([]);
    const[error, setError] = useState("");

    // declare a function to get the list of depts by asynchoronosly
    // to populate in the dropdown options
    const loadDepartments = async() => {
        try{
            const response = await getDepartments();
            setDepartments(response.data);
            console.log(response.data);
        } catch {
            setError("Unable to load departments!!")
            console.log(error);
        } 
    };
    useEffect(()=> {
        loadDepartments();
    },[]);

    useEffect(()=> {
        if(employeeToEdit){
            setEmployeeName(employeeToEdit.EmployeeName);
            setDepartmentId(employeeToEdit.DepartmentId);
            setDateOfJoining(employeeToEdit.DateOfJoining);
            setDesignation(employeeToEdit.Designation);
            setContact(employeeToEdit.Contact);
            setIsActive(employeeToEdit.IsActive);            
        }
    },[employeeToEdit]);

    //navigate object
    // const navigate = useNavigate();

    //fn to save employee
    const saveEmployee = async () =>{
        const employee = {
            EmployeeName : EmployeeName,
            Designation  : Designation,
            DateOfJoining : DateOfJoining,
            Contact : Contact,
            DepartmentId : Number(DepartmentId),
            IsActive : IsActive
        };
        if(employeeToEdit){
            await updateEmployee(employeeToEdit.EmployeeId,employee);
        } else {
            await addEmployee(employee);
        }
        // navigate("/employees");// return back to emp listing page
        if(onSaved) {
            onSaved();//inform parent that saving is done
        }
    }

    return(
        <div className="card p-3 mb-4">
            <h4>{employeeToEdit ? "Edit" : "Add"} Employee</h4>
            <div className="mb-3">
                <label className="form-label">Employee Name </label>
                <input type="text" className="form-control"
                value={EmployeeName}
                onChange={(e)=>setEmployeeName(e.target.value)}/>
            </div>
            <div className="mb-3">
                <label className="form-label">Department Id</label>
                <select className="form-select"
                value={DepartmentId}
                onChange={(e)=>setDepartmentId(e.target.value)}>
                    <option value="">Select Department</option>
                    {departments.map(department =>
                        (<option key={department.DepartmentId}
                            value={department.DepartmentId}>{department.DepartmentName}
                        </option>)
                    )}
                </select>
            </div>
            <div className="mb-3">
                <label className="form-label">Designation</label>
                <input type="text" className="form-control"
                value={Designation}
                onChange={(e)=>setDesignation(e.target.value)}/>
            </div>
            <div className="mb-3">
                <label className="form-label">Date Of Joining</label>
                <input type="date" className="form-control"
                value={DateOfJoining}
                onChange={(e)=>setDateOfJoining(e.target.value)}/>
            </div>
            <div className="mb-3">
                <label className="form-label">Contact Details</label>
                <input type="text" className="form-control"
                value={Contact}
                onChange={(e)=>setContact(e.target.value)}/>
            </div> 
            <div className="mb-3">
                <label className="form-label">Active Status</label>
                <input type="checkbox" className="form-check-input"
                checked={IsActive}
                onChange={(e)=>setIsActive(e.target.checked)}/>
            </div> 
            <button className="btn btn-primary" onClick={saveEmployee}>{employeeToEdit ? "Update" : "Save"} Employee</button>         
        </div>
    );
}
export default EmployeeForm;
