import React from 'react';
import { useEffect, useState } from 'react';
import { Button, InputGroup, Form} from 'react-bootstrap'
import Modal from 'react-bootstrap/Modal';
import AddQuestion from "./AddQuestion";
import QuestionView from "./QuestionView";

export default function QuestionList (){
    const [data, setData] = useState();
    const [show, setShow] = useState(false);
    const [search, setSearch] = useState("")

    const handleClose = () => setShow(false);
    const handleShow = () => setShow(true);

    const chooseMessage = () => {
        fetch("http://localhost:5000/admin/questionList")
                    .then(res => 
                        res.json()
                    )
                    .then((data)=>{
                        setData(data)
                    })
                    .catch((err) => {
                        console.log(err)
                    });
    };

    useEffect(()=>{
        fetch("http://localhost:5000/admin/questionList")
        .then(res => 
            res.json()
        )
        .then((data)=>{
            setData(data);
        })
        .catch((err) => {
            console.log(err)
        });
    }, [])
    const searchByName = (name) =>{
        fetch("http://localhost:5000/admin/questionFind",{
            method: "POST",
            crossDomain: true,
            headers: {
                "Content-Type": "application/json",
                Accept: "application/json",
                "Access-Control-Allow-Origin":"*",
            },
            body: JSON.stringify({
                name: name
            }),
        })
        .then((res)=>res.json())
        .then((data)=>{
            setData(data);
        })
    }
    return (
        <div className="container-xl">
            <Modal dialogClassName="info-modal" show={show} onHide={handleClose}>
                <Modal.Header closeButton>
                <Modal.Title>Add Question</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    <AddQuestion chooseMessage = {chooseMessage}/>
                </Modal.Body>
                <Modal.Footer>
                </Modal.Footer>
            </Modal>
            <div className="table-responsive">
                <div className="table-wrapper">
                    <div className="table-title">
                            <div className="row">
                                <div className="col-sm-6">
                                    <h2>Manage <b>Question</b></h2>
                                </div>
                                <div className="col-sm-6">
                                    <Button onClick={handleShow}  className="btn btn-success" data-toggle="modal"><i className="material-icons">&#xE147;</i> <span>Add New Question</span></Button>					
                                </div>
                        </div>
                    </div>
                    <InputGroup className="mb-3 fix">
                                <Form.Control
                                    placeholder='Search question by topic'
                                    onChange={(e) => setSearch(e.target.value)}
                                />
                                <Button variant="outline-secondary" id="button-addon1" className='change' onClick={()=>searchByName(search)}>
                                    Search
                                </Button>
                    </InputGroup>
                    <table className="table table-striped table-hover">
                        <thead>
                            <tr className='centerItems'>
                                <th>Topic</th>
                                <th>Lesson</th>
                                <th>Question</th>
                                <th>Correct Answer</th>
                                <th>Type Answer</th>
                                <th>Actions</th>
                            </tr>
                        </thead>
                        <tbody>
                            {data?.map?.((question, index)=>{
                                return(
                                    <tr key={index} className='centerItems'>
                                        <QuestionView question = {question} chooseMessage = {chooseMessage} />
                                    </tr>
                                )
                            })}
                        </tbody>
                    </table>
                </div>
            </div>
        </div>
    )
}