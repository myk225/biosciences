import { retry } from "@reduxjs/toolkit/query";
import { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import useFetch from "../../hooks/fetch";

export const AddAnimals = ({ studyId }) => {
  const { groups, peroids } = useSelector((state) => state.study);
  const navigate=useNavigate();
  const [inputs,setInputs]=useState({});
  return (
    <div className="container">
      {groups.map((group, index) => {
        return <Group key={group.id} group={group} index={index} setInputs={setInputs} />;
      })}
      <button className="btn btn-info mt-3"  onClick={()=>{
        console.log(inputs);
        fetch(`https://demo.mohammadiatrust.org/api/addAnimals/${studyId}`,{
            method:"POST",
            headers:{
                "Content-Type":"application/json"
            },
            body:JSON.stringify(inputs)
        }).then((res)=>res.json())
        .then((data)=>{
            alert(data.message);
            if(data.success){
                navigate("/");
            }
        }).catch((err)=>alert(err.message));
      }}>save</button>
    </div>
  );
};
const Group = ({ group, index,setInputs }) => {
  return (
    <div className="group border p-2 ">
      <h2>Group {index + 1}</h2>
      <div className="info d-flex flex-wrap justify-content-between">
        <div className="d-flex py-2 text-bolder gap-4 font-weight-bold">
          <p>Group Id : </p>
          <p>{group.id}</p>
        </div>

        <div className="d-flex p-2  gap-4 text-bolder">
          <p>Group Name : </p>
          <p>{group.groupName}</p>
        </div>

        <div className="d-flex p-2 gap-4 text-bolder">
          <p>Total Animals : </p>
          <p>{group.noOfAnimals}</p>
        </div>
        <div className="d-flex p-2 gap-4 text-bolder">
          <p>Dose : </p>
          <p>{group.dose}</p>
        </div>
        <div className="d-flex p-2  gap-4 text-bolder">
          <p>Dose Volume : </p>
          <p>{group.doseVol}</p>
        </div>
      </div>

      <GroupAnimals group={group} setInputs={setInputs}/>
    </div>
  );
};

const GroupAnimals = ({ group,setInputs }) => {
  const [animals, setAnimals] = useState([]);

  useEffect(() => {

        for (let i = 0; i < group.noOfAnimals; i++) {
            let data = { groupId: group.id, index: i + 1 };
            setAnimals((prev)=>[...prev,{...data}]);
          }
  }, [group.noOfAnimals]);
  
  useEffect(()=>{
    
    setInputs((prev)=>{
        return {...prev,[group['id']]:[...animals]}
    });
  },[animals])
  console.log(animals);
 if(animals.length)  
  return (
  <div>
    {animals?.map((animal) => {
      console.log(animal);
      return (
        <Animal key={animal.index} currAnimal={animal} setAnimals={setAnimals} />
      );
    })}
  </div>
);
};

const Animal = ({ setAnimals, currAnimal }) => {
  const [animal,setAnimal]=useState(currAnimal);
  const {data,error,isLoading}=useFetch(`https://demo.mohammadiatrust.org/animals`);
  function handleChange(e) {
    setAnimal((prev)=>({...prev,[e.target.name]: e.target.value}))
    setAnimals((prev) => {
      let updatedAnimal = { ...animal, [e.target.name]: e.target.value };
      let updatedAnimals = prev.map((elem) => {
        if (elem.index == animal.index) {
          return updatedAnimal;
        }
        return elem;
      });
      return updatedAnimals;
    });
  }

  if(error) return <div>Error</div>
  if(isLoading) return <div>Loadinbg....</div>
  if(data){
    return (
      <div className="d-flex border flex-wrap p-4 mt-2">
        <div className="flex-1 mx-3 mx-3">
          <label className="form-label">Please select a animal</label>
          <select name="animalId" className="form-select" onChange={(e)=>handleChange(e)} id="">
            {
              data.animals.map((elem)=>(
                <option value={elem.id} key={elem.id}>{elem.name}</option>
              ))
            }
          </select>
        </div>
        <div className="flex-1 mx-3 mx-3">
          <label className="form-label">Please Add animals Weight</label>
          <input
            type="text"
            className="form-control"
            name="weight"
            onChange={(e) => handleChange(e)}
          />
        </div>
        <div className="flex-1 mx-3 mx-3">
          <label className="form-label">
              sex
          </label>
          <input
            type="text"
            className="form-control"
            name="sex"
            onChange={(e) => handleChange(e)}
          />
        </div>
      </div>
    );
  }
   
};




