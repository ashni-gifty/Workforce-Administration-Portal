//import the required functions for routing 
import {BrowserRouter, Routes, Route} from "react-router-dom";
import ProtectedRoute from "./components/ProtectedRoute";

//import all the pages that we created 
import Login from "./pages/Login";
import Dashboard from "./pages/Dashboard";
import DepartmentList from "./pages/DepartmentList";
import EmployeeList from "./pages/EmployeeList";
import ProjectList from "./pages/ProjectList";
import UserDetailsList from "./pages/UserDetailsList";
import Layout from "./components/Layout";
import EmployeeForm from "./pages/EmployeeForm";
import EmployeeEdit from "./pages/EmployeeEdit";
import EmployeeAdd from "./pages/EmployeeAdd";
import ProjectForm from "./pages/ProjectForm";
import ProjectEdit from "./pages/ProjectEdit";
import ProjectAdd from "./pages/ProjectAdd";

function App() {
  return(
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Login/>}/>
        {/* as per the react layout standards we can use nested routers so that the Outlet that we have in the <Layout> 
        component can display the appropriate child routes */}
        <Route element={<ProtectedRoute><Layout/></ProtectedRoute>}>
          <Route path="/dashboard" element={<ProtectedRoute><Dashboard/></ProtectedRoute>}/>
          <Route path="/departments" element={<ProtectedRoute><DepartmentList/></ProtectedRoute>}/>
          <Route path="/employees" element={<ProtectedRoute><EmployeeList/></ProtectedRoute>}/>
          <Route path="/projects" element={<ProtectedRoute><ProjectList/></ProtectedRoute>}/>
          <Route path="/userdetails" element={<ProtectedRoute><UserDetailsList/></ProtectedRoute>}/>
          <Route path="/employees/add" element={<ProtectedRoute><EmployeeAdd/></ProtectedRoute>}/>
          <Route path="/employees/edit/:id" element={<ProtectedRoute><EmployeeEdit/></ProtectedRoute>}/>
          <Route path="/projects/add" element={<ProtectedRoute><ProjectAdd/></ProtectedRoute>}/>
          <Route path="/projects/edit/:id" element={<ProtectedRoute><ProjectEdit/></ProtectedRoute>}/>
        </Route>
      </Routes>
    </BrowserRouter>
  );
}
export default App;















// import { useState } from 'react'
// import reactLogo from './assets/react.svg'
// import viteLogo from './assets/vite.svg'
// import heroImg from './assets/hero.png'
// // import './App.css'

// function App() {
//   const [count, setCount] = useState(0)

//   return (
//     <>
//       <section id="center">
//         <div className="hero">
//           <img src={heroImg} className="base" width="170" height="179" alt="" />
//           <img src={reactLogo} className="framework" alt="React logo" />
//           <img src={viteLogo} className="vite" alt="Vite logo" />
//         </div>
//         <div>
//           <h1>Get started</h1>
//           <p>
//             Edit <code>src/App.jsx</code> and save to test <code>HMR</code>
//           </p>
//         </div>
//         <button
//           type="button"
//           className="counter"
//           onClick={() => setCount((count) => count + 1)}
//         >
//           Count is {count}
//         </button>
//       </section>

//       <div className="ticks"></div>

//       <section id="next-steps">
//         <div id="docs">
//           <svg className="icon" role="presentation" aria-hidden="true">
//             <use href="/icons.svg#documentation-icon"></use>
//           </svg>
//           <h2>Documentation</h2>
//           <p>Your questions, answered</p>
//           <ul>
//             <li>
//               <a href="https://vite.dev/" target="_blank">
//                 <img className="logo" src={viteLogo} alt="" />
//                 Explore Vite
//               </a>
//             </li>
//             <li>
//               <a href="https://react.dev/" target="_blank">
//                 <img className="button-icon" src={reactLogo} alt="" />
//                 Learn more
//               </a>
//             </li>
//           </ul>
//         </div>
//         <div id="social">
//           <svg className="icon" role="presentation" aria-hidden="true">
//             <use href="/icons.svg#social-icon"></use>
//           </svg>
//           <h2>Connect with us</h2>
//           <p>Join the Vite community</p>
//           <ul>
//             <li>
//               <a href="https://github.com/vitejs/vite" target="_blank">
//                 <svg
//                   className="button-icon"
//                   role="presentation"
//                   aria-hidden="true"
//                 >
//                   <use href="/icons.svg#github-icon"></use>
//                 </svg>
//                 GitHub
//               </a>
//             </li>
//             <li>
//               <a href="https://chat.vite.dev/" target="_blank">
//                 <svg
//                   className="button-icon"
//                   role="presentation"
//                   aria-hidden="true"
//                 >
//                   <use href="/icons.svg#discord-icon"></use>
//                 </svg>
//                 Discord
//               </a>
//             </li>
//             <li>
//               <a href="https://x.com/vite_js" target="_blank">
//                 <svg
//                   className="button-icon"
//                   role="presentation"
//                   aria-hidden="true"
//                 >
//                   <use href="/icons.svg#x-icon"></use>
//                 </svg>
//                 X.com
//               </a>
//             </li>
//             <li>
//               <a href="https://bsky.app/profile/vite.dev" target="_blank">
//                 <svg
//                   className="button-icon"
//                   role="presentation"
//                   aria-hidden="true"
//                 >
//                   <use href="/icons.svg#bluesky-icon"></use>
//                 </svg>
//                 Bluesky
//               </a>
//             </li>
//           </ul>
//         </div>
//       </section>

//       <div className="ticks"></div>
//       <section id="spacer"></section>
//     </>
//   )
// }

// export default App
