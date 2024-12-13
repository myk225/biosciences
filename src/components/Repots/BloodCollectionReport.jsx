
import { useEffect, useRef, useState } from "react";

import moment from "moment";
import useFetch from "../../hooks/fetch";
import {  useParams } from "react-router-dom";
import generatePDF, { Resolution, Margin } from 'react-to-pdf';

import { Loader } from "../loaders/Loader";
import { CustomModal } from "../modal/CustomModal";
import { Button, Card, Form } from "react-bootstrap";
import html2canvas from "html2canvas";
import jsPDF from "jspdf";
const options = {
  // default is `save`
  filename: 'page.pdf',
  method: 'open',
  // default is Resolution.MEDIUM = 3, which should be enough, higher values
  // increases the image quality but also the size of the PDF, so be careful
  // using values higher than 10 when having multiple pages generated, it
  // might cause the page to crash or hang.
  resolution: Resolution.LOW,
  page: {
     // margin is in MM, default is Margin.NONE = 0
     margin: Margin.SMALL,
     // default is 'A4'
     format: 'A4',
     // default is 'portrait'
     orientation: 'landscape',
  },
  canvas: {
     // default is 'image/jpeg' for better size performance
     mimeType: 'image/png',
     qualityRatio: 1
  },
  // Customize any value passed to the jsPDF instance and html2canvas
  // function. You probably will not need this and things can break, 
  // so use with caution.
  overrides: {
     // see https://artskydj.github.io/jsPDF/docs/jsPDF.html for more options
     pdf: {
        compress: true
     },
     // see https://html2canvas.hertzen.com/configuration for more options
     canvas: {
        useCORS: true
     }
  },
};

export const BloodCollectionReport = () => {
  const { studyId, peroidId } = useParams();
  const pdfRef=useRef();
  const { data, error, isLoading } = useFetch(
    `https://biobackend.cs-it.in/getStudyData/${studyId}/${peroidId}`
  );
  function generateDownload(){
    alert("sjbdibci")
   
      generatePDF(pdfRef,{filename:"test.pdf"})
  }
  // function handleDownload(){
  //   const element=pdfRef.current;
  //   const originalStyle = element.style.overflow;
  //   element.style.overflow = "visible";
   
   
  //   html2canvas(element).then(canvas => {
  //     const imgData = canvas.toDataURL('image/png');
  //     const imgWidth = 190;
  //     const pageHeight = 290;
  //     const imgHeight = (canvas.height * imgWidth) / canvas.width;
  //     let heightLeft = imgHeight;
  //     const doc = new jsPDF('p', 'mm','a4',false);
  //     let position = 0;
  //     doc.addImage(imgData, 'PNG', 10, 0, imgWidth, imgHeight + 25);
  //     heightLeft -= pageHeight;
  //     while (heightLeft >= 0) {
  //         position = heightLeft - imgHeight;
  //         doc.addPage();
  //         doc.addImage(imgData, 'PNG', 10, position, imgWidth, imgHeight+10);
  //         heightLeft -= pageHeight;
  //     }
  //     doc.save('download.pdf');
  //     // setLoader(false);
  // });
    
  // //   html2canvas(element,{
  // //     scrollX: 0,
  // //     scrollY: -window.scrollY, // Capture the full scrollable content
  // //     useCORS: true,
  // //     windowWidth: element.scrollWidth, // Capture full width
  // //     windowHeight: element.scrollHeight
  // // }).then((canvas)=>{
  // //     const imgData= canvas.toDataURL("image/png");
  // //     const pdf=new jsPDF('p','mm','a4',false);
      
  // //     const pdfWidth=pdf.internal.pageSize.getWidth();
  // //     const pdfHeight=pdf.internal.pageSize.getHeight();
  // //     const imageWidth=canvas.width;
  // //     let imageHeight=canvas.height;
  // //     const ratio=Math.min(pdfWidth/imageWidth,pdfHeight/imageHeight);
  // //     const imgX=(pdfWidth-imageWidth*ratio)/2;
  // //     const imgY=0;
  // //     let position=0;
  // //     while(imageHeight >=0){
        
  // //       pdf.addImage(imgData,"PNG",0,0,imageWidth,210);
  // //       imageHeight=imageHeight-210;
  // //     }
      
  // //     pdf.save(`BloodCollection(${studyId}/${peroidId}).pdf`)
  // //   })
  // }
//   const download = () => {
//     const element=pdfRef.current;
//       const { clientWidth, clientHeight } = element;
//       element.classList.add('element');
   
//       html2canvas(element).then(canvas => {
//           const imgData = canvas.toDataURL('image/png');
//           const pdf = new jsPDF();
//           pdf.addImage(imgData, 'PNG', 0, 0, 210, Math.floor(210 / (clientWidth / clientHeight)));
//           pdf.save('download.pdf');
//           element.classList = '';
//       });
// }
 

  if (isLoading) {
    return <Loader/>;
  }
  if (error) {
    return <div>Error Occured</div>;
  }
  if (data) {
    return (
      <>
      <button className="btn btn-info mb-2" onClick={generateDownload}>
        Download
      </button>
        <div className="Activity3Main h-100 " ref={pdfRef}>
        <div className="infoActivity3">
        <div className="w-100">
        <p className="studyTitle bold">
        
          <span className="bold">Study title : </span> 
            {" "}
             {data.study.studyName}
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
        
          {/* <p className="flexItem">
            <span className="bold">Comment </span> : <button onClick={()=>setShow(true)} className="btn btn-primary">Add</button> / <button  className="btn btn-primary" onClick={()=>{
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
          </p> */}
          {/* <p className="flexitem">
            <span className="bold">
              Centrifugation Window
            </span> :
            <button className="btn btn-info btn-sm"  onClick={()=>navigate(`/centrifugation/${studyId}/${peroidId}`,{state: {previous: window.location.pathname}})}>
              Centrifuge
            </button>
          </p> */}
        </div>  
       
        <div className="Activity3Groups">
          {data.study.groups.map((elem) => {
          
            // toast("sidjijbnbf")
            return <GroupComp group={elem} key={elem.id} />;
          })}
        </div>
       
      </div>
      </>
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

  const [group, setGroup] = useState(currGroup);
 

  const [preDoseTime, setPreDoseTime] = useState(
    animal.preDoseTime
      ? moment(animal.preDoseTime).format("MMMM Do YYYY, h:mm:ss a")
      : ""
  );
  const [infusionStart, setInfusionStart] = useState(null);
  const [infusionEnd, setInfusionEnd] = useState(null);
  const [act, setAct] = useState([]);
 
  
  
  
  return (
    <div className="animal" key={animal?.id}>
      <div className="flex flex-wrap">
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
                NOT ENTERED
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
              NOT ENTERED
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
            : NOT ENTERED
         </p>
        }
       </>
        }
          {
          animal.weight ? (
            <p className="bold">Weight (kg) : {animal.weight}</p>
          ) : (
            <p className="bold">
              Add Animal Weight (kg) :  {" "}
              NOT ENTERED
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
          <span>
            NOT ENTERED
          </span>
        </p>
        }
      </div>
      {/* <div className="flex">
    
      </div> */}
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
                  NOT ENTERED
              </div>
            )}
          </p>
          <p className="flexItem bold">
            Infusion Start :{" "}
            {animal.infusionStart ? (
              <span>{moment(animal.infusionStart).subtract(330,"minutes").format('DD-MM-YYYY HH:mm')}</span>
            ) : (
              <input
                disabled
                type="text"
                name="infusionRate"
                value={infusionStart}
                
                
            
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
              disabled
                type="text"
                name="infusionDuration"
                placeholder="infusion end"
                value={infusionEnd}
                
                
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
           NOT ENTERED
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
            NOT ENTERED
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
          disabled
            type="text"
            className="input1"
            style={{ width: "40%" }}
            value={moment(animal.preDoseTime).format("DD-MM-YYYY HH:mm")}
            readOnly
          />
        ) : (
          <input
          disabled
            type="text"
            className="input1"
            style={{ width: "40%" }}
            value={preDoseTime}
            name="preDoseTime"
            
           
            placeholder="Pre Dose Time"
          />
        )}
        <label className="bold" htmlFor="">
          Dose :
        </label>
        {animal.doseTime ? (
          <input
          disabled
            type="text"
            className="input1"
            style={{ width: "40%" }}
            value={moment(animal.doseTime).format("DD-MM-YYYY HH:mm")}
            readOnly
          />
        ) : (
          <input
            type="text"
            disabled
            className="input1"
            style={{ width: "40%" }}
            value={doseTime}
            name="doseTime"
           
            
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
 
  return (
    <div className="timepoint " style={{ width: "6em" }} key={timePoint}>
      <p className="bold">
        {timePoint.isDtAdded == 1
          ? moment(timePoint.collectionTime).format("DD/MM/YYYY")
          : moment().add(dInSec, "seconds").format("DD/MM/YYYY")}
      </p>
      <input
      disabled
        type="text"
        className=""
        readOnly
        defaultValue={timePoint.timepoint}
      />

      {timePoint.collectionTime ? (
        <input disabled value={moment(timePoint.collectionTime).format("HH:mm")} />
      ) : (
        <input
        disabled
          type="text"
          className=""
          defaultValue={doseTime && dt}
          readOnly
        />
      )}
      {timePoint.isActAdded == 1 ? (
        <input
        disabled
          type="text"
          
          // className={` ${
          //   areDatesEqual(
          //     moment(timePoint.collectionTime).format(),
          //     moment(timePoint.actucalCollectionTime).format()
          //   )
          //     ? "bg-info"
          //     : "bg-danger"
          // } `}
          value={moment(timePoint.actucalCollectionTime).format("HH:mm")}
        />
      ) : (
        <input
        disabled
          type="text"
          className=""
          value={act[i]}
         
        />
      )}
      {timePoint.collectedBy ? (
        <input disabled readOnly value={timePoint.collectedBy} />
      ) : (
        <div className="collectedBy">
          <input disabled type="text" ref={inputRef} className="" />
          
        </div>
      )}
    </div>
  );
};


export default BloodCollectionReport