import {
  BrowserRouter as Router,
  Routes,
  Route,
  Navigate,
} from "react-router-dom";
import "./App.css";
import Home from "./components/Home";
import About from "./components/About";
import Contact from "./components/Contact";
import ActivityOne from "./components/ActivityOne";
import ActivityTwo from "./components/ActivityTwo";
import DataTable from "./components/DateTable";
import Dashboard from "./components/Dashboard";
import { ActivityThree } from "./components/ActivityThree";

import { ActivityFour } from "./components/ActivityFour";
import Centrifugation from "./components/centrifugation/Index";
import Centrifugation2 from "./components/centrifugation2/Centrifugation2";
import Stepper from "./components/stepper/Stepper";
import Test from "./components/Test";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import DataTable2 from "./components/DateTable/index2";
import Table from "./components/tables/Table";
import { Permission } from "./components/permissions/Permission";
import { Roles } from "./components/roles/Roles";
import { Users } from "./components/users/User";
import Centri from "./components/test/Centri";
import { Login } from "./components/login/Login";
import { useSelector } from "react-redux";
import Layout from "./components/Layout/Layout";
import { Loader } from "./components/loaders/Loader";
import { AuditMain } from "./components/Audit/AuditMain";
import Storage from "./components/storage";
import useFetch from "./hooks/fetch";
import { BackdropLoader } from "./components/loaders/BackdropLoader";
import { UserManager } from "./components/UserManager";

const ProtectedRoute = ({ children, roleId, roleId2 }) => {
  const { auth } = useSelector((state) => state);
  console.log(auth);
  if (auth.isLoggedIn) {
    console.log("in")
    if (auth.user) {
      return children;
    } else {
      return (
        <div style={{ color: "white" }}>
          YOU ARE NOT AUTHORIZED TO THIS PAGE
        </div>
      );
    }
  } else {
    return <Navigate to={"/login"} />;
  }
};
const CheckLoggedIn = ({ children }) => {
  const { auth } = useSelector((state) => state);
  console.log(auth.isLoggedIn);
  if (auth.isLoggedIn) {
    if (auth.user.roleId == 4) {
      return <Navigate to={"/dashboard"} />;
    } else {
      return <Navigate to={"/"} />;
    }
  } else {
    return children;
  }
};
// http://localhost:9000/react/router/getAllRoutes
// function App(){
//     const {data,isLoading,error}=useFetch(`http://localhost:9000/react/router/getAllRoutes`);
//     if(isLoading){
//       return <p>Loading</p>
//     }
//     console.log(data)
//     if(data){
//       return (
//         <div className="app-conainer">
//           <Router>
//               <Routes>
    // {
              //   data.routes.map((route)=>{
              //     <Route path={route.route} element={
              //       <ProtectedRoute roleId={"1"}>
              //         <Layout title={route.title}>
              //           {Router.component}
              //         </Layout>
              //       </ProtectedRoute>
              //     }/>
              //   })
              // }
//                 </Routes>
//           </Router>
//         </div>
//       )
//     }
// }
function App() {
  return (
    <div className="app-container">
      <Router>
        <Routes>
          <Route
            path="/"
            element={
              <ProtectedRoute roleId={"1"}>
                <Layout title={"home"}>
                  <Home  />
                </Layout>
              </ProtectedRoute>
            }
          />
          <Route
            path="/about"
            element={
              <ProtectedRoute roleId={"1"}>
               <Layout>
               <About />
               </Layout>
              </ProtectedRoute>
            }
          />
          <Route
            path="/contact"
            element={
              <ProtectedRoute roleId={"1"}>
                <Layout>
                <Contact />
                </Layout>
              </ProtectedRoute>
            }
          />
          <Route
            path="/studylist"
            element={
              <ProtectedRoute roleId={"1"}>
                <Layout  title="All Studies" >
                  <DataTable />
                </Layout>
              </ProtectedRoute>
            }
          />
          <Route
            path="/studies/unfinished"
            element={
              <ProtectedRoute roleId={"1"}>
                <Layout title={"Unfinished Studies"}>
                <DataTable2 />
                </Layout>
              </ProtectedRoute>
            }
          />
          <Route
            path="/dashboard"
            element={
              <ProtectedRoute roleId={"1"}>
               <Layout title={"Dashboard"}>
               <Dashboard />
               </Layout>
              </ProtectedRoute>
            }
          />
          <Route
            path="/act-1"
            element={
              <ProtectedRoute roleId={"1"}>
                <ActivityOne />
              </ProtectedRoute>
            }
          />
          <Route
            path="/timepoints/:studyId/:peroidId"
            element={
              <ProtectedRoute roleId={"1"}>
                <Layout title={" Timepoints"}>
                <ActivityTwo />
                </Layout>
              </ProtectedRoute>
            }
          />
          <Route
            path="/bloodcollection/:studyId/:peroidId"
            element={
              <ProtectedRoute roleId={"1"}>
                <Layout name="Blood Collection" title={"Blood Collection"}>
                  <ActivityThree />
                </Layout>
              </ProtectedRoute>
            }
          />
          {/* <Route path='/act-4/:studyId/:peroidId' element={<Layout name="Centrifugation"><Centrifugation2/> </Layout>}/> */}
          <Route
            path="/centrifugation/:studyId/:peroidId"
            element={
              <ProtectedRoute roleId={"1"}>
                <Layout name="Centrifugation" title={"Centrifugation"}>
                  <Centri />{" "}
                </Layout>
              </ProtectedRoute>
            }
          />
           <Route
            path="/audit/logs"
            element={
              <ProtectedRoute roleId={"1"}>
               <Layout title={"Audit Trails"}>
               <AuditMain/>
               </Layout>
              </ProtectedRoute>
            }
          />
          <Route
          path="/storage/:studyId/:peroidId"
          element={
            <ProtectedRoute roleId={"1"}>
              <Layout title={"Storage"}>
               <Storage/>
              </Layout>
            </ProtectedRoute>
          }
          />
          <Route
            path="/table/permissions"
            element={
              <ProtectedRoute roleId={"1"}>
                <Layout name="Table-101">
                  <Permission />
                </Layout>
              </ProtectedRoute>
            }
          />
          <Route
          path="/user/management"
          element={
            
          
            <ProtectedRoute>
                <Layout name="User Management" userManager={true}>
              <UserManager/>
            </Layout>
            </ProtectedRoute>
          }
          />
          <Route
            path="/table/roles"
            element={
             
                // <Layout name="Table-101">
                  <Roles />
                // </Layout>
         
            }
          />
          <Route
            path="/table/users"
            element={
              
                // <Layout name="Table-102s">
                  <Users />
                // </Layout>
         
            }
          />
          <Route
            path="/createStudy"
            element={
              <ProtectedRoute roleId={"1"}>
                <Layout>
                  <Test />
                </Layout>
              </ProtectedRoute>
            }
          />

          <Route
            path="/create/study"
            element={
              <ProtectedRoute roleId={"1"}>
                <Layout title={"Create Study Wizard"}>
                  <Stepper/>
                </Layout>
              </ProtectedRoute>
            }
          />
          <Route
            path="/login"
            element={
              <CheckLoggedIn>
                <Login />
              </CheckLoggedIn>
            }
          />
          <Route path="/loader" element={
            <BackdropLoader/>
          }/>
        </Routes>
      </Router>
      <ToastContainer position="top-right" />
    </div>
  );
}

export default App;
