

import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { IoMdArrowRoundBack } from "react-icons/io";
import AnimalStudy from '../AnimalStudy';
import Navbar from '../Navbar';
import './index.css'
export const ActivityOne = () => {
    const [inputs, setInputs] = useState({});
    const [animals, setAnimals] = useState([]);
    function handleChange(e) {
        if (e.target.name == 'animals') {
            setAnimals([]);
        }
        setInputs({ ...inputs, [e.target.name]: e.target.value });

    }
    return (
        <div className="Home-main-container">
            <Navbar />
            <div className="activities-main-container">
                <div className='activities-header-card'>
                    <h1 className='activity-title-name'>Activity 1 (Create Study)</h1>
                    <Link to='/'>
                        <button className='back-button'><IoMdArrowRoundBack className='back-icon' />Back</button>
                    </Link>
                </div>
                <div className='forms-main-container'>
                    <form className='form-card'>
                        <div className='form-first-division'>
                            <div className='form-input-div-card'>
                                <label htmlFor='study-name' className='label-name'>Study Name</label>
                                <input id='study-name' name='studyname' className='input-feild-card' type='text' onChange={handleChange} defaultValue='some study' />
                            </div>
                            <div className='form-input-div-card'>
                                <label htmlFor='animals' className='label-name'>Animals</label>
                                <input id='animals' className='input-feild-card' type="number" name='animals' onChange={handleChange} placeholder="no of animals" />
                            </div>
                            <div className='form-input-div-card'>
                                <label htmlFor='periods' className='label-name'>Periods</label>
                                <input id='periods' name='periods' className='input-feild-card' type='number' onChange={handleChange} placeholder="no of peroids" />
                            </div>
                        </div>
                        <div className='periods-styles-card'>
                            <Peroids peroid={inputs.periods} />
                        </div>
                        {
                            inputs?.animals &&
                            <AnimalStudy inputs={inputs} animals={animals} setAnimals={setAnimals} />
                        }
                        <button className="submit-save-button" >Save</button>
                    </form>
                </div>
            </div>
        </div>

    )
}

export default ActivityOne
const Peroids = ({ peroid }) => {
    const [peroids, setPeroids] = useState(() => {
        let currPeroids = [];
        for (let i = 0; i < peroid; i++) {
            currPeroids.push({ peroid: i + 1 });
        }
        return currPeroids;
    });
    useEffect(() => {
        let currPeroids = [];
        for (let i = 0; i < peroid; i++) {
            currPeroids.push({ peroid: i + 1 });
        }
        setPeroids(currPeroids)
    }, [peroid])
    return <div className='period-input-division'>
        {
            peroids.map((period) => {
                return (
                        <div className='form-input-div-card'>
                            <label htmlFor='study-name' className='label-name'>Peroid Start Date (P{period.peroid})</label>
                            <input id='study-name' className='input-feild-card' type="datetime-local"
                                name="preDoseTime"
                                placeholder="no of animals" />
                        </div>)
                // <Form.Group
                //     as={Row}
                //     className="mb-3 w-50"
                //     controlId="formPlaintextPassword"
                // >
                //     <Form.Label column sm="10">
                //         Peroid Start Date (P{period.peroid})
                //     </Form.Label>
                //     <Col sm="10">
                //         <Form.Control
                //             type="datetime-local"
                //             name="preDoseTime"
                //             placeholder="no of animals"
                //         />
                //     </Col>
                // </Form.Group>
            })
        }
    </div>
}