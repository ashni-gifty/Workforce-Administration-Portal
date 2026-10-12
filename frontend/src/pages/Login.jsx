//import useState hook
import { useState } from "react"; 
import api from "../services/api";
import { useNavigate } from "react-router-dom";

function Login() {
    //define the state variables to store the username and password
    const [username, setUsername] = useState("");
    const [password, setPassword] = useState("");
    const [error, setError] = useState(""); //just a state variable to store any error 
    //create a navigation function variable 
    //const navigation = useNavigate();
    const navigate = useNavigate();

    //async function to send login request to server parallelly 
    const handleLogin = async (e) => {
        e.preventDefault(); //prevent page from submit and reload 
        console.log("Username: ", username);
        console.log("Password: ", password);
        //navigation("/dashboard");
        try {
            //send the username and password to the /login api 
            const response = await api.post("login/", {username, password});
            console.log("Response from server", response.data);
            //save the access token and refresh token in local storage 
            localStorage.setItem('access', response.data.access);
            localStorage.setItem('refresh', response.data.refresh);
            navigate("/dashboard");
        } catch(err) {
            console.log(err); //log the error details from server 
            setError("Invalid Username or password"); //Set the error state variable with a msg 
        }
    };

    return(
        <div className="container mt-5" style={{maxWidth:"400px"}}>
            <div className="card">
                <div className="card-header"><h3>Please Login</h3></div>
                <div className="card-body">
                    {error && <div className="alert alert-danger">{error}</div>}
                    <form onSubmit={handleLogin}>
                        <div className="mb-3">
                            <label className="form-label">Username</label>
                            <input type="text" className="form-control" onChange={(e)=>setUsername(e.target.value)} value={username}></input>
                        </div>
                        <div className="mb-3">
                            <label className="form-label">Password</label>
                            <input type="password" className="form-control" onChange={(e)=>setPassword(e.target.value)} value={password}></input>
                        </div>
                        <button className="btn btn-primary w-100 mb-2">Login</button>
                    </form>
                </div>
            </div>
        </div>
    );
}

export default Login;