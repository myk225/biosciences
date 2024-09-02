import { createSlice } from "@reduxjs/toolkit";

let initialState=JSON.parse(localStorage.getItem('studyStepState'))  ??
{
    study:{
        id : null,
        studyName: "none",
        currStep : null
    }
} 

if(!initialState.study){
    initialState={
        study:{
            id : null,
            studyName: "none",
            currStep : null
        }
    } 
}

export const studySlice=createSlice({
    name:"study",
    initialState,
    reducers:{
        setCurrentStudy:(state,action)=>{
            state.study=action.payload;
            localStorage.setItem('studyStepState',JSON.stringify(state));
        },
        setGroups:(state,action)=>{
            state.groups=action.payload;
            localStorage.setItem('studyStepState',JSON.stringify(state));
        },
        setPeroids:(state,action)=>{
            state.peroids=action.payload;
            localStorage.setItem('studyStepState',JSON.stringify(state));
        },
        setStep:(state,action)=>{
            state.study.currStep=action.payload;
            localStorage.setItem('studyStepState',JSON.stringify(state));
        }
    
    }
})


export const {setCurrentStudy,setGroups,setStep,setPeroids}=studySlice.actions;

export default studySlice.reducer;