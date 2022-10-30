import React from 'react';
import { useEffect, useState } from 'react';
import { Button} from 'react-bootstrap';
import Modal from 'react-bootstrap/Modal';
// import TopicView from './TopicView';
import AddQuestion from "./AddQuestion";

export default function QuestionList (){
    const [data, setData] = useState();
    const [show, setShow] = useState(false);

    const handleClose = () => setShow(false);
    const handleShow = () => setShow(true);

    return (
        <div className="container-xl">
            <Modal show={show} onHide={handleClose}>
                <Modal.Header closeButton>
                <Modal.Title>Add Question</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    <AddQuestion/>
                </Modal.Body>
                <Modal.Footer>
                </Modal.Footer>
            </Modal>
            <div className="table-responsive">
                <div className="table-wrapper">
                    <div className="table-title">
                            <div className="row">
                                <div className="col-sm-6">
                                    <h2>Manage <b>Topic</b></h2>
                                </div>
                                <div className="col-sm-6">
                                    <Button onClick={handleShow}  className="btn btn-success" data-toggle="modal"><i className="material-icons">&#xE147;</i> <span>Add New Question</span></Button>					
                                </div>
                        </div>
                    </div>
                    <table className="table table-striped table-hover">
                        <thead>
                            <tr>
                                <th>Topic</th>
                                <th>Lesson</th>
                                <th>Question</th>
                                <th>Answer</th>
                                <th>Correct Answer</th>
                                <th>Actions</th>
                            </tr>
                        </thead>
                        <tbody>
                            {/* {data?.map?.((topic, index)=>{
                                return(
                                    <tr key={index}>
                                        <TopicView topic = {topic} chooseMessage = {chooseMessage} />
                                    </tr>
                                )
                            })} */}
                        </tbody>
                    </table>
                </div>
            </div>
        </div>
    )
}