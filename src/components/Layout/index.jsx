
import { Link, useLocation } from "react-router-dom";
import { IoMdArrowRoundBack } from "react-icons/io";
import Navbar from '../Navbar';
import { useMemo } from "react";
export const Layout = ({children,name}) => {
  const location=useLocation();
  console.log(location);
  const To=useMemo(()=>location?.state?.previous,[location]);
  return (
    <div className="Home-main-container">
      <Navbar />
      <div className="activities-main-container">
        <div className="activities-header-card">
          <h1 className="activity-title-name">{name}</h1>
          <Link to={To ?? "/"}>
            <button className="back-button">
              <IoMdArrowRoundBack className="back-icon" />
              Back
            </button>
          </Link>
        </div>
        <div className="forms-main-container">
         {children}
        </div>
      </div>
    </div>
  )
}
