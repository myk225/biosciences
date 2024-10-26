import { createSlice } from "@reduxjs/toolkit";

const initialState={
    selectedTps :[]
}
// selected tps is array of timepoints

export const storageSlice=createSlice({
    name:"storage",
    initialState,
    reducers:{
        selectTps : (state,action)=>{
            if(action.payload.checked==true){
                state.selectedTps.push(action.payload.item)
            }else{
                state.selectedTps=state.selectedTps.filter((elem)=>elem.id!=action.payload.item.id)
            }
        }
    }
})

export const {selectTps}=storageSlice.actions;

export default storageSlice.reducer;