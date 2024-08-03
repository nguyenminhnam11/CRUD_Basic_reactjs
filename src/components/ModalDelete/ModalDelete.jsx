import React, { useState } from 'react'
import { Button, Modal } from 'react-bootstrap'
import { removeEmployee } from '../../services/employeeService';
import { toast } from 'react-toastify';

export default function ModalDelete({ employee, onRemove }) {
    const [show, setShow] = useState(false);

    const handleClose = () => setShow(false);
    const handleShow = () => setShow(true);

    const handleRemove = async () => {
        try {
            toast.success(`${employee.name} has been deleted`)
            handleClose()
            onRemove(employee.id)
            await removeEmployee(employee.id)
            
        } catch (error) {
            console.error(error);
        }
    }
    return (
        <div>
            <Button variant="danger" onClick={handleShow}>
                Delete
            </Button>

            <Modal show={show} onHide={handleClose}>
                <Modal.Header closeButton>
                    <Modal.Title>Modal delete employee</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    Are you sure delete employee <b>{employee.name}</b> ?
                </Modal.Body>
                <Modal.Footer>
                    <Button variant="secondary" onClick={handleClose}>
                        Close
                    </Button>
                    <Button variant="danger" onClick={handleRemove}>
                        Delete
                    </Button>
                </Modal.Footer>
            </Modal>
        </div>
    )
}
