import "./navbar.css"
import { MdDashboard, MdOutlinePermContactCalendar, MdOutlineRoundaboutLeft, MdOutlineSpaceDashboard } from "react-icons/md";
import { IoMdArrowDropleftCircle, IoMdArrowDroprightCircle } from "react-icons/io";
import { CiLogout } from "react-icons/ci";
import { TbActivityHeartbeat } from "react-icons/tb";
import { FaDatabase } from "react-icons/fa";
import { useDispatch } from "react-redux";
import { logout } from "../../store/slices/auth";
import { useNavigate } from "react-router-dom";
import { FaUsersViewfinder } from "react-icons/fa6";
import useFetch from "../../hooks/fetch";
import { Loader } from "../loaders/Loader";
import { MdCreateNewFolder } from "react-icons/md";
import { BsDatabaseFillExclamation } from "react-icons/bs";
import { FaUserCog } from "react-icons/fa";
import { AiFillSchedule } from "react-icons/ai";
import { AiFillFileAdd } from "react-icons/ai";
import { toast } from "react-toastify";
const icons={
    home : <TbActivityHeartbeat className='icon' />,
    about :  <MdOutlineRoundaboutLeft className='icon'/>,
    datatable : <FaDatabase className='icon'/>,
    dashboard : <MdDashboard className='icon'/>,
    audit :<FaUsersViewfinder className="icon"/>,
    createStudy : <MdCreateNewFolder className="icon"/>,
    unfinishedDatatable : <BsDatabaseFillExclamation/>,
    userManager : <FaUserCog/>,
    studies :  <AiFillSchedule/>,
    assignSNumber : <AiFillFileAdd/>
}


export const SideBar = ({setArrow,arrow}) => {
    const {data,isLoading,error}=useFetch(`https://biobackend.cs-it.in/react/router/getAllRoutes`,{ credentials: 'include'},);

    const dispatch=useDispatch();
    function handleLogout(){
        fetch(`https://biobackend.cs-it.in/auth/v1/logout`,{
            method:"POST",
            credentials: 'include',
            mode: "no-cors",
            headers:{
                "Content-Type" :"application/json",
              },
        }).then((res)=>{
            return res.json();
        }).then((data)=>{
            toast.success(data.message)
            dispatch(logout())
        }).catch((err)=>{
            toast.error(err.message)
        })
    }
    const navigate=useNavigate();
    if(isLoading){
        return <Loader/>
    }
    if(error){
        return <p>{error.message}</p>
    }
  if(data.routes){
    return (
        <div className={`test sidebar ${arrow ? "sideBarClose" : ""}`}>
            <BrandComp source="https://www.palamurbio.com/img/pbs1.png"/>
            <div className="navItems">
                    {
                        data?.routes?.map((item)=>{
                            return <div  key={item.id} onClick={
                                ()=>{ 
                                    navigate(item.route,{state:{previous:window.location.pathname}})
                                }
                            } className={`navItem ${ (window.location.pathname == item.route) && "active"}`}>
                                 {
                                     icons[item.icon]
                                 }
                                  <p className="iconText">
                                  {item.title}
                                  </p>
                        </div>
                        })
                    }
                       
            </div>
            <div className="bottomItems">
                     <div  onClick={handleLogout} className=" logout">
                                <CiLogout className="icon"/>
                                  <div>
                                    logout
                                  </div>
                        </div>
            </div>
            {
            arrow ? <IoMdArrowDroprightCircle className="openClose " onClick={()=>{
                localStorage.setItem("sidebar",!arrow);
                setArrow(!arrow);
                
            }}/> : <IoMdArrowDropleftCircle className="openClose" onClick={()=>{
                localStorage.setItem("sidebar",!arrow);
                setArrow(!arrow)
            }}/>
            }
        </div>
      )
  }
}

const defaultSroce='https://www.dsource.in/sites/default/files/resource/logo-design/logos/logos-representing-india/images/01.jpeg';
const BrandComp=({source=defaultSroce})=>{
    return <div className="brand">
    <img className="brandLogo" src={source} alt="" />
    {/* <h1 className="brandName">
            Palamur Bio
    </h1> */}
  
</div>
}



const navLinksList = [
    {
        id: 1,
        name: "ACTIVITIES",
        icon: <TbActivityHeartbeat className='icon' />,
        toPath: '/'
    },
    {
        id: 2,
        name: "DATA-TABLE",
        icon: <FaDatabase className='icon'/>,
        toPath: '/data-table'
    },
    {
        id : 7,
        name:"Audit Logs",
        icon : <FaUsersViewfinder className="icon"/>,
        toPath : "/audit/logs"
    },
    // {
    //     id: 3,
    //     name: "Unfinished-Study-Creations",
    //     icon: <FaDatabase className='icon'/>,
    //     toPath: '/data-table'
    // },
    
    {
        id: 3,
        name: "ABOUT",
        icon: <MdOutlineRoundaboutLeft className='icon'/>,
        toPath: '/about'
    },
    {
        id: 4,
        name: "CONTACT",
        icon: <MdOutlinePermContactCalendar className='icon'/>,
        toPath: '/contact'
    },
    {
        id: 5,
        name: "DASHBOARD",
        icon: <MdDashboard className='icon'/>,
        toPath: '/dashboard'
    },
    {
        id: 6,
        name:"Un Finished",
          icon: <MdDashboard className='icon'/>,
        toPath: '/studies/unfinished'
    }
    
]