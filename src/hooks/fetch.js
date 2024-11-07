import {useState,useEffect} from 'react';
import { useDispatch } from 'react-redux';
import { logout } from '../store/slices/auth';

const useFetch=(url,options={method:"GET"},dependency)=>{
    const [data,setData]=useState(null);
    const [isLoading,setIsLoading]=useState(true);
    const [error,setError]=useState(null);
    const dispatch=useDispatch();
    useEffect(()=>{
        fetch(url,{...options})
        .then((res)=>res.json())
        .then((myData)=>{
            console.log(myData)
            if(myData.loginAgain){
                dispatch(logout());
                return;
            }
            setData(myData);
            setIsLoading(false);
            setError(null);
        }).catch((err)=>{
            setIsLoading(false);
            setError(err);
        })
    },[url,dependency])

    return {data,isLoading,error};
}

 export default useFetch;