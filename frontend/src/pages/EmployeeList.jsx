import { useState, useEffect } from "react";
import { getEmployees,deleteEmployee } from "../services/employeeService";
import { Link } from "react-router-dom";

function EmployeeList() {
    //declare usestate vars to store emp list , loading status, error
    const[employees,setEmployees] = useState([]);
    const[loading, setLoading] = useState(true);
    const[error, setError] = useState("");

    // declare a function to get the list of depts by asynchoronosly
    // calling the getEmployees() fn from EmployeeService
    const loadEmployees = async() => {
        try{
            const response = await getEmployees();
            setEmployees(response.data);
        } catch {
            setError("Unable to load Employees!!")
        } finally {
            setLoading(false);
        }
    };
    useEffect(()=> {
        loadEmployees();
    },[]);

    const handleDelete =  async(id) => {
        const confirmed = window.confirm("Do you want to delete?");
        if(!confirmed){
            return;
        }
        await deleteEmployee(id);
        loadEmployees();
    };

    return(
        <>
            <h2>Employee List</h2>
            {loading && <div className="alert alert-info">Loading....</div>}
            {error && <div className="alert alert-danger">{error}</div>}
            <Link to="/employees/add" className="btn btn-primary mb-3">Add Employee</Link>
            <table className="table table-bordered table-hover">
                <thead>
                    <tr>
                        <th>Id </th>
                        <th>Name</th>
                        <th>Dept</th>
                        <th>Designation</th>
                        <th>Contact Details</th>
                        <th>Date Of Joining </th>
                        <th>Active status</th>
                        <th>Actions</th>
                    </tr>
                </thead>
                <tbody>
                    {
                        employees.map(employee => (
                            <tr key={employee.EmployeeId}>
                                <td>{employee.EmployeeId}</td>
                                <td>{employee.EmployeeName}</td>
                                <td>{employee.department.DepartmentName}</td>
                                <td>{employee.Designation}</td>
                                <td>{employee.Contact}</td>
                                <td>{employee.DateOfJoining}</td>
                                <td>{employee.IsActive ? "Yes" : "No" }</td>                         
                                <td>
                                    <Link to={`/employees/edit/${employee.EmployeeId}`} 
                                    className="btn btn-warning btn-sm" >Edit</Link>
                                    <button className="btn btn-danger btn-sm ms-2"
                                    onClick={()=>handleDelete(employee.EmployeeId)}>Delete</button>
                                </td>
                            </tr>
                        ))
                    }
                </tbody>
            </table>
            {/* <pre>{JSON.stringify(employees)}</pre> */}
            {/* <employeeForm 
            loademployees={loademployees}
            employeeToEdit={employeeToEdit}
            setemployeeToEdit={setemployeeToEdit}
            /> */}
            {/* <pre>{JSON.stringify(employeess)}</pre>
            [{"EmployeeId":1,"employee":{"employeeId":1,"employeeName":"HR"},
            "projects":[{"id":1,"name":"CMS"}],
            "EmployeeName":"Employee1",
            "Designation":"Manage",
            "DateOfJoining":"2026-07-23",
            "Contact":"123456",
            "IsActive":true,"employeeId":1},

            {"EmployeeId":2,"employee":{"employeeId":2,"employeeName":"Finance"}
            ,"projects":[{"id":1,"name":"CMS"},
            {"id":2,"name":"Ecommerce"}],
            "EmployeeName":"Employee2",
            "Designation":"Accountant",
            "DateOfJoining":"2026-07-23",
            "Contact":"1234568",
            "IsActive":true,"employeeId":2}] */}

        </>
    );
}

export default EmployeeList;