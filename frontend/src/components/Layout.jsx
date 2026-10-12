import Navbar from "./Navbar";
import { Outlet } from "react-router-dom";
//Outlet is used to render a child route 

//in  this layout we are planning to display 
//the navbar and also the protected child compinents using <Outlet/>
function Layout() {
    return(
        <>
            <Navbar/>
            <div className="container mt-4">
                <Outlet/> {/* will display the child component */}
            </div>
        </>
    );
}

export default Layout;