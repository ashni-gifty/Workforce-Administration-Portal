import { Navigate } from "react-router-dom";

//this is a global/common component for ptotecting the routes
//that will check if the user have a valid token 
//if not, redirect back to the login page

//we will enclose our components inside the protected route 
//and that will be received here as the children
function ProtectedRoute({children}) {
    //try to get the access  token 
    const token = localStorage.getItem("access");
    if(!token){
        //if no token found, navigate to the base url where 
        //the login form is, by replacing the existing component 
        return <Navigate to="/" replace/>
    }
    //otherwise return the actual child component to display 
    return children;
}
export default ProtectedRoute;
