import React, { useState } from "react";
import { Form, Button } from "react-bootstrap"

export default function AddVocab(){
    const [topic, setTopic] = useState();
    fetch('http://localhost:5000/admin/topic')
        .then(res => 
            res.json()
        )
        .then((data)=>{
            setTopic(data);
        })
        .catch((err) => {
            console.log(err)
        });
    

    const handleSubmit = () =>{

    }
    return (
        <Form onSubmit={handleSubmit}>
                        <Form.Group className="mb-4">
                            <Form.Label>Select the topic you need to add: </Form.Label>
                            <Form.Select aria-label="Default select example">
                                <option>Open this select menu</option>
                                {topic?.map((item,index) =>{
                                    return (
                                        <option value={item.name}>{item.name}</option>
                                    )
                                })}
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
    )
}