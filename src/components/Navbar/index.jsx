import { TbActivityHeartbeat } from "react-icons/tb";
import { MdDashboard, MdOutlineRoundaboutLeft, MdOutlinePermContactCalendar } from "react-icons/md";
import { FaDatabase } from "react-icons/fa";
import './index.css'
import NavItem from "../NavItem";
import { useState } from "react";

const navLinksList = [
    {
        id: 1,
        name: "ACTIVITIES",
        icon: <TbActivityHeartbeat className='hospital-Profile-icon-card' />,
        toPath: '/'
    },
    {
        id: 2,
        name: "DATA-TABLE",
        icon: <FaDatabase className='hospital-Profile-icon-card'/>,
        toPath: '/data-table'
    },
    // {
    //     id: 3,
    //     name: "Unfinished-Study-Creations",
    //     icon: <FaDatabase className='hospital-Profile-icon-card'/>,
    //     toPath: '/data-table'
    // },
    
    {
        id: 3,
        name: "ABOUT",
        icon: <MdOutlineRoundaboutLeft className='hospital-Profile-icon-card'/>,
        toPath: '/about'
    },
    {
        id: 4,
        name: "CONTACT",
        icon: <MdOutlinePermContactCalendar className='hospital-Profile-icon-card'/>,
        toPath: '/contact'
    },
    {
        id: 5,
        name: "DASHBOARD",
        icon: <MdDashboard className='hospital-Profile-icon-card'/>,
        toPath: '/dashboard'
    },
    {
        id: 6,
        name:"Un Finished",
          icon: <MdDashboard className='hospital-Profile-icon-card'/>,
        toPath: '/studies/unfinished'
    }
    
]
const Navbar = () => {
    const [activeNavId, setActiveNavId] = useState(navLinksList[0].id)
    const onUpdateActiveId = (id) => {
        setActiveNavId(id)
    }
    return(
        <div className='Navbar-main-container'>
            <h1 className='hospital-title-name'>Palamur Biosciences</h1>
            <ul className='hospital-nav-titles-card'>
                {navLinksList.map((eachNav) => (
                    <NavItem key={eachNav.id} details={eachNav} isActive= {activeNavId === eachNav.id} onUpdateActiveId={onUpdateActiveId} />
                ))}
            </ul>
        </div>
    )
}

export default Navbar