
import { Link } from "react-router-dom";
import { IoMdArrowRoundBack } from "react-icons/io";
import Navbar from '../Navbar';
export const Layout = ({children,name}) => {
  return (
    <div className="Home-main-container">
      <Navbar />
      <div className="activities-main-container">
        <div className="activities-header-card">
          <h1 className="activity-title-name">{name}</h1>
          <Link to="/">
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
