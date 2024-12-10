import { Button, Modal } from "react-bootstrap"

export const CustomModal = ({show,setShow,children,title}) => {
    const handleClose = () => setShow(false);
    // const handleShow = () => setShow(true);
  return (
    <Modal show={show} onHide={handleClose} >
        
          <Modal.Header closeButton>
          <Modal.Title>{title}</Modal.Title>
        </Modal.Header>
        <Modal.Body>
            {children}
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={handleClose}>
            Close
          </Button>
          {/* <Button variant="primary" onClick={handleClose}>
            Save Changes
          </Button> */}
        </Modal.Footer>
    </Modal>
  )
}
