import { useState } from "react";
import Table from "../tables/Table"
import "./index.css"
import { Button, Modal } from "react-bootstrap";
import { FaEye, FaEyeSlash } from "react-icons/fa";
export const Users = () => {
    const [show, setShow] = useState(false);
    const [eye,setEye]=useState(false);
    const handleClose = () => setShow(false);
    const handleShow = () => setShow(true);
    const [inputs,setInputs]=useState({});
    function handleChange(e){
        setInputs(prev=>({...prev,[e.target.name]:e.target.value}));
    }
  
    function handleSubmit(e){
        e.preventDefault();
        console.log({...inputs});
        setInputs({});
        handleClose();
    }
  return (
    <div className="mainTableContainer">
        <div className="action">
            <h2>User Roles</h2>
            <div className="d-flex gap-2 align-items-center">
            <div className="paginate">
                <button>prev</button>
                <button className="bg-info">9</button>
                <button>next</button>
             </div>
            <button onClick={handleShow}>Add</button>
            </div>
           
        </div>
            <div className="w-100">
            <Table/>
            </div>
        <Modal show={show} size="md" centered onHide={handleClose}>
        <Modal.Header closeButton>
          <Modal.Title>Add A New User</Modal.Title>
        </Modal.Header>
        <Modal.Body>

            <form action="" className="d-flex flex-column gap-2">
                <label className="bold" htmlFor=""> Enter Firstname</label>
                <input type="text" name="firstname" onChange={handleChange} className="w-100 m-auto p-2" placeholder="Enter Firstname" />
                <label className="bold" htmlFor=""> Enter Lastname</label>
                <input type="text" name="lastname" onChange={handleChange} className="w-100 m-auto p-2" placeholder="Enter Lastname" />
                <label className="bold" htmlFor=""> Enter Email</label>
                <input type="text" name="email" onChange={handleChange} className="w-100 m-auto p-2" placeholder="Enter Email" />
                <label className="bold" htmlFor="">Enter Password</label>
                <div className="passwordMain">
                <input type={eye ? "text" : "password"} name="password" onChange={handleChange} className="w-100 m-auto p-2" placeholder="Enter Password" />
                    <div className="eye"  onClick={()=>setEye(!eye)}>
                    {
                    eye ?  <FaEyeSlash/> :    <FaEye />
                }
                    </div>
                </div>
                <label className="bold" htmlFor="">Check Role For This User</label>
                
                    <div className="d-flex flex-wrap gap-3">

                     {
                         ["first","second","Third","four","five","six","seven"].map((item,i)=><div key={i} className="d-flex gap-1 align-items-center">
                                
                                <input onChange={handleChange} name="roleName" value={item} type="radio"/>
                                <label>{item}</label>
                         </div>)
                    }
                    </div>

                <label className="bold" htmlFor="">Some Description</label>
         
            </form>


        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={handleClose}>
            Close
          </Button>
          <Button variant="primary"  onClick={handleSubmit}>
            Save Changes
          </Button>
        </Modal.Footer>
      </Modal>
    </div>
  )
}
