import React, { useState } from 'react'
import { Button, Form, Modal } from 'react-bootstrap';
import { getEmployeeById, updateEmployee } from '../../services/employeeService';
import { toast } from 'react-toastify';

export default function ModalAdd({ employeeId, updatedEditUser }) {
    const [show, setShow] = useState(false);

    const [name, setName] = useState('')
    const [age, setAge] = useState('')
    const [email, setEmail] = useState('')
    const [gender, setGender] = useState('Male')

    const handleClose = () => setShow(false);
    const handleShow = async () => {
        setShow(true)
        await getDataEmployeeById()
    }

    const getDataEmployeeById = async () => {
        try {
            const res = await getEmployeeById(employeeId)
            setName(res.name);
            setAge(res.age);
            setEmail(res.email);
            setGender(res.gender);
        } catch (error) {
            console.log(error)
        }
    }

    const handleUpdateEmployee = async () => {
        try {
            const res = await updateEmployee(employeeId, name, age, email, gender)
            updatedEditUser(res)
            toast.success('This employee has been updated')
            handleClose()
        } catch (error) {
            console.log(error)
        }

    }

    return (
        <div>
            <Button variant="warning" onClick={handleShow}>
                Edit
            </Button>

            <Modal show={show} onHide={handleClose}>
                <Modal.Header closeButton>
                    <Modal.Title>Modal edit employee</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    <Form>
                        <Form.Group className="mb-3" controlId="formBasicName">
                            <Form.Label>Name</Form.Label>
                            <Form.Control type="text" placeholder="Enter Name" value={name} onChange={(e) => setName(e.target.value)} />
                        </Form.Group>
                        <Form.Group className="mb-3" controlId="formBasicEmail">
                            <Form.Label>Email</Form.Label>
                            <Form.Control type="email" placeholder="Enter email" value={email} onChange={(e) => setEmail(e.target.value)} />
                        </Form.Group>
                        <Form.Group className="mb-3" controlId="formBasicEmail">
                            <Form.Label>Age</Form.Label>
                            <Form.Control type="text" placeholder="Enter Age" value={age} onChange={(e) => setAge(e.target.value)} />
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
                    <Button variant="success" onClick={handleUpdateEmployee}>
                        Update
                    </Button>
                </Modal.Footer>
            </Modal>
        </div>
    )
}
