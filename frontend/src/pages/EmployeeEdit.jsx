import { useParams } from "react-router-dom";
import { useEffect,useState } from "react";
import { getEmployee } from "../services/employeeService";
import EmployeeForm from "./EmployeeForm";
import { useNavigate } from "react-router-dom";

// to receive the map emp id that we are sending as a url paramete
function EmployeeEdit() {
    //receive the map id
    const {id} = useParams();
    //declare a usestate variable to store the details of employee retrieved
    const [employee, setEmployee] = useState(null);
    const navigate = useNavigate();
    //load the employee details one time on page load
    useEffect(()=>{
        const loadEmployee = async () => { // declaring the fn 
            const response = await getEmployee(id);
            console.log(response.data)
            setEmployee(response.data)
        };
        loadEmployee();// calling the fn 
    },[id]); // []->depenedent variable array
    // whenever the id change refetch the data 

  
    if(!employee) {
        return (<p>Loading Employee Details...</p>);
    }
    return(
        <div>
            <EmployeeForm employeeToEdit={employee} 
            onSaved={() => navigate("/employees")}/> 
        </div>
    );
            // {
            //     employee && (
            //         <div>
            //             <p>Emp Id: {employee.EmployeeId}</p>
            //             <p>Emp Name: {employee.EmployeeName}</p>
            //             <p>Emp Designation: {employee.Designation}</p>
            //         </div>
            //     )
            // }

}
        
export default EmployeeEdit;