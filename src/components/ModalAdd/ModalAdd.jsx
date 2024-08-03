import React, { useState } from 'react'
import { Button, Form, Modal } from 'react-bootstrap';
import { createNewEmployee } from '../../services/employeeService';
import { toast } from 'react-toastify';

export default function ModalAdd({ addEmployeeToList }) {
    const [show, setShow] = useState(false);
    const [name, setName] = useState('')
    const [age, setAge] = useState('')
    const [email, setEmail] = useState('')
    const [gender, setGender] = useState('Male')

    const handleClose = () => setShow(false);
    const handleShow = () => setShow(true);

    const addNewEmployee = async () => {
        if (name === '' || age === '' || email === '') {
            alert('You cannot leave any field blank')
        } else {
            try {
                const res = await createNewEmployee(name, age, email, gender)
                if (res && res.id) {
                    toast.success('A new employee has been added')
                    handleClose()
                    addEmployeeToList(res)
                    setName('')
                    setEmail('')
                    setAge('')
                    setGender('Male')
                }
            } catch (error) {
                console.log(error)
            }
        }
    }

    return (
        <div>
            <Button variant="primary" onClick={handleShow}>
                Add new a employee
            </Button>

            <Modal show={show} onHide={handleClose}>
                <Modal.Header closeButton>
                    <Modal.Title>Modal create a employee</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    <Form>
                        <Form.Group className="mb-3" controlId="formBasicName">
                            <Form.Label>Name</Form.Label>
                            <Form.Control required type="text" placeholder="Enter Name" value={name} onChange={(e) => setName(e.target.value)} />
                        </Form.Group>
                        <Form.Group className="mb-3" controlId="formBasicEmail" >
                            <Form.Label>Email</Form.Label>
                            <Form.Control required type="email" placeholder="Enter email" value={email} onChange={(e) => setEmail(e.target.value)} />
                        </Form.Group>
                        <Form.Group className="mb-3" controlId="formBasicEmail">
                            <Form.Label>Age</Form.Label>
                            <Form.Control required type="number" placeholder="Enter Age" value={age} onChange={(e) => setAge(e.target.value)} />
                        </Form.Group>
                        <Form.Group className="mb-3">
                            <Form.Label>Gender</Form.Label>
                            <Form.Select
                                value={gender}
                                onChange={(e) => setGender(e.target.value)}
                            >
                                <option>Male</option>
                                <option>Female</option>
                                <option>Other</option>
                            </Form.Select>
                        </Form.Group>
                    </Form>
                </Modal.Body>
                <Modal.Footer>
                    <Button variant="secondary" onClick={handleClose}>
                        Close
                    </Button>
                    <Button variant="success" onClick={addNewEmployee}>
                        Add
                    </Button>
                </Modal.Footer>
            </Modal>
        </div>
    )
}
