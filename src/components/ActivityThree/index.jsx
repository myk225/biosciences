import { useEffect, useRef, useState } from "react";
import "./index.css";
import moment from "moment";
import useFetch from "../../hooks/fetch";
import { useNavigate, useParams } from "react-router-dom";
import { toast } from "react-toastify";
import { areDatesEqual } from "../../utils/dates";
import { Loader } from "../loaders/Loader";
import { CustomModal } from "../modal/CustomModal";
import { Button, Card, Form } from "react-bootstrap";
export const ActivityThree = () => {
  const { studyId, peroidId } = useParams();
  const navigate=useNavigate();
  const [show,setShow]=useState(false);
  const [commentShow,setCommentShow]=useState(false);
  const [groupData,setGroupData]=useState(null);
  const [currAnimalStudy,setCurrAnimalStudy]=useState(null);
 const [comments,setComments]=useState([]);
  const { data, error, isLoading } = useFetch(
    `https://biobackend.cs-it.in/getStudyData/${studyId}/${peroidId}`
  );
  const { data : subactions, error : err2, isLoading : loading2 } = useFetch(
    `https://biobackend.cs-it.in/getSubactions/3`
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
    const response=await fetch(`https://biobackend.cs-it.in/getStudyData/${studyId}/${peroidId}/${groupId}`);
    const data=await response.json();
    console.log(data)
    setGroupData(data.animalStudys)
  }
  if (isLoading) {
    return <Loader/>;
  }
  if (error) {
    return <div>Error Occured</div>;
  }
  if (data) {
    return (
      <div className="Activity3Main">
        <div className="infoActivity3">
        <div className="w-100 d-flex justify-content-between">
        <p className="studyTitle bold">
        
          <span className="bold">Study title : </span> 
            {" "}
             {data.study.studyName}
          </p>
          <p className="bold">
            Report : <button className="btn btn-danger" onClick={()=>navigate(`/report/bloodcollection/${studyId}/${peroidId}`,{state: {previous: window.location.pathname}})}>Report</button>
          </p>
        </div>
          <p className="flexItem">
            {" "}
            <span className="bold">Study Number</span> : {data?.study.studyNumber}
          </p>
          <p className="flexItem">
            {" "}
            <span className="bold">Study Phase</span> : {data?.study.studyPhase}
          </p>
          <p className="flexItem">
            <span className="bold">Peroid-Number </span> :{" "}
            {data.study.peroidName}
          </p>
          <p className="flexItem">
            <span className="bold">Peroid Start Date </span> :{" "}
            {moment(data.study.startDate).format("DD-MM-yyyy")}
          </p>
        
          <p className="flexItem">
            <span className="bold mb-2">Comment/Justification </span> : <button onClick={()=>setShow(true)} className="btn btn-primary">Add</button> / <button  className="btn btn-primary" onClick={()=>{
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
              
            }}>View</button>
          </p>
          <p className="flexitem">
            <span className="bold">
              Centrifugation Window
            </span> :
            <button className="btn btn-info btn-sm"  onClick={()=>navigate(`/centrifugation/${studyId}/${peroidId}`,{state: {previous: window.location.pathname}})}>
              Centrifuge
            </button>
          </p>
          
        </div>  
       
        <div className="Activity3Groups">
          {data.study.groups.map((elem) => {
          
            // toast("sidjijbnbf")
            return <GroupComp group={elem} key={elem.id} />;
          })}
        </div>
        <CustomModal show={show} setShow={setShow} title={"Blood Collection Comments"}>
          <p>Study Number : {data.study.studyNumber}</p>
          <p>Study Phase : {data.study.studyPhase}</p>
          <p>Study Title : {data.study.studyName}</p>
          <p>Peroid : {data.study.peroidName}</p>
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
              console.log(e.target.value);
              handleGroupSelect(e.target.value);
              handleCommentChange(e);
            }}>
      <option>Open this select menu</option>
      
          {
            data.study.groups.map((elem)=>{
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
    <Form.Select className="mb-3" aria-label="Default select example" onChange={(e)=>{
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
    </Form.Select>
    
    <Form.Select className="mb-3" name="timepointId" onChange={handleCommentChange} aria-label="Default select example">
      <option>Select Time point</option>
      
          {
            currAnimalStudy?.timepoints?.map((elem)=>{
              console.log(elem)
              return <option key={elem.id} value={elem.id}> {elem.timepoint}   </option>
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
                Enter Your Password
              </Form.Label>
              <Form.Control onChange={handleCommentChange} type="password"  name="password" />
            </Form.Group>
          </Form>
          <Button onClick={()=>{
            console.log({...commentBody,peroidNumber : data.study.peroidName,studyNumber : data.study.studyNumber})
            fetch(`http://localhost:9000/addComment`,{
              method : "POST",
              credentials: 'include',
              headers:{
                "Content-Type" :"application/json",
              },
              body : JSON.stringify({
                ...commentBody,
                studyNumber : data.study.studyNumber,
                peroidNumber : data.study.studyNumber
              })
            }).then((response)=>response.json())
            .then((data)=>{
              setShow(false)
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
                  study number : {comment.studyId}
                  <br />
                  peroid id : {comment.peroidId}
                  <br />
                  group id : {comment.groupId}
                  <br />
                  animal study id : {comment.animalStudyId}
                  <br />

                  {
                    comment.comment
                  }
                </Card.Text>
                  
              </Card.Body>
            </Card>
            })
          }
        </CustomModal>
      </div>
    );
  }
};

const GroupComp = ({ group }) => {
  const { studyId, peroidId } = useParams();
  const [reload, setReload] = useState(0);
  const { data, error, isLoading } = useFetch(
    `https://biobackend.cs-it.in/getStudyData/${studyId}/${peroidId}/${group.id}`
  );
  console.log(data);
  if (group.tpsAddedMain == 1) {
    return (
      <div className="GroupAnimal">
        <div className="infoGroupAct3">
          {/* <p className="flexItem">
            {" "}
            <span className="bold">Group Id</span> : {group.id}
          </p> */}
          <p className="flexItem">
            {" "}
            <span className="bold">Group Number</span> : {group.groupName}
          </p>
          <p className="flexItem">
            {" "}
            <span className="bold">total No OfAnimals</span> :{" "}
            {group.noOfAnimals}
          </p>
          <p className="flexItem">
            {" "}
            <span className="bold">no Of TimePoints</span> : {group.timepoints}
          </p>
          {group.concentration && (
            <p className="flexItem">
              {" "}
              <span className="bold">concentration  <span className="lowerCase">(mg/ml)</span> </span> :{" "}
              {group.concentration}
            </p>
          )}
          {group.doseVol && (
            <p className="flexItem">
              {" "}
              <span className="bold">dose volume <span className="lowerCase">(ml/kg)</span></span> : {group.doseVol}
            </p>
          )}
           {group.dose && (
            <p className="flexItem">
              {" "}
              <span className="bold">dose <span className="lowerCase">(mg/kg)</span></span> : {group.dose}
            </p>
          )}
          <p className="flexItem">
            {" "}
            <span className="bold">Route of Administration</span> :{" "}
            {group.routeValue}
          </p>
        </div>
        <div className="animals">
          {data?.animalStudys?.map((animal) => {
            return (
              <Animal
                key={animal.id}
                curranimal={animal}
                currGroup={group}
                studyId={studyId}
                peroidId={peroidId}
                setReload={setReload}
              />
            );
          })}
        </div>
      </div>
    );
  }
  return <div>please add tps for this group </div>;
};

const Animal = ({ curranimal, setReload, studyId, currGroup,peroidId }) => {
  const [animal, setAnimal] = useState(curranimal);
  const [doseTime, setDoseTime] = useState();
  const [instrumentsUsed, setInstrumentsUsed] = useState(null);
  const [group, setGroup] = useState(currGroup);
  function handleIChange(e) {
    setInstrumentsUsed(e.target.value);
  }

  const [preDoseTime, setPreDoseTime] = useState(
    animal.preDoseTime
      ? moment(animal.preDoseTime).format("MMMM Do YYYY, h:mm:ss a")
      : "Click Here To Add Pre DoseTime"
  );
  const [infusionStart, setInfusionStart] = useState(null);
  const [infusionEnd, setInfusionEnd] = useState(null);
  const [act, setAct] = useState([]);
  const volRef = useRef(null);
  const tabRef = useRef(null);
  const siteOfAdministration=useRef(null);
  const waterVolumeGivenAfterAdministration=useRef(null);
  const waterVolumeUsedToFlushGavageTube=useRef(null);
  const weight=useRef(null);
  const dosedBy=useRef(null);
  const handleVolume = async () => {
    console.log("actual volume adminstered " + volRef.current.value);
    console.log("volume to be adminstered " + group.doseVol * animal.weight);
    const reqBody = {
      volumeToBeAdministered: group.doseVol * animal.weight,
      actualVolumeAdministered: volRef.current.value,
    };
    fetch(`https://biobackend.cs-it.in/addVolumeAdministered/${animal.id}`, {
      method: "PATCH",
      credentials: 'include',
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(reqBody),
    })
      .then((res) => res.json())
      .then((data) => {
        toast.info(data.message);
        if (data.success) {
          setAnimal((prev) => ({
            ...prev,
            actualVolumeAdministered: volRef.current.value,
          }));
        }
      });
  };
  const handleTablets = async () => {
    const reqBody = {
      tabletsToBeAdministered: group.noOfTablets,
      actualTabletsAdministered: tabRef.current.value,
    };
    fetch(`https://biobackend.cs-it.in/addTabletsAdministered/${animal.id}`, {
      method: "PATCH",
      credentials: 'include',
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(reqBody),
    })
      .then((res) => res.json())
      .then((data) => {
        toast.info(data.message);
        if (data.success) {
          setAnimal((prev) => ({
            ...prev,
            actualTabletsAdministered: tabRef.current.value,
          }));
        }
      });
  };
  const handleWeight = ()=>{
      fetch(`https://biobackend.cs-it.in/addAnimalWeight/${animal.id}`,{
        method:"PATCH",
        credentials: 'include',
        headers:{
          "Content-Type" : "application/json"
        },
        body : JSON.stringify({weight:weight.current.value})
      }).then((res)=>res.json())
      .then((data)=>{
        if(data.success){
          toast.success(data.message);
          setAnimal(prev=>({...prev,weight: weight.current.value}))
          return;
        }
        toast.error(data.message)
      }).catch((err)=>{
        toast.error(err.message);
      })
  }
  const handleDosedBy = ()=>{
    fetch(`https://biobackend.cs-it.in/addDosedBy/${animal.id}`,{
      method:"PATCH",
      credentials: 'include',
      headers:{
        "Content-Type" : "application/json"
      },
      body : JSON.stringify({dosedBy:dosedBy.current.value})
    }).then((res)=>res.json())
    .then((data)=>{
      if(data.success){
        toast.success(data.message);
        setAnimal(prev=>({...prev,dosedBy: dosedBy.current.value}))
        return;
      }
      toast.error(data.message)
    }).catch((err)=>{
      toast.error(err.message);
    })
  }
  return (
    <div className="animal" key={animal?.id}>
      <div className="flex">
        {/* <p className="bold"> Animal Study Id: {animal.id}</p> */}
        <p className="bold"> Animal Id : {animal?.animalId}</p>
        <p className="bold"> Status : {animal?.status}</p>
       
        {animal.actualTabletsAdministered ? (
          <p className="bold">
            actual tabelts administered : {animal.actualTabletsAdministered}
          </p>
        ) : (
          group.noOfTablets && (
            <p className="bold">
              {" "}
              Actual Tablets Adminstered:{" "}
              <input
                name="actualVolumeAdmistered"
                ref={tabRef}
                className="w-25"
                placeholder="Enter Tablets "
              />{" "}
              <button onClick={handleTablets} className="smallBtn">
                enter
              </button>
            </p>
          )
        )}
        {group.doseVol && (
          <p className="bold">
            {" "}
            Volume to be adminstered: {animal.weight * group.doseVol}
          </p>
        )}

        {animal.actualVolumeAdministered ? (
          <p className="bold">
            {" "}
            Volume adminstered: {animal.actualVolumeAdministered}
          </p>
        ) : (
          group.doseVol && (
            <p className="bold">
              {" "}
              Actual Volume adminstered:{" "}
              <input
                name="actualVolumeAdmistered"
                ref={volRef}
                className="w-25"
                placeholder="Enter Volume"
              />{" "}
              <button onClick={handleVolume} className="smallBtn">
                enter
              </button>
            </p>
          )
        )}
        {
          group.isSiteAdministered==1 && 
       <>
        {
           animal.siteOfAdministration ? 
           <p className="bold">
             Site Of Administration : {animal.siteOfAdministration}
           </p>
           :
           <p className="bold">
           {" "}
           Site Of Administration:{" "}
           <input
             name="siteOfAdministration"
             ref={siteOfAdministration}
             className="w-75"
             placeholder="Enter site of Administration"
           />{" "}
           <button onClick={()=>{
             fetch(`https://biobackend.cs-it.in/addSiteOfAdministration/${animal.id}`,{
               method:"PATCH",
               credentials: 'include',
               headers:{
                 'Content-Type' : 'application/json'
               },
               body:JSON.stringify({siteOfAdministration:siteOfAdministration.current.value})
             })
             .then((res)=>res.json())
             .then((data)=>{
               if(data.success){
                 setAnimal(prev=>({...prev,siteOfAdministration:siteOfAdministration.current.value}))
                 return toast.success(data.message)
               }
               toast.warninga(data.message)
             })
             .catch((err)=>toast.error(err.message))
           }} className="smallBtn">
             enter
           </button>
         </p>
        }
       </>
        }
      </div>
      <div className="flex">
      {
          animal.weight ? (
            <p className="bold">Weight (kg) : {animal.weight}</p>
          ) : (
            <p className="bold">
              Add Animal Weight (kg) :  {" "}
              <input name="weight" ref={weight} className="w-25" placeholder="enter weight"/>
              <button onClick={handleWeight} className="smallBtn">enter</button>
            </p>
          )
        }
        {group.noOfTablets && (
          <p className="bold"> No Of Tablets: {group.noOfTablets}</p>
        )}
        {
          animal.dosedBy ? (
            <p className="bold"> Dosed By : {animal.dosedBy}</p>
          ):<p className="bold w-25">
          Dosed By : {" "}
          <input name="weight" ref={dosedBy} className="w-50" placeholder="Dosed By"/>
          <button onClick={handleDosedBy} className="smallBtn">enter</button>
        </p>
        }
      </div>
      {group.routeOfAdminstration == 5 && (
        <div className="flex align-items-center w-100">
          <p className="flexItem   bold">
            Enter Instruments Used :{" "}
            {animal.instrumentsUsed ? (
              <span
                style={{ wordBreak: "break-all" }}
                className="bold w-100 text-wrap"
              >
                {animal.instrumentsUsed}
              </span>
            ) : (
              <div>
                <input
                  type="text"
                  name="instrumentsUsed"
                  value={instrumentsUsed}
                  onChange={handleIChange}
                  placeholder="enter instruments used"
                />
                <button
                  onClick={() => {
                    fetch(`https://biobackend.cs-it.in/addInstruments/${animal.id}`, {
                      method: "PATCH",
                      credentials: 'include',
                      headers: {
                        "Content-Type": "application/json",
                      },
                      body: JSON.stringify({ instrumentsUsed }),
                    })
                      .then((res) => res.json())
                      .then((data) => {
                        toast.success(data.message);
                        if (data.success)
                          setAnimal((prev) => ({ ...prev, instrumentsUsed }));
                      })
                      .catch((err) => {
                        toast.error(err.message);
                      });
                  }}
                  className="smallBtn"
                >
                  enter
                </button>
              </div>
            )}
          </p>
          <p className="flexItem bold">
            Infusion Start :{" "}
            {animal.infusionStart ? (
              <span>{moment(animal.infusionStart).subtract(330,"minutes").format('DD-MM-YYYY HH:mm')}</span>
            ) : (
              <input
                type="text"
                name="infusionRate"
                value={infusionStart}
                // onFocus={() => {
                //   setInfusionStart(new Date());
                // }}
                
                onDoubleClick={() => {
                  fetch(`https://biobackend.cs-it.in/addInfusionStart/${animal.id}`,{
                    method:"PATCH",
                    credentials: 'include',
                    headers:{
                      'Content-Type' : 'application/json'
                    },
                    body:JSON.stringify({
                      infusionStart : new Date()
                    })
                  }).then((res)=>res.json())
                  .then((data)=>{
                    toast.info(data.message)
                    if(data.success){
                      let value=moment(infusionStart).add(330,'minutes').format()
                      setAnimal(prev=>({...prev,infusionStart:value}));
                    }
                  }).catch((err)=>toast.error(err.message))
                }}
                placeholder="infusion start"
              />
            )}
          </p>
          <p className="flexItem bold">
            Infusion End :{" "}
            {animal.infusionEnd ? (
              <span> {moment(animal.infusionEnd).subtract(330,"minutes").format('DD-MM-YYYY HH:mm')} </span>
            ) : (
              <input
                type="text"
                name="infusionDuration"
                placeholder="infusion end"
                value={infusionEnd}
                // onFocus={()=>{
                //   setInfusionEnd(new Date())
                // }}
                onDoubleClick={() => {
                  fetch(`https://biobackend.cs-it.in/addInfusionEnd/${animal.id}`,{
                    method:"PATCH",
                    credentials: 'include',
                    headers:{
                      'Content-Type' : 'application/json'
                    },
                    body:JSON.stringify({
                      infusionEnd : new Date()
                    })
                  }).then((res)=>res.json())
                  .then((data)=>{
                    toast.info(data.message)
                    if(data.success){
                      let value=moment(infusionEnd).add(330,'minutes').format()
                      setAnimal(prev=>({...prev,infusionEnd:value}))
                    }
                  }).catch((err)=>toast.error(err.message))
                }}
                
              />
            )}
          </p>
        </div>
      )}
      {
        group.routeOfAdminstration == 2 && 
        <>
        {
           animal.waterVolumeGivenAfterAdministration ? 
           <p className="bold">
             Volume of Water given after administration (ml) : {animal.waterVolumeGivenAfterAdministration} 
           </p>
           :
           <p className="bold">
           {" "}
           Volume of Water given after administration (ml) :{" "}
           <input
             name="waterVolumeGivenAfterAdministration"
             ref={waterVolumeGivenAfterAdministration}
             className="w-25"
             placeholder="Volume of Water given after administration "
           />{" "}
           <button onClick={()=>{
             fetch(`https://biobackend.cs-it.in/addwaterVolumeGivenAfterAdministration/${animal.id}`,{
               method:"PATCH",
               credentials: 'include',
               headers:{
                 'Content-Type' : 'application/json'
               },
               body:JSON.stringify({waterVolumeGivenAfterAdministration:waterVolumeGivenAfterAdministration.current.value})
             })
             .then((res)=>res.json())
             .then((data)=>{
               if(data.success){
                 setAnimal(prev=>({...prev,waterVolumeGivenAfterAdministration:waterVolumeGivenAfterAdministration.current.value}))
                 return toast.success(data.message)
               }
               toast.warning(data.message)
             })
             .catch((err)=>toast.error(err.message))
           }} className="smallBtn">
             enter
           </button>
         </p>
        }
       </>
      }
        {
        group.routeOfAdminstration == 1 && 
        <>
        {
           animal.waterVolumeUsedToFlushGavageTube ? 
           <p className="bold">
             Water Volume Used To Flush Gavage Tube (ml) : {animal.waterVolumeUsedToFlushGavageTube} 
           </p>
           :
           <p className="bold">
           {" "}
           Water Volume Used To Flush Gavage Tube (ml):{" "}
           <input
             name="waterVolumeGivenAfterAdministration"
             ref={waterVolumeUsedToFlushGavageTube}
             className="w-25"
             placeholder="Volume of Water given after administration "
           />{" "}
           <button onClick={()=>{
             fetch(`https://biobackend.cs-it.in/addwaterVolumeUsedToFlushGavageTube/${animal.id}`,{
               method:"PATCH",
               credentials: 'include',
               headers:{
                 'Content-Type' : 'application/json'
               },
               body:JSON.stringify({waterVolumeUsedToFlushGavageTube:waterVolumeUsedToFlushGavageTube.current.value})
             })
             .then((res)=>res.json())
             .then((data)=>{
               if(data.success){
                 setAnimal(prev=>({...prev,waterVolumeUsedToFlushGavageTube:waterVolumeUsedToFlushGavageTube.current.value}))
                 return toast.success(data.message)
               }
               toast.warning(data.message)
             })
             .catch((err)=>toast.error(err.message))
           }} className="smallBtn">
             enter
           </button>
         </p>
        }
       </>
      }
      <div className="flex">
        <label className="bold" htmlFor="">
          Pre Dose :
        </label>
        {animal.preDoseTime ? (
          <input
            type="text"
            className="input1"
            style={{ width: "40%" }}
            value={moment(animal.preDoseTime).format("DD-MM-YYYY HH:mm")}
            readOnly
          />
        ) : (
          <input
            type="text"
            className="input1"
            style={{ width: "40%" }}
            value={preDoseTime}
            name="preDoseTime"
            // onFocus={async () => {
            //   if (animal.animalStudyStatusId < 2) {
            //     setPreDoseTime(new Date());
            //   }
            // }}
            onDoubleClick={async () => {
              if (animal.animalStudyStatusId < 2) {
                setPreDoseTime(new Date());
                try {
                  const response = await fetch(
                    `https://biobackend.cs-it.in/preDose/${animal.id}?studyId=${studyId}&peroidId=${peroidId}`,
                    {
                      method: "PATCH",
                      credentials: 'include',
                      headers: {
                        "Content-Type": "application/json",
                      },
                      body: JSON.stringify({ preDoseTime: new Date() }),
                    }
                  );
                  const res = await response.json();

                  if (res.success) {
                    setAnimal((prev) => {
                      return {
                        ...prev,
                        status: "predosed",
                        animalStudyStatusId: 2,
                      };
                    });
                  }

                  toast(res.message);
                } catch (error) {
                  toast(error.message);
                }
              }
            }}
            placeholder="enter predose"
          />
        )}
        <label className="bold" htmlFor="">
          Dose :
        </label>
        {animal.doseTime ? (
          <input
            type="text"
            className="input1"
            style={{ width: "40%" }}
            value={moment(animal.doseTime).format("DD-MM-YYYY HH:mm")}
            readOnly
          />
        ) : (
          <input
            type="text"
            className="input1"
            style={{ width: "40%" }}
            value={doseTime}
            name="doseTime"
            // onFocus={() => {
            //   if (animal.animalStudyStatusId == 2) {
            //     if (animal.animalStudyStatusId < 3) {
            //       setDoseTime(new Date());
            //     }
            //   } else {
            //     toast.error("Pre dose the animal first");
            //   }
            // }}
            onDoubleClick={async () => {
              if (animal.animalStudyStatusId == 2) {
                if (animal.animalStudyStatusId < 3) {
                  setDoseTime(new Date());
                  try {
                    const response = await fetch(
                      `https://biobackend.cs-it.in/dose/${animal.id}?studyId=${studyId}`,
                      {
                        method: "PATCH",
                        credentials: 'include',
                        headers: {
                          "Content-Type": "application/json",
                        },
                        body: JSON.stringify({ doseTime: new Date() }),
                      }
                    );
                    const res = await response.json();
  
                    if (res.success) {
                      setAnimal((prev) => {
                        return {
                          ...prev,
                          status: "dosed",
                          animalStudyStatusId: 3,
                        };
                      });
                      window.location.reload();
                    }
  
                    toast(res.message);
                  } catch (error) {
                    toast(error.message);
                  }
                }
              } else {
                toast.error("Pre dose the animal first");
              }
               
              }
            }
            placeholder="Dose Time"
          />
        )}
      </div>
      <div>
        <p className="bold">Timepoints</p>
        <div className="d-flex">
          <div className="timepoint">
            <p className="bold">Date</p>
            <p className="bold">TP</p>
            <p className="bold">ST</p>
            <p className="bold">ACT</p>
            <p className="bold">Collected By</p>
          </div>
          <div className="allTps">
            {animal.timepoints?.map((timePoint, i) => {
              // console.log(timePoint.actualCollectionTime  )
              return (
                <AnimalTimepoint
                  key={i}
                  data={timePoint}
                  setAnimal={setAnimal}
                  animal={animal}
                  i={i}
                  doseTime={animal.doseTime}
                  setAct={setAct}
                  act={act}
                />
              );
            })}
          </div>
        </div>
      </div>
    </div>
  );
};

const AnimalTimepoint = ({
  data,
  i,
  doseTime,
  setAct,
  act,
  animal,
  setAnimal,
}) => {
  const inputRef = useRef(null);
  const [timePoint, setTimePoint] = useState(data);
  // const [updated, setUpdated] = useState(0);
  // useEffect(() => {
  //   if (updated > 0) {
  //     fetch(`https://biobackend.cs-it.in/timepoint/${timePoint.id}`)
  //       .then((res) => res.json())
  //       .then((data) => {
  //         setTimePoint(data.tp);
  //       })
  //       .catch((error) => toast(error.message));
  //   }
  // }, [updated]);
  const duration = timePoint.timepoint.split(":");
  let dInSec = 0;
  // console.log(duration);
  dInSec = dInSec + Number(duration[0] * 60 * 60);
  dInSec = dInSec + Number(duration[1] * 60);
  console.log(moment().add(dInSec, "seconds").format("HH:mm"));
  let dt = moment(doseTime)
    .add(dInSec, "seconds")
    .format("HH:mm")
    .split(" ")[0];
  // console.log(dt)
  // eslint-disable-next-line react/jsx-key
  return (
    <div className="timepoint " style={{ width: "6em" }} key={timePoint}>
      <p className="bold">
        {timePoint.isDtAdded == 1
          ? moment(timePoint.collectionTime).format("DD/MM/YYYY")
          : moment().add(dInSec, "seconds").format("DD/MM/YYYY")}
      </p>
      <input
        type="text"
        className=""
        readOnly
        defaultValue={timePoint.timepoint}
      />

      {timePoint.collectionTime ? (
        <input value={moment(timePoint.collectionTime).format("HH:mm")} />
      ) : (
        <input
          type="text"
          className=""
          defaultValue={doseTime && dt}
          readOnly
        />
      )}
      {timePoint.isActAdded == 1 ? (
        <input
          type="text"
          className={` ${
            areDatesEqual(
              moment(timePoint.collectionTime).format(),
              moment(timePoint.actucalCollectionTime).format()
            )
              ? "bg-info"
              : "bg-danger"
          } `}
          value={moment(timePoint.actucalCollectionTime).format("HH:mm")}
        />
      ) : (
        <input
          type="text"
          className=""
          value={act[i]}
          onDoubleClick={async () => {
            if (doseTime) {
              let currDate = new Date();

              let time = moment(currDate).format("HH:mm");
              setAct([...act, (act[i] = time)]);
              try {
                const response = await fetch(
                  `https://biobackend.cs-it.in/addAct/${animal.id}`,
                  {
                    method: "PATCH",
                    credentials: 'include',
                    headers: {
                      "Content-Type": "application/json",
                    },
                    body: JSON.stringify({
                      act: currDate,
                      timepoint: timePoint.timepoint,
                    }),
                  }
                );
                const res = await response.json();

                if (res.success) {
                  setAnimal((prev) => {
                    return {
                      ...prev,
                      status: "working on acts",
                      animalStudyStatusId: 4,
                    };
                  });
                }

                if (res.finished) {
                  setAnimal((prev) => {
                    return {
                      ...prev,
                      status: "Ready For Centrifugation",
                      animalStudyStatusId: 5,
                    };
                  });
                }
                timePoint.isActAdded = 1;
                timePoint.actucalCollectionTime = currDate;
                // setUpdated(updated+1);
                toast(res.message);
              } catch (error) {
                toast(error.message);
              }
            } else {
              toast.error("Please Add Dose Time First ");
            }
          }}
        />
      )}
      {timePoint.collectedBy ? (
        <input readOnly value={timePoint.collectedBy} />
      ) : (
        <div className="collectedBy">
          <input type="text" ref={inputRef} className="" />
          <button
            onClick={() => {
              fetch(
                `https://biobackend.cs-it.in/addCollectedBy/${timePoint.id}`,
                {
                  method: "PATCH",
                  credentials: 'include',
                  headers: {
                    "Content-Type": "application/json",
                  },
                  body: JSON.stringify({ collectedBy: inputRef.current.value }),
                }
              )
                .then((res) => res.json())
                .then((data) => {
                  toast.success(data.message);
                  if (data.success) {
                    setTimePoint((prev) => ({
                      ...prev,
                      collectedBy: inputRef.current.value,
                    }));
                  }
                })
                .catch((error) => toast.success(error.message));
            }}
          >
            Add
          </button>
        </div>
      )}
    </div>
  );
};
