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

const ProtectedRoute = ({ children, roleId, roleId2 }) => {
  const { auth } = useSelector((state) => state);
  console.log(auth);
  if (auth.isLoggedIn) {
    if (auth.user.roleId == roleId || auth.user.roleId == roleId2) {
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

function App() {
  return (
    <div className="app-container">
      <Router>
        <Routes>
          <Route
            path="/"
            element={
              <ProtectedRoute roleId={"123"}>
                <Layout>
                  <Home />
                </Layout>
              </ProtectedRoute>
            }
          />
          <Route
            path="/about"
            element={
              <ProtectedRoute roleId={"123"}>
               <Layout>
               <About />
               </Layout>
              </ProtectedRoute>
            }
          />
          <Route
            path="/contact"
            element={
              <ProtectedRoute roleId={"123"}>
                <Layout>
                <Contact />
                </Layout>
              </ProtectedRoute>
            }
          />
          <Route
            path="/data-table"
            element={
              <ProtectedRoute roleId={"123"}>
                <Layout slug="Study" title="All Studies " addSlug="/steps">
                  <DataTable />
                </Layout>
              </ProtectedRoute>
            }
          />
          <Route
            path="/studies/unfinished"
            element={
              <ProtectedRoute roleId={"123"}>
                <Layout>
                <DataTable2 />
                </Layout>
              </ProtectedRoute>
            }
          />
          <Route
            path="/dashboard"
            element={
              <ProtectedRoute roleId={"123"}>
               <Layout>
               <Dashboard />
               </Layout>
              </ProtectedRoute>
            }
          />
          <Route
            path="/act-1"
            element={
              <ProtectedRoute roleId={"123"}>
                <ActivityOne />
              </ProtectedRoute>
            }
          />
          <Route
            path="/act-2/:studyId"
            element={
              <ProtectedRoute roleId={"123"}>
                <Layout>
                <ActivityTwo />
                </Layout>
              </ProtectedRoute>
            }
          />
          <Route
            path="/act-3/:studyId/:peroidId"
            element={
              <ProtectedRoute roleId={"123"}>
                <Layout name="Blood Collection">
                  <ActivityThree />
                </Layout>
              </ProtectedRoute>
            }
          />
          {/* <Route path='/act-4/:studyId/:peroidId' element={<Layout name="Centrifugation"><Centrifugation2/> </Layout>}/> */}
          <Route
            path="/centrifugation/:studyId/:peroidId"
            element={
              <ProtectedRoute roleId={"123"}>
                <Layout name="Centrifugation">
                  <Centri />{" "}
                </Layout>
              </ProtectedRoute>
            }
          />

          <Route
            path="/table/permissions"
            element={
              <ProtectedRoute roleId={"123"}>
                <Layout name="Table-101">
                  <Permission />
                </Layout>
              </ProtectedRoute>
            }
          />
          <Route
            path="/table/roles"
            element={
              <ProtectedRoute roleId={"123"}>
                <Layout name="Table-101">
                  <Roles />
                </Layout>
              </ProtectedRoute>
            }
          />
          <Route
            path="/table/users"
            element={
              <ProtectedRoute roleId={"123"}>
                <Layout name="Table-102s">
                  <Users />
                </Layout>
              </ProtectedRoute>
            }
          />
          <Route
            path="/createStudy"
            element={
              <ProtectedRoute roleId={"123"}>
                <Layout>
                  <Test />
                </Layout>
              </ProtectedRoute>
            }
          />

          <Route
            path="/steps"
            element={
              <ProtectedRoute roleId={"123"}>
                <Layout>
                  <Stepper />
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
            <Loader/>
          }/>
        </Routes>
      </Router>
      <ToastContainer position="top-right" />
    </div>
  );
}

export default App;
