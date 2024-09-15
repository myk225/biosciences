import { useCallback, useEffect, useMemo, useRef, useState } from "react";
import "./index.css";
import moment from "moment";
import { useParams } from "react-router-dom";
import useFetch from "../../hooks/fetch";
import { insertAnimal, removeAnimal } from "../../store/slices/centrifugation";
import { useDispatch, useSelector } from "react-redux";
import { toast } from "react-toastify";
import {  checkValidWithIn, test } from "../../utils/dates";

const Centrifugation2 = () => {
    const {studyId,peroidId}=useParams();
    // const [animalStudies,setAnimalStudies]=useState(new Set());
    const {animalsSelected}=useSelector((state)=>state.centrifue);
    const {data,error,isLoading}=useFetch(`https://demo.gharxpert.in/getStudyData/${studyId}/${peroidId}`);
    console.log(data)

    if(isLoading) return <div>Loding...</div>

    if(error) return <div>Something went wrong</div>

    if(data){
        return (
            <div className="Activity3Main">
              <div className="infoActivity3">
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
              </div>
              <div className="Activity3Groups">
                {data.study.groups.map((elem) => {
                  return <GroupComp group={elem} duration={data.study.centrifugationDuration} withIn={data.study.centrifugationTimeWithin} key={elem.id} studyId={studyId} peroidId={peroidId} />;
                })}
              </div>
                <div className="mt-2 p-2">
                <button className="btn btn-success" onClick={async()=>{
                const currDate=new Date();
               try {
                const response=await fetch(`https://demo.gharxpert.in/centrifugation?type=start`,{
                    method:"PATCH",
                    headers:{
                        'Content-Type' : 'application/json'
                    },
                    body:JSON.stringify({value:currDate,animalStudies:animalsSelected})
    
                })
                const res=await response.json();
                toast(res.message);
                window.location.reload();
               } catch (error) {
                toast(error.me)
               }
              }}>start-time</button>
               <button className="btn btn-success mx-2" onClick={async()=>{
                const currDate=new Date();
               try {
                const response=await fetch(`https://demo.gharxpert.in/centrifugation?type=end`,{
                    method:"PATCH",
                    headers:{
                        'Content-Type' : 'application/json'
                    },
                    body:JSON.stringify({value:currDate,animalStudies:animalsSelected})
    
                })
                const res=await response.json();
                
                toast(res.message);
                window.location.reload();
               } catch (error) {
                toast(error.me)
               }
              }}>end-time</button>
              {/* <button className="btn btn-warning">
                Finish
              </button> */}
                </div>
            </div>
          );
    }
}

const GroupComp = ({ group,studyId,peroidId,duration,withIn }) => {
    const {data,error,isLoading}=useFetch(`https://demo.gharxpert.in/getStudyData/${studyId}/${peroidId}/${group.id}`)
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
                <span className="bold">concentration</span> :{" "}
                {group.concentration}
              </p>
              }
                <p className="flexItem">
                  {" "}
                  <span className="bold">Dose</span> :{" "}
                  {group.dose}
                </p>
                {
                  group.doseVol &&  <p className="flexItem">
                  {" "}
                  <span className="bold">Dose Vol</span> :{" "}
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
    const dispatch=useDispatch();
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
    function setStart(){
      let myCurrTime=moment().format("HH:mm");
      // console.log(selectedAnimals);
      let activeTps=selectedTps.filter((tp)=>tp.isSelected==true);
      console.log(activeTps);
      for(let i=0;i<activeTps.length;i++){
        let currTp=activeTps[i];
        let updatedAnimals=selectedAnimals.map((elem)=>{
          if(elem.isSelected==true ){
            
            let updatedTps=elem.timePoints.map((x)=>{
              if(x.timepoint==currTp.timepoint ){
                return {...x,start:myCurrTime};
              }
              return x;
            })
            return {...elem,timePoints:updatedTps};
          }
          return elem;
        })
        //  
        setSelectedAnimals(updatedAnimals);
      }
    }
  const myAnimalSelect=useCallback((e,item)=>{
                   if(selectedTimepoints.length>0){
                      if(e.target.checked){
                        for(let i=0;i<selectedTimepoints.length;i++){
                          let currItem={...item,timepointValue:selectedTimepoints[i].timepoint};
                          console.log(currItem);
                          dispatch(insertAnimal(currItem))
                         }
                      }else{
                        dispatch(removeAnimal(item.id));
                      }
                   }
                },[selectedTimepoints])
    const myTimePointSelect=useCallback((e,item)=>{
                    console.log(groupId)
                    // if(animalsSelected.length>0){
                    //     let extractedAnimals=animalsSelected.filter((elem)=>elem.groupId==groupId);
                    //     for(let i=0;i<extractedAnimals.length;i++){
                    //       let currAnima;
                    //     }
                    // }else{

                    // }
                    if(e.target.checked==true){
                          
                      setSelectedTimePoints((prev)=>[...prev,{...item}]);
                    }else{
                            let updatedTimepoints=selectedTimepoints.filter((elem)=>elem.id!==item.id);
                            setSelectedTimePoints(updatedTimepoints)
                        
                    }
    })
    return <div className="tableMain">
              <table className="table">
                <thead>
                  <tr>
                    
                    <th scope="">Animal-Description</th>
                    {
                      animals[0]?.timepoints?.map((item)=><th scope="z" key={item.id}> <input type="checkbox" onChange={(e)=>{
        
                        myTimePointSelect(e,item);
                        
                        
                        // console.log(item);
                      }} name={item.id} /> {item.timepoint}</th>)
                    }
                  </tr>
                </thead>
                <tbody>
                
                    {
                      animals2?.map((item)=>{
                            return <tr className="animalTr" key={item.id}>      
                              <td className="animalTd">  
                              
                                  {selectedTimepoints?.length!=0 &&  <input type="checkbox" onChange={(e)=>myAnimalSelect(e,item)} name={item.id} id="" />}
                                  <p>  {item.animalId} </p> 
                                  <p>{item.status}</p>
                                  <p>centrifugation by : </p>
                               
                               </td>
                              {
                                item?.timepoints?.map((item)=> <StartEndComp duration={duration} withIn={withIn} centrifugationDuration={animals2.centrifugationDuration} selectedTimepoints={selectedTimepoints} key={item.id} data={item}/>)
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
  
  const StartEndComp=({data,selectedTimepoints,duration,withIn})=>{
    const [item,setItem]=useState(data);
    const [isLoading,setIsLoading]=useState(false);
    const [error,setError]=useState(null);
    const [updated,setUpdated]=useState(0);
    const inputRef=useRef(null);
    
    // logic to fetch item 
    useEffect(()=>{
        
        if(updated>0){
          setIsLoading(true);
          fetch(`https://demo.gharxpert.in/timepoint/${item.id}`,)
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
      return <td scope="" className="tpTd" key={item.id}>
  
      {item.isCentrifugationStarted==0 ?  <input  type="text" value={start!=null ? moment(start).format("lll") : "start"} onClick={async()=>{
              // const currDate=new Date();
              //  setStart(currDate);
              //  toast(item.id);
              // try {
              //  const response=await fetch(`https://demo.gharxpert.in/centrifugation/${item.id}?type=start`,{
              //      method:"PATCH",
              //      headers:{
              //          'Content-Type' : 'application/json'
              //      },
              //      body:JSON.stringify({value:currDate})
   
              //  })
              //  const res=await response.json();
              //  toast(res.message);
              //  setUpdated(updated+1);
              // } catch (error) {
              //  toast(error.me)
              // }
   
       }} placeholder="start" name="" id="" /> : <input readOnly className={checkValidWithIn(item.centrifiguationStart,item.actucalCollectionTime,withIn) ? "bg-info" : "bg-danger"}   value={moment(item.centrifiguationStart).add({hours:5,minutes:30}).format('lll')}/>
           
   }
       {/* <p>{ item.isCentrifugationEnded }</p> */}
       {
           item.isCentrifugationEnded==0 ? <input  type="text"  value={end!=null ? moment(end).format("lll") : "end"}  onClick={async()=>{
               if(item.isCentrifugationStarted==1) {
                   const currDate=new Date();
                  setEnd(currDate);
                  // try {
                  //  const response=await fetch(`https://demo.gharxpert.in/centrifugation/${item.id}?type=end`,{
                  //      method:"PATCH",
                  //      headers:{
                  //          'Content-Type' : 'application/json'
                  //      },
                  //      body:JSON.stringify({value:currDate})
       
                  //  })
                  //  const res=await response.json();
                  //  toast(res.message);
                  //  setUpdated(updated+1);
                  // } catch (error) {
                  //  toast(error.me)
                  // }
               }else{
                   toast("FIRST Start the Centrifugation for this timepoint")
               }
           }} placeholder="end" name="" /> : 
           <input type="text" readOnly className={test(item.centrifiguationEnd,item.centrifiguationStart,duration) ? "bg-info" : "bg-danger"}   value={moment(item.centrifiguationEnd).add({hours:5,minutes:30}).format('lll')}/>
       }
       {
        item.centrifugationBy ? <input readOnly value={item.centrifugationBy}/> :
            <div className="collectedBy">
              <input type="text" ref={inputRef}   className=""/>
              <button onClick={()=>{
                fetch(`https://demo.gharxpert.in/addCentrifugationBy/${item.id}`,{
                  method:'PATCH',
                  headers:{
                    "Content-Type" : "application/json"
                  },
                  body:JSON.stringify({centrifugationBy:inputRef.current.value})
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
      }
     </td>
    }
   
  
    
  }

export default Centrifugation2;