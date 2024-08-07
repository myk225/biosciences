/* eslint-disable react/jsx-key */
import React, { useEffect, useState } from "react";
// import Col from "react-bootstrap/Col";
// import Form from "react-bootstrap/Form";
// import Row from "react-bootstrap/Row";
import './index.css'
const AnimalStudy = ({ animals, setAnimals, inputs }) => {
    useEffect(() => {
        console.log("i am running");
        for (let i = 0; i < inputs?.animals; i++) {
            console.log(i);
            setAnimals((prev) => [
                ...prev,
                {
                    animalId: null,
                    timepoints: 6,
                    preDoseTime: null,
                    doseTime: null,
                    description: "",
                    index: i,
                },
            ]);
        }
    }, [inputs.animal]);
    function handleChange(e) { }
    return (
        <div className="animal-study-division">

            {animals.map((animal, i) => {
                return (
                    <div className='form-second-division'>
                        <div className='form-input-div-card'>
                            <label htmlFor='study-name' className='label-name'>Select Animal</label>
                            <select className='input-feild-card' name="animalId">
                                <option value="1">Mouse(1001)</option>
                                <option value="2">Mouse(3200)</option>
                                <option value="3">animal(3003)</option>
                            </select>
                        </div>
                        <div className='form-input-div-card'>
                            <label htmlFor='animals' className='label-name'>Timepoints for this Animal</label>
                            <input id='animals' className='input-feild-card' type="number" name="animals" onChange={handleChange} placeholder="timepoints" />
                        </div>
                        <div className='form-input-div-card'>
                            <label htmlFor='periods' className='label-name'>Description</label>
                            <input id='periods' className='input-feild-card' type="text" name="description" onChange={handleChange} placeholder="some description" />
                        </div>
                    </div>
                );
            })}
        </div>
    );
};

export default AnimalStudy;
