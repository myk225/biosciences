import { createSlice } from "@reduxjs/toolkit";

const currState=localStorage.getItem("authState");


const initialState=(currState !== "[object Object]" && JSON.parse(currState)) || {
    isLoggedIn : false,
    isLocked : true,
    user:null,
    error: null,
    isLoading: false,
    pinTries : 0
}

export const authSlice=createSlice({
    name:"auth",
    initialState,
    reducers:{
        loginStart(state){
            state.isLoading=true;
            state.error=null;
            localStorage.setItem("authState",JSON.stringify(state));
        },
        wrongPin(state){
            state.pinTries=state.pinTries+1;
            localStorage.setItem("authState",JSON.stringify(state));
        },  
        loginSuccess(state,action){
            console.log(action.payload)
            state.isLoading=false;
            state.isLoggedIn=true;
            // state.isLocked=false;
            state.user=action.payload;
            localStorage.setItem("authState",JSON.stringify(state));
        },
        lockScreen(state){
            state.isLocked=true;
            localStorage.setItem("authState",JSON.stringify(state));
        },
        unLockscreen(state){
            state.isLocked=false;
            localStorage.setItem("authState",JSON.stringify(state));
        },
        loginFailure(state,action){
            state.isLoading=false;
            state.error=action.payload;
            localStorage.setItem("authState",JSON.stringify(state));
        },
        logout(state){
            state.isLoggedIn=false; 
            state.isLocked=true;
            state.user=null;
            localStorage.setItem("authState",JSON.stringify(state));
        }
    }
})

export const { loginStart, loginSuccess, loginFailure, logout , lockScreen,unLockscreen,wrongPin } = authSlice.actions;

export default authSlice.reducer;