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
import { useDispatch, useSelector } from "react-redux";
import Layout from "./components/Layout/Layout";
import { Loader } from "./components/loaders/Loader";
import { AuditMain } from "./components/Audit/AuditMain";
import Storage from "./components/storage";
import useFetch from "./hooks/fetch";
import { BackdropLoader } from "./components/loaders/BackdropLoader";
import { UserManager } from "./components/UserManager";
import StudyManagement from "./components/DateTable/StudyManagement";
import { Screenlock } from "./components/login/Screenlock";
import { useEffect } from "react";
import { lockScreen } from "./store/slices/auth";
import BloodCollectionReport from "./components/Repots/BloodCollectionReport";
import CentrifugationReport from "./components/Repots/CentrifugationReport";
import StudyNumberAssigned from "./components/DateTable/StudyNumberAssigned";
import StudyAssigned from "./components/DateTable/StudyAssigned";
import StorageReport from "./components/Repots/StorageReport";
import ViewDataTable from "./components/DateTable/ViewDataTable";

const ProtectedRoute = ({ children, roleId, roleId2 }) => {
  const { auth } = useSelector((state) => state);
  console.log(auth);
  if (auth.isLoggedIn) {
    // if(auth.isLocked){
    //   return <Screenlock></Screenlock>
    // }
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
// https://biobackend.cs-it.in/react/router/getAllRoutes
// function App(){
//     const {data,isLoading,error}=useFetch(`https://biobackend.cs-it.in/react/router/getAllRoutes`);
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
  const dispatch=useDispatch();
  const updateExpireTime=()=>{
    const expireTime=Date.now() + 600000;
    localStorage.setItem('expireTime',expireTime);
  }
  const checkInactivity=()=>{
    const expireTime=localStorage.getItem('expireTime');
    
    if(expireTime < Date.now()){
      dispatch(lockScreen());
    }
  }
  useEffect(()=>{
   updateExpireTime();

    window.addEventListener("click",updateExpireTime);
    window.addEventListener("keypress",updateExpireTime);
    window.addEventListener("scroll",updateExpireTime);
    window.addEventListener("mousemove",updateExpireTime);

    return ()=>{
      window.removeEventListener("click",updateExpireTime);
      window.removeEventListener("keypress",updateExpireTime);
      window.removeEventListener("scroll",updateExpireTime);
      window.removeEventListener("mousemove",updateExpireTime);
    }
  },[])
  useEffect(()=>{
    const interval=setInterval(()=>{
      checkInactivity();
    },1000)
    return ()=>clearInterval(interval);
  },[])
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
          path="/viewStudyList"
          element={
            <ProtectedRoute>
              <Layout>
                <ViewDataTable/>
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
          path="/study/maganement" 
          element={
           
            <ProtectedRoute roleId={"1"}>
              <Layout title={"Study Management"}>
              <StudyManagement/>
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
            path="/study/creation"
            element={
              <ProtectedRoute roleId={"1"}>
                <Layout>
                <StudyAssigned/>
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
          <Route
          path="/locked"
          element={
            <Screenlock/>
          }
          />
          <Route path="/loader" element={
            <BackdropLoader/>
          }/>
          <Route path="/report/bloodcollection/:studyId/:peroidId" element={
            <ProtectedRoute>
              <Layout title={"Blood Collection Report"}>
              <BloodCollectionReport/>
              </Layout>
            </ProtectedRoute>
          }/>
          <Route
          path="/report/centrifugation/:studyId/:peroidId"
          element={
            <ProtectedRoute>
              <Layout title={"Centrifugation Report"}>
              <CentrifugationReport/>
              </Layout>
            </ProtectedRoute>
            
          }
          />
          <Route
          path="/report/storage/:studyId/:peroidId"
          element={
            <ProtectedRoute>
              <Layout title={"Storage Report"}>
              <StorageReport/>
              </Layout>
            </ProtectedRoute>
            
          }
          />
          <Route
          path="/view/bloodcollection/:studyId/:peroidId"
          element={
            <ProtectedRoute>
              <Layout title={"Blood Collection"}>
              <BloodCollectionReport download={false}/>
              </Layout>
            </ProtectedRoute>
            
          }
          />
          <Route
          path="/view/centrifugation/:studyId/:peroidId"
          element={
            <ProtectedRoute>
              <Layout title={"Centrifugation"}>
              <CentrifugationReport download={false}/>
              </Layout>
            </ProtectedRoute>
            
          }
          />
           <Route
          path="/view/storage/:studyId/:peroidId"
          element={
            <ProtectedRoute>
              <Layout title={"Storage"}>
              <StorageReport download={false}/>
              </Layout>
            </ProtectedRoute>
            
          }
          />
          <Route path="/studynumber/assignment" element={
           <ProtectedRoute>
            <Layout title={"Study Assignment"}>
            <StudyNumberAssigned/>
            </Layout>
           </ProtectedRoute>
          }/>
        </Routes>
      </Router>
      <ToastContainer position="top-right" />
    </div>
  );
}

export default App;
