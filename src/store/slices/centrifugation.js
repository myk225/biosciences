import { createSlice } from "@reduxjs/toolkit";

const initialState= {
    animalsSelected: [],
    dateTimeValue: null
}

function checkMyArray(allValues,test){
    let myBoolean=false;
    for(let i=0;i<allValues.length;i++){
        if(allValues[i].id==test.id && allValues[i].timepointValue==test.timepointValue){
            myBoolean=true;
        }
    }
  return myBoolean;
}

export const centrifueSlice=createSlice({
    name:"centrifue",
    initialState,
    reducers:{
        insertAnimal:(state,action)=>{
       
                 console.log(checkMyArray(state.animalsSelected,action.payload))
            if(!checkMyArray(state.animalsSelected,action.payload)){
              
                state.animalsSelected.push(action.payload); 
            } 
           
            // state.animalsSelected.add(action.payload);
        },
        removeAnimal:(state,action)=>{
            // lets decide this later
       
            state.animalsSelected=state.animalsSelected.filter((elem)=>elem.id!=action.payload);
          },
        insertAnimal2:(state,action)=>{

        },
        setDateTimeValue:(state,action)=>{
            state.dateTimeValue=new Date();
        },
       
    }
})

export const {insertAnimal,setDateTimeValue,removeAnimal}=centrifueSlice.actions;

export default centrifueSlice.reducer;