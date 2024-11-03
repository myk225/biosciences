import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux"
import { setStep } from "../../store/slices/studySlice";
import useFetch from "../../hooks/fetch";
import { toast } from "react-toastify";
import { groupDetailsValid } from "../../zod/stepperValidations";

const Form2 = ({studyId}) => {
  const {groups}=useSelector(state=>state.study);
  const {data,error,isLoading}=useFetch(`https://biobackend.cs-it.in/routes`)
  console.log(data,error)
  const dispatch=useDispatch();
  let myGrouIDs=groups.map((elem)=>{
      return {id:elem.id};
  })
  const [groupsData,setGroupsData]=useState([...myGrouIDs]);
  if(error){
    return <div>Error....in api call route routeOfAdministration</div>
  }
  if(isLoading) return <div>LOading....</div>
 if(data){
  return (
    <div className="" >
     
      <div className="groups">
        {
          groups.map((group)=>{
            return <Group key={group.id} group={group} routes={data?.routes} groupsData={groupsData} setGroupsData={setGroupsData}/>
          })
        }
      </div>
      <button className="btn btn-primary" onClick={()=>{
        console.log(groupsData);
       try {
          // groupDetailsValid.parse(groupsData);
        console.log(groupsData)
        fetch(`https://biobackend.cs-it.in/api/addGroupData/${studyId}`,{
          method:"PUT",
          credentials: 'include',
          headers:{
            'Content-Type' : 'application/json'
          },
          body:JSON.stringify({groupsData})
        })
        .then((res)=>res.json())
        .then((data)=>{
            if(data.success){
              dispatch(setStep(4));
            }
          toast(data.message)
      })
        .catch((err)=>toast(err.message));
       } catch (error) {
          toast.error(error.errors[0].message);
       }
      }}>save</button>
    </div>
  )
 }
}
const Group=({group,setGroupsData,groupsData,routes})=>{
  const [data,setData]=useState({id: group.id});
  // useEffect(()=>{
  //   let updatedGroupsData=groupsData.push({id:group.id});
  //   setGroupsData([...groupsData,updatedGroupsData]);
  // },[])
  function handleChange(e){
    console.log(e.target.value)
    let updatedData={...data,[e.target.name] : e.target.value};
    setData(updatedData);
    let updatedGroupsData=groupsData.map((elem)=>{
            if(elem.id==group.id){
              return updatedData;
            }
            return elem;
    })
    setGroupsData(updatedGroupsData);
  }

  return <div className="pItem border p-2 mb-2 ">
  <div className="groupInfo">

  </div>
 <div className="d-flex gap-1 flex-wrap" >
 <div className="flex-1 mx-3 mx-3">
 <label  className="form-label">Group Number</label>
<input type="text" className="form-control" name="studyName" onChange={(e)=>handleChange(e)} />
</div>
 <div className="flex-1 mx-3">
 <label  className="form-label">No of Timepoints</label>
<input type="text" className="form-control" name="noOfTimepoints" onChange={(e)=>handleChange(e)}/>
</div>
<div className="flex-1 mx-3">
 <label  className="form-label">No of Animals</label>
<input type="text" className="form-control" name="nofAnimals" onChange={(e)=>handleChange(e)}/>
</div>
<div className="flex-1 mx-3">
 <label  className="form-label">Form Of Treatment</label>
 <select className="form-select" onChange={(e)=>handleChange(e)} name="typeOfTreatment" id="">
  <option>Please Select</option>
  <option value="tablets">Tablets</option>
  <option value="formulation">Formulation</option>
  <option value="others">Others</option>
 </select>
{/* <input type="text" className="form-control" name="typeOfTreatment" onChange={(e)=>handleChange(e)}/> */}
</div>
  {
     data.typeOfTreatment==="others" && 
     <div className="flex-1 mx-3">
 <label  className="form-label"> Enter Form of Treatment</label>
<input type="text" className="form-control" name="formOfTreatMentManual" onChange={(e)=>handleChange(e)}/>
</div>
  }
<div className="flex-1 mx-3">
 <label  className="form-label">Route of Administration</label>
 <select className="form-select" name="routeOfAdministration" onChange={(e)=>handleChange(e)} id="">
 <option>Please Select A Route</option>
  {
    routes.map((elem)=>(
      <option  value={elem.id} key={elem.id}>{elem.value}</option>
    ))
  }
 </select>

</div>
<div className="flex-1 mx-3">
 <label  className="form-label">Test/Reference Item Details</label>
<input type="text" className="form-control" name="treatmen" onChange={(e)=>handleChange(e)}/>
</div>
<div className="flex-1 mx-3">
 <label  className="form-label">Dose (mg/kg) </label>
<input type="text" className="form-control" name="dose" onChange={(e)=>handleChange(e)}/>
</div>
{
  (data.typeOfTreatment==="formulation" || data.typeOfTreatment==="others") &&  <div className="flex-1 mx-3">
  <label  className="form-label">Dose Vol(ml/kg)</label>
 <input type="text" className="form-control" name="doseVol" onChange={(e)=>handleChange(e)}/>
 </div> 
}
{
  (data.typeOfTreatment === "tablets" || data.typeOfTreatment==="others") &&  <div className="flex-1 mx-3">
  <label  className="form-label">No Of Tablets</label>
 <input type="text" className="form-control" name="noOfTablets" onChange={(e)=>handleChange(e)}/>
 </div>
}
  {
    (data.typeOfTreatment==="formulation" || data.typeOfTreatment==="others" )  && <div className="flex-1 mx-3">
    <label  className="form-label">Concentration(mg/ml)</label>
   <input type="text" className="form-control" name="concentration" onChange={(e)=>handleChange(e)}/>
   </div>
  }

 </div>
</div>
}
export default Form2