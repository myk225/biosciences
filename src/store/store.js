import { configureStore } from "@reduxjs/toolkit";
import centrifugation from "./slices/centrifugation";
import studyReducer from './slices/studySlice';
console.log(centrifugation)
console.log(studyReducer)
export const store=configureStore({
    reducer:{
        centrifue:centrifugation,
        study:studyReducer
    },
})