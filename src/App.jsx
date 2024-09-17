import {BrowserRouter as Router,Routes, Route } from 'react-router-dom'
import './App.css'
import Home from './components/Home'
import About from './components/About'
import Contact from './components/Contact'
import ActivityOne from './components/ActivityOne'
import ActivityTwo from './components/ActivityTwo'
import DataTable from './components/DateTable'
import Dashboard from './components/Dashboard'
import { ActivityThree } from './components/ActivityThree'
import { Layout } from './components/Layout'
import { ActivityFour } from './components/ActivityFour'
import Centrifugation from './components/centrifugation/Index'
import Centrifugation2 from './components/centrifugation2/Centrifugation2'
import Stepper from './components/stepper/Stepper'
import Test from './components/Test'
import { ToastContainer } from 'react-toastify'
import 'react-toastify/dist/ReactToastify.css';
import DataTable2 from './components/DateTable/index2'
import Table from './components/tables/Table'
import { Permission } from './components/permissions/Permission'
import { Roles } from './components/roles/Roles'
import { Users } from './components/users/User'
import Centri from './components/test/Centri'

function App() {
 
  return (
    <div className='app-container'>
      <Router>
        <Routes>
          <Route path='/' element={<Home/>} />
          <Route path='/about' element={<About/>} />
          <Route path='/contact' element={<Contact/>} />
          <Route path='/data-table' element={<DataTable/>} />
          <Route path='/studies/unfinished' element={<DataTable2 />} />
          <Route path='/dashboard' element={<Dashboard />} />
          <Route path='/act-1' element={<ActivityOne/>} />
          <Route path='/act-2/:studyId' element={<ActivityTwo />} />
          <Route path='/act-3/:studyId/:peroidId' element={<Layout name="Blood Collection"><ActivityThree/></Layout>}/>
          {/* <Route path='/act-4/:studyId/:peroidId' element={<Layout name="Centrifugation"><Centrifugation2/> </Layout>}/> */}
          <Route path='/centrifugation/:studyId/:peroidId' element={<Layout name="testing"><Centri/>   </Layout>}/>
         
          <Route path='/table/permissions' element={<Layout name="Table-101"><Permission/></Layout>}/>
          <Route path='/table/roles' element={<Layout name="Table-101"><Roles/></Layout>}/>
          <Route path='/table/users' element={<Layout name="Table-102s"><Users/></Layout>}/>
          <Route path='/createStudy' element={<Layout>

            <Test/>

          </Layout>}/>
          <Route path='/steps' element={<Layout><Stepper/></Layout>}/>   
        </Routes>
      </Router>
      <ToastContainer position='top-right'/>
    </div>
  )
}

export default App
