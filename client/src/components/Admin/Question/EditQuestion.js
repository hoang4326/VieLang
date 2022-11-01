import React, { useState, useEffect } from 'react';
import { Form, Button, InputGroup } from "react-bootstrap";
import Swal from 'sweetalert2';
import withReactContent from 'sweetalert2-react-content';

const EditQuestion = ({question, chooseMessage, item}) =>{
    const MySwal = withReactContent(Swal);
    const [topic,setTopic] = useState(question.topic);
    const [lesson,setLesson] = useState(question.lesson);
    const [type,setType] = useState(item.type);
    const [checked,setChecked] = useState(false);
    const [questionText, setQuestionText] = useState(item.questionText);
    const [answerOptions, setAnswerOptions] = useState(item.answerOptions);
    const [checkBox, setCheckBox] = useState(answerOptions?.map(a => a.isCorrect));
    
    const checkBoxValue = (index) =>{
        return checkBox[index]
    } 

    const handleChangeValue = (e, i) => {
        const { value, name, checked } = e.target;
        const file = e.target.files;
        const newState = [...answerOptions];
        if(name === "answerText"){
            newState[i] = {
                ...newState[i],
                [name]: value
            };
        }else if (name === "isCorrect") {
            newState[i] = {
                ...newState[i],
                [name]: checked
            };
        }else{
            newState[i] = {
                ...newState[i],
                [name]: file[0]
            };
            setChecked(true);
        }
        console.log(newState)
        setAnswerOptions(newState);
    }
    const handleSubmit = (event) =>{
        console.log(answerOptions);
        event.preventDefault();
        const data = new FormData();
        data.append("topic", topic);
        data.append("lesson", lesson);
        data.append("questionText",questionText);
        data.append("type", type);
        data.append("id", item._id);
        data.append("answerText",answerOptions[0].answerText);
        data.append("answerText",answerOptions[1].answerText);
        data.append("answerText",answerOptions[2].answerText);
        data.append("answerText",answerOptions[3].answerText);

        data.append("isCorrect",answerOptions[0].isCorrect);
        data.append("isCorrect",answerOptions[1].isCorrect);
        data.append("isCorrect",answerOptions[2].isCorrect);
        data.append("isCorrect",answerOptions[3].isCorrect);
        if(type === "Text + Image"){
            for(var i = 0; i < 4; i++){
                if(typeof(answerOptions[i].answerImg) === typeof[]){
                    data.append(`answerImg${i+1}`,JSON.stringify(answerOptions[i].answerImg));
                }
                    data.append(`answerImg${i+1}`,answerOptions[i].answerImg);
            }
        }
        console.log(data);
        fetch("http://localhost:5000/admin/updateQuestion",{
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
                    html: <i>Update question successfully!</i>,
                    icon: 'success'
                })
                chooseMessage()
            }else{
                MySwal.fire({
                    title: <strong>Try again!</strong>,
                    html: <i>Cannot update question !</i>,
                    icon: 'warning'
                })
            } 
        })
    }
    return(
        <Form className='scroll' onSubmit={handleSubmit}>
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
                <Form.Label>Select type of Answer: </Form.Label>
                <Form.Select aria-label="Default select example" onChange={e => setType(e.target.value)} required>
                    <option value={item.type}>{item.type}</option>
                    <option value='Text'>Text</option>
                    <option value='Text + Image'>Text + Image</option>
                </Form.Select>
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
            <Form.Group className="mb-4">
                <Form.Label> Enter the answers and choose 1 correct answer of the question:  </Form.Label>
                {item.answerOptions?.map?.((a,index)=> {
                    return (
                        <InputGroup  className="mb-3" key={index}>
                            <InputGroup.Text>Answer {index + 1}</InputGroup.Text>
                            <Form.Control
                                type="text"
                                name="answerText"
                                defaultValue={a.answerText}
                                onChange = { (e) => handleChangeValue(e, index)}
                                required
                                />
                            <InputGroup.Checkbox defaultChecked={checkBoxValue(index)}   onChange = { (e) => handleChangeValue(e, index)}  name="isCorrect" aria-label="Checkbox for following text input" />
                        </InputGroup >
                    )
                })}
            </Form.Group>
            {type === "text" ? (
                            <></>
                        ):(
                            <Form.Group >
                                <Form.Label> Choose the image that corresponds to each answer above:  </Form.Label>
                                {item.answerOptions?.map?.((a,index)=> {
                                    return (
                                        <Form.Group  className="mb-3" key={index}>
                                            <Form.Label> Image of answer {index + 1}:  </Form.Label>
                                            <Form.Control
                                                type='file' accept=".png, .jpeg, .jpg"
                                                name='answerImg'
                                                onChange={
                                                    (e) => handleChangeValue(e, index)
                                            } 
                                            />
                                            {checked ? 
                                            (<></>) : 
                                            (<img src={a.answerImg?.map(item => item.urlImage)} className = 'imgPreviewTopic'  alt="questionImg" />)}
                                    </Form.Group >
                                )
                                })}
                            </Form.Group>          
                        )}
            <Button variant="success" type="submit" >
                Save
            </Button>
        </Form>      
    )

}
export default  EditQuestion
