/* eslint-disable react/jsx-key */
import "./index.css";
import Table from "react-bootstrap/Table";
import Navbar from "../Navbar";
import { Link, useParams } from "react-router-dom";
import { IoMdArrowRoundBack } from "react-icons/io";
import useFetch from "../../hooks/fetch";
import { useEffect, useRef, useState } from "react";
import { toast } from "react-toastify";
import { Loader } from "../loaders/Loader";
const tpHints = ["00:05", "00:10", "01:00", "02:00", "03:00", "04:00"];
const ActivityTwo = () => {
  const { studyId } = useParams();
  console.log(studyId);
  const { data, error, isLoading } = useFetch(
    `https://demo.gharxpert.in/getGroups/${studyId}`
  );
  console.log(error);
  if(isLoading){
    return <Loader/>
  }
  return (
    <>
      
      <div className="activities-main-container">
        <h3>Timepoints</h3>
        <div className="activity-two-content-card">
          {/* <div className="titles-cards">
                        <h3 className='title-name-styles'>Study No: <span className='title-des-styles'>100</span></h3>
                        <h3 className='title-name-styles'>Peroid: <span className='title-des-styles'>P1</span></h3>
                    
                    </div> */}

          <div className="table-main-container">
            <table className="table-main-container">
              <tbody className="tbody-styles-card ">
                <tr className="d-flex flex-row ">
                  {data?.groups.map((group) => (
                    <GroupTps key={group.id} group={group} studyId={studyId} />
                  ))}
                </tr>
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </>
  );
};

const GroupTps = ({ group, studyId }) => {
  console.log(group.timepoints);
  const [timepoints, setTimePoints] = useState([]);
  const [inputs, setInputs] = useState([]);
  const { data, error, isLoading } = useFetch(
    `https://demo.gharxpert.in/distinct/timepoints`
  );

  useEffect(() => {
    if (group.tpsAdded == 0) {
      const tpsNow = [];
      for (let i = 0; i < group.timepoints; i++) {
        tpsNow.push({ timepoint: "value" });
      }
      setTimePoints(tpsNow);
    }
    if (group.tpsAdded == 1) {
      fetch(`https://demo.gharxpert.in/timepoints/${group.id}`)
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
                {group.tpsAdded == 0 ? (
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
            {group.tpsAdded == 0 ? (
              <button
                className="btn btn-success w-50 mt-2"
                onClick={async () => {
                  console.log(timepoints);
                  try {
                    const response = await fetch(
                      `https://demo.gharxpert.in/addTps/${group.id}/${studyId}`,
                      {
                        method: "POST",
                        headers: {
                          "Content-Type": "application/json",
                        },
                        body: JSON.stringify({ timepoints }),
                      }
                    );
                    const res = await response.json();
                    if (res.timepoints) {
                      console.log(res.timepoints);
                      group.tpsAdded = 1;
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
