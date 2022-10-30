import React, { useState, useEffect } from 'react';
import { Form, Button } from "react-bootstrap";
import Swal from 'sweetalert2';
import withReactContent from 'sweetalert2-react-content';

const EditTopic = ({topic, chooseMessage}) =>{
    const MySwal = withReactContent(Swal);
    const [name,setName] = useState(topic.name);
    const [imgTopic,setImgTopic] = useState('');
    const [imgLesson,setImgLesson] = useState('');
    const [imgTopicUrl,setImgTopicUrl] = useState('');
    const [imgLessonUrl,setImgLessonUrl] = useState('');
    const [vocab, setVocab] = useState(topic.vocab);


    const handleChange = (e, i) => {
        const { value, name } = e.target;
        const newState = [...vocab];
        newState[i] = {
            ...newState[i],
            [name]: value
        };
        setVocab(newState);
    };

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

    const handleSubmit = event =>{
        event.preventDefault();
            const data = new FormData();
            data.append("vocab", JSON.stringify(vocab));
            data.append("name", name);
            data.append("id", topic._id);
            data.append("imgLesson", imgLesson);
            data.append("imgTopic", imgTopic);

            fetch("http://localhost:5000/admin/updateImg",{
                method: "POST",
                crossDomain: true,
                headers: {
                    Accept: "application/json",
                    "Access-Control-Allow-Origin":"*",
                },
                body: data
            }).then((res)=> res.json())
            .then((data)=>{
                if(data.status === 'success'){
                    MySwal.fire({
                        title: <strong>Success!</strong>,
                        html: <i>Update successfully !</i>,
                        icon: 'success'
                    });
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

    const handleDelete = (name, id) =>{
        fetch("http://localhost:5000/admin/deleteVocabulary",{
            method: "POST",
            crossDomain: true,
            headers: {
                "Content-Type": "application/json",
                Accept: "application/json",
                "Access-Control-Allow-Origin":"*",
            },
            body: JSON.stringify({
                name, id
            }),
        }).then((res)=> res.json())
        .then((data)=>{
            if(data.status === 'success'){
                MySwal.fire({
                    title: <strong>Success!</strong>,
                    html: <i>Delete vocabulary successfully !</i>,
                    icon: 'success'
                });
                chooseMessage()
            }else{
                MySwal.fire({
                    title: <strong>Try again!!</strong>,
                    html: <i>Cannot delete</i>,
                    icon: 'warning'
                })
            }
        });
    }
    return(
        <Form className='scroll' onSubmit={handleSubmit}>
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
                    }} 
                />
                {imgTopicUrl ? 
                    (<p className="img-preview-wrapper">
                    {
                        <img src={imgTopicUrl} className = 'imgPreviewTopic' alt="previewTopic" />
                    }
                    </p>) : 
                    (<img src={topic.topicImg?.map(item => item.urlImage)} className = 'imgPreviewTopic'  alt="topicImg" />)}
            </Form.Group>
            <Form.Group className="mb-4">
                <Form.Label>Lesson Image: </Form.Label>
                <Form.Control
                    type='file' accept=".png, .jpeg, .jpg" onChange={event =>{
                        const file = event.target.files[0];
                        setImgLesson(file)
                    }}
                />
                {imgLessonUrl ? 
                    (<p className="img-preview-wrapper">
                    {
                        <img src={imgLessonUrl} className = 'imgPreviewLesson' alt="previewLesson" />
                    }
                    </p>) : 
                    (<img src={topic.lessonImg?.map(item => item.urlImage)} className = 'imgPreviewLesson' alt="lessonImg" />)}
            </Form.Group>
            {topic.vocab?.map?.(({vocabEng, vocabVie},index) =>{
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
                                name="vocabEng"
                                defaultValue={vocabEng}
                                onChange = {(e) => handleChange(e, index)}
                                required
                            />                        
                            <span className="input-group-text">Vietnamese</span>
                            {/* <Form.Label>Vietnamese vocabulary:</Form.Label> */}
                            <Form.Control
                            className="form-control"
                                type="text"
                                placeholder="Enter topic name *"
                                name="vocabVie"
                                defaultValue={vocabVie}
                                onChange = {(e) => handleChange(e, index)}
                                required
                            />
                            <button onClick={() => handleDelete(topic.name, index)} type="button" className="btn btn-danger input-group-text">X</button>

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