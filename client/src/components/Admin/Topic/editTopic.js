import React, { useState } from 'react';
import { Form, Button } from "react-bootstrap";

const EditTopic = ({topic}) =>{
    const [name,setName] = useState('');
    const [imgTopic,setImgTopic] = useState('');
    const [imgLesson,setImgLesson] = useState('');

    
    // useEffect(()=>{
    //     topic.lessonImg?.map?.(item=>
    //         (
    //             setImgTopic("C:\Fakepath\ " + item.originalname)
    //         )
    //         )
        
    // }, [])
    return(
        <Form className='scroll'>
            <Form.Group className="mb-4">
                <Form.Label>Topic name: </Form.Label>
                <Form.Control
                    type="text"
                    placeholder="Enter topic name *"
                    name="topic name"
                    defaultValue={topic.name}
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
                    }} required
                />
            </Form.Group>
            <Form.Group className="mb-4">
                <Form.Label>Lesson Image: </Form.Label>
                <Form.Control
                    type='file' accept=".png, .jpeg, .jpg" onChange={event =>{
                        const file = event.target.files[0];
                        setImgLesson(file)
                    }} required
                />
            </Form.Group>
            {topic.vocab?.map?.((item,index) =>{
                return (
                    <Form.Group className="mb-4" key={index}>
                    <Form.Label>Enter vocabulary {index +1} :</Form.Label>
                    <Form.Group className="input-group" >
                        {/* <Form.Label>English vocabulary:</Form.Label> */}
                        <span className="input-group-text">English</span>
                        <Form.Control
                        className="form-control"
                            type="text"
                            placeholder="Enter topic name *"
                            name="topic name"
                            defaultValue={item.vocabEng}
                            onChange = {event => setName(event.target.value)}
                            required
                        />
                    
                        <span className="input-group-text">Vietnamese</span>

                        {/* <Form.Label>Vietnamese vocabulary:</Form.Label> */}
                        <Form.Control
                        className="form-control"
                            type="text"
                            placeholder="Enter topic name *"
                            name="topic name"
                            defaultValue={item.vocabVie}
                            onChange = {event => setName(event.target.value)}
                            required
                        />
                        <button type="button" class="btn btn-danger input-group-text">X</button>

                    </Form.Group>
                    </Form.Group>
                )
            })}
            <Button variant="success" type="submit" >
                Save
            </Button>
        </Form>
    )
}

export default  EditTopic