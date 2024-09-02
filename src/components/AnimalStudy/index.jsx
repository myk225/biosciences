/* eslint-disable react/jsx-key */
import React, { useEffect, useState } from "react";
import Col from "react-bootstrap/Col";
import Form from "react-bootstrap/Form";
import Row from "react-bootstrap/Row";
import './index.css'
const AnimalStudy = ({ animals, setAnimals, group,groups,setGroups,i}) => {

    useEffect(() => {
      console.log("i am running");
      let updatedGroups=groups.map((elem,index)=>{
       
        if(i==index){
          elem.animals=[];
          for (let i = 0; i < group?.totalAnimals; i++) {
            console.log(i);
            elem.animals.push({
              groupName:group['groupName'],
              animalId: null,
              timepoints: group.timepoints,
              preDoseTime: null,
              doseTime: null,
              description: "",
              index: i,
             })
          }
           
        }
    return elem;
  })
  setGroups(updatedGroups);
      // for (let i = 0; i < group?.totalAnimals; i++) {
      //   console.log(i);
      //   setAnimals((prev) => [
      //     ...prev,
      //     {
      //       groupName:group['groupName'],
      //       animalId: null,
      //       timepoints: 6,
      //       preDoseTime: null,
      //       doseTime: null,
      //       description: "",
      //       index: i,
      //     },
      //   ]);
      // }
    }, [group.totalAnimals]);
    function handleChange(e) {}
    return (
      <div>
        
        {group.animals.map((animal, groupIndex) => {
          return (
            <div className="border p-4 m-2 d-flex flex-wrap">
              <Form.Group
                as={Row}
                className="mb-3 w-50"
                controlId="formPlaintextEmail"
              >
              
                <Col sm="10">
                <Form.Label column sm="10">
                  Select Animal
                </Form.Label>
                  <Form.Select
                    name="animalId"
                    aria-label="Default select example"
                    onChange={(e,i)=>{
                      let updatedAnimals=group.animals.map((elem,index)=>{
                       
                        if(index==groupIndex){
                       
                          elem.animalId=e.target.value;
                        }
                        return elem;
                      })
                      let updatedGroups=groups.map((elem,i)=>{
                        if(elem.index==group.index){
                         
                          elem.animals=updatedAnimals;
                      }
                      return elem;
                      })
                      setGroups(updatedGroups);
                      // console.log(updatedGroups);
                    }}  
                  >
                    <option>Open this select menu</option>
                    {
                      animals.map((elem)=><option key={elem.id} value={elem.id}>{elem.name}</option>)
                    }
                    
                  </Form.Select>
                </Col>
              </Form.Group>
  
              {/* <Form.Group
                as={Row}
                className="mb-3 w-50"
                controlId="formPlaintextPassword"
              >
                 <Form.Label column sm="10">
                  Timepoints for this Animal
                </Form.Label>
                <Col sm="10">
               
                  <Form.Control
                    type="number"
                    name="animals"
                    onChange={handleChange}
                    placeholder="timepoints"
                  />
                </Col>
              </Form.Group> */}
              {/* <Form.Group
                as={Row}
                className="mb-3 w-50"
                controlId="formPlaintextPassword"
              >
                <Form.Label column sm="10">
                  Pre Dose Time
                </Form.Label>
                <Col sm="10">
                  <Form.Control
                    type="datetime-local"
                    name="preDoseTime"
                    onChange={handleChange}
                    placeholder="no of animals"
                  />
                </Col>
              </Form.Group>
              <Form.Group
                as={Row}
                className="mb-3 w-50"
                controlId="formPlaintextPassword"
              >
                <Form.Label column sm="10">
                  Dose Time
                </Form.Label>
                <Col sm="10">
                  <Form.Control
                    type="datetime-local"
                    name="doseTime"
                    onChange={handleChange}
                    placeholder="no of animals"
                  />
                </Col>
              </Form.Group> */}
              <Form.Group
                as={Row}
                className="mb-3 w-50"
                controlId="formPlaintextPassword"
                
              >
                <Form.Label column sm="10">
                  Description
                </Form.Label>
                <Col sm="10">
                  <Form.Control
                    type="text"
                    name="description"
                    onChange={handleChange}
                    placeholder="some description"
                  />
                </Col>
              </Form.Group>
            </div>
          );
        })}
      </div>
    );
  };

export default AnimalStudy;
