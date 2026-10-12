import { Link, useNavigate } from "react-router-dom";

function Navbar() {
    //create a navigate variable 
    const navigate = useNavigate();
    const logout=()=>{
        //remove both the stored tokens from browser local storage 
        localStorage.removeItem("access");
        localStorage.removeItem("refresh");
        //go back to the login page 
        navigate("/");
    }
    return (
        <nav className="navbar navbar-expand-lg navbar-dark bg-dark">
            <div className="container">
                <Link className="navbar-brand" to="/dashboard">EMS</Link>
                <div className="navbar-nav">
                    <Link className="btn btn-secondary me-2" to="/dashboard">Dashboard</Link>
                    <Link className="btn btn-secondary me-2" to="/departments">Departments</Link>
                    <Link className="btn btn-secondary me-2" to="/employees">Employees</Link>
                    <Link className="btn btn-secondary me-2" to="/projects">Projects</Link>
                    <button className="btn btn-danger" onClick={logout}>Logout</button>
                    {/* <Link className="nav-link" to="/departments">Departments</Link>
                    <Link className="nav-link" to="/employees">Employees</Link>
                    <Link className="nav-link" to="/projects">Projects</Link>
                    <Link className="nav-link" to="/userdetails">UserDetails</Link> */}
                </div>
            </div>
        </nav>
    );
}

export default Navbar;