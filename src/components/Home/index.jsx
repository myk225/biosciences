import Navbar from "../Navbar"
import './index.css'
import { Link } from 'react-router-dom'
import { GiLoveInjection } from "react-icons/gi";
import { CgProfile } from "react-icons/cg";
import { MdNotificationsNone, MdSearch } from "react-icons/md";

import { useState, useRef } from 'react';
import Button from 'react-bootstrap/Button';
import Overlay from 'react-bootstrap/Overlay';
import Popover from 'react-bootstrap/Popover';
const Home = () => {
    const [show, setShow] = useState(false);
    const [target, setTarget] = useState(null);
    const ref = useRef(null);

    const handleClick = (event) => {
        setShow(!show);
        setTarget(event.target);
    }
    return (
      
           
            <div className="Home-page-actvities-card">
                {/* <div className="home-page-header-division">
                    <div className="headre-sercah-card">
                        <MdSearch size={20} />
                        <input className="serach-input" type="search" />
                    </div>
                    <div className="headre-icons-card">
                        <MdNotificationsNone size={20} style={{ marginRight: '20px' }}  />
                        <CgProfile size={20} style={{ marginRight: '20px' }} onClick={handleClick} />
                    </div>
                </div> */}
               
                <div ref={ref}>
                    <Overlay
                        show={show}
                        target={target}
                        placement="bottom"
                        container={ref}
                        containerPadding={20}
                    >
                        <Popover id="popover-contained"
                            className="popover-container">
                            <Popover.Body>
                                <div className="profile-summary-card">
                                    <div className="profile-picture-card">
                                        <img src="https://img.freepik.com/free-psd/3d-illustration-person-with-sunglasses_23-2149436188.jpg?w=740&t=st=1722979421~exp=1722980021~hmac=2f3de72b5b8c05e779f05bd40584583491d6b200d2caea8c3f3a8411e71c6510" className="profile-image" />
                                        <h3 style={{color: '#ffffff', margin: '0px'}}>Name</h3>
                                        <p style={{color: '#ffffff'}}>Email</p>
                                    </div>
                                    <h3 className="profile-summury-names">Profile</h3>
                                    <h3 className="profile-summury-names">Settings</h3>
                                    <h3 className="profile-summury-names">Stats</h3>
                                    <h3 className="profile-summury-names">Messages</h3>
                                    <h3 className="profile-summury-names">Sign out</h3>
                                </div>
                            </Popover.Body>
                        </Popover>
                    </Overlay>
                </div>
            </div>
       
    )
}
export default Home


//  <div className="home-page-content-division">
//                     <Link to='steps' className="activity-card">
//                         <h3 className="activity-title">Activity-1</h3>
//                         <h3 className="activity-name">Create study</h3>
//                         <p className="activity-des">This activity is about creating a study on animal....</p>
//                     </Link>
//                     <Link to='act-2' className="activity-card">
//                         <h3 className="activity-title">Acticity-2</h3>
//                         <h3 className="activity-name">Study Animal</h3>
//                         <p className="activity-des">This activity is about creating a study on animal....</p>
//                     </Link>
//                 </div>