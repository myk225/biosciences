import {useState,useEffect} from 'react';

const useFetch=(url,options={method:"GET"})=>{
    const [data,setData]=useState(null);
    const [isLoading,setIsLoading]=useState(true);
    const [error,setError]=useState(null);

    useEffect(()=>{
        fetch(url,{...options})
        .then((res)=>res.json())
        .then((myData)=>{
            setData(myData);
            setIsLoading(false);
            setError(null);
        }).catch((err)=>{
            setIsLoading(false);
            setError(err);
        })
    },[url])

    return {data,isLoading,error};
}

 export default useFetch;