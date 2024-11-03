import { useEffect, useMemo, useState } from "react";
import Step1 from "../StudyCreation/Step1";
import Form1 from "../StudyCreation/Form1";
import "./index.css";
import { Navigate, useSearchParams } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { setCurrentStudy, setGroups, setPeroids, setStep } from "../../store/slices/studySlice";
import Form2 from "../StudyCreation/Form2";
import Peroids from "../StudyCreation/Peroids";
import { AddAnimals } from "../StudyCreation/AddAnimals";
import { toast } from "react-toastify";

const Stepper = () => {
  
  const [params,setParams]=useSearchParams();
  const studyId=params.get('studyId');
  const {study} =useSelector(state=>state.study);
  const dispatch= useDispatch();
  useEffect(()=>{
    if(studyId){
      toast.info(studyId)
      fetch(`https://biobackend.cs-it.in/api/getStudyData/groups/peroids/${studyId}`)
      .then((res)=>res.json())
      .then((data)=>{
       
        if(data.success){
          toast(data.message);
          console.log(data.study)
        dispatch(setCurrentStudy(data.study));
        dispatch(setGroups(data.groups));
        dispatch(setPeroids(data.peroids));
        }else{
          toast("no study with this id")
          setParams({});
          dispatch(setCurrentStudy({
            id : null,
            studyName: "none",
            currStep : 1
        }));
        }
      }
      )
      .catch((err)=>{
        console.log(err)
      })
    }else{
      dispatch(setCurrentStudy({
        id : null,
        studyName: "none",
        currStep : 1
    }));
    
    }
  },[studyId,params,study])
  

  const startStep=useMemo(()=>{
    return study.currStep ?? 1;
  },[study])
  console.log(startStep)
  
console.log(steps)


  switch (study.currStep) {
    case 1:
      return (
        <StepLaytout step={study.currStep} >
          <Form1 setParams={setParams}/>
        </StepLaytout>
      );
    case 3:
      return <StepLaytout step={study.currStep}>
          <Form2 studyId={studyId}/>
      </StepLaytout>;
    case 2:
      return    <StepLaytout step={study.currStep} >
             <Peroids studyId={studyId}/>
      </StepLaytout>;
    case 4:
      return  <StepLaytout step={study.currStep} >
        <AddAnimals studyId={studyId}/>
</StepLaytout>;
    default:
      return (
        <Navigate to={'/'}/>
      );
  }
};
const steps = [
  { id: 1, title: "1", type: "step",desc:"Enter Study Details" },
  { id: 2, title: "2", type: "stepLine" },
  { id: 3, title: "2", type: "step",desc:" Peroid Details" },
  { id: 4, title: "3", type: "stepLine" },
  { id: 5, title: "3", type: "step" , desc:"Group Details"},
  { id: 6, title: "4", type: "stepLine" },
  { id: 7, title: "4", type: "step",desc:"Add Animals to groups" },
];
const StepLaytout = ({ children,step }) => {
  const dispatch=useDispatch();
  const {study}=useSelector(state=>state.study);
  return (
    <div className="w-100 h-100">
      <div className="stepperMain">
        {steps.map((item) => {
          if (item.type == "step") {
            return <div className={`steps ${item.title==step ? "active" : ""} ${step>item.title ? "finished" : ""}`} key={item.id}>
                {item.title}
            </div>;
          } else {
            return <div className={`stepLine ${item.title<=step? "activeLine" : ""}`} key={item.id}>
               
            </div>;
          }
        })}
      </div>
      <div className="stepperTexts">
      {
            steps.map((item)=>{
                    if(item.type=="step"){
                        return <div key={item.id} className="info">
                        <p className="stepTitle">
                            {
                                item.desc
                            }
                        </p>
                    </div>
                    }
            })
        }
      </div>
      {children}
      <button className="btn btn-info" onClick={()=>{dispatch(setStep(study.currStep-1))}}>prev</button>
      <button className="mx-2 btn btn-success" onClick={()=>{setSteps(prev=>prev+1)}}>calltoaction</button>
    </div>
  );
};
export default Stepper;
