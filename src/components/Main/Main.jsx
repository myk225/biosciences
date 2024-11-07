import { Link, useLocation } from 'react-router-dom'
import { TopBar } from '../Navbar/TopBar'
import './main.css'
import { IoMdArrowRoundBack } from 'react-icons/io'
import { useMemo } from 'react'
const Main = ({children,slug,addSlug,title,userManager}) => {
  const location=useLocation();
  
  console.log(location);
  const To=useMemo(()=>location?.state?.previous,[location]);
  return (
    <div className="Main">
        <TopBar slug={slug} addSlug={addSlug} userManager={userManager} title={title}/>
        {/* <div className="activities-header-card">
          <h1 className="activity-title-name">{name}</h1>
          <Link to={To ?? "/"}>
            <button className="back-button">
              <IoMdArrowRoundBack className="back-icon" />
              Back
            </button>
          </Link>
        </div> */}
        <div className="content">
            {children}
        </div>
    </div>
  )
}

export default Main