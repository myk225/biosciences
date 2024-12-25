import { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { toast } from "react-toastify";
import { step1Valid } from "../../zod/stepperValidations";
import { BackdropLoader } from "../loaders/BackdropLoader";

const Form1 = ({setParams,params,setFormLoader,formLoader}) => {
    const {study}=useSelector(state=>state.study);
    
    const studyNumber=params.get("studyNumber")
    const studyPhase=params.get("studyPhase");
    console.log(studyNumber,studyPhase)
    const [inputs, setInputs] = useState({
      studyNumber,
      studyPhase
        // studyName: null,
        // noOfGroups : null,
        // noOfPeroids : null,
        // speciesId : null,
        // centrifugationWithIn : null,
        // centrifugationDuration : null,
    });
    const [species,setSpecies]=useState([]);
   
    useEffect(()=>{
      fetch(`${import.meta.env.VITE_API_URL}/species`)
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
      setFormLoader(true);
      try{
        activity1data.parse(body);
        try {
          const response=await fetch('${import.meta.env.VITE_API_URL}/createStudy',{
            method:"POST",
            credentials: 'include',
            headers:{
              "Content-Type" : "application/json"
            },
            body: JSON.stringify(body)
          })
          
          const res=await response.json();
          toast(res.message);
        } catch (error) {
          toast(`something went wrong ${error.message }`);
        }finally{
          setFormLoader(false);
        }
      }catch(error){
        toast(error.errors[0].message)
      }
    }
    function handleChange(e) {
      setInputs({ ...inputs, [e.target.name]: e.target.value });
    }

    if(formLoader){
      return <BackdropLoader/>
    }
    if(study.currStep<2){
      return (
        <div className="forms-main-container">
        <form className="form-card">
          <div className="form-first-division">   
          <div className="form-input-div-card">
              <label htmlFor="study-name" className="label-name">
                Study Number
              </label>
              <input
                id="studyId"
                name="studyId"
                className="input-feild-card"
                type="text"
                value={inputs.studyNumber}
                disabled
                onChange={handleChange}
                placeholder="Study Number"
                required
              />
            </div>
            <div className="form-input-div-card">
              <label htmlFor="study-name" className="label-name">
                Study Phase 
              </label>
              <input
                id="studyId"
                name="studyPhase"
                className="input-feild-card"
                type="text"
                onChange={handleChange}
                placeholder="Study Phase"
                value={inputs.studyPhase}
                disabled
                required
              />
            </div>
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
           
            
          </div>
     
            <div className="form-first-division mt-4">
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
                  <option value="">please select a value</option>
                  {
                    species?.map((elem)=>{
                      return <option key={elem.id}  value={elem.id}>{elem.name}</option>
                    })
                  }
              </select>
            
            </div>
            {/* <div className="form-input-div-card">
              <label htmlFor="anticogulant" className="label-name">
                Biological Matrix To Collect
              </label>
              <select id="periods"
                name="biologicalMatrixToCollect"
                className="input-feild-card"
                type="number"
                onChange={handleChange}
                placeholder="species">
                  <option value="">please select a value</option>
                  {
                    species?.map((elem)=>{
                      return <option key={elem.id}  value={elem.id}>{elem.name}</option>
                    })
                  }
              </select>
            </div> */}
           <div className="form-input-div-card">
              <label htmlFor="anticogulant" className="label-name">
                Biological Matrix To Collect
              </label>
              <input id="periods"
                name="biologicalMatrixToCollect"
                className="input-feild-card"
                onChange={handleChange}
                placeholder="Matrix"
                type="text"
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
                Stored At Temperature (°C)
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
            <div className="form-first-division mt-4">
            <div className="form-input-div-card">
              <label htmlFor="centrifugationSpeed" className="label-name">
                Centrifugation Speed (rpm)
              </label>
              <input
                id="centrifugationSpeed"
                className="input-feild-card"
                type="number"
                name="centrifugationSpeed"
                onChange={handleChange}
                placeholder="cetrifugation speed"
              />
            </div>
            <div className="form-input-div-card">
              <label htmlFor="centrifugationTemperature" className="label-name">
                Centrifugation Temperature (°C)
              </label>
              <input
                id="centrifugationTemperature"
                className="input-feild-card"
                type="text"
                name="centrifugationTemperature"
                onChange={handleChange}
                placeholder="centrifugation temperature"
              />
            </div>
            <div className="form-input-div-card">
              <label htmlFor="centrifugationWithIn" className="label-name">
                Centrifugation with in (mins)
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
                Centrifugation Duration (mins)
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
            
                  
            </div>
            <div className="form-first-division mt-4">
            <div className="form-input-div-card">
              <label htmlFor="appoxVolOfBloodToCollect" className="label-name">
                Approximate volume of Biological Matrix in each set
              </label>
              <input
                id="appoxVolOfBloodToCollect"
                className="input-feild-card"
                type="text"
                name="appoxVolOfBloodToCollect"
                onChange={handleChange}
                placeholder="Approximate volume of Biological Matrix in each set"
              />
            </div>
            <div className="form-input-div-card">
              <label htmlFor="storedAtTemperature" className="label-name">
              Approximate volume of blood to be collected
              </label>
              <input
                id="approximateVolumeOfBloodToBeCollected"
                className="input-feild-card"
                type="text"
                name="appoxVolOfBloodToCollect"
        
                onChange={handleChange}
                placeholder="approximate volume of blood to be collected"
              />
            </div>
            <div className="form-input-div-card">
              {/* <label htmlFor="storedAtTemperature" className="label-name">
              approximate volume of blood to be collected
              </label>
              <input
                id="approximateVolumeOfBloodToBeCollected"
                className="input-feild-card"
                type="text"
                name="approximateVolumeOfBloodToBeCollected"
                onChange={handleChange}
                placeholder="approximate volume of blood to be collected"
              /> */}
            </div>
            <div className="form-input-div-card">
              {/* <label htmlFor="storedAtTemperature" className="label-name">
              approximate volume of blood to be collected
              </label>
              <input
                id="approximateVolumeOfBloodToBeCollected"
                className="input-feild-card"
                type="text"
                name="approximateVolumeOfBloodToBeCollected"
                onChange={handleChange}
                placeholder="approximate volume of blood to be collected"
              /> */}
            </div>
            </div>
            
          <button type="submit" onClick={(e)=>{
            e.preventDefault();
            console.log(inputs);
           
           try {

            step1Valid.parse(inputs);
            // ${import.meta.env.VITE_API_URL}

            fetch(`${import.meta.env.VITE_API_URL}/api/createStudy/step1`,{
              method:"POST",
              credentials: 'include',
              headers:{
                'Content-Type': 'application/json'
              },
              body:JSON.stringify(inputs)
            }).then((res)=>res.json())
            .then(data=>{
              if(data.myId) setParams({studyId:data.myId});
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