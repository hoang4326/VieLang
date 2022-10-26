import React, { useState, useEffect } from "react";
import { Form, Button } from "react-bootstrap";
import Swal from 'sweetalert2';
import withReactContent from 'sweetalert2-react-content';

export default function AddVocab(){
    const [topic, setTopic] = useState();
    const [select, setSelect] = useState("");
    const [vocabEng, setVocabEng] = useState("");
    const [vocabVie, setVocabVie] = useState("");
    const MySwal = withReactContent(Swal);

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

    const handleSubmit = event =>{
        event.preventDefault();
        fetch("http://localhost:5000/admin/addVocab",{
        method: "POST",
        crossDomain: true,
        headers: {
            "Content-Type": "application/json",
            Accept: "application/json",
            "Access-Control-Allow-Origin":"*",
        },
        body: JSON.stringify({
            select,
            vocabEng,
            vocabVie
        })
    }).then((res)=> res.json())
    .then((data)=>{
        if(data.status === 'Error'){
            MySwal.fire({
                title: <strong>Try again!</strong>,
                html: <i>Cannot add vocabulary</i>,
                icon: 'warning'
            })
        }else{
            MySwal.fire({
                title: <strong>Success!</strong>,
                html: <i>New vocabulary has been added!</i>,
                icon: 'success'
            })
        }
    });
    setVocabEng("");
    setVocabVie("");
    }
    return (
        <Form onSubmit={handleSubmit} >
            <Form.Group className="mb-4">
                <Form.Label>Select the topic you need to add: </Form.Label>
                <Form.Select aria-label="Default select example" onChange={e => setSelect(e.target.value)} required>
                    <option value=''>Open this select menu</option>
                    {topic?.map((item,index) =>{
                        return (
                            <option value={item.name} key={index}>{item.name}</option>
                        )
                    })}
                </Form.Select>
            </Form.Group>
            <Form.Group className="mb-4">
                <Form.Label>English vocabulary: </Form.Label>
                <Form.Control
                    type="text"
                    placeholder="Enter english vocabulary *"
                    name="vocabEng"
                    value={vocabEng}
                    onChange = { e => setVocabEng(e.target.value)}
                    required
                />
            </Form.Group>
            <Form.Group className="mb-4">
                <Form.Label>Vietnamese vocabulary: </Form.Label>
                <Form.Control
                    type="text"
                    placeholder="Enter vietnamese vocabulary *"
                    name="vocabVie"
                    value={vocabVie}
                    onChange = { e => setVocabVie(e.target.value)}
                    required
                />
            </Form.Group>
            <Button variant="success" type="submit" >
                Add New Vocabulary
            </Button>
        </Form>
    )
}