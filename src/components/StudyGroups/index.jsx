import { useEffect, useState } from "react";
import Col from 'react-bootstrap/Col';
import Form from 'react-bootstrap/Form';
import Row from 'react-bootstrap/Row';
import Button from 'react-bootstrap/Button';
import AnimalStudy from "../AnimalStudy";

const StudyGroups = ({groups,inputs,setGroups}) => {
    
    const [animals,setAnimals]=useState([]);
    console.log(groups)
    useEffect(() => {
        console.log("i am running");
        for (let i = 0; i < inputs?.groups; i++) {
          console.log(i);
          setGroups((prev) => [
            ...prev,
            {
                groupName : `Group${i+1}`,
              timepoints: 0,
              totalAnimals:0,
              animals: [],
              preDoseTime: null,
              doseTime: null,
              description: "",
              index: i,
            },
          ]);
        }
      }, [inputs.groups]);
      function handleAnimalChange(e,index){
        console.log(groups[index])
        let updatedGroups=groups.map((elem,i)=>{
                if(i==index){
                    elem.totalAnimals=e.target.value;
                }
            return elem;
        })
        setGroups(updatedGroups);
      }
      function handleTimepoints(e,index){
        let updatedGroups=groups.map((elem,i)=>{
          if(i==index){
            return  {...elem,timepoints:e.target.value};
          }
      return elem;
  })
  setGroups(updatedGroups);
      }
      function addAnimal(e,index){

      }
  return (
    <div className=" p-4 m-2 d-flex flex-wrap w-100">
        
        {
            groups.map((elem,i)=>{
                return (
                    <div key={i} className="border p-4 m-2 w-100"  >
                        <h3>{elem.groupName}</h3>
                        <Form.Group
              as={Row}
              className="mb-3 w-100"
              controlId="formPlaintextEmail"
            >
            
              <Col sm="5">
              <Form.Label column sm="10">
                Enter No Of Animal
              </Form.Label>
              <Form.Control
                  type="text"
                  name="animals"
                  onChange={(e)=>handleAnimalChange(e,i)}
                  placeholder="number of animals"
                />
              </Col>
              <Col sm="5">
              <Form.Label column sm="10">
                Enter Time Points for this group
              </Form.Label>
              <Form.Control
                  type="text"
                  name="timepoints"
                  onChange={(e)=>handleTimepoints(e,i)}
                  placeholder="number of timepoints"
                />
              </Col>
            </Form.Group>   
                    {
                        groups[i].totalAnimals!=0 &&
                        <AnimalStudy animals={animals} groups={groups} setGroups={setGroups} setAnimals={setAnimals} group={groups[i]} i={i}/>                
                              }
                    </div>
                )
            })
        }
    </div>
  )
}

export default StudyGroups