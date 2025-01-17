import Navbar from "../Navbar";
import "./index.css";
import { CgProfile } from "react-icons/cg";
import { MdNotificationsNone, MdSearch } from "react-icons/md";
import { FaEdit } from "react-icons/fa";
import { useState, useRef, useEffect, useMemo } from "react";
import Overlay from "react-bootstrap/Overlay";
import Popover from "react-bootstrap/Popover";
import { useNavigate } from "react-router-dom";
import { FaEye } from "react-icons/fa";
import { Pagination } from "react-bootstrap";
import { Loader } from "../loaders/Loader";
import { isStartDate } from "../../utils/dates";
const DataTable = () => {
  //allusestates here
  const [show, setShow] = useState(false);
  const [target, setTarget] = useState(null);
  const [page, setPage] = useState(0);
  const [totalPages, setTotalPages] = useState(0);
  const [data, setData] = useState(null);
  const [error, setError] = useState(null);
  const [isLoading, setIsLoading] = useState(true);
  const [dataTable,setDataTable] = useState([]);
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
      return <p className="completed">{status ?? "nothing"}</p>;
    }
  };
  useEffect(()=>{
    fetch(`${import.meta.env.VITE_API_URL}/getDataTable`,{
      method:"GET",
      credentials : "include",
    }).then((res) => res.json())
    .then((data)=>{

      console.log(data)
        setDataTable(data.buttons);
    })
  },[])
  useEffect(() => {
    fetch(`${import.meta.env.VITE_API_URL}/studies?page=${page}&&sort=desc`, {
      method: "GET",
      credentials : "include",
    })
      .then((res) => res.json())
      .then((myData) => {
        setData(myData.studies);
        console.log(myData)
        setTotalPages(myData.lastPage);
        setIsLoading(false);
        setError(null);
      })
      .catch((err) => {
        setIsLoading(false);
        setError(err);
      });
  }, [page]);
  
  console.log(data, isLoading, error);
  if (isLoading) {
    return <Loader/>;
  }
  if (error) {
    return <div>Erroprhsdbb</div>;
  }
  return (
    <>
      {/* <Navbar /> */}
      <div className="">
        {/* <div className="home-page-header-division">
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
        </div> */}
        <div className="oreders-report-tables-card-container">
          <table className="dashboard-table-main">
            <thead className="dash-b-table-head">
              <th className="th-name-card f1 center ">Study Number</th>
              <th className="th-name-card f1 center">Study Name</th>
              <th className="th-name-card f1 center">Peroid Name</th>
              <th className="th-name-card f1 center">Status</th>
              {
                dataTable.map((elem)=>{
                  return <th className="th-name-card f1 center" key={elem.id}>{elem.columnName}</th>
                })
              }
            </thead>
            <tbody className="table-rows-card">
              {data?.map(
                (each) =>
                      (
                    <tr className="dash-b-table-row" key={each.peroidId}>
                      <td className="tr-name-card f1 center">{each.studyNumber}</td>
                      <td className="tr-name-card f1 center">
                        {each.studyName}
                      </td>

                      <td className="tr-name-card f1 center">
                        {each.peroidName}
                      </td>

                      <td className="tr-name-card f1 center">
                        {customerStatus(each.status)}
                      </td>
                    
                      
                      {
                        dataTable.map((elem)=>{
                          console.log(`peroid start and curr date ${each.startDate}`+ isStartDate(each.startDate,new Date()))
                          return <td key={elem.id} className="tr-name-card f1 center">
                          <button
                            className="btn btn-primary"
                            disabled={isStartDate(each.startDate,new Date()) }
                            onClick={() => {
                              
                              navigate(`${elem.routeValue}/${each.id}/${each.peroidId}`);
                            }}
                          >
                            {elem.columnName}
                          </button>
                        </td>
                        })
                      }
                      {/* <td className="tr-name-card f1 center">
                        <button
                          className="btn btn-primary"
                          onClick={() => {
                            navigate(`/bloodcollection/${each.id}/${each.peroidId}`,{state: {previous: window.location.pathname}});
                          }}
                        >
                          Blood Collection
                        </button>
                      </td>
                      <td className="tr-name-card f1 center">
                        <button
                          className="btn btn-primary"
                          onClick={() => {
                            navigate(`/centrifugation/${each.id}/${each.peroidId}`);
                          }}
                        >
                          Centrifugation
                        </button>
                      </td>
                      <td className="tr-name-card f1 center">
                        <button
                          className="btn btn-primary"
                          onClick={() => {
                            navigate(`/storage/${each.id}/${each.peroidId}`);
                          }}
                        >
                          Storage
                        </button>
                      </td> */}
                    </tr>
                  )
              )}

              <td className="w-100 d-flex align-items-center paginate justify-content-around ">
                <p className="pageValue">current page : {page + 1}</p>
                <Pagination>
                  <Pagination.Prev
                    onClick={() => setPage((prev) => prev - 1)}
                    disabled={page == 0}
                  />
                  <Pagination.Item
                    active={page == 0}
                    onClick={() => setPage(0)}
                  >
                    {1}
                  </Pagination.Item>
                  <Pagination.Item
                    active={page == 1}
                    onClick={() => setPage(1)}
                  >
                    {2}
                  </Pagination.Item>
                  <Pagination.Ellipsis />

                  {totalPages > 9 && (
                    <>
                      <Pagination.Item
                        active={page == totalPages - 9}
                        onClick={() => {
                          setPage(totalPages - 9);
                        }}
                      >
                        {totalPages - 8}
                      </Pagination.Item>
                      <Pagination.Item
                        active={page == totalPages - 8}
                        onClick={() => {
                          setPage(totalPages - 8);
                        }}
                      >
                        {totalPages - 7}
                      </Pagination.Item>
                      <Pagination.Item
                        active={page == totalPages - 7}
                        onClick={() => {
                          setPage(totalPages - 7);
                        }}
                      >
                        {totalPages - 6}
                      </Pagination.Item>
                      <Pagination.Item
                        active={page == totalPages - 6}
                        onClick={() => {
                          setPage(totalPages - 6);
                        }}
                      >
                        {totalPages - 5}
                      </Pagination.Item>
                      <Pagination.Item
                        active={page == totalPages - 5}
                        onClick={() => {
                          setPage(totalPages - 5);
                        }}
                      >
                        {totalPages - 4}
                      </Pagination.Item>
                    </>
                  )}

                  <Pagination.Ellipsis />
                  <Pagination.Item
                    active={page == totalPages - 1}
                    onClick={() => {
                      setPage(totalPages - 1);
                    }}
                    disabled={page == totalPages}
                  >
                    {totalPages}
                  </Pagination.Item>
                  <Pagination.Next
                    onClick={() => setPage((prev) => prev + 1)}
                    disabled={page == totalPages - 1}
                  />
                </Pagination>
              </td>
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
    </>
  );
};
export default DataTable;
