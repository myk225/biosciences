import { useMemo, useState } from "react";
import "./index.css";
import moment from "moment";
import { GiMonumentValley } from "react-icons/gi";
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
export const ActivityFour = () => {
  return (
    <div className="Activity3Main">
      <div className="infoActivity3">
        <p className="flexItem">
          {" "}
          <span className="bold">Study Id</span> : 1001
        </p>
        <p className="flexItem">
          {" "}
          <span className="bold">StudyName</span> : SomeName
        </p>
        <p className="flexItem">
          <span className="bold">Peroid-Id </span> : 1001
        </p>
        <p className="flexItem">
          <span className="bold">PeroidName </span> : study1001P1
        </p>
      </div>
      <div className="Activity3Groups">
        {Groups.map((elem) => {
          return <GroupComp group={elem} key={elem.id} />;
        })}
      </div>
    </div>
  );
};

const GroupComp = ({ group }) => {
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
        <Animals data={group.animals}/>
      </div>
    </div>
  );
};



const Animals=({data})=>{
  const [animals,setAnimals]=useState(data);
  const [selectedTps,setSelectedTps]=useState(()=>{
    return animals[0].timePoints.map((tp,i)=>{
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
                    animals[0].timePoints.map((item)=><th scope="z" key={item.id}> <input type="checkbox" onChange={(e)=>{
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
                              item.timePoints.map((item)=><td scope="" className="tpTd" key={item.id}>

                                <input  type="text" value={item.start} placeholder="start" name="" id="" />
                                <input  type="text" placeholder="end" name="" />
                              </td>)
                            }
                          </tr>
                    })    
                  }
              </tbody>
            </table>
            <div className="d-flex gap-2 p-2">
            <button className="btn btn-primary" onClick={()=>setStart()}>set-start</button>
            <button className="btn btn-primary">set-end</button>
            </div>
        </div>
}

