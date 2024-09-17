import { useState } from "react";
import Table from "../tables/Table"
import "./index.css"
import { Button, Modal } from "react-bootstrap";

export const Roles = () => {
    const [show, setShow] = useState(false);
    
    const handleClose = () => setShow(false);
    const handleShow = () => setShow(true);
    const [inputs,setInputs]=useState({});
    function handleChange(e){
        setInputs(prev=>({...prev,[e.target.name]:e.target.value}));
    }
    const [selectedItems,setSelectedItems]=useState([]); 
    function handleSubmit(e){
        e.preventDefault();
        console.log({...inputs,selectedItems});
        setInputs({});
        setSelectedItems([]);
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
          <Modal.Title>Add A New Role</Modal.Title>
        </Modal.Header>
        <Modal.Body>

            <form action="" className="d-flex flex-column gap-2">
                <label className="bold" htmlFor=""> Enter Role Name</label>
                <input type="text" name="roleName" onChange={handleChange} className="w-100 m-auto p-2" placeholder="Enter Role Name" />
                <label className="bold" htmlFor="">Check Permissions/Rights</label>
                {/* <select className="form-select" onChange={(e)=>{
                    alert(e.target.value)
                    let test=selectedItems.includes(e.target.value)
                    if(!test){
                        setSelectedItems(prev=>[...prev,e.target.value])
                    }
                    
                }} name="" id="">
                    {
                        ["first","second","Third"].map((item,i)=><option key={i} value={item} className="">{item}</option>)
                    }
                </select> */}
                    <div className="d-flex flex-wrap gap-3">

                     {
                         ["first","second","Third","four","five","six","seven"].map((item,i)=><div key={i} className="d-flex gap-1 align-items-center">
                                
                                <input onClick={(e)=>{
                                    if(e.target.checked==true){
                                        setSelectedItems(prev=>[...prev,item])
                                    }else{
                                        let filteredItems=selectedItems.filter((curr)=>curr!==item);
                                        setSelectedItems(filteredItems)
                                    }
                                }}   name={item} type="checkbox"/>
                                <label htmlFor="">{item}</label>
                         </div>)
                    }
                    </div>

                {/* <div className="selectedItems w-100 d-flex">
                    {
                        selectedItems.map((elem,i)=>{
                            return <p key={i}>{elem}</p>
                        })
                    }
                </div> */}
                <label className="bold" htmlFor="">Some Description</label>
               <textarea type="text" rows="5" className="w-100 m-auto p-2" onChange={handleChange} placeholder="enter some description" />
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
