import React, { useState } from "react";
import Swal from 'sweetalert2';
import withReactContent from 'sweetalert2-react-content';
import { Form, Button } from "react-bootstrap"
import Modal from 'react-bootstrap/Modal';

export default function AddTopic() {
    const [name,setName] = useState('');
    const [imgTopic,setImgTopic] = useState('');
    const [imgLesson,setImgLesson] = useState('');
    const MySwal = withReactContent(Swal);
    const [show, setShow] = useState(false);
    
    const handleClose = () => setShow(false);
    const handleShow = () => setShow(true);

    const handleSubmit = event => {
        event.preventDefault();
        const data = new FormData();
        data.append("imgTopic", imgTopic);
        data.append("imgLesson", imgLesson);

        data.append("name", name);
        console.log(data);
        fetch("http://localhost:5000/admin/addTopic",{
            method: "POST",
            crossDomain: true,
            headers: {
                Accept: "application/json",
                "Access-Control-Allow-Origin":"*",
            },
            body: data
        })
        .then((res)=> res.json())
        .then((data)=>{
            if(data.status === 'Topic exits'){
                MySwal.fire({
                    title: <strong>Try again!</strong>,
                    html: <i>Your topic already exists !</i>,
                    icon: 'warning'
                })
            }else{
                MySwal.fire({
                    title: <strong>Success!</strong>,
                    html: <i>Add topic successfully!</i>,
                    icon: 'success'
                })
            } 
        });
    }
    

    return (
    <div className="SignupForm">
        <Button variant="primary" onClick={handleShow}>
                Add vocabulary
        </Button>
            <Modal show={show} onHide={handleClose}>
                <Modal.Header closeButton>
                <Modal.Title>Add Vocabulary</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    <Form onSubmit={handleSubmit}>
                        <Form.Group className="mb-4">
                            <Form.Label>Select the topic you need to add: </Form.Label>
                            <Form.Select aria-label="Default select example">
                                <option>Open this select menu</option>
                                <option value="1">One</option>
                                <option value="2">Two</option>
                                <option value="3">Three</option>
                            </Form.Select>
                        </Form.Group>
                        <Form.Group className="mb-4">
                            <Form.Label>English vocabulary: </Form.Label>
                            <Form.Control
                                type="text"
                                placeholder="Enter english vocabulary *"
                                name="name"
                                // value={name}
                                // onChange = { (e) => onInputChange(e)}
                                required
                            />
                        </Form.Group>
                        <Form.Group className="mb-4">
                            <Form.Label>Vietnamese vocabulary: </Form.Label>
                            <Form.Control
                                type="email"
                                placeholder="Enter vietnamese vocabulary *"
                                name="email"
                                // value={email}
                                // onChange = { (e) => onInputChange(e)}
                                required
                            />
                        </Form.Group>
                        <Button variant="success" type="submit" >
                            Add New Vocabulary
                        </Button>
                    </Form>
                </Modal.Body>
                <Modal.Footer>
                </Modal.Footer>
            </Modal>
        <form className="signup" onSubmit={handleSubmit}>
            <h1 className="signIn">Add Topic</h1>
            <br />
            <label htmlFor="name" className="name">Name topic:</label>
            <input 
                type="text"
                // name="name"
                className="signup"
                id="name"
                placeholder="Your name"
                onChange= {event => setName(event.target.value)}
                required='required'/>
            <label htmlFor="name" className="name">Select image of Topic:</label>
            <input type='file' className="signup" accept=".png" onChange={event =>{
                const file = event.target.files[0];
                setImgTopic(file)
            }}></input>

            <label htmlFor="name" className="name">Select image of Lesson:</label>
            <input type='file' className="signup" accept=".png" onChange={event =>{
                const file = event.target.files[0];
                setImgLesson(file)
            }}></input>

            <button type="submit" className="btn btn-primary" >Submit</button>
        </form>
    </div>
);
}