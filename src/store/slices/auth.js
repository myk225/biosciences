import { createSlice } from "@reduxjs/toolkit";

const currState=localStorage.getItem("authState");


const initialState=(currState !== "[object Object]" && JSON.parse(currState)) || {
    isLoggedIn : false,
    user:null,
    error: null,
    isLoading: false
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
        loginSuccess(state,action){
            console.log(action.payload)
            state.isLoading=false;
            state.isLoggedIn=true;
            state.user=action.payload;
            localStorage.setItem("authState",JSON.stringify(state));
        },
        loginFailure(state,action){
            state.isLoading=false;
            state.error=action.payload;
            localStorage.setItem("authState",JSON.stringify(state));
        },
        logout(state){
            state.isLoggedIn=false; 
            state.user=null;
            localStorage.setItem("authState",JSON.stringify(state));
        }
    }
})

export const { loginStart, loginSuccess, loginFailure, logout } = authSlice.actions;

export default authSlice.reducer;