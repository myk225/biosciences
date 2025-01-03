import { useState } from "react";
import { useDispatch, useSelector } from "react-redux"
import { setStep } from "../../store/slices/studySlice";
import { toast } from "react-toastify";
import { peroidDetailsValid } from "../../zod/stepperValidations";
import { BackdropLoader } from "../loaders/BackdropLoader";

const Peroids = ({studyId , setFormLoader,formLoader}) => {
  const {peroids}=useSelector(state=>state.study);
  const dispatch=useDispatch();
  
  let myPeroidIDs=peroids.map((elem)=>{
    return {id:elem.id};
}); 
const [peroidData,setPeroidData]=useState([...myPeroidIDs]);
if(formLoader){
  return <BackdropLoader/>
}
  return (
    <div className="peroids container">
          {
            peroids.map((item)=>{
              return <PeroidItem key={item.id} peroid={item} peroidData={peroidData} setPeroidData={setPeroidData}/>
            })
          }
          <button className="btn btn-success" onClick={()=>{
            console.log(peroidData);

            try {
              
              peroidDetailsValid.parse(peroidData)
              setFormLoader(true);
              fetch(`${import.meta.env.VITE_API_URL}/api/addPeroidData/${studyId}`,{
                method:"PUT",
                credentials: 'include',
                headers:{
                  'Content-Type' : 'application/json'
                },
                body:JSON.stringify({peroidData})
              })
              .then((res)=>res.json())
              .then((data)=>{
                if(data.success){
                  dispatch(setStep(3));
                }
                toast(data.message)
            })
              .catch((err)=>toast(err.message));
            } catch (error) {
              toast.error(error.errors[0].message) 
            }finally{
              setFormLoader(false);
            }
            
          }} type="button">save</button>
    </div>
  )
}

const PeroidItem=({peroid,peroidData,setPeroidData})=>{
        const [data,setData]=useState({id:peroid.id});
        function handleChange(e){
          let updatedData={...data,[e.target.name] : e.target.value};
              setData(updatedData);
          let updatedPeroidData=peroidData.map((elem)=>{
                if(elem.id==peroid.id){
                  return updatedData;
                }
                return elem;
          })
          setPeroidData(updatedPeroidData);
        }


      return <div className="border p-3 mb-2">
            {
              <div className="d-flex gap-1 ">
                <div className=" mx-3 w-50 mx-3">
               <label  className="form-label">Peroid Number</label>
              <input type="text" className="form-control" name="peroidName" placeholder="Peroid Number" onChange={(e)=>handleChange(e)} />
              </div>
              <div className="flex-2 mx-3 w-50 mx-3">
               <label  className="form-label">Peroid Start Date</label>
              <input type="date" className="form-control" name="peroidStart" onChange={(e)=>handleChange(e)} />
              </div>
              </div>
            }
           </div>
}

export default Peroids