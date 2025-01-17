import {  useEffect, useMemo, useRef, useState } from "react";

import moment from "moment";
import { useParams } from "react-router-dom";
import useFetch from "../../hooks/fetch";

import { useDispatch, useSelector } from "react-redux";
import { toast } from "react-toastify";

import { Loader } from "../loaders/Loader";
import { selectTps } from "../../store/slices/storage";
import { CustomModal } from "../modal/CustomModal";
import { Button, Card, Form } from "react-bootstrap";
const StorageReport = () => {
    const {studyId,peroidId}=useParams();
    // const [animalStudies,setAnimalStudies]=useState(new Set());
    const {selectedTps}=useSelector((state)=>state.storage);
    const [groupData,setGroupData]=useState(null);
    const [currAnimalStudy,setCurrAnimalStudy]=useState(null);
    const [show,setShow]=useState(false);
    const [commentShow,setCommentShow]=useState(false);
    const [comments,setComments]=useState([]);
   
    const {data,error,isLoading}=useFetch(`${import.meta.env.VITE_API_URL}/getStudyData/${studyId}/${peroidId}`);
    
    const { data : subactions, error : err2, isLoading : loading2 } = useFetch(
      `${import.meta.env.VITE_API_URL}/getSubactions/5`
    );
    const [commentBody,setCommentBody]=useState({
      studyId,
      peroidId
      
    })
    function handleCommentChange(e){
      setCommentBody({
        ...commentBody,
        [e.target.name] : e.target.value
      })
    }
   console.log(subactions)
    async function handleGroupSelect(groupId){
      console.log("hello grup id "+groupId)
      const response=await fetch(`${import.meta.env.VITE_API_URL}/getStudyData/${studyId}/${peroidId}/${groupId}`);
      const data=await response.json();
      console.log(data)
      setGroupData(data.animalStudys)
    }
   
    if(isLoading) return <Loader/>
    
    if(error) return <div>Something went wrong</div>

    if(data){
        return (
            <div className="Activity3Main">
              <div className="infoActivity3 flex-wrap">
                <p className="flexItem">
                  {" "}

                  <span className="bold">Study Number</span> : {data?.study.id}
                </p>
                <p className="flexItem">
                  {" "}
                  <span className="bold">Study Title</span> : {data.study.studyName}
                </p>
               

                {/* <p className="flexItem">
                  <span className="bold">Peroid-Id </span> : {data.study.peroidId}
                </p> */}
                <p className="flexItem">
                  <span className="bold">Peroid Number </span> :  {data.study.peroidName}
                </p>
                <p className="flexItem">
                  <span className="bold">Centrifugation Within</span> :  {data.study.centrifugationTimeWithin}
                </p>
                <p className="flexItem">
                  <span className="bold">Centrifugation Duration</span> :  {data.study.centrifugationDuration}
                </p>
                <p className=" instrumentsUsed">
                  <span className="bold">Instruments Used(Centrifugation)</span> :  {
                    data.study.instrumentsUsedInCentri ?
                    <span>{data.study.instrumentsUsedInCentri}</span>  
                    : 
                    <span>Instruments Not Added Yet</span>  
                  }
                </p>
            
              </div>
      
      
        <CustomModal show={commentShow} setShow={setCommentShow} title={"Blood Collection Comments"}>
          {
            comments?.map((comment)=>{
              return     <Card  key={comment.id}>
             
              <Card.Body>
                <Card.Title>{comment.subaction}</Card.Title>
                <Card.Text>
                  <p>
                  <span className="bold">
                  study number :</span> {comment.studyId}
                  </p>
               
                  <p>
                  <span className="bold">
                  peroid id :
                    </span> {comment.peroidId}
                  </p>
                  
           
                  <p>
                  <span className="bold"> 
                  group id : 
                    </span> {comment.groupId}
                  </p>
                  
              
                  <p>
                  <span className="bold">
                  animal  id :
                    </span> {comment.animalId}
                  </p>
                  {
                    comment.timepointId &&
                    <p>
                    <span className="bold">
                    Timepoint Id :
                      </span> {comment.timepointId}
                    </p>
                  }
            
                  <p>
                  <span className="bold">
                  Subaction :
                    </span> {comment.description}
                  </p>
                
                
                    <p>
                      <span className="bold"> comment : </span>
                    {
                    comment.comment
                  }
                    </p>
                  <br />

                </Card.Text>
                
                  
              </Card.Body>
            </Card>
            })
          }
        </CustomModal>
              <div className="Activity3Groups">
                {data.study.groups.map((elem) => {
                  return <GroupComp group={elem} duration={data.study.centrifugationDuration} withIn={data.study.centrifugationTimeWithin} key={elem.id} studyId={studyId} peroidId={peroidId} />;
                })}
              </div>
                {/* <div className="mt-2 p-2">
                <button className="btn btn-success" onClick={async()=>{
                  if(selectedTps.length>0){
                    const currDate=new Date();
                    console.log(selectedTps)
                   try {
                    const response=await fetch(`${import.meta.env.VITE_API_URL}/store/samples/timepoints`,{
                        method:"PATCH",
                        headers:{
                            'Content-Type' : 'application/json'
                        },
                        body:JSON.stringify({value:currDate,selectedTps})
        
                    })
                    const res=await response.json();
                    console.log(res)
                    toast(res.message);
                    // if(res.success) window.location.reload();
                   } catch (error) {
                    toast(error.message)
                   }
                  }else{
                    toast.warning("Please Select At least one")
                   }
              }}>store</button>
                </div> */}
                
            </div>
          );
    }
}

const GroupComp = ({ group,studyId,peroidId,duration,withIn }) => {
    const {data,error,isLoading}=useFetch(`${import.meta.env.VITE_API_URL}/getStudyData/${studyId}/${peroidId}/${group.id}`)
    if(isLoading) return <div>Loading....</div>

    if(error){
        return <div>Erorororororoo</div>
    }


    if(data){
        return (
            <div className="GroupAnimal">
              <div className="infoGroupAct3">
                {/* <p className="flexItem">
                  {" "}
                  <span className="bold">Group Id</span> : {group.id}
                </p> */}
                <p className="flexItem">
                  {" "}
                  <span className="bold">Group Number</span> : {group.groupName}
                </p>
                <p className="flexItem">
                  {" "}
                  <span className="bold">total No OfAnimals</span> :{" "}
                  {group.noOfAnimals}
                </p>
                <p className="flexItem">
                  {" "}
                  <span className="bold">no Of TimePoints</span> :{" "}
                  {group.timepoints}
                </p>
              {
                group.doseVol &&   <p className="flexItem">
                {" "}
                <span className="bold">concentration <span className="lowerCase">(mg/ml)</span></span> :{" "}
                {group.concentration}
              </p>
              }
                <p className="flexItem">
                  {" "}
                  <span className="bold">Dose <span className="lowerCase">(mg/kg)</span></span> :{" "}
                  {group.dose}
                </p>
                {
                  group.doseVol &&  <p className="flexItem">
                  {" "}
                  <span className="bold">Dose Vol <span className="lowerCase">(ml/kg)</span> </span> :{" "}
                  {group.doseVol}
                </p>
                }
                <p className="flexItem">
                  {" "}
                  <span className="bold">Treatment</span> :{" "}
                  {group.treatment}
                </p>
                <p className="flexItem">
                  {" "}
                  <span className="bold">Type Of Treatment</span> :{" "}
                  {group.typeOfTreatment}
                </p>
                <p className="flexItem d-flex">
                  {" "}
                  <span className="bold ">Route Of Administration : </span> {" "}
                  <span>{group.routeValue}</span>
                </p>
              </div>
                  <div className="animals">
                  <Animals data={data.animalStudys} duration={duration} withIn={withIn} groupId={group.id}/>
                  </div>
            </div>
          );
    }
  };
  
  
  
  const Animals=({data,groupId,duration,withIn})=>{
    const {animalsSelected}=useSelector((state)=>state.centrifue);
    console.log(animalsSelected)
    const [animals,setAnimals]=useState(data);
    const [selectedTimepoints,setSelectedTimePoints]=useState([]);
    const [selectedTps,setSelectedTps]=useState(()=>{
      return animals[0]?.timepoints?.map((tp,i)=>{
        let updatedTp={id: i+1,timepoint: tp.timepoint, start: "",end: "",isSelected:false}
        return updatedTp;
      })
    });
    const [selectedAnimals,setSelectedAnimals]=useState(()=>{
      return data.map((elem)=>{
        let updatedElem={...elem,isSelected:false,flag:false};
        return updatedElem;
      })
    });
    const animals2=useMemo(()=>selectedAnimals,[selectedAnimals]);
    
  
    return <div className="tableMain">
              <table className="table bg-white">
                <thead>
                  {/* <tr>
                    
                    <th scope="">Animal-Description</th>
            
                     {
                      animals[0]?.timepoints?.map((item)=><th scope="z" key={item.id}>  {item.timepoint} </th>)
                    }
                  </tr> */}
                </thead>
                <tbody>
                
                    {
                      animals2?.map((item)=>{
                            return <tr className="animalT d-flex flex-wrap border" key={item.id}>      
                              <td className="bold d-flex gap-3"  width={"100%"}>  
                              
                                  
                                  <p>  {item.animalId} </p> 
                                  <p>{item.status}</p>
                                  <p>Stored By : </p>
                               
                               </td>
                              {
                                item?.timepoints?.map((item)=> <StoreComp duration={duration} withIn={withIn} centrifugationDuration={animals2.centrifugationDuration} selectedTimepoints={selectedTimepoints} key={item.id} data={item}/>)
                              }
                            </tr>
                      })    
                    }
                </tbody>
              </table>
              {/* <div className="d-flex gap-2 p-2">
              <button className="btn btn-primary" onClick={()=>setStart()}>set-start</button>
              <button className="btn btn-primary">set-end</button>
              </div> */}

          </div>
  }
  
  const StoreComp=({data,selectedTimepoints,duration,withIn})=>{
    const [item,setItem]=useState(data);
    const [isLoading,setIsLoading]=useState(false);
    const [error,setError]=useState(null);
    const [updated,setUpdated]=useState(0);
    const inputRef=useRef(null);
    const dispatch=useDispatch();
    
    // logic to fetch item 
    useEffect(()=>{
        
        if(updated>0){
          setIsLoading(true);
          fetch(`${import.meta.env.VITE_API_URL}/timepoint/${item.id}`,{
            credentials: 'include',
          })
          .then((res)=>res.json())
          .then((myData)=>{
              console.log(myData)
              setItem(myData.tp);
             setIsLoading(false)
          }).catch((err)=>{
            setIsLoading(false)
              toast(err.message)
          })
        }
    },[updated])
   
  
    const [start,setStart]=useState(null);
    const [end,setEnd]=useState(null);
    

    if(isLoading){
      return <div>Loading....</div>
    }
    // console.log(item)
    if(item){
      // console.log(item)
      return <td scope="" width={"10%"}  className="" key={item.id}>
                {/* <div className="d-flex align-items-center gap-2">
                <input type="checkbox" onChange={(e)=>{
                    console.log(item)
                    dispatch(selectTps({item,checked:e.target.checked}))
                }} name={item.timepoint} id={item.id}  /> <label htmlFor={item.id} className="">select this timepoint</label>
                </div> */}
                <p>
              {item.timepoint}
            </p>
  
       
       {
           item?.isCentrifugationEnded==0 && <p>Centrifugation Not Completed </p>
       }
       {
        item.isCentrifugationEnded == 1 && item.isStored == 0 && <p>Not Stored Yet</p>
       }
       {
        item.isStored==1 && <p>{moment(item.storedAt).add({hours:5,minutes:30}).format('DD-MM-YYYY HH:mm')}</p>
       }
       {/* {
        item.storedBy ? <input readOnly value={item.storedBy}/> :
            <div className="collectedBy">
              <input type="text" ref={inputRef}   className=""/>
              <button onClick={()=>{
                fetch(`${import.meta.env.VITE_API_URL}/addStoredBy/${item.id}`,{
                  method:'PATCH',
                  credentials: 'include',
                  headers:{
                    "Content-Type" : "application/json"
                  },
                  body:JSON.stringify({storedBy:inputRef.current.value})
                })
                .then(res=>res.json())
                .then(data=>{
                  console.log(data)
                  toast.success(data.message)
                  if(data.success){
                    setItem(prev=>({...prev,centrifugationBy:inputRef.current.value}))
                    
                  }
                }).catch((error)=>toast.error(error.message))
                

              }}>
                Add
              </button>
            </div>
      } */}
     </td>
    }
   
  
    
  }

export default StorageReport;