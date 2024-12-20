import Navbar from "../Navbar";
import "./index.css";
import { CgProfile } from "react-icons/cg";
import { MdNotificationsNone, MdSearch } from "react-icons/md";
import { FaEdit, FaEyeSlash } from "react-icons/fa";
import { useState, useRef, useEffect, useMemo } from "react";
import Overlay from "react-bootstrap/Overlay";
import Popover from "react-bootstrap/Popover";
import { useNavigate } from "react-router-dom";
import { FaEye } from "react-icons/fa";
import { Button, Card, Modal, Pagination } from "react-bootstrap";
import { Loader } from "../loaders/Loader";
import useFetch from "../../hooks/fetch";
import { toast } from "react-toastify";
const StudyManagement = () => {
  //allusestates here
  const {erro : err,data : test,isLoading : loading}=useFetch(`https://biobackend.cs-it.in/auth/v1/getUsers2`);
  const [show, setShow] = useState(false);
  const [showAssigned,setShowAssigned]=useState(false);
  const handleClose = () => setShow(false);
  const handleClose2 = () => setShowAssigned(false);
  const [assignedUsers,setAssignedUsers]=useState([]);
  const [currStudy,setCurrStudy] = useState({});
    const handleShow = () => setShow(true);
  const [target, setTarget] = useState(null);
  const [page, setPage] = useState(0);
  const [totalPages, setTotalPages] = useState(0);
  const [data, setData] = useState(null);
  const [error, setError] = useState(null);
  const [isLoading, setIsLoading] = useState(true);
 
  const [selectedUsers,setSelectedUsers]=useState([]);
  //userefs
  const ref = useRef(null);
  const navigate = useNavigate();
  useEffect(() => {
    fetch(`https://biobackend.cs-it.in/getStudies?page=${page}&&sort=desc`, {
      method: "GET",
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
  
  function reloadComments(){
    fetch(`https://biobackend.cs-it.in/getAssignedUsers/${currStudy.id}`,{
      method:"GET",
      credentials : "include",
    }).then((res)=>res.json())
    .then((data)=>{
      setAssignedUsers(data.users);
     
    })
  }

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
        <div className="oreders-report-tables-card-container">
          <table className="dashboard-table-main">
            <thead className="dash-b-table-head">
              <th className="th-name-card f1 center ">Study Id</th>
              <th className="th-name-card f1 center">Study Name</th>
              
              {/* <th className="th-name-card f1 center">Status</th> */}
              
              <th className="th-name-card f1 center">Assign to a user/users</th>
              <th className="th-name-card f1 center">Assigned Users</th>
            </thead>
            <tbody className="table-rows-card">
              {data?.map(
                (each) =>
                      (
                    <tr className="dash-b-table-row" key={each.id}>
                      <td className="tr-name-card f1 center">{each.studyNumber || each.id}</td>
                      <td className="tr-name-card f1 center">
                        {each.studyName}
                      </td>

                 

                      {/* <td className="tr-name-card f1 center">
                        {customerStatus(each.status)}
                      </td> */}
                 
                  
                 
                      <td className="tr-name-card f1 center">
                        <button
                          className="btn btn-primary"
                          onClick={() => {
                            setCurrStudy(each)
                            handleShow()
                          }}
                        >
                          Assign Study
                        </button>
                      </td>
                      <td className="tr-name-card f1 center">
                        <button
                          className="btn btn-primary"
                          onClick={() => {
                            setCurrStudy(each)
                            fetch(`https://biobackend.cs-it.in/getAssignedUsers/${each.id}`,{
                              method:"GET",
                              credentials : "include",
                            }).then((res)=>res.json())
                            .then((data)=>{
                              setAssignedUsers(data.users);
                              setShowAssigned(true)
                            })
                           
                          }}
                        >
                          Assigned users
                        </button>
                      </td>
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
      <Modal show={show} size="md" centered onHide={handleClose}>
            <Modal.Header closeButton>
              <Modal.Title>Assign Study </Modal.Title>
            </Modal.Header>
            <Modal.Body>
    
                <form action="" className="d-flex flex-column gap-2">
                   
                 {/* <p>{currStudy.id}</p> */}
                 <p>Study Number : {currStudy.studyNumber || currStudy.id} </p>
                 <p>{currStudy.studyName}</p>
                
                    <select name="" id="" onChange={(e)=>{
                        let check=selectedUsers.find((item)=>item == e.target.value);
                        console.log(check)
                        if(!check){
                            const user=test.users.filter((item)=>item.userId == e.target.value )
                            console.log(user[0])
                            console.log(selectedUsers);
                            const currentSelected= [...selectedUsers]
                            currentSelected.push(user[0]);
                            setSelectedUsers(currentSelected);
                        }
                        console.log(e.target.value,"dksjo")
                    }}>
                      <option value="">Please select</option>
                        {
                            test?.users.map((each)=>{
                                return <option value={each.userId} key={each.id}>
                                        {each.firstname} ({each.email})
                                </option>  
                              })
                        }
                    </select>
                    <h5>Selected Users</h5>
                    {
                        selectedUsers?.map((user)=>{
                            console.log(user)
                            return <p key={user.userId}>{user.firstname} ({user.email})</p>
                        })
                    }
                </form>
    
    
            </Modal.Body>
            <Modal.Footer>
              <Button variant="secondary" onClick={handleClose}>
                Close
              </Button>
              <Button variant="primary"  onClick={()=>{
                // setSelectedUsers([])
                fetch(`https://biobackend.cs-it.in/manage/studyManagement/${currStudy.id}`,{
                    method : "POST",
                    credentials: 'include',
                 headers:{
                        "Content-Type" :"application/json",
                    },
                    body : JSON.stringify({
                        users : selectedUsers
                    })
                })
                .then((data)=>data.json())
                .then((response)=>{
                    setSelectedUsers([])
                    if(response.success){
                        toast(response.message);
                    }else{
                        toast.warn(response.message)
                    }
                    setShow(false)
                }).catch((err)=>{
                    toast.error(err.message);
                })
              }}>
                Save Changes
              </Button>
            </Modal.Footer>
          </Modal>
          <Modal show={showAssigned} size="md" centered onHide={handleClose2}>
            <Modal.Header closeButton>
              <Modal.Title>Assigned Users To study  {currStudy.studyNumber || currStudy.id} </Modal.Title>
            </Modal.Header>
            <Modal.Body>
    
              {
                assignedUsers.map((user)=>{
                  return <Card key={user.userId}>
                     <Card.Body>
              <Card.Title>{user.firstname+" "+user.lastname} ({user.roleName})</Card.Title>
              <Card.Text>
                Email : {user.email}
                <br />
                Phone : {user.phone}

              </Card.Text>
              <Button onClick={()=>{
              fetch(`https://biobackend.cs-it.in/manage/removeUser/${currStudy.id}`,{
                  method : "DELETE",
                  credentials : "include",
                  headers:{
                    "Content-Type" :"application/json",
                  },
                  body : JSON.stringify({
                    userId : user.userId
                  })
              }).then((res)=>res.json())
              .then((data)=>{
                toast(data.message)
                reloadComments()
              }).catch((err)=>{
                console.log(err.message)
                toast.warn(err.message)
              })
              }}>
                Remove
              </Button>
            </Card.Body>
                  </Card>
                })
              }
    
    
            </Modal.Body>
            <Modal.Footer>
              <Button variant="secondary" onClick={handleClose2}>
                Close
              </Button>
             
            </Modal.Footer>
          </Modal>
    </>
  );
};
export default StudyManagement;
