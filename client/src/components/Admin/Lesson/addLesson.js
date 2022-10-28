import React, { useState, useEffect } from "react";
import { Form, Button } from "react-bootstrap";
import Swal from 'sweetalert2';
import withReactContent from 'sweetalert2-react-content';

export default function AddLesson() {
    const [name,setName] = useState('');
    const [content1,setContent1] = useState('');
    const [content2,setContent2] = useState('');
    const [topic, setTopic] = useState('');
    const MySwal = withReactContent(Swal);

    const handleSubmit = event => {
        event.preventDefault();
        fetch("http://localhost:5000/admin/addLesson",{
            method: "POST",
            crossDomain: true,
            headers: {
                "Content-Type": "application/json",
                Accept: "application/json",
                "Access-Control-Allow-Origin":"*",
            },
            body: JSON.stringify({
                name: name,
                content1: content1,
                content2: content2
            })
        }).then((res)=> res.json())
        .then((data)=>{
            if(data.status === 'Error'){
                MySwal.fire({
                    title: <strong>Try again!</strong>,
                    html: <i>Cannot add lesson</i>,
                    icon: 'warning'
                })
            }else{
                MySwal.fire({
                    title: <strong>Success!</strong>,
                    html: <i>New lesson has been added!</i>,
                    icon: 'success'
                })
                setContent1('');
                setContent2('');
            }
        });
    }
    useEffect(()=>{
        fetch("http://localhost:5000/admin/topic")
        .then(res => 
            res.json()
        )
        .then((data)=>{
            setTopic(data);
        })
        .catch((err) => {
            console.log(err)
        });
    }, [])
    

    return (
        <Form onSubmit={handleSubmit} >
        <Form.Group className="mb-4">
            <Form.Label>Select the topic you need to add: </Form.Label>
            <Form.Select aria-label="Default select example" onChange={e => setName(e.target.value)} required>
                <option value=''>Open this select menu</option>
                {topic?.map?.((item,index) =>{
                    return (
                        <option value={item.name} key={index}>{item.name}</option>
                    )
                })}
            </Form.Select>
        </Form.Group>
        <Form.Group className="mb-4">
            <Form.Label>Content 1: </Form.Label>
            <Form.Control
                type="text"
                placeholder="Enter content 1:"
                name="content1"
                value ={content1}
                onChange = { e => setContent1(e.target.value)}
                required
            />
        </Form.Group>
        <Form.Group className="mb-4">
            <Form.Label>Content 2: </Form.Label>
            <Form.Control
                type="text"
                placeholder="Enter content 2: *"
                name="content2"
                value ={content2}
                onChange = { e => setContent2(e.target.value)}
                required
            />
        </Form.Group>
        <Button variant="success" type="submit" >
            Add New Lesson
        </Button>
    </Form>
);
}