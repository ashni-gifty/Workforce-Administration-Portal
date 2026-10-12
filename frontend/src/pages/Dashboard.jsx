// import api from "../services/api";
// import { useEffect } from "react";
// function Dashboard() {

    //just a test to see if we can connect to the backend 
    // useEffect(()=>{
    //     api.get("departments/") //trying to send GET request to /departments 
    //     .then(response => {
    //         console.log("Successful connection to backend");
    //         console.log(response.data);
    //     }).catch(error => {
    //         console.log(error);
    //     })
    // },[]);
import { getEmployees } from "../services/employeeService";
import { useEffect,useState } from "react";
import { getDepartments } from "../services/departmentService";
import { getProjects } from "../services/projectService";

function Dashboard() {
    //store the total number of employees
    const [employeeCount, setEmployeeCount ] = useState(0);
    const [departmentCount, setDepartmentCount ] = useState(0);
    const [projectCount, setProjectCount ] = useState(0);
   
    //load the list of employees, projects, departments
    useEffect(()=>{
        const loadDashboard = async()=>{
            const employeeResponse = await getEmployees();
            setEmployeeCount(employeeResponse.data.length);//no of employees

            const departmentResponse = await getDepartments();
            setDepartmentCount(departmentResponse.data.length);//no of departments

            const projectResponse = await getProjects();
            setProjectCount(projectResponse.data.length);//no of project
        };
        loadDashboard();
    },[]);//run once when the page reloads
    return(
        <div>
            <h2>Dashboard</h2>
            <div className="row">
                <div className="col-md-4">
                    <div className="card bg-primary text-white p-3">
                        <h5>Total Employees</h5>
                        <h3>{employeeCount}</h3>
                    </div>
                </div>
                <div className="col-md-4">
                    <div className="card bg-success text-white p-3">
                        <h5>Total Departments</h5>
                        <h3>{departmentCount}</h3>
                    </div>
                </div>
                <div className="col-md-4">
                    <div className="card bg-dark text-white p-3">
                        <h5>Total Projects</h5>
                        <h3>{projectCount}</h3>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default Dashboard;