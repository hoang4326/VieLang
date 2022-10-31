import React, { useState, useEffect } from "react";
import { Form, Button, InputGroup } from "react-bootstrap";
import Swal from 'sweetalert2';
import withReactContent from 'sweetalert2-react-content';

export default function AddQuestion({chooseMessage}){
    const [dataTopic, setDataTopic] = useState();
    const [dataLesson, setDataLesson] = useState();
    const [topic, setTopic] = useState("");
    const [lesson, setLesson] = useState("");
    const [questionText, setQuestionText] = useState("");
    const [type, setType] = useState("text");
    const [answerOptions, setAnswerOptions] = useState(
    [
        {answerText:"", isCorrect: false },
        {answerText:"", isCorrect: false },
        {answerText:"", isCorrect: false },
        {answerText:"", isCorrect: false }
    ]
    );
    const MySwal = withReactContent(Swal);


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
        data.append("type", type);
        
        console.log(typeof(answerOptions[0].answerImg))

        data.append("answerText",answerOptions[0].answerText);
        data.append("answerText",answerOptions[1].answerText);
        data.append("answerText",answerOptions[2].answerText);
        data.append("answerText",answerOptions[3].answerText);

        data.append("isCorrect",answerOptions[0].isCorrect);
        data.append("isCorrect",answerOptions[1].isCorrect);
        data.append("isCorrect",answerOptions[2].isCorrect);
        data.append("isCorrect",answerOptions[3].isCorrect);
        if(answerOptions[0].answerImg){
            data.append("answerImg1",answerOptions[0].answerImg);
            data.append("answerImg2",answerOptions[1].answerImg);
            data.append("answerImg3",answerOptions[2].answerImg);
            data.append("answerImg4",answerOptions[3].answerImg);
        }
        console.log(data);
        fetch("http://localhost:5000/admin/addQuestion",{
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
                    html: <i>Add question successfully!</i>,
                    icon: 'success'
                })
                chooseMessage()
            }else{
                MySwal.fire({
                    title: <strong>Try again!</strong>,
                    html: <i>Cannot add new question !</i>,
                    icon: 'warning'
                })
            } 
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
                <Form.Label>Select type of Answer: </Form.Label>
                <Form.Select aria-label="Default select example" onChange={e => setType(e.target.value)} required>
                    <option value=''>Open this select menu</option>
                    <option value='text'>text</option>
                    <option value='image'>image</option>
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
            {type === "text" ? (
                <></>
            ): (
                <Form.Group>
                <Form.Label> Choose the image that corresponds to each answer above:  </Form.Label>
                <Form.Group  className="mb-3" >
                    <Form.Label> Image of answer 1:  </Form.Label>
                    <Form.Control
                        type='file' accept=".png, .jpeg, .jpg"
                        name='answerImg'
                        onChange={
                            (e) => handleChangeValue(e, 0)
                    } 
                    />  
                    
                </Form.Group >
                <Form.Group  className="mb-3" >
                    <Form.Label> Image of answer 2:  </Form.Label>
                    <Form.Control
                        type='file' accept=".png, .jpeg, .jpg"
                        name='answerImg'
                        onChange={
                            (e) => handleChangeValue(e, 1)
                        } 
                    />
                </Form.Group >
                <Form.Group  className="mb-3" >
                    <Form.Label> Image of answer 3:  </Form.Label>
                    <Form.Control
                        type='file' accept=".png, .jpeg, .jpg"
                        name='answerImg'
                        onChange={
                            (e) => handleChangeValue(e, 2)
                        } 
                    />
                </Form.Group >
                <Form.Group  className="mb-3" >
                    <Form.Label> Image of answer 4:  </Form.Label>
                    <Form.Control
                        type='file' accept=".png, .jpeg, .jpg"
                        name='answerImg'
                        onChange={
                            (e) => handleChangeValue(e, 3)
                        } 
                    />
                </Form.Group >
            </Form.Group>
            )
        }
            <Button variant="success" type="submit" >
                Add New Vocabulary
            </Button>
        </Form>
    )
}