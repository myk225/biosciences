import { useLocation, useNavigate, useSearchParams } from 'react-router-dom'
import './navbar.css'
import { useMemo, useState } from 'react';

export const TopBar = ({slug,addSlug,title,userManager}) => {
  const navigate=useNavigate();
  const location=useLocation();
  const [params,setParams]=useSearchParams();
  
    const managermode=params.get('type');
  const To=useMemo(()=>location?.state?.previous,[location]);
  return (
    <div className="topbar">
      
      <div className="buttons">
      <button className='backBtn' onClick={()=>{
           navigate(To ?? "/")
          }}>Go Back</button>
      </div>
     
        {
          addSlug &&   <button className='addButton' onClick={()=>{
            navigate(addSlug,{state:{previous:window.location.pathname}})
          }}>
            Add {slug}
          </button>
        }
        {
          userManager && <button className='addButton' onClick={()=>{
            if(managermode == "Creation of new roles"){
              setParams({type:"Creation of new users"})
            }else{
              setParams({type:"Creation of new roles"})
            }
            // navigate("/user/management?type=",{state:{previous:window.location.pathname}})
          }}>
            {managermode == "Creation of new roles" ? "Roles" : "Users"}
          </button>
        }
      {
        title &&  <h1 className='topBarHeading'>{title}</h1>
      }
    </div>
  )
}
