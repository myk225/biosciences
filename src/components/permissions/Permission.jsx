import { useState } from "react";
import Table from "../tables/Table"
import "./index.css"
import { Button, Modal } from "react-bootstrap";

export const Permission = () => {
    const [show, setShow] = useState(false);
    
    const handleClose = () => setShow(false);
    const handleShow = () => setShow(true);
    const [inputs,setInputs]=useState({});
  return (
    <div className="mainTableContainer">
        <div className="action">
            <h2>Permissions</h2>
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
          <Modal.Title>Add A New Permission</Modal.Title>
        </Modal.Header>
        <Modal.Body>

            <form action="" className="d-flex flex-column gap-2">
                <label className="bold" htmlFor=""> Enter Permission Name</label>
                <input type="text" className="w-100 m-auto p-2" placeholder="Enter Permission Name" />
                <label className="bold" htmlFor="">Some Description</label>
               <textarea type="text" rows="5" className="w-100 m-auto p-2" placeholder="enter some description" />
            </form>


        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={handleClose}>
            Close
          </Button>
          <Button variant="primary" onClick={handleClose}>
            Save Changes
          </Button>
        </Modal.Footer>
      </Modal>
    </div>
  )
}
