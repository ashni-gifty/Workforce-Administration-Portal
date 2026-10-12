import { useNavigate } from "react-router-dom";
import EmployeeForm from "./EmployeeForm";

function EmployeeAdd(){
    const navigate = useNavigate();
    return(
            <div>
                <EmployeeForm onSaved={() => navigate("/employees")}/> 
            </div>
        );
}
export default EmployeeAdd;