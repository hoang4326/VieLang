import React, { useState } from "react";
import Swal from 'sweetalert2';
import withReactContent from 'sweetalert2-react-content';
import { Button, Form } from "react-bootstrap";

export default function AddTopic() {
    const [name,setName] = useState('');
    const [imgTopic,setImgTopic] = useState('');
    const [imgLesson,setImgLesson] = useState('');
    const MySwal = withReactContent(Swal);

    const handleSubmit = event => {
        event.preventDefault();
        console.log(imgTopic);
        const data = new FormData();
        data.append("imgTopic", imgTopic);
        data.append("imgLesson", imgLesson);
        data.append("name", name);
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
        <Form className='scroll' onSubmit={handleSubmit}>
                <Form.Group className="mb-4">
                    <Form.Label>Topic name: </Form.Label>
                    <Form.Control
                        type="text"
                        placeholder="Enter topic name *"
                        name="topic name"
                        onChange = {event => setName(event.target.value)}
                        required
                    />
                </Form.Group>
                <Form.Group className="mb-4">
                    <Form.Label>Topic Image: </Form.Label>
                    <Form.Control
                        type='file' accept=".png, .jpeg, .jpg"  onChange={event =>{
                            const file = event.target.files[0];
                            setImgTopic(file)
                        }} 
                        required
                    />
                </Form.Group>
                <Form.Group className="mb-4">
                    <Form.Label>Lesson Image: </Form.Label>
                    <Form.Control
                        type='file' accept=".png, .jpeg, .jpg" onChange={event =>{
                            const file = event.target.files[0];
                            setImgLesson(file)
                        }} 
                        required
                    />
                </Form.Group>
                <Button variant="success" type="submit" >
                        Add new Topic
                </Button>
            </Form>
);
}