import { useEffect, useState } from "react";
import "./index.css";
import moment from "moment";
import useFetch from "../../hooks/fetch";
import { useParams } from "react-router-dom";
import { toast } from "react-toastify";
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
export const ActivityThree = () => {

  const {studyId,peroidId}=useParams();
  const {data,error,isLoading}=useFetch(`https://demo.mohammadiatrust.org/getStudyData/${studyId}/${peroidId}`);

  if(isLoading){
    return <div>Loading....</div>
  }
  if(error){
    return <div>Error Occured</div>
  }
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
            <span className="bold">PeroidName </span> : {data.study.peroidName}
          </p>
        </div>
        <div className="Activity3Groups">
          {data.study.groups.map((elem) => {
            // toast("sidjijbnbf")
            return <GroupComp group={elem} key={elem.id} />;
          })}
        </div>
      </div>
    );  
  }
};

const GroupComp = ({ group }) => {
  const {studyId,peroidId}=useParams();
  const [reload,setReload]=useState(0);
  const {data,error,isLoading}=useFetch(`https://demo.mohammadiatrust.org/getStudyData/${studyId}/${peroidId}/${group.id}`)
  console.log(data)
  if(group.tpsAdded==1){
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
          {/* <p className="flexItem">
            {" "}
            <span className="bold">total No OfAnimals</span> :{" "}
            {group.totalNoOfAnimals}
          </p> */}
          <p className="flexItem">
            {" "}
            <span className="bold">no Of TimePoints</span> :{" "}
            {group.timepoints}
          </p>
        </div>
        <div className="animals">
          {data?.animalStudys?.map((animal) => {
            return <Animal key={animal.id} curranimal={animal} studyId={studyId} setReload={setReload} />;
          })}
        </div>
      </div>
    );
  }
  return <div>please add tps for this group </div>
};

const Animal = ({ curranimal,setReload,studyId }) => {
  const [animal,setAnimal]=useState(curranimal);
  const [doseTime, setDoseTime] = useState();
  const [preDoseTime, setPreDoseTime] = useState( animal.preDoseTime ? moment(animal.preDoseTime).format('MMMM Do YYYY, h:mm:ss a') : "Click Here To Add Pre DoseTime");
  const [act,setAct]=useState([]);
  return (
    <div className="animal" key={animal?.id}>
      <div className="flex">
        <p className="bold"> Animal Study Id: {animal.id}</p>
        <p className="bold"> animal Name : {animal?.name}</p>
        <p className="bold"> Status : {animal?.status}</p>
        <p className="bold"> Dose Vol : todo</p>
      </div>
      <div className="flex">
        <label className="bold" htmlFor="">
          Pre Dose :
        </label>
       {
        animal.preDoseTime ? <input type="text"
        className="input1"
        style={{ width: "40%" }} value={moment(animal.preDoseTime).add({hours:5,minutes:30}).format('llll')} readOnly/> :  <input
        type="text"
        className="input1"
        style={{ width: "40%" }}
        value={preDoseTime}
        name="preDoseTime"
        onFocus={async() => {
         if(animal.animalStudyStatusId<2){
          setPreDoseTime(new Date());
         }
         
        }}
       onClick={async()=>{
        if(animal.animalStudyStatusId<2){
          try {
            const response=await  fetch(`https://demo.mohammadiatrust.org/preDose/${animal.id}?studyId=${studyId}`,{
              method:"PATCH",
              headers:{
                "Content-Type" : "application/json"
              },
              body: JSON.stringify({preDoseTime: preDoseTime})
            });
            const res=await response.json();
            
             if(res.success){
              setAnimal((prev)=>{return {...prev,status:"predosed",animalStudyStatusId:2}})
             }
            
            toast(res.message)
           } catch (error) {
            toast(error.message)
           }
        }
       }}
        placeholder="enter predose"
      />
       }
        <label className="bold" htmlFor="">
          Dose :
        </label>
       {
        animal.doseTime ? <input type="text"
        className="input1"
        style={{ width: "40%" }} value={moment(animal.doseTime).add({hours:5,minutes:30}).format('llll')} readOnly/> :
        <input
        type="text"
        className="input1"
        style={{ width: "40%" }}
        value={doseTime}
        name="doseTime"
        onFocus={() => {
        if(animal.animalStudyStatusId<3){
          setDoseTime(new Date());
        }
        }}
        onClick={async()=>{
          if(animal.animalStudyStatusId==2){
            try {
              const response=await fetch(`https://demo.mohammadiatrust.org/dose/${animal.id}?studyId=${studyId}`,{
                method:"PATCH",
                headers:{
                  "Content-Type" : "application/json"
                },
                body: JSON.stringify({doseTime: doseTime})
              });
              const res=await response.json();
      
              if(res.success){
                setAnimal((prev)=>{return {...prev,status:"dosed",animalStudyStatusId:3}})
               }
              
              toast(res.message)
             } catch (error) {
              toast(error.message)
             }
          }
        }}
        placeholder="Dose Time"
      />
       }
      </div>
      <div>
        <p className="bold">Timepoints</p>
        <div className="d-flex">
        <div className="timepoint">
            <p className="bold">Date</p>
            <p className="bold">TP</p>
            <p className="bold">DT</p>
            <p className="bold">ACT</p>
          </div>
        <div className="allTps">
          {animal.timepoints?.map((timePoint,i) => {
            // console.log(timePoint.actualCollectionTime  )
            return <AnimalTimepoint key={i} data={timePoint} setAnimal={setAnimal} animal={animal} i={i} doseTime={doseTime} setAct={setAct} act={act}/>
          })}
        </div>
        </div>
      </div>
    </div>
  );
};

const AnimalTimepoint=({data,i,doseTime,setAct,act,animal,setAnimal})=>{
  const [timePoint,setTimePoint]=useState(data);
  const [updated,setUpdated]=useState(0);
  useEffect(()=>{
    if(updated>0){
      fetch(`https://demo.mohammadiatrust.org/timepoint/${timePoint.id}`)
      .then((res)=>res.json())
      .then((data)=>{
        setTimePoint(data.tp);
      }).catch((error)=>toast(error.message))
    }
  },[updated])
  const duration = timePoint.timepoint.split(":");
  let dInSec = 0;
  // console.log(duration);
  dInSec = dInSec + Number(duration[0] * 60 * 60);
  dInSec = dInSec + Number(duration[1] * 60);
  console.log(moment().add(dInSec, "seconds").format("HH:mm"));
  let dt=moment(doseTime).add(dInSec, "seconds").format("HH:mm").split(" ")[0];
  // console.log(dt)
  // eslint-disable-next-line react/jsx-key
  return (
    <div className="timepoint" key={timePoint}>
      <p className="bold">
       {
        timePoint.isDtAdded==1 ?  moment(timePoint.collectionTime).format("l") : moment().add(dInSec, "seconds").format("l")
       }
      </p>
      <input
        type="text"
        className="input1"
        readOnly
        defaultValue={timePoint.timepoint}
      />
    {timePoint.collectionTime ? <input value={moment(timePoint.collectionTime).format('HH:mm')}/> :   <input type="text" className="input1" defaultValue={doseTime && dt} readOnly/> }
     {
      timePoint.isActAdded==1 ?  <input type="text" className="input1" value={moment(timePoint.actucalCollectionTime).add({hours:5,minutes:30}).format('HH:mm')} />
      :  <input type="text" className="input1" value={act[i]} onClick={async()=>{
        let currDate=new Date();
        let time=moment(currDate).format("HH:mm");
        setAct([...act,act[i]=time])
        try {
          const response=await fetch(`https://demo.mohammadiatrust.org/addAct/${animal.id}`,{
            method:"PATCH",
            headers:{
              "Content-Type" : "application/json"
            },
            body: JSON.stringify({act: currDate,timepoint:timePoint.timepoint})
          });
          const res=await response.json();
        
          if(res.success){
            setAnimal((prev)=>{return {...prev,status:"working on acts",animalStudyStatusId:4}})
          }
       
          if(res.finished){
            setAnimal((prev)=>{return {...prev,status:"Ready For Centrifugation",animalStudyStatusId:5}})
          }
          timePoint.isActAdded=1;
          timePoint.actucalCollectionTime=currDate;
          setUpdated(updated+1);
            toast(res.message)
        } catch (error) {
          toast(error.message)
        }
        
    }}/>
     }
    </div>
  );
}