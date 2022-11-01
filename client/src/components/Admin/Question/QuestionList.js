import React from 'react';
import { useEffect, useState } from 'react';
import { Button} from 'react-bootstrap';
import Modal from 'react-bootstrap/Modal';
// import TopicView from './TopicView';
import AddQuestion from "./AddQuestion";
import QuestionView from "./QuestionView";

export default function QuestionList (){
    const [data, setData] = useState();
    const [show, setShow] = useState(false);

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
                    <table className="table table-striped table-hover">
                        <thead>
                            <tr className='centerItems'>
                                <th>Topic</th>
                                <th>Lesson</th>
                                <th>Question</th>
                                <th>Type Answer</th>
                                <th>Correct Answer</th>
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