/* eslint-disable react/jsx-key */
import "./index.css";
import Table from "react-bootstrap/Table";
import Navbar from "../Navbar";
import { Link, useLocation, useNavigate, useParams } from "react-router-dom";
import { IoMdArrowRoundBack } from "react-icons/io";
import useFetch from "../../hooks/fetch";
import { useEffect, useRef, useState } from "react";
import { toast } from "react-toastify";
import { Loader } from "../loaders/Loader";
import { CustomModal } from "../modal/CustomModal";
import { Button, Card, Form } from "react-bootstrap";

const ActivityTwo = () => {
  const { studyId ,peroidId} = useParams();
  const navigate=useNavigate();
   const location=useLocation();
  const [groupData,setGroupData]=useState(null);
    const [currAnimalStudy,setCurrAnimalStudy]=useState(null);
    const [show,setShow]=useState(false);
    const [commentShow,setCommentShow]=useState(false);
    const [comments,setComments]=useState([]);
  console.log(studyId,peroidId);
  const { data, error, isLoading } = useFetch(
    `https://biobackend.cs-it.in/getGroups/${studyId}?peroidId=${peroidId}`
  );
  console.log(data)
  const { data : subactions, error : err2, isLoading : loading2 } = useFetch(
    `https://biobackend.cs-it.in/getSubactions/2`
  );
  const [commentBody,setCommentBody]=useState({
    studyId,
    peroidId
    
  })
  function handleCommentChange(e){
    setCommentBody({
      ...commentBody,
      [e.target.name] : e.target.value
    })
  }
 console.log(subactions)
  async function handleGroupSelect(groupId){
    console.log("hello grup id "+groupId)
    // const response=await fetch(`https://biobackend.cs-it.in/getStudyData/${studyId}/${peroidId}/${groupId}`);
  try {
    const response=await fetch(`https://biobackend.cs-it.in/timepoints/${groupId}`);
    const data=await response.json();
    console.log(data)
    setGroupData(data.timepoints)
  } catch (error) {
    console.log(error.message)
  }
  }

  console.log(error);
  if(isLoading){
    return <Loader/>
  }
  return (
    <>
      
      <div className="activities-main-container">
       
        <div className="titles-cards gap-5 ">
        <h3>Timepoints</h3>
                        <button className="btn btn-danger" onClick={()=>navigate(`/bloodcollection/${studyId}/${peroidId}`,{state: {previous: window.location.pathname}})}>blood collection</button>

                        <p>
                        Comment/Justification : 
                        </p>
                      <div>
                      <button onClick={()=>{
                    setShow(true)
                  }} className="btn btn-info">
                    comment 
                  </button>
                  /
                  <button onClick={()=>{
                    fetch(`https://biobackend.cs-it.in/getComments/${studyId}/${peroidId}`,{
                      method : "GET"
                    }).then((response)=>response.json())
                    .then((data)=>{
                      console.log(data)
                      setComments(data.comments)
                      setCommentShow(true)
                    }).catch((err)=>{
                      toast.error(err.message)
                    })
                  }} className="btn btn-info">
                    view 
                  </button>
                      </div>
                    </div>
        <div className="activity-two-content-card">
                  

          <div className="table-main-container">
            <table className="table-main-container">
              <tbody className="tbody-styles-card ">
                <tr className="d-flex flex-row ">
                  {data?.groups.map((group) => (
                    <GroupTps key={group.id} peroidId={peroidId} group={group} studyId={studyId} />
                  ))}
                </tr>
              </tbody>
            </table>
          </div>

          <CustomModal show={show} setShow={setShow} title={"Storage Comments"}>
          {/* <p>Study Number : {data.study.studyNumber}</p>
          <p>Study Phase : {data.study.studyPhase}</p>
          <p>Study Title : {data.study.studyName}</p>
          <p>Peroid : {data.study.peroidName}</p> */}
          <Form>
            {/* <Form.Group className="mb-3" controlId="exampleForm.ControlInput1">
              <Form.Label>Email address</Form.Label>
              <Form.Control
                type="email"
                placeholder="name@example.com"
                autoFocus
              />
            </Form.Group> */}
            <Form.Select className="mb-3" aria-label="Default select example" name="groupId" onChange={(e)=>{
              console.log("sdhcdshc" + e.target.value);
              handleGroupSelect(e.target.value);
              handleCommentChange(e);
            }}>
      <option>Open this select menu</option>
      
          {
            data?.groups.map((elem)=>{
              console.log(elem)
              return <option key={elem.id} value={elem.id}>{elem.groupName} </option>
            })
          }
    </Form.Select>
    <Form.Select className="mb-3" name="subActionId" onChange={(e)=>{
      console.log()
      handleCommentChange(e);
    }}>
      <option>open this to select subaction</option>
      {
        subactions?.subactions?.map((subaction)=>{
          return <option key={subaction.id} value={subaction.id}>
            {subaction.description}
            </option>
        })
      }
    </Form.Select>
    {/* <Form.Select className="mb-3" aria-label="Default select example" onChange={(e)=>{
        const animalStudy=groupData.find((animal)=>{
          if(animal.animalId == e.target.value){
            return animal
          }
        })
        console.log(animalStudy)
        setCommentBody({...commentBody,animalStudyId : animalStudy.id})
        setCurrAnimalStudy(animalStudy)
    }}>
      <option>Select Animal Id</option>
      
          {
            groupData?.map((elem)=>{
              console.log(elem)
              return <option key={elem.id} value={elem.animalId}>({elem.animalId})</option>
            })
          }
    </Form.Select> */}
    
    <Form.Select className="mb-3" name="timepointId" onChange={handleCommentChange} aria-label="Default select example">
      <option>Select Time point</option>
      
          {
            groupData?.map((elem)=>{
              console.log(elem)
              return <option key={elem.id} value={elem.timepoint}> {elem.timepoint}   </option>
            })
          }
    </Form.Select>
    <Form.Group
              className="mb-3"
              controlId="exampleForm.ControlTextarea1"
            >
              <Form.Label>New Value</Form.Label>
              {
                commentBody.subActionId == 9 || commentBody.subActionId == 10 || commentBody.subActionId == 11 || commentBody.subActionId == 17
                || commentBody.subActionId == 18 || commentBody.subActionId == 21 || commentBody.subActionId == 22 || commentBody.subActionId ==27 ?
               <input  name="newValue" onChange={handleCommentChange} className="form-control" type="datetime-local"/>
                
                  :
                <Form.Control onChange={handleCommentChange} type="text" name="newValue"/>
              }
            </Form.Group>
            <Form.Group
              className="mb-3"
              controlId="exampleForm.ControlTextarea1"
            >
              <Form.Label>Enter Your Comment Here</Form.Label>
              <Form.Control as="textarea" name="comment" onChange={handleCommentChange} rows={3} />
            </Form.Group>
            <Form.Group className="mb-3">
              <Form.Label>
                Please Enter Password
              </Form.Label>
              <Form.Control onChange={handleCommentChange} type="password" name="password"/>
            </Form.Group>
          </Form>
          <Button onClick={()=>{
            console.log({...commentBody})
            fetch(`http://localhost:9000/addComment?studyId=${studyId}?peroidId=${peroidId}`,{
              method : "POST",
              credentials: 'include',
              headers:{
                "Content-Type" :"application/json",
              },
              body : JSON.stringify({
                ...commentBody,
                studyId,
                peroidId
              })
            }).then((response)=>response.json())
            .then((data)=>{
              setCommentShow(false)
              if(data.success){
                toast.success(data.message);
                return
              }
              toast.warn(data.message)
            })
            .catch((err)=>{
              toast.error(err.message)
            })
          }}>
            Add
          </Button>
        </CustomModal>
        <CustomModal show={commentShow} setShow={setCommentShow} title={"Blood Collection Comments"}>
          {
            comments?.map((comment)=>{
              return     <Card  key={comment.id}>
             
              <Card.Body>
                <Card.Title>{comment.subaction}</Card.Title>
                <Card.Text>
                  <p>
                  <span className="bold">
                  study number :</span> {comment.studyId}
                  </p>
               
                  <p>
                  <span className="bold">
                  peroid id :
                    </span> {comment.peroidId}
                  </p>
                  
           
                  <p>
                  <span className="bold"> 
                  group id : 
                    </span> {comment.groupId}
                  </p>
                  
              
                  <p>
                  <span className="bold">
                  animal  id :
                    </span> {comment.animalId}
                  </p>
                  {
                    comment.timepointId &&
                    <p>
                    <span className="bold">
                    Timepoint Id :
                      </span> {comment.timepointId}
                    </p>
                  }
            
                  <p>
                  <span className="bold">
                  Subaction :
                    </span> {comment.description}
                  </p>
                
                
                    <p>
                      <span className="bold"> comment : </span>
                    {
                    comment.comment
                  }
                    </p>
                  <br />

                </Card.Text>
                
                  
              </Card.Body>
            </Card>
            })
          }
        </CustomModal>
        </div>
      </div>
    </>
  );
};

const GroupTps = ({ group, studyId,peroidId }) => {
  console.log(group.timepoints);
  const [timepoints, setTimePoints] = useState([]);
  const [inputs, setInputs] = useState([]);
  const { data, error, isLoading } = useFetch(
    `https://biobackend.cs-it.in/distinct/timepoints`
  );

  useEffect(() => {
    if (group.tpsAddedMain == 0) {
      const tpsNow = [];
      for (let i = 0; i < group.timepoints; i++) {
        tpsNow.push({ timepoint: "value" });
      }
      setTimePoints(tpsNow);
    }
    if (group.tpsAddedMain == 1) {
      fetch(`https://biobackend.cs-it.in/timepoints/${group.id}`,{
        method:"GET",
        credentials : "include",
      })
        .then((res) => res.json())
        .then((data) => setTimePoints(data.timepoints))
        .catch((err) => {
          console.log(err)
          toast(err.message);
        });
    }
  }, [group.timepoints]);
  if (isLoading) {
    return <p>loading...</p>;
  }
  if(error){
    return <p>werror</p>
  }
  if (data) {
    return (
      <>
        <tr className="groupMainTr">
          <td className="groupName gap-2">{group.groupName}</td>
          {timepoints.map((timepoint, index) => {
            return (
              <td
                className="p-2 m-2 d-flex w-100  gap-2 "
                style={{ width: "10%" }}
              >
                <label className="w-25">TP{index + 1}</label>
                {group.tpsAddedMain == 0 ? (
                  <ValidatedInput
                    timepoint={timepoint}
                    index={index}
                    setTimePoints={setTimePoints}
                    suggestionTps={data?.timepoints}
                  />
                ) : (
                  <input
                    type="text"
                    className="w-50"
                    readOnly
                    value={timepoint.timepoint}
                  />
                )}
              </td>
            );
          })}
          <td className="groupName gap-2">
            {group.tpsAddedMain == 0 ? (
              <button
                className="btn btn-success w-50 mt-2"
                onClick={async () => {
                  console.log(timepoints);
                  try {
                    const response = await fetch(
                      `https://biobackend.cs-it.in/addTps/${group.id}/${studyId}/${peroidId}`,
                      {
                        method: "POST",
                        credentials : "include",
                        headers: {
                          "Content-Type": "application/json",
                        },
                        body: JSON.stringify({ timepoints }),
                      }
                    );
                    const res = await response.json();
                    if (res.timepoints) {
                      console.log(res.timepoints);
                      group.tpsAddedMain = 1;
                      setTimePoints(res.timepoints);
                    }
                    toast(res.message);
                  } catch (error) {
                    console.log(error.message)
                    toast(error.message);
                  }
                }}
              >
                add
              </button>
            ) : (
              <p>Added</p>
            )}
          </td>
        </tr>
      </>
    );
  }
};
const ValidatedInput = ({ timepoint, setTimePoints, index, suggestionTps }) => {
  const [validate, setValidate] = useState(false);
  const [suggestions, setSuggestions] = useState(suggestionTps);
  const [open, setOpen] = useState(false);
  const tpRef = useRef(null);
  return (
    <div className="inputContainer">
      <div className="inputBox">
        <input
          type="text"
          required
          ref={tpRef}
          onChange={(e) => {
            setOpen(true);
            let myVal = e.target.value;
            console.log(e.target.value.length);
            setSuggestions((prev) =>
                suggestionTps.filter((elem) =>
                elem.timepoint?.toLowerCase().includes(e.target.value.toLowerCase())
              )
            );
            if (e.target.value.length == 5) {
              console.log(0 <= Number("?") <= 9, myVal[4], Number("?"));
              // toast((0<=myVal[0]<=9)&&(0<=myVal[1]<=9)&&(myVal[2]==":")&&(0<=myVal[3]<=5)&&(0<=myVal[4]<=9))
              if (
                0 <= myVal[0] <= 9 &&
                0 <= myVal[1] <= 9 &&
                myVal[2] == ":" &&
                0 <= myVal[3] <= 5 &&
                0 <= myVal[4] <= 9
              ) {
                setValidate(true);
                setOpen(false);
                setTimePoints((prev) => {
                  prev = prev.map((elem, i) => {
                    if (i == index) {
                      return { timepoint: e.target.value };
                    }
                    return elem;
                  });
                  return prev;
                });
              } else setValidate(false);
            }
            if (e.target.value.length < 5) {
              setValidate(false);
            }
          }}
          maxLength={5}
          minLength={5}
          className="w-50"
          onFocus={() => {
            setOpen(true);
          }}
          
        />

        <div className="inputStat">{!validate ? "❌" : "✅️"}</div>
      </div>
      {open && (
        <div className="suggestions">
          {suggestions.map((tp) => {
            const value=tp.timepoint;
            return (
              <p
                className="suggestionItem"
                onClick={() => {
                  tpRef.current.value = value;
                  setOpen(false);
                  setTimePoints((prev) => {
                    prev = prev.map((elem, i) => {
                      if (i == index) {
                        return { timepoint: value };
                      }
                      return elem;
                    });
                    return prev;
                  });
                  setValidate(true);
                }}
              >
                {value}
              </p>
            );
          })}
        </div>
      )}
    </div>
  );
};
export default ActivityTwo;
