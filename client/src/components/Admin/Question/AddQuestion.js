import React, { useState, useEffect } from "react";
import { Form, Button } from "react-bootstrap";
import Swal from 'sweetalert2';
import withReactContent from 'sweetalert2-react-content';

export default function AddQuestion(){
    const [dataTopic, setDataTopic] = useState();
    const [dataLesson, setDataLesson] = useState();
    const [topic, setTopic] = useState("");
    const [lesson, setLesson] = useState("");

    const MySwal = withReactContent(Swal);

    useEffect(()=>{
        fetch("http://localhost:5000/admin/topic")
        .then(res => 
            res.json()
        )
        .then((data)=>{
            setDataTopic(data);
        })
        .catch((err) => {
            console.log(err)
        });
    }, [])
    
    const handleChange = (e) =>{
        const { value } = e.target;
        setTopic(value);
        fetch("http://localhost:5000/admin/lessonFindbyTopic",{
                method: "POST",
                crossDomain: true,
                headers: {
                    "Content-Type": "application/json",
                    Accept: "application/json",
                    "Access-Control-Allow-Origin":"*",
                },
                body: JSON.stringify({
                    value
                })
        })
        .then((res)=> res.json())
        .then((data)=>{
            console.log(data);
            setDataLesson(data);
        })
        .catch((err) => {
            console.log(err)
        });
    }
    console.log(dataLesson)
    return (
        <Form  >
            <Form.Group className="mb-4">
                <Form.Label>Select the topic: </Form.Label>
                <Form.Select aria-label="Default select example" onChange={(e) => handleChange(e)} required>
                    <option value=''>Open this select menu</option>
                    {dataTopic?.map((item,index) =>{
                        return (
                            <option value={item.name} key={index}>{item.name}</option>
                        )
                    })}
                </Form.Select>
            </Form.Group>
            <Form.Group className="mb-4">
                <Form.Label>Select the lesson: </Form.Label>
                <Form.Select aria-label="Default select example" onChange={e => setLesson(e.target.value)} required>
                    <option value=''>Open this select menu</option>
                    {dataLesson?.map((item,index) =>{
                        return (
                            <option value={item.id} key={index}>{item.id}</option>
                        )
                    })}
                </Form.Select>
            </Form.Group>
            <Form.Group className="mb-4">
                <Form.Label>Enter question: </Form.Label>
                <Form.Control
                type="text"
                placeholder="Enter question:"
                name="questionText"
                // onChange = { e => setContent1(e.target.value)}
                required
                />
            </Form.Group>
            <Form.Group className="mb-4">
                <Form.Label>Enter Answers: </Form.Label>
                <Form.Control
                type="text"
                placeholder="Enter answer 1:"
                name="questionText"
                // onChange = { e => setContent1(e.target.value)}
                required
                />
                <Form.Control
                type="text"
                placeholder="Enter answer 2:"
                name="questionText"
                // onChange = { e => setContent1(e.target.value)}
                required
                />
                <Form.Control
                type="text"
                placeholder="Enter answer 3:"
                name="questionText"
                // onChange = { e => setContent1(e.target.value)}
                required
                />
                <Form.Control
                type="text"
                placeholder="Enter answer 4:"
                name="questionText"
                // onChange = { e => setContent1(e.target.value)}
                required
                />
            </Form.Group>
            <Button variant="success" type="submit" >
                Add New Vocabulary
            </Button>
        </Form>
    )
}