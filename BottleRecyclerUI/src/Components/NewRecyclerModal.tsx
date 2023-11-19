import React, {useRef, useState} from "react";
import {Modal, Button} from 'react-bootstrap';

const NewRecyclerModal: React.FC = () => {
    const [statusMessage, setstatusMessage] = useState("");
    const [show, setShow] = useState(false);
    const newName = useRef();

    const handleClose = () => setShow(false);
    const handleShow = () => {
        setShow(true);
        setstatusMessage("");
    };

    const handleSave = () => {

        if (newName.current == null ||
            newName.current == undefined ||
            newName.current.value == null ||
            newName.current.value.trim().length === 0) {
            setstatusMessage("Unable to create recycler, please provide a name");
        } else {
            setstatusMessage("Creating recycled with the name " + newName.current.value);
            handleClose();
        }
    }

    return (
        <>
            <Button className="btn btn-primary col-1" variant="primary" onClick={handleShow}
                    title="Create new recycler">
                <i className="bi bi-plus-square-fill"></i>
            </Button>

            <Modal show={show} onHide={handleClose}>
                <Modal.Header closeButton>
                    <Modal.Title>New recycler</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    <label htmlFor="recyclerName" className="form-label">Name</label>
                    <input type="text" className="form-control" id="recyclerName" ref={newName}
                           placeholder="Recycler name"/>
                    <div>{statusMessage}</div>
                </Modal.Body>
                <Modal.Footer>
                    <button type="button" className="btn btn-primary" onClick={() => handleSave()}>Save</button>
                    <Button variant="secondary" onClick={handleClose}>
                        Close
                    </Button>
                </Modal.Footer>
            </Modal>
        </>
    );
}
export default NewRecyclerModal;