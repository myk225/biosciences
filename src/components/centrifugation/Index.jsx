import { useEffect, useMemo, useState } from "react";
import "./index.css";
import moment from "moment";
import { useParams } from "react-router-dom";
import useFetch from "../../hooks/fetch";
const Groups = [
    {
      id: 101,
      groupName: "STUDY1001G1",
      totalNoOfAnimals: 2,
      noOfTimePoints: 6,
      animals: [
        {
          id: 1,
          name: "mouse101",
          preDoseTime: "Fri Aug 16 2024 21:14:42 GMT+0530 (India Standard Time)",
          doseTime: "Fri Aug 16 2024 21:15:16 GMT+0530 (India Standard Time)",
          timePoints: [
            {
              id: 1,
              timepoint: "0:05",
              ct: "",
              act: "",
            },
            {
              id: 2,
              timepoint: "2:00",
              ct: "",
              act: "",
            },
            {
              id: 3,
              timepoint: "6:00",
              ct: "",
              act: "",
            },
            {
              id: 4,
              timepoint: "12:00",
              ct: "",
              act: "",
            },
            {
              id: 5,
              timepoint: "24:00",
              ct: "",
              act: "",
            },
            {
              id: 6,
              timepoint: "36:00",
              ct: "",
              act: "",
            },
          ],
        },
        {
          id: 2,
          name: "mouse300",
          preDoseTime: "Fri Aug 16 2024 21:14:42 GMT+0530 (India Standard Time)",
          doseTime: "Fri Aug 16 2024 21:15:16 GMT+0530 (India Standard Time)",
          timePoints: [
            {
              id: 1,
              timepoint: "0:05",
              ct: "",
              act: "",
            },
            {
              id: 2,
              timepoint: "2:00",
              ct: "",
              act: "",
            },
            {
              id: 3,
              timepoint: "6:00",
              ct: "",
              act: "",
            },
            {
              id: 4,
              timepoint: "12:00",
              ct: "",
              act: "",
            },
            {
              id: 5,
              timepoint: "24:00",
              ct: "",
              act: "",
            },
            {
              id: 6,
              timepoint: "36:00",
              ct: "",
              act: "",
            },
          ],
        },
      ],
    },
    { 
      id: 102,
      groupName: "STUDY1001G2",
      totalNoOfAnimals: 3,
      noOfTimePoints: 8,
      animals: [
        {
          id: 3,
          name: "tester",
          preDoseTime: "Fri Aug 16 2024 21:14:42 GMT+0530 (India Standard Time)",
          doseTime: "Fri Aug 16 2024 21:15:16 GMT+0530 (India Standard Time)",
          timePoints: [
            {
              id: 1,
              timepoint: "0:05",
              ct: "",
              act: "",
            },
            {
              id: 2,
              timepoint: "2:00",
              ct: "",
              act: "",
            },
            {
              id: 3,
              timepoint: "6:00",
              ct: "",
              act: "",
            },
            {
              id: 4,
              timepoint: "12:00",
              ct: "",
              act: "",
            },
            {
              id: 5,
              timepoint: "24:00",
              ct: "",
              act: "",
            },
            {
              id: 6,
              timepoint: "36:00",
              ct: "",
              act: "",
            },
            {
              id: 7,
              timepoint: "48:00",
              ct: "",
              act: "",
            },
            {
              id: 8,
              timepoint: "60:00",
              ct: "",
              act: "",
            },
          ],
        },
        {
          id: 4,
          name: "mouse300",
          preDoseTime: "Fri Aug 16 2024 21:14:42 GMT+0530 (India Standard Time)",
          doseTime: "Fri Aug 16 2024 21:15:16 GMT+0530 (India Standard Time)",
          timePoints: [
            {
              id: 1,
              timepoint: "0:05",
              ct: "",
              act: "",
            },
            {
              id: 2,
              timepoint: "2:00",
              ct: "",
              act: "",
            },
            {
              id: 3,
              timepoint: "6:00",
              ct: "",
              act: "",
            },
            {
              id: 4,
              timepoint: "12:00",
              ct: "",
              act: "",
            },
            {
              id: 5,
              timepoint: "24:00",
              ct: "",
              act: "",
            },
            {
              id: 6,
              timepoint: "36:00",
              ct: "",
              act: "",
            },  {
              id: 7,
              timepoint: "48:00",
              ct: "",
              act: "",
            },
            {
              id: 8,
              timepoint: "60:00",
              ct: "",
              act: "",
            },
          ],
        },
        {
          id: 5,
          name: "mouse4000",
          preDoseTime: "Fri Aug 16 2024 21:14:42 GMT+0530 (India Standard Time)",
          doseTime: "Fri Aug 16 2024 21:15:16 GMT+0530 (India Standard Time)",
          timePoints: [
            {
              id: 1,
              timepoint: "0:05",
              ct: "",
              act: "",
            },
            {
              id: 2,
              timepoint: "2:00",
              ct: "",
              act: "",
            },
            {
              id: 3,
              timepoint: "6:00",
              ct: "",
              act: "",
            },
            {
              id: 4,
              timepoint: "12:00",
              ct: "",
              act: "",
            },
            {
              id: 5,
              timepoint: "24:00",
              ct: "",
              act: "",
            },
            {
              id: 6,
              timepoint: "36:00",
              ct: "",
              act: "",
            },  {
              id: 7,
              timepoint: "48:00",
              ct: "",
              act: "",
            },
            {
              id: 8,
              timepoint: "60:00",
              ct: "",
              act: "",
            },
          ],
        },
      ],
    },
  ];
const Centrifugation = () => {
    const {studyId,peroidId}=useParams();
    
    const {data,error,isLoading}=useFetch(`http://localhost:9000/getStudyData/${studyId}/${peroidId}`);
    console.log(data)

    if(isLoading) return <div>Loding...</div>

    if(error) return <div>Something went wrong</div>

    if(data){
        return (
            <div className="Activity3Main">
              <div className="infoActivity3">
                <p className="flexItem">
                  {" "}
                  <span className="bold">Study Id</span> : {data?.study.id}
                </p>
                <p className="flexItem">
                  {" "}
                  <span className="bold">StudyName</span> : {data.study.studyName}
                </p>
                <p className="flexItem">
                  <span className="bold">Peroid-Id </span> : {data.study.peroidId}
                </p>
                <p className="flexItem">
                  <span className="bold">PeroidName </span> :  {data.study.peroidName}
                </p>
              </div>
              <div className="Activity3Groups">
                {data.study.groups.map((elem) => {
                  return <GroupComp group={elem} key={elem.id} studyId={studyId} peroidId={peroidId} />;
                })}
              </div>
            </div>
          );
    }
}

const GroupComp = ({ group,studyId,peroidId }) => {
    const {data,error,isLoading}=useFetch(`http://localhost:9000/getStudyData/${studyId}/${peroidId}/${group.id}`)
    if(isLoading) return <div>Loading....</div>

    if(error){
        return <div>Erorororororoo</div>
    }


    if(data){
        return (
            <div className="GroupAnimal">
              <div className="infoGroupAct3">
                <p className="flexItem">
                  {" "}
                  <span className="bold">Group Id</span> : {group.id}
                </p>
                <p className="flexItem">
                  {" "}
                  <span className="bold">Group Name</span> : {group.groupName}
                </p>
                <p className="flexItem">
                  {" "}
                  <span className="bold">total No OfAnimals</span> :{" "}
                  {group.totalNoOfAnimals}
                </p>
                <p className="flexItem">
                  {" "}
                  <span className="bold">no Of TimePoints</span> :{" "}
                  {group.noOfTimePoints}
                </p>
              </div>
                  <div className="animals">
                  <Animals data={data.animalStudys}/>
                  </div>
            </div>
          );
    }
  };
  
  
  
  const Animals=({data})=>{
    const [animals,setAnimals]=useState(data);
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
      // activeTps.forEach(tp => {
      //     let updatedAnimals=selectedAnimals.map((elem)=>{
      //       if(elem.isSelected=="on"){
              
      //         let updatedTps=elem.timePoints.map((x)=>{
      //           if(x.timepoint==tp.timepoint){
      //             return {...x,start:myCurrTime};
      //           }
      //           return x;
      //         })
      //         return {...elem,timePoints:updatedTps};
      //       }
      //       return elem;
      //     })
      //     console.log(updatedAnimals);
      //     setSelectedAnimals(updatedAnimals);
      // });
    }
    return <div className="tableMain">
              <table className="table">
                <thead>
                  <tr>
                    
                    <th scope="">Animal-Description</th>
                    {
                      animals[0].timepoints.map((item)=><th scope="z" key={item.id}> <input type="checkbox" onChange={(e)=>{
                        let updatedTps=selectedTps.map((tp)=>{
                          if(tp.timepoint==item.timepoint){
                            // alert(e.target.checked)
                            return {...tp,isSelected:e.target.checked};
                          }
                          return tp;
                        })
                        setSelectedTps(updatedTps);
                      }} name={item.id} /> {item.timepoint}</th>)
                    }
                  </tr>
                </thead>
                <tbody>
                
                    {
                      animals2.map((item)=>{
                            return <tr className="animalTr" key={item.id}>      
                              <td className="animalTd"> <input type="checkbox" onChange={(e)=>{
                                let updatedSelectedAnimals=selectedAnimals.map((elem)=>{
                                  if(elem.id==item.id){
                                    return {...elem,isSelected : e.target.checked}
                                  }
                                  return elem;
                                })
                                setSelectedAnimals(updatedSelectedAnimals);
                                
                              }} name={item.id} id="" /> {item.name} </td>
                              {
                                item.timepoints.map((item)=> <StartEndComp key={item.id} data={item}/>)
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
  
  const StartEndComp=({data})=>{
    const [item,setItem]=useState(data);
    const [isLoading,setIsLoading]=useState(false);
    const [error,setError]=useState(null);
    const [updated,setUpdated]=useState(0);

    // logic to fetch item 
    useEffect(()=>{
        
        if(updated>0){
          setIsLoading(true);
          fetch(`http://localhost:9000/timepoint/${item.id}`,)
          .then((res)=>res.json())
          .then((myData)=>{
              console.log(myData)
              setItem(myData.tp);
             setIsLoading(false)
          }).catch((err)=>{
            setIsLoading(false)
              alert(err.message)
          })
        }
    },[updated])
   
  
    const [start,setStart]=useState(null);
    const [end,setEnd]=useState(null);
    

    if(isLoading){
      return <div>Loading....</div>
    }
    console.log(item)
    if(item){
      return <td scope="" className="tpTd" key={item.id}>
  
      {item.isCentrifugationStarted==0 ?  <input  type="text" value={start!=null ? moment(start).format("lll") : "start"} onClick={async()=>{
           const currDate=new Date();
               setStart(currDate);
               alert(item.id);
              try {
               const response=await fetch(`http://localhost:9000/centrifugation/${item.id}?type=start`,{
                   method:"PATCH",
                   headers:{
                       'Content-Type' : 'application/json'
                   },
                   body:JSON.stringify({value:currDate})
   
               })
               const res=await response.json();
               alert(res.message);
               setUpdated(updated+1);
              } catch (error) {
               alert(error.me)
              }
   
       }} placeholder="start" name="" id="" /> : <input readOnly value={moment(item.centrifiguationStart).add({hours:5,minutes:30}).format('lll')}/>
           
   }
       {/* <p>{ item.isCentrifugationEnded }</p> */}
       {
           item.isCentrifugationEnded==0 ? <input  type="text" value={end!=null ? moment(end).format("lll") : "end"}  onClick={async()=>{
               if(item.isCentrifugationStarted==1) {
                   const currDate=new Date();
                  setEnd(currDate);
                  try {
                   const response=await fetch(`http://localhost:9000/centrifugation/${item.id}?type=end`,{
                       method:"PATCH",
                       headers:{
                           'Content-Type' : 'application/json'
                       },
                       body:JSON.stringify({value:currDate})
       
                   })
                   const res=await response.json();
                   alert(res.message);
                   setUpdated(updated+1);
                  } catch (error) {
                   alert(error.me)
                  }
               }else{
                   alert("FIRST Start the Centrifugation for this timepoint")
               }
           }} placeholder="end" name="" /> : 
           <input type="text" readOnly value={moment(item.centrifiguationEnd).add({hours:5,minutes:30}).format('lll')}/>
       }
     </td>
    }
   
  
    
  }

export default Centrifugation