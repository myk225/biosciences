import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux"
import { setStep } from "../../store/slices/studySlice";
import useFetch from "../../hooks/fetch";

const Form2 = ({studyId}) => {
  const {groups}=useSelector(state=>state.study);
  const {data,error,isLoading}=useFetch(`http://localhost:9000/routes`)
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
        fetch(`http://localhost:9000/api/addGroupData/${studyId}`,{
          method:"PUT",
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
          alert(data.message)
      })
        .catch((err)=>alert(err.message));
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
 <label  className="form-label">Group Name</label>
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
 <label  className="form-label">type of treatment</label>
<input type="text" className="form-control" name="typeOfTreatment" onChange={(e)=>handleChange(e)}/>
</div>
<div className="flex-1 mx-3">
 <label  className="form-label">route of administration</label>
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
 <label  className="form-label">treatment</label>
<input type="text" className="form-control" name="treatmen" onChange={(e)=>handleChange(e)}/>
</div>
<div className="flex-1 mx-3">
 <label  className="form-label">dose</label>
<input type="text" className="form-control" name="dose" onChange={(e)=>handleChange(e)}/>
</div>
<div className="flex-1 mx-3">
 <label  className="form-label">dose vol</label>
<input type="text" className="form-control" name="doseVol" onChange={(e)=>handleChange(e)}/>
</div>
<div className="flex-1 mx-3">
 <label  className="form-label">concentration</label>
<input type="text" className="form-control" name="concentration" onChange={(e)=>handleChange(e)}/>
</div>
 </div>
</div>
}
export default Form2