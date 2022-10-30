import React, { useState, useEffect } from "react";
import Swal from 'sweetalert2';
import withReactContent from 'sweetalert2-react-content';
import { Button, Form } from "react-bootstrap";

export default function AddTopic({chooseMessage}) {
    const [name,setName] = useState('');
    const [imgTopic,setImgTopic] = useState('');
    const [imgLesson,setImgLesson] = useState('');
    const [imgTopicUrl,setImgTopicUrl] = useState('');
    const [imgLessonUrl,setImgLessonUrl] = useState('');
    const MySwal = withReactContent(Swal);

    useEffect(() => {
        let fileReader, isCancel = false;
        if (imgTopic) {
            fileReader = new FileReader();
            fileReader.onload = (e) => {
                const { result } = e.target;
                if (result && !isCancel) {
                    setImgTopicUrl(result)
                }
                }
            fileReader.readAsDataURL(imgTopic);
        }
        if (imgLesson) {
            fileReader = new FileReader();
            fileReader.onload = (e) => {
                const { result } = e.target;
                if (result && !isCancel) {
                    setImgLessonUrl(result)
                }
                }
            fileReader.readAsDataURL(imgLesson);
        }
        return () => {
            isCancel = true;
            if (fileReader && fileReader.readyState === 1) {
                fileReader.abort();
            }
            }
        }, [imgTopic, imgLesson]);

    const handleSubmit = event => {
        event.preventDefault();
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
                chooseMessage();
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
                    {imgTopicUrl ? 
                    (<p className="img-preview-wrapper">
                    {
                        <img src={imgTopicUrl} className = 'imgPreviewTopic' alt="previewTopic" />
                    }
                    </p>) : 
                    (<></>)}
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
                    {imgLessonUrl ? 
                    (<p className="img-preview-wrapper">
                    {
                        <img src={imgLessonUrl} className = 'imgPreviewLesson' alt="previewLesson" />
                    }
                    </p>) : 
                    (<></>)}
                </Form.Group>
                <Button variant="success" type="submit" >
                        Add new Topic
                </Button>
            </Form>
);
}