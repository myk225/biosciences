import { useEffect, useRef, useState } from "react";
import "./index.css";
import moment from "moment";
import useFetch from "../../hooks/fetch";
import { useParams } from "react-router-dom";
import { toast } from "react-toastify";
import { areDatesEqual } from "../../utils/dates";
export const ActivityThree = () => {
  const { studyId, peroidId } = useParams();
  const { data, error, isLoading } = useFetch(
    `https://demo.gharxpert.in/getStudyData/${studyId}/${peroidId}`
  );

  if (isLoading) {
    return <div>Loading....</div>;
  }
  if (error) {
    return <div>Error Occured</div>;
  }
  if (data) {
    return (
      <div className="Activity3Main">
        <div className="infoActivity3">
          <p className="flexItem">
            {" "}
            <span className="bold">Study Number</span> : {data?.study.id}
          </p>
          <p className="flexItem">
            {" "}
            <span className="bold">Study title</span> : {data.study.studyName}
          </p>
          <p className="flexItem">
            <span className="bold">Peroid-Number </span> :{" "}
            {data.study.peroidName}
          </p>
          {/* <p className="flexItem">
            <span className="bold">PeroidName </span> : {data.study.peroidName}
          </p> */}
        </div>
        <div className="Activity3Groups">
          {data.study.groups.map((elem) => {
            // toast("sidjijbnbf")
            return <GroupComp group={elem} key={elem.id} />;
          })}
        </div>
      </div>
    );
  }
};

const GroupComp = ({ group }) => {
  const { studyId, peroidId } = useParams();
  const [reload, setReload] = useState(0);
  const { data, error, isLoading } = useFetch(
    `https://demo.gharxpert.in/getStudyData/${studyId}/${peroidId}/${group.id}`
  );
  console.log(data);
  if (group.tpsAdded == 1) {
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
            {
              group.concentration &&   <p className="flexItem">
              {" "}
              <span className="bold">concentration</span> : {group.concentration}
            </p>
            }
          {
            group.doseVol &&   <p className="flexItem">
            {" "}
            <span className="bold">dose volume</span> : {group.doseVol}
          </p>  
          }
        </div>
        <div className="animals">
          {data?.animalStudys?.map((animal) => {
            return (
              <Animal
                key={animal.id}
                curranimal={animal}
                group={group}
                studyId={studyId}
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

const Animal = ({ curranimal, setReload, studyId, group }) => {
  const [animal, setAnimal] = useState(curranimal);
  const [doseTime, setDoseTime] = useState();
  console.log("sdughfiusdghfsdiufgdisufigsdiu");
  console.log(group);
  const [preDoseTime, setPreDoseTime] = useState(
    animal.preDoseTime
      ? moment(animal.preDoseTime).format("MMMM Do YYYY, h:mm:ss a")
      : "Click Here To Add Pre DoseTime"
  );
  const [act, setAct] = useState([]);
  const volRef = useRef(null);
  const tabRef = useRef(null);
  const handleVolume = async () => {
    console.log("actual volume adminstered " + volRef.current.value);
    console.log("volume to be adminstered " + group.doseVol * animal.weight);
    const reqBody = {
      volumeToBeAdministered: group.doseVol * animal.weight,
      actualVolumeAdministered: volRef.current.value,
    };
    fetch(`https://demo.gharxpert.in/addVolumeAdministered/${animal.id}`, {
      method: "PATCH",
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
    fetch(`https://demo.gharxpert.in/addTabletsAdministered/${animal.id}`, {
      method: "PATCH",
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
  return (
    <div className="animal" key={animal?.id}>
      <div className="flex">
        {/* <p className="bold"> Animal Study Id: {animal.id}</p> */}
        <p className="bold"> Animal Id : {animal?.animalId}</p>
        <p className="bold"> Status : {animal?.status}</p>
        {group.noOfTablets && (
          <p className="bold"> No Of Tablets: {group.noOfTablets}</p>
        )}
        {
          animal.actualTabletsAdministered ? (<p className="bold">
            actual tabelts administered : {animal.actualTabletsAdministered}
          </p>) : (
            group.noOfTablets &&  <p className="bold">
            {" "}
            Actual Tablets Adminstered:{" "}
            <input
              name="actualVolumeAdmistered"
              ref={tabRef}
              className="w-25"
              placeholder="Enter Tablets Administered"
            />{" "}
            <button onClick={handleTablets} className="btn btn-success">
              enter
            </button>
          </p>
          )
        }
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
                placeholder="Enter Volume Administered"
              />{" "}
              <button onClick={handleVolume} className="btn btn-success">
                enter
              </button>
            </p>
          )
        )}
      </div>
      <div className="flex">
        <label className="bold" htmlFor="">
          Pre Dose :
        </label>
        {animal.preDoseTime ? (
          <input
            type="text"
            className="input1"
            style={{ width: "40%" }}
            value={moment(animal.preDoseTime).format("llll")}
            readOnly
          />
        ) : (
          <input
            type="text"
            className="input1"
            style={{ width: "40%" }}
            value={preDoseTime}
            name="preDoseTime"
            onFocus={async () => {
              if (animal.animalStudyStatusId < 2) {
                setPreDoseTime(new Date());
              }
            }}
            onClick={async () => {
              if (animal.animalStudyStatusId < 2) {
                try {
                  const response = await fetch(
                    `https://demo.gharxpert.in/preDose/${animal.id}?studyId=${studyId}`,
                    {
                      method: "PATCH",
                      headers: {
                        "Content-Type": "application/json",
                      },
                      body: JSON.stringify({ preDoseTime: preDoseTime }),
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
            value={moment(animal.doseTime).format("llll")}
            readOnly
          />
        ) : (
          <input
            type="text"
            className="input1"
            style={{ width: "40%" }}
            value={doseTime}
            name="doseTime"
            onFocus={() => {
              if (animal.animalStudyStatusId < 3) {
                setDoseTime(new Date());
              }
            }}
            onClick={async () => {
              if (animal.animalStudyStatusId == 2) {
                try {
                  const response = await fetch(
                    `https://demo.gharxpert.in/dose/${animal.id}?studyId=${studyId}`,
                    {
                      method: "PATCH",
                      headers: {
                        "Content-Type": "application/json",
                      },
                      body: JSON.stringify({ doseTime: doseTime }),
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
                  }

                  toast(res.message);
                } catch (error) {
                  toast(error.message);
                }
              }
            }}
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
                  doseTime={doseTime}
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
  const [timePoint, setTimePoint] = useState(data);
  const [updated, setUpdated] = useState(0);
  useEffect(() => {
    if (updated > 0) {
      fetch(`https://demo.gharxpert.in/timepoint/${timePoint.id}`)
        .then((res) => res.json())
        .then((data) => {
          setTimePoint(data.tp);
        })
        .catch((error) => toast(error.message));
    }
  }, [updated]);
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
          ? moment(timePoint.collectionTime).format("l")
          : moment().add(dInSec, "seconds").format("l")}
      </p>
      <input
        type="text"
        className=""
        readOnly
        defaultValue={timePoint.timepoint}
      />

      {timePoint.collectionTime ? (
        <input value={moment(timePoint.collectionTime).format("LT")} />
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
          value={moment(timePoint.actucalCollectionTime).format("LT")}
        />
      ) : (
        <input
          type="text"
          className=""
          value={act[i]}
          onClick={async () => {
            let currDate = new Date();

            let time = moment(currDate).format("HH:mm");
            setAct([...act, (act[i] = time)]);
            try {
              const response = await fetch(
                `https://demo.gharxpert.in/addAct/${animal.id}`,
                {
                  method: "PATCH",
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
          }}
        />
      )}
    </div>
  );
};
