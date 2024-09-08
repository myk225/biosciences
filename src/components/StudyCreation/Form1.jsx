import { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { toast } from "react-toastify";
import { step1Valid } from "../../zod/stepperValidations";

const Form1 = ({setParams}) => {
    const {study}=useSelector(state=>state.study);
    const [inputs, setInputs] = useState({
        // studyName: null,
        // noOfGroups : null,
        // noOfPeroids : null,
        // speciesId : null,
        // centrifugationWithIn : null,
        // centrifugationDuration : null,
    });
    const [species,setSpecies]=useState([]);
   
    useEffect(()=>{
      fetch(`https://demo.gharxpert.in/species`)
      .then(res=>res.json())
      .then(data=>{
        console.log(data  )
        setSpecies(data.species)
      }
      )
      .catch(err=>toast(err.message));
  
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
          const response=await fetch('https://demo.gharxpert.in/createStudy',{
            method:"POST",
            headers:{
              "Content-Type" : "application/json"
            },
            body: JSON.stringify(body)
          })
          
          const res=await response.json();
          toast(res.message);
        } catch (error) {
          toast(`something went wrong ${error.message }`);
        }
      }catch(error){
        toast(error.errors[0].message)
      }
    }
    function handleChange(e) {
      setInputs({ ...inputs, [e.target.name]: e.target.value });
    }
    if(study.currStep<2){
      return (
        <div className="forms-main-container">
        <form className="form-card">
          <div className="form-first-division">
            <div className="form-input-div-card">
              <label htmlFor="study-name" className="label-name">
                Study Title
              </label>
              <input
                id="study-name"
                name="studyName"
                className="input-feild-card"
                type="text"
                onChange={handleChange}
                placeholder="Add Study Name"
                required
              />
            </div>
            <div className="form-input-div-card">
              <label htmlFor="animals" className="label-name">
                No of Groups
              </label>
              <input
                id="animals"
                className="input-feild-card"
                type="number"
                name="noOfGroups"
                onChange={handleChange}
                placeholder="no of groups for study"
                required
              />
            </div>
            <div className="form-input-div-card">
              <label htmlFor="periods" className="label-name">
                No Of Peroids
              </label>
              <input
                id="periods"
                name="noOfPeroids"
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
                name="speciesId"
                className="input-feild-card"
                type="number"
                onChange={handleChange}
                placeholder="species">
                  <option value="">please select a valye</option>
                  {
                    species?.map((elem)=>{
                      return <option key={elem.id}  value={elem.id}>{elem.name}</option>
                    })
                  }
              </select>
            
            </div>
            
          </div>
     
            <div className="form-first-division mt-4">
            <div className="form-input-div-card">
              <label htmlFor="centrifugationWithIn" className="label-name">
                Centrifugation with in
              </label>
              <input
                id="centrifugationWithIn"
                className="input-feild-card"
                type="number"
                name="centrifugationWithIn"
                onChange={handleChange}
                placeholder="cetrifugation with in(mins)"
              />
            </div>
            <div className="form-input-div-card">
              <label htmlFor="centrifugationDuration" className="label-name">
                Centrifugation Duration
              </label>
              <input
                id="centrifugationDuration"
                className="input-feild-card"
                type="number"
                name="centrifugationDuration"
                onChange={handleChange}
                placeholder="centrifugation duration(mins)"
              />
            </div>
            <div className="form-input-div-card">
              <label htmlFor="anticogulant" className="label-name">
                Anticogulant
              </label>
              <input
                id="anticogulant"
                className="input-feild-card"
                type="text"
                name="anticogulant"
                onChange={handleChange}
                placeholder="anticogulant"
              />
            </div>
            <div className="form-input-div-card">
              <label htmlFor="storedAtTemperature" className="label-name">
                Stored At Temperature
              </label>
              <input
                id="storedAtTemperature"
                className="input-feild-card"
                type="text"
                name="storedAtTemperature"
                onChange={handleChange}
                placeholder="Stored at temprature"
              />
            </div>
            </div>
    
            
          <button type="submit" onClick={(e)=>{
            e.preventDefault();
            console.log(inputs);
           
           try {

            step1Valid.parse(inputs);

            fetch(`https://demo.gharxpert.in/api/createStudy/step1`,{
              method:"POST",
              headers:{
                'Content-Type': 'application/json'
              },
              body:JSON.stringify(inputs)
            }).then((res)=>res.json())
            .then(data=>{
              setParams({studyId:data.myId});
              toast(data.message)
          })
            .catch(err=>toast(err.message));
           } catch (error) {
            toast.error(error.errors[0].message)
           }
            
          }} className="submit-save-button">Save</button>
        </form>
      </div>
      )
    }

    return <div>
        Already Added data for this step
    </div>
}

export default Form1