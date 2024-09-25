import { useLocation, useNavigate } from 'react-router-dom'
import './navbar.css'
import { useMemo } from 'react';

export const TopBar = ({slug,addSlug}) => {
  const navigate=useNavigate();
  const location=useLocation();
  
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
        
    </div>
  )
}
