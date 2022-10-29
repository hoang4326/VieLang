import React from 'react';
import { useEffect, useState } from 'react';
import './topic.css';
import { Button} from 'react-bootstrap';
import Modal from 'react-bootstrap/Modal';
import TopicView from './TopicView';
import AddVocab from "./AddVocab";
import AddTopic from "./AddTopic";

export default function TopicList (){
    const [data, setData] = useState();
        // eslint-disable-next-line
    const [message, setMessage] = useState('');
        // eslint-disable-next-line
    const [show1, setShow1] = useState(false);
    const [show2, setShow2] = useState(false);

    const handleClose1 = () => setShow1(false);
    const handleShow1 = () => setShow1(true);
    const handleClose2 = () => setShow2(false);
    const handleShow2 = () => setShow2(true);

    const chooseMessage = (message) => {
        setData(message);
    };
    useEffect(()=>{
        fetch("http://localhost:5000/admin/topicList")
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
            <Modal show={show1} onHide={handleClose1}>
                <Modal.Header closeButton>
                <Modal.Title>Add Vocabulary</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    <AddVocab chooseMessage = {chooseMessage}/>
                </Modal.Body>
                <Modal.Footer>
                </Modal.Footer>
            </Modal>
            <Modal show={show2} onHide={handleClose2}>
                <Modal.Header closeButton>
                <Modal.Title>Add Topic</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    <AddTopic chooseMessage = {chooseMessage} />
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
                                    <Button onClick={handleShow2}  className="btn btn-success" data-toggle="modal"><i className="material-icons">&#xE147;</i> <span>Add New Topic</span></Button>					
                                    <Button onClick={handleShow1} className="btn btn-success" data-toggle="modal"><i className="material-icons">&#xE147;</i> <span>Add New Vocabulary</span></Button>					
                                </div>
                        </div>
                    </div>
                    <table className="table table-striped table-hover">
                        <thead>
                            <tr>
                                <th>Name</th>
                                <th>Topic Image</th>
                                <th>Lesson Image</th>
                                <th>Vocabulary</th>
                                <th>Actions</th>
                            </tr>
                        </thead>
                        <tbody>
                            {data?.map?.((topic, index)=>{
                                return(
                                    <tr key={index}>
                                        <TopicView topic = {topic} chooseMessage = {chooseMessage} />
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