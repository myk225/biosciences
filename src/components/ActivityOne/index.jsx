import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { IoMdArrowRoundBack } from "react-icons/io";
import AnimalStudy from "../AnimalStudy";
import Navbar from "../Navbar";
import "./index.css";
import StudyGroups from "../StudyGroups";
import useFetch from "../../hooks/fetch";
import activity1data from "../../zod/activity1";
export const ActivityOne = () => {
  const [inputs, setInputs] = useState({});
  const [species,setSpecies]=useState([]);
  const [animals, setAnimals] = useState([]);
  const [groups, setGroups] = useState([]);
  useEffect(()=>{
    fetch(`http://localhost:9000/species`)
    .then(res=>res.json())
    .then(data=>{
      console.log(data  )
      setSpecies(data.species)
    }
    )
    .catch(err=>alert(err.message));
  },[])
  async function handleSubmit(e){
    e.preventDefault();
    console.log("-----Printing inputs-------")
    console.log(inputs);
    console.log("-----Printing groups-------")
    console.log(groups);
    let body={...inputs,groups:[...groups]};
    console.log(body);
  
    try{
      activity1data.parse(body);
      try {
        const response=await fetch('http://localhost:9000/createStudy',{
          method:"POST",
          headers:{
            "Content-Type" : "application/json"
          },
          body: JSON.stringify(body)
        })
        
        const res=await response.json();
        alert(res.message);
      } catch (error) {
        alert(`something went wrong ${error.message }`);
      }
    }catch(error){
      alert(error.errors[0].message)
    }
  }
  function handleChange(e) {
    if (e.target.name == "animals") {
      setAnimals([]);
    }
    setInputs({ ...inputs, [e.target.name]: e.target.value });
  }
  return (
    <div className="Home-main-container">
      <Navbar />
      <div className="activities-main-container">
        <div className="activities-header-card">
          <h1 className="activity-title-name">Activity 1 (Create Study)</h1>
          <Link to="/">
            <button className="back-button">
              <IoMdArrowRoundBack className="back-icon" />
              Back
            </button>
          </Link>
        </div>
        <div className="forms-main-container">
          <form className="form-card">
            <div className="form-first-division">
              <div className="form-input-div-card">
                <label htmlFor="study-name" className="label-name">
                  Study Name
                </label>
                <input
                  id="study-name"
                  name="studyname"
                  className="input-feild-card"
                  type="text"
                  onChange={handleChange}
                placeholder="Add Study Name"
                required
                />
              </div>
              <div className="form-input-div-card">
                <label htmlFor="animals" className="label-name">
                  Groups
                </label>
                <input
                  id="animals"
                  className="input-feild-card"
                  type="number"
                  name="groups"
                  onChange={handleChange}
                  placeholder="no of groups for study"
                />
              </div>
              <div className="form-input-div-card">
                <label htmlFor="periods" className="label-name">
                  Periods
                </label>
                <input
                  id="periods"
                  name="periods"
                  className="input-feild-card"
                  type="number"
                  onChange={handleChange}
                  placeholder="no of peroids"
                />
              </div>
              <div className="form-input-div-card">
                <label htmlFor="periods" className="label-name">
                  Select Species
                </label>
                <select id="periods"
                  name="species"
                  className="input-feild-card"
                  type="number"
                  onChange={handleChange}
                  placeholder="species">
                    <option value="">please select a valye</option>
                    {
                      species?.map((elem)=>{
                        return <option key={elem.id}   value={elem.id}>{elem.name}</option>
                      })
                    }
                </select>
              
              </div>
            </div>
            <div className="periods-styles-card">
              <Peroids peroid={inputs.periods} />
            </div>
            <div className="">
            {inputs.groups && (
              <StudyGroups
                groups={groups}
                setGroups={setGroups}
                inputs={inputs}
              />
            )}
            </div>

            {/* {
                            inputs?.animals &&
                            <AnimalStudy inputs={inputs} animals={animals} setAnimals={setAnimals} />
                        } */}
            <button onClick={handleSubmit} className="submit-save-button">Save</button>
          </form>
        </div>
      </div>
    </div>
  );
};

export default ActivityOne;
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
    setPeroids(currPeroids);
  }, [peroid]);
  return (
    <div className="period-input-division">
      {peroids.map((period) => {
        return (
          <div className="form-input-div-card">
            <label htmlFor="study-name" className="label-name">
              Peroid Start Date (P{period.peroid})
            </label>
            <input
              id="study-name"
              className="input-feild-card"
              type="datetime-local"
              name="start"
              placeholder="no of animals"
            />
          </div>
        );
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
      })}
    </div>
  );
};
