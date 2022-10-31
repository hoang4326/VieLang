import React, { useState, useEffect } from 'react';
import { Form, Button, InputGroup } from "react-bootstrap";
import Swal from 'sweetalert2';
import withReactContent from 'sweetalert2-react-content';

const EditQuestion = ({question, chooseMessage, item}) =>{
    console.log(item)
    const MySwal = withReactContent(Swal);
    const [topic,setTopic] = useState(question.topic);
    const [lesson,setLesson] = useState(question.lesson);
    const [questionText, setQuestionText] = useState(item.questionText);
    const [data,setData] = useState('');
    // const handleChange = (e, i) => {
    //     const { value, name } = e.target;
    //     const newState = [...vocab];
    //     newState[i] = {
    //         ...newState[i],
    //         [name]: value
    //     };
    //     console.log(newState)
    //     setVocab(newState);
    // };

    // useEffect(() => {
    //     let fileReader, isCancel = false;
    //     if (imgTopic) {
    //         fileReader = new FileReader();
    //         fileReader.onload = (e) => {
    //             const { result } = e.target;
    //             if (result && !isCancel) {
    //                 setImgTopicUrl(result)
    //             }
    //             }
    //         fileReader.readAsDataURL(imgTopic);
    //     }
    //     if (imgLesson) {
    //         fileReader = new FileReader();
    //         fileReader.onload = (e) => {
    //             const { result } = e.target;
    //             if (result && !isCancel) {
    //                 setImgLessonUrl(result)
    //             }
    //             }
    //         fileReader.readAsDataURL(imgLesson);
    //     }
    //     return () => {
    //         isCancel = true;
    //         if (fileReader && fileReader.readyState === 1) {
    //             fileReader.abort();
    //         }
    //         }
    //     }, [imgTopic, imgLesson]);

    // const handleSubmit = event =>{
    //     event.preventDefault();
    //         const data = new FormData();
    //         data.append("vocab", JSON.stringify(vocab));
    //         data.append("name", name);
    //         data.append("id", topic._id);
    //         data.append("imgLesson", imgLesson);
    //         data.append("imgTopic", imgTopic);

    //         fetch("http://localhost:5000/admin/updateImg",{
    //             method: "POST",
    //             crossDomain: true,
    //             headers: {
    //                 Accept: "application/json",
    //                 "Access-Control-Allow-Origin":"*",
    //             },
    //             body: data
    //         }).then((res)=> res.json())
    //         .then((data)=>{
    //             if(data.status === 'success'){
    //                 MySwal.fire({
    //                     title: <strong>Success!</strong>,
    //                     html: <i>Update successfully !</i>,
    //                     icon: 'success'
    //                 });
    //                 chooseMessage()
    //             }else{
    //                 MySwal.fire({
    //                     title: <strong>Try again!!</strong>,
    //                     html: <i>Cannot update</i>,
    //                     icon: 'warning'
    //                 })
    //             }
    //         });
    // }
    return(
        <Form className='scroll' >
            <Form.Group className="mb-4">
                <InputGroup  className="mb-3" >
                    <InputGroup.Text>Topic</InputGroup.Text>
                    <Form.Control
                        type="text"
                        name="topic"
                        value={topic}
                        disabled
                        />
                </InputGroup >
            </Form.Group>
            <Form.Group className="mb-4">
                <InputGroup  className="mb-3" >
                    <InputGroup.Text>Lesson</InputGroup.Text>
                    <Form.Control
                        type="text"
                        name="lesson"
                        value={lesson}
                        disabled
                        />
                </InputGroup >
            </Form.Group>
            <Form.Group className="mb-4">
                <Form.Label>Enter question: </Form.Label>
                <Form.Control
                type="text"
                placeholder="Enter question:"
                name="questionText"
                defaultValue={questionText}
                onChange = { (e) => setQuestionText(e.target.value)}
                required
                />
            </Form.Group>
            
            <Button variant="success" type="submit" >
                Save
            </Button>
        </Form>
    )
}

export default  EditQuestion