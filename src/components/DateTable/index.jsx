import Navbar from "../Navbar"
import './index.css'
import { CgProfile } from "react-icons/cg";
import { MdNotificationsNone, MdSearch } from "react-icons/md";

import { useState, useRef } from 'react';
import Overlay from 'react-bootstrap/Overlay';
import Popover from 'react-bootstrap/Popover';

const orderReportsLIst = [
    {
        id: 1,
        WaiterName: 'Jenny',
        orederId: 'A1',
        table: 3,
        imageUrl: 'http://www.myherodesign.com/wp-content/uploads/2016/06/Hispanic_Female_Suspicious-1.gif',
        OrederMenu: 'chiken Spicy wings (2 plates)',
        status: 'Completed',
        payment: '$125'
    },
    {
        id: 2,
        WaiterName: 'lara',
        orederId: 'A2',
        table: 4,
        imageUrl: 'https://tse1.mm.bing.net/th?id=OIP.mlfObRKCDO4pgollystiHgHaIY&pid=Api&P=0&h=180',
        OrederMenu: 'Fish curry (1 plates)',
        status: 'Pending',
        payment: '$15'
    },
    {
        id: 3,
        WaiterName: 'Messi',
        orederId: 'A3',
        table: 10,
        imageUrl: 'https://img.favpng.com/22/3/23/animated-film-cheek-computer-animation-facial-expression-cartoon-png-favpng-jQX8u9tzFnDdLM1XhuMUSFSnT.jpg',
        OrederMenu: 'mutton Soups (2 plates)',
        status: 'Preparing',
        payment: '$25'
    },
    {
        id: 4,
        WaiterName: 'Jenny',
        orederId: 'A4',
        table: 1,
        imageUrl: 'http://www.myherodesign.com/wp-content/uploads/2016/06/Hispanic_Female_Suspicious-1.gif',
        OrederMenu: 'chiken Spicy wings (2 plates)',
        status: 'Completed',
        payment: '$125'
    },
    {
        id: 5,
        WaiterName: 'lara',
        orederId: 'A5',
        table: 4,
        imageUrl: 'https://tse1.mm.bing.net/th?id=OIP.mlfObRKCDO4pgollystiHgHaIY&pid=Api&P=0&h=180',
        OrederMenu: 'Fish curry (1 plates)',
        status: 'Pending',
        payment: '$15'
    },
    {
        id: 6,
        WaiterName: 'Messi',
        orederId: 'A6',
        table: 8,
        imageUrl: 'http://www.myherodesign.com/wp-content/uploads/2016/06/Hispanic_Female_Suspicious-1.gif',
        OrederMenu: 'mutton Soups (2 plates)',
        status: 'Preparing',
        payment: '$25'
    },
    {
        id: 7,
        WaiterName: 'Dhoni',
        orederId: 'A7',
        table: 9,
        imageUrl: 'https://img.favpng.com/22/3/23/animated-film-cheek-computer-animation-facial-expression-cartoon-png-favpng-jQX8u9tzFnDdLM1XhuMUSFSnT.jpg',
        OrederMenu: 'chiken Spicy wings (2 plates)',
        status: 'Completed',
        payment: '$125'
    },
    
]
const DataTable = () => {
    const [show, setShow] = useState(false);
    const [target, setTarget] = useState(null);
    const ref = useRef(null);

    const handleClick = (event) => {
        setShow(!show);
        setTarget(event.target);
    }
    const customerStatus = (status) => {
        if (status === 'Completed') {
            return <p className='completed'>{status}</p>
        } else if (status === "Pending") {
            return <p className='pending'>{status}</p>
        } else {
            return <p className='preparing'>{status}</p>
        }
    }
    return (
        <div className="Home-main-container" >
            <Navbar />
            <div className="Home-page-actvities-card">
                <div className="home-page-header-division">
                    <div className="headre-sercah-card">
                        <MdSearch size={20} />
                        <input className="serach-input" type="search" />
                    </div>
                    <div className="headre-icons-card">
                        <MdNotificationsNone size={20} style={{ marginRight: '20px' }} />
                        <CgProfile size={20} style={{ marginRight: '20px' }} onClick={handleClick} />
                    </div>
                </div>
                    <div className='oreders-report-tables-card-container'>
                        <table className='dashboard-table-main'>
                            <thead className='dash-b-table-head'>
                                <th className='th-name-card'>Waiter Name</th>
                                <th className='th-name-card'>Menu</th>
                                <th className='th-name-card'>Order-id</th>
                                <th className='th-name-card'>Table</th>
                                <th className='th-name-card'>TotalPayment</th>
                                <th className='th-name-card'>Status</th>
                                <th className='th-name-card'>Payment-Status</th>
                            </thead>
                            <tbody className='table-rows-card'>
                                {
                                    orderReportsLIst.map(each => (
                                        <tr className='dash-b-table-row' key={each.id}>
                                            <td className='tr-name-card'>{each.WaiterName}</td>
                                            <td className='tr-name-card'>{each.OrederMenu}</td>
                                            <td className='tr-name-card'>{each.orederId}</td>
                                            <td className='tr-name-card'>{each.table}</td>
                                            <td className='tr-name-card'>{each.payment}</td>
                                            <td className='tr-name-card'>
                                                {customerStatus(each.status)}
                                            </td>
                                            <td className='tr-name-card'>
                                                {customerStatus(each.status)}
                                            </td>
                                        </tr>
                                    ))
                                }
                            </tbody>
                        </table>
                    </div>

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
                                        <h3 style={{ color: '#ffffff', margin: '0px' }}>Name</h3>
                                        <p style={{ color: '#ffffff' }}>Email</p>
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
        </div>
    )
}
export default DataTable


