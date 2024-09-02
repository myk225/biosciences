import React, { useEffect } from 'react'
import { useSearchParams } from 'react-router-dom'


const Test = () => {
    const [params,setParams]=useSearchParams();
    let studyId=params.get('studyId');
    useEffect(()=>{
        // fetch data 
    },[studyId])
  return (
    <div>
        i am test comp 
        {params.get('studyId')}
        <button onClick={()=>{
            setParams({studyId:new Date()})
        }}></button>
    </div>
  )
}

export default Test