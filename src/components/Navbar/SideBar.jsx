import "./navbar.css"
import { MdDashboard, MdOutlinePermContactCalendar, MdOutlineRoundaboutLeft, MdOutlineSpaceDashboard } from "react-icons/md";
import { IoMdArrowDropleftCircle, IoMdArrowDroprightCircle } from "react-icons/io";
import { CiLogout } from "react-icons/ci";
import { TbActivityHeartbeat } from "react-icons/tb";
import { FaDatabase } from "react-icons/fa";
import { useDispatch } from "react-redux";
import { logout } from "../../store/slices/auth";
import { useNavigate } from "react-router-dom";



export const SideBar = ({setArrow,arrow}) => {

    const dispatch=useDispatch();
    const navigate=useNavigate();
  return (
    <div className={`test sidebar ${arrow ? "sideBarClose" : ""}`}>
        <BrandComp source="https://www.palamurbio.com/img/pbs1.png" setArrow={setArrow}/>
        <div className="navItems">
                {
                    navLinksList.map((item)=>{
                        return <div  key={item.id} onClick={
                            ()=>{ 
                                navigate(item.toPath)
                            }
                        } className={`navItem ${ (window.location.pathname == item.toPath) && "active"}`}>
                             {
                                item.icon
                             }
                              <p>
                                {item.name}
                              </p>
                    </div>
                    })
                }
                   
        </div>
        <div className="bottomItems">
                 <div  onClick={()=>{
                    dispatch(logout())
                 }} className=" logout">
                            <CiLogout className="icon"/>
                              <div>
                                logout
                              </div>
                    </div>
        </div>
        {
        arrow ? <IoMdArrowDroprightCircle className="openClose " onClick={()=>setArrow(!arrow)}/> : <IoMdArrowDropleftCircle className="openClose" onClick={()=>setArrow(!arrow)}/>
        }
    </div>
  )
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