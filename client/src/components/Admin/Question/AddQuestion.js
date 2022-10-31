import React, { useState, useEffect } from "react";
import { Form, Button, InputGroup } from "react-bootstrap";
import Swal from 'sweetalert2';
import withReactContent from 'sweetalert2-react-content';

export default function AddQuestion(){
    const [dataTopic, setDataTopic] = useState();
    const [dataLesson, setDataLesson] = useState();
    const [topic, setTopic] = useState("");
    const [lesson, setLesson] = useState("");
    const [questionText, setQuestionText] = useState("");
    const [answerOptions, setAnswerOptions] = useState([
        {answerText:"", isCorrect: false },{answerText:"", isCorrect: false },{answerText:"", isCorrect: false },{answerText:"", isCorrect: false }]);
    const MySwal = withReactContent(Swal);


    const handleChangeValue = (e, i) => {
        const { value, name, checked } = e.target;
        const newState = [...answerOptions];
        console.log(newState)
        if(name === "answerText"){
            newState[i] = {
                ...newState[i],
                [name]: value
            };
        }else {
            newState[i] = {
                ...newState[i],
                [name]: checked
            };
        }

        console.log(newState)
        setAnswerOptions(newState);
    };

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
            setDataLesson(data);
        })
        .catch((err) => {
            console.log(err)
        });
    }
    const handleSubmit = (event) =>{
        event.preventDefault();
        const data = new FormData();
        data.append("topic", topic);
        data.append("lesson", lesson);
        data.append("questionText",questionText);
        data.append("answerOptions", JSON.stringify(answerOptions));
        console.log(data);
        fetch("http://localhost:5000/admin/addQuestion",{
                method: "POST",
                crossDomain: true,
                headers: {
                    Accept: "application/json",
                    "Access-Control-Allow-Origin":"*",
                },
                body: data
        })
    }
    return (
        <Form onSubmit={handleSubmit} >
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
                onChange = { (e) => setQuestionText(e.target.value)}
                required
                />
            </Form.Group>
            <Form.Group className="mb-4">
                <Form.Label> Enter the answers and choose 1 correct answer of the question:  </Form.Label>
                <InputGroup  className="mb-3" >
                    <InputGroup.Text>Answer 1</InputGroup.Text>
                    <Form.Control
                        type="text"
                        placeholder="Enter answer 1:"
                        name="answerText"
                        onChange = { (e) => handleChangeValue(e, 0)}
                        required
                        />
                    {/* <Form.Control
                            type='file' accept=".png, .jpeg, .jpg"
                            onChange={event =>{
                                const file = event.target.files[0];
                                setImgTopic(file)
                    }} 
                /> */}
                    <InputGroup.Checkbox  onChange = { (e) => handleChangeValue(e, 0)}  name="isCorrect" aria-label="Checkbox for following text input" />
                </InputGroup >
                
                <InputGroup  className="mb-3" >
                    <InputGroup.Text>Answer 2</InputGroup.Text>
                    <Form.Control
                        type="text"
                        placeholder="Enter answer 2:"
                        name="answerText"
                        onChange = { (e) => handleChangeValue(e, 1)}
                        required
                        />
                    <InputGroup.Checkbox  onChange = { (e) => handleChangeValue(e, 1)} name="isCorrect" aria-label="Checkbox for following text input" />
                </InputGroup >
                <InputGroup  className="mb-3" >
                    <InputGroup.Text>Answer 3</InputGroup.Text>
                    <Form.Control
                        type="text"
                        placeholder="Enter answer 3:"
                        name="answerText"
                        onChange = { (e) => handleChangeValue(e, 2)}
                        required
                        />
                    <InputGroup.Checkbox  onChange = { (e) => handleChangeValue(e, 2)} name="isCorrect" aria-label="Checkbox for following text input" />
                </InputGroup >
                <InputGroup  className="mb-3" >
                    <InputGroup.Text>Answer 4</InputGroup.Text>
                    <Form.Control
                        type="text"
                        placeholder="Enter answer 4:"
                        name="answerText"
                        onChange = { (e) => handleChangeValue(e, 3 )}
                        required
                        />
                    <InputGroup.Checkbox onChange = { (e) => handleChangeValue(e, 3)} name="isCorrect" aria-label="Checkbox for following text input" />
                </InputGroup >             
            </Form.Group>
            <Button variant="success" type="submit" >
                Add New Vocabulary
            </Button>
        </Form>
    )
}