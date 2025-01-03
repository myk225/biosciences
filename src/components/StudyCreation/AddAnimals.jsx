
import { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import useFetch from "../../hooks/fetch";
import { toast } from "react-toastify";

export const AddAnimals = ({ studyId }) => {
  const { groups, peroids } = useSelector((state) => state.study);
  const navigate=useNavigate();
  const [inputs,setInputs]=useState({});
  return (
    <div className="container ">
      {groups.map((group, index) => {
        return <Group key={group.id} group={group} index={index} setInputs={setInputs} />;
      })}
      <button className="btn btn-info mt-3"  onClick={()=>{
        console.log(inputs);
        fetch(`${import.meta.env.VITE_API_URL}/api/addAnimals/${studyId}`,{
            method:"POST",
            credentials: 'include',
            headers:{
                "Content-Type":"application/json"
            },
            body:JSON.stringify(inputs)
        }).then((res)=>res.json())
        .then((data)=>{
            toast(data.message);
            if(data.success){
                navigate("/");
            }
        }).catch((err)=>toast(err.message));
      }}>save</button>
    </div>
  );
};
const Group = ({ group, index,setInputs }) => {
  return (
    <div className="group border p-2 ">
      <h2>Group {index + 1}</h2>
      <div className="info d-flex flex-wrap justify-content-between">
        {/* <div className="d-flex py-2 text-bolder gap-4 font-weight-bold">
          <p>Group Id : </p>
          <p>{group.id}</p>
        </div> */}

        <div className="d-flex p-2  gap-4 text-bolder">
          <p>Group Number : </p>
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
       {
        group.doseVol &&  <div className="d-flex p-2  gap-4 text-bolder">
        <p>Dose Volume : </p>
        <p>{group.doseVol}</p>
      </div>
       }
       {
        group.noOfTablets &&  <div className="d-flex p-2  gap-4 text-bolder">
        <p>No Of tablets : </p>
        <p>{group.noOfTablets}</p>
      </div>
       }
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
  const {data,error,isLoading}=useFetch(`${import.meta.env.VITE_API_URL}/animals`);
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
          <label className="form-label">Enter Animal Id</label>
          <input type="text"  className="form-control" name="animalId" onChange={(e)=>handleChange(e)} />
          {/* <select name="animalId" className="form-select" onChange={(e)=>handleChange(e)} id="">
            {
              data.animals.map((elem)=>(
                <option value={elem.id} key={elem.id}>{elem.name}</option>
              ))
            }
          </select> */}
        </div>
        {/* <div className="flex-1 mx-3 mx-3">
          <label className="form-label">Please Add animals Weight</label>
          <input
            type="text"
            className="form-control"
            name="weight"
            onChange={(e) => handleChange(e)}
          />
        </div> */}
        <div className="flex-1 mx-3 mx-3">
          <label className="form-label">
              sex
          </label>
          <select  className="form-select"
            name="sex"
            onChange={(e) => handleChange(e)}>
              <option>please select a gender</option>
              <option value="1">Male</option>
              <option value="2">Female</option>
            </select>
        </div>
      </div>
    );
  }
   
};




