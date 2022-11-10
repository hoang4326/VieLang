import React, { useState } from 'react';
import { Form, Button } from "react-bootstrap";
import Swal from 'sweetalert2';
import withReactContent from 'sweetalert2-react-content';

const EditTopic = ({lesson, chooseMessage}) =>{
    const MySwal = withReactContent(Swal);
    // const [topic,setTopic] = useState(lesson.topic);
    const [content1,setContent1] = useState(lesson.content1);
    const [content2,setContent2] = useState(lesson.content2);
    // const [data, setData] = useState();

    const handleSubmit = event =>{
        event.preventDefault();
        fetch("http://localhost:5000/admin/updateLesson",{
            method: "POST",
            crossDomain: true,
            headers: {
                'Content-Type': 'application/json',
                Accept: "application/json",
                "Access-Control-Allow-Origin":"*",
            },
            body: JSON.stringify({
                content1: content1,
                content2: content2,
                id: lesson._id
            }),
        }).then((res)=> res.json())
        .then((data)=>{
            if(data.status === 'success'){
                MySwal.fire({
                    title: <strong>Success!</strong>,
                    html: <i>Update successfully !</i>,
                    icon: 'success'
                })
                chooseMessage()
            }else{
                MySwal.fire({
                    title: <strong>Try again!!</strong>,
                    html: <i>Cannot update</i>,
                    icon: 'warning'
                })
            }
        });
        
    }
    // useEffect(()=>{
    //     fetch("http://localhost:5000/admin/topic")
    //     .then(res => 
    //         res.json()
    //     )
    //     .then((data)=>{
    //         const topicNew = data.filter(e => e.name !== lesson.topic);
    //         setData(topicNew);
    //     })
    //     .catch((err) => {
    //         console.log(err)    
    //     });
    // }, [lesson.topic])
    return(
        <Form onSubmit={handleSubmit}>
            <Form.Group className="mb-4">
                <Form.Label>Topic of lesson: </Form.Label>
                    <Form.Select aria-label="Default select example"  
                    // onChange={e => setTopic(e.target.value)}
                    disabled>
                        <option value={lesson.topic} >{lesson.topic}</option>
                        {/* <option value=''>Open this select menu</option> */}
                        {/* {data?.map?.((item,index) =>{
                            return (
                                <option value={item.name} key={index}>{item.name}</option>
                            )
                        })} */}
                    </Form.Select>
            </Form.Group>
            <Form.Group className="mb-4">
                <Form.Label>Content 1: </Form.Label>
                <Form.Control
                    type="text"
                    placeholder="Enter content 1:"
                    name="topic name"
                    defaultValue={content1}
                    onChange = {event => setContent1(event.target.value)}
                    required
                />
            </Form.Group>
            <Form.Group className="mb-4">
                <Form.Label>Content 2: </Form.Label>
                <Form.Control
                    type="text"
                    placeholder="Enter content 2:"
                    name="topic name"
                    defaultValue={content2}
                    onChange = {event => setContent2(event.target.value)}
                    required
                />
            </Form.Group>
            
            <Button variant="success" type="submit" >
                Save
            </Button>
        </Form>
    )
}

export default  EditTopic