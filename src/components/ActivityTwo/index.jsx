import './index.css'
import Table from 'react-bootstrap/Table';
import Navbar from '../Navbar';
import { Link } from 'react-router-dom';
import { IoMdArrowRoundBack } from "react-icons/io";
const ActivityTwo = () => {
    return (
        <div className="Home-main-container">
            <Navbar />
            <div className="activities-main-container">
                <div className='activities-header-card'>
                    <h1 className='activity-title-name'>Activity 2 (Add Time Points)</h1>
                    <Link to='/'>
                        <button className='back-button'><IoMdArrowRoundBack className='back-icon' />Back</button>
                    </Link>
                </div>
                <div className='activity-two-content-card'>
                    <div className="titles-cards">
                        <h3 className='title-name-styles'>Study No: <span className='title-des-styles'>100</span></h3>
                        <h3 className='title-name-styles'>Peroid: <span className='title-des-styles'>P1</span></h3>
                        {/* <h3>Animal Id : 10010</h3> */}
                    </div>

                    <div className="table-main-container">
                        <h3 className='title-des-styles'>Add TP's</h3>
                        <table className='table-main-container'>
                            <tbody className='tbody-styles-card'>
                                <tr>
                                    <th className='table-header-names'>
                                        Study100 (GroupName1)
                                    </th>
                                    <td>
                                        <label>TP1</label>
                                        <input type="text" required className='table-tp-header' />
                                    </td>
                                    <td>
                                        <label>TP2</label>
                                        <input type="text" required className='table-tp-header' />
                                    </td> <td>
                                        <label>TP3</label>
                                        <input type="text" required className='table-tp-header' />
                                    </td> <td>
                                        <label>TP4</label>
                                        <input type="text" required className='table-tp-header' />
                                    </td> <td>
                                        <label>TP5</label>
                                        <input type="text" required className='table-tp-header' />
                                    </td> <td>
                                        <label>TP6</label>
                                        <input type="text" required className='table-tp-header' />
                                    </td> <td>
                                        <label>TP7</label>
                                        <input type="text" required className='table-tp-header' />
                                    </td> <td>
                                        <label>TP8</label>
                                        <input type="text" required className='table-tp-header' />
                                    </td>
                                    <td>
                                        <label>TP9</label>
                                        <input type="text" required className='table-tp-header' />
                                    </td><td>
                                        <label>TP10</label>
                                        <input type="text" required className='table-tp-header' />
                                    </td><td>
                                        <label>TP11</label>
                                        <input type="text" required className='table-tp-header' />
                                    </td><td>
                                        <label>TP12</label>
                                        <input type="text" required className='table-tp-header' />
                                    </td><td>
                                        <label>TP13</label>
                                        <input type="text" required className='table-tp-header' />
                                    </td><td>
                                        <label>TP14</label>
                                        <input type="text" required className='table-tp-header' />
                                    </td><td>
                                        <label>TP15</label>
                                        <input type="text" required className='table-tp-header' />
                                    </td><td>
                                        <label>TP16</label>
                                        <input type="text" required className='table-tp-header' />
                                    </td><td>
                                        <label>TP17</label>
                                        <input type="text" required className='table-tp-header' />
                                    </td><td>
                                        <label>TP18</label>
                                        <input type="text" required className='table-tp-header' />
                                    </td><td>
                                        <label>TP19</label>
                                        <input type="text" required className='table-tp-header' />
                                    </td><td>
                                        <label>TP20</label>
                                        <input type="text" required className='table-tp-header' />
                                    </td><td>
                                        <label>TP21</label>
                                        <input type="text" required className='table-tp-header' />
                                    </td><td>
                                        <label>TP22</label>
                                        <input type="text" required className='table-tp-header' />
                                    </td>
                                </tr>
                                <tr>
                                    <th className='table-header-names'>
                                        Study100  (GroupName2)
                                    </th>
                                    <td>
                                        <input type="text" required className='table-tp-header' />
                                    </td>
                                    <td>
                                        <input type="text" required className='table-tp-header' />
                                    </td> <td>
                                        <input type="text" required className='table-tp-header' />
                                    </td> <td>
                                        <input type="text" required className='table-tp-header' />
                                    </td> <td>
                                        <input type="text" required className='table-tp-header' />
                                    </td> <td>
                                        <input type="text" required className='table-tp-header' />
                                    </td> <td>
                                        <input type="text" required className='table-tp-header' />
                                    </td> <td>
                                        <input type="text" required className='table-tp-header' />
                                    </td>
                                    <td>
                                        <input type="text" required className='table-tp-header' />
                                    </td><td>
                                        <input type="text" required className='table-tp-header' />
                                    </td><td>
                                        <input type="text" required className='table-tp-header' />
                                    </td><td>
                                        <input type="text" required className='table-tp-header' />
                                    </td><td>
                                        <input type="text" required className='table-tp-header' />
                                    </td><td>
                                        <input type="text" required className='table-tp-header' />
                                    </td><td>
                                        <input type="text" required className='table-tp-header' />
                                    </td><td>
                                        <input type="text" required className='table-tp-header' />
                                    </td><td>
                                        <input type="text" required className='table-tp-header' />
                                    </td><td>
                                        <input type="text" required className='table-tp-header' />
                                    </td><td>
                                        <input type="text" required className='table-tp-header' />
                                    </td><td>
                                        <input type="text" required className='table-tp-header' />
                                    </td><td>
                                        <input type="text" required className='table-tp-header' />
                                    </td><td>
                                        <input type="text" required className='table-tp-header' />
                                    </td>
                                </tr>
                            </tbody>
                        </table>
                    </div>
                    <button className="submit-save-button">
                        Save
                    </button>
                </div>
            </div>
        </div>

    )
}

export default ActivityTwo