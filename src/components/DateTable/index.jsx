import Navbar from "../Navbar";
import "./index.css";
import { CgProfile } from "react-icons/cg";
import { MdNotificationsNone, MdSearch } from "react-icons/md";

import { useState, useRef, useEffect } from "react";
import Overlay from "react-bootstrap/Overlay";
import Popover from "react-bootstrap/Popover";
import { useNavigate } from "react-router-dom";
import useFetch from "../../hooks/fetch";
import { Pagination } from "react-bootstrap";

const DataTable = () => {
  //allusestates here
  const [show, setShow] = useState(false);
  const [target, setTarget] = useState(null);
  const [page,setPage]=useState(0);
  //userefs
  const ref = useRef(null);
  const navigate = useNavigate();
  const handleClick = (event) => {
    setShow(!show);
    setTarget(event.target);
  };
  const customerStatus = (status) => {
    if (status === "Activity-4-finished") {
      return <p className="completed">{status}</p>;
    } else if (status === "Pending") {
      return <p className="pending">{status}</p>;
    } else {
      return <p className="pending">{status ?? "nothing"}</p>;
    }
  };
  //fecthing data
  const { data, isLoading, error } = useFetch(
    "https://demo.gharxpert.in/studies"
  );
  console.log(data, isLoading, error);
  if (isLoading) {
    return <div>Loading...</div>;
  }
  if (error) {
    return <div>Erroprhsdbb</div>;
  }
  return (
    <div className="Home-main-container">
      <Navbar />
      <div className="Home-page-actvities-card">
        <div className="home-page-header-division">
          <div className="headre-sercah-card">
            <MdSearch size={20} />
            <input className="serach-input" type="search" />
          </div>
          <div className="headre-icons-card">
            <MdNotificationsNone size={20} style={{ marginRight: "20px" }} />
            <CgProfile
              size={20}
              style={{ marginRight: "20px" }}
              onClick={handleClick}
            />
          </div>
        </div>
        <div className="oreders-report-tables-card-container">
          <table className="dashboard-table-main">
            <thead className="dash-b-table-head">
              <th className="th-name-card f1 center ">Study Id</th>
              <th className="th-name-card f1 center">Study Name</th>
              <th className="th-name-card f1 center">Peroid Name</th>
              <th className="th-name-card f1 center">Status</th>
              <th className="th-name-card f1 center">Timepoints</th>
              <th className="th-name-card f1 center">Blood Collection</th>
              <th className="th-name-card f1 center">Centrifugation</th>
            </thead>
            <tbody className="table-rows-card">
              {data.studies.map(
                (each) =>
                  (
                    <tr className="dash-b-table-row" key={each.id}>
                      <td className="tr-name-card f1 center">{each.id}</td>
                      <td className="tr-name-card f1 center">
                        {each.studyName}
                      </td>

                      <td className="tr-name-card f1 center">
                        {each.peroidName}
                      </td>

                      <td className="tr-name-card f1 center">
                        {customerStatus(each.status)}
                      </td>
                      <td className="tr-name-card f1 center">
                        <button
                          className="btn btn-primary"
                          onClick={() => {
                            navigate(`/act-2/${each.id}`);
                          }}
                        >
                          Timepoints
                        </button>
                      </td>
                      <td className="tr-name-card f1 center">
                        <button
                          className="btn btn-primary"
                          onClick={() => {
                            navigate(`/act-3/${each.id}/${each.peroidId}`);
                          }}
                        >
                          Blood Collection
                        </button>
                      </td>
                      <td className="tr-name-card f1 center">
                        <button
                          className="btn btn-primary"
                          onClick={() => {
                            navigate(`/act-4/${each.id}/${each.peroidId}`);
                          }}
                        >
                          Centrifugation
                        </button>
                      </td>
                    </tr>
                  )
              )}
              {/* 
              i < 10 && 
              <div className="w-100 d-flex align-items-center justify-content-around">
                <p className="pageValue">
                    current page : {page+1}
                </p>
              <Pagination className="">
                <Pagination.First  />
                <Pagination.Prev />
                <Pagination.Item>{1}</Pagination.Item>
                <Pagination.Ellipsis />

                <Pagination.Item>{10}</Pagination.Item>
                <Pagination.Item>{11}</Pagination.Item>
                <Pagination.Item active>{12}</Pagination.Item>
                <Pagination.Item>{13}</Pagination.Item>
                <Pagination.Item disabled>{14}</Pagination.Item>

                <Pagination.Ellipsis />
                <Pagination.Item>{20}</Pagination.Item>
                <Pagination.Next />
                <Pagination.Last />
              </Pagination>
              </div> */}
            </tbody>
          </table>
        </div>

        <div ref={ref}>
          <Overlay
            show={show}
            target={target}
            placement="bottom"
            container={ref}
            containerPadding={20}
          >
            <Popover id="popover-contained" className="popover-container">
              <Popover.Body>
                <div className="profile-summary-card">
                  <div className="profile-picture-card">
                    <img
                      src="https://img.freepik.com/free-psd/3d-illustration-person-with-sunglasses_23-2149436188.jpg?w=740&t=st=1722979421~exp=1722980021~hmac=2f3de72b5b8c05e779f05bd40584583491d6b200d2caea8c3f3a8411e71c6510"
                      className="profile-image"
                    />
                    <h3 style={{ color: "#ffffff", margin: "0px" }}>Name</h3>
                    <p style={{ color: "#ffffff" }}>Email</p>
                  </div>
                  <h3 className="profile-summury-names">Profile</h3>
                  <h3 className="profile-summury-names">Settings</h3>
                  <h3 className="profile-summury-names">Stats</h3>
                  <h3 className="profile-summury-names">Messages</h3>
                  <h3 className="profile-summury-names">Sign out</h3>
                </div>
              </Popover.Body>
            </Popover>
          </Overlay>
        </div>
      </div>
    </div>
  );
};
export default DataTable;
