import { useEffect, useState } from "react"
import { Button, Form } from "react-bootstrap";
import useFetch from "../../hooks/fetch";
import StudyNumberDT from "./StudyNumberDT";



const StudyNumberAssigned = () => {
    const [inputs,setInputs]=useState({});
    const [reload,setReload]=useState(0);
    // const []=useState([])
    function handleChange(e){
        setInputs({...inputs,[e.target.name] : e.target.value})
    }
    const {data,error,isLoading}=useFetch(`https://biobackend.cs-it.in/auth/v1/getUsers2`);
    console.log(data)
    // useEffect(()=>{
    //     fetch(`https://biobackend.cs-it.in/getUsers2`,{
    //         method : "GET"
    //     })
    // },[])

    function handleSubmit(e){
        e.preventDefault();
        console.log(inputs)
        fetch(`https://biobackend.cs-it.in/assignStudy`,{
            method: "POST",
            headers : {
                "Content-Type" : "application/json"
            },
            body : JSON.stringify({...inputs})
        }).then((response)=>response.json())
        .then((data)=>{
           alert(data.message)
           setReload(prev=>prev+1);
        })
        }

    if(isLoading){
        return <p>loading...</p>
    }

    if(error){
        return <p>Error ...</p>
    }
  
    if(data){
        return (
            <div className=" ">
                 <Form>
              <Form.Group className="mb-3" controlId="exampleForm.ControlInput1">
                <Form.Label>Study Number </Form.Label>
                <Form.Control type="text" name="studyNumber"  onChange={handleChange} placeholder="8987990 / A90289089" />
              </Form.Group>
              <Form.Group className="mb-3" controlId="exampleForm.ControlTextarea1">
                <Form.Label>Study Phase</Form.Label>
                <Form.Control type="text" name="studyPhase" onChange={handleChange}  placeholder="Phase 1 / 0001" />
              </Form.Group>
              <Form.Group  className="mb-3" controlId="exampleForm.ControlTextarea">
              <Form.Label>Select A User</Form.Label>
                 <Form.Select aria-label="Default select example" name="userId" onChange={handleChange}>
              <option>Open this select menu</option>
              {
                data?.users.map((user)=>{
                    
                    return <option key={user.userId} value={user.userId}>{user.firstname} ({user.email})</option>
                })
              }
            
            </Form.Select>
              </Form.Group>
                <Button onClick={handleSubmit}>
                CLick
                </Button>
               </Form>

           <div className="mt-2">
           <StudyNumberDT reload={reload}/>
           </div>
            </div>
          )
    }
}

export default StudyNumberAssigned