import React from 'react';
import { useEffect, useState } from 'react';
import '../Topic/Topic.css';
import { Button} from 'react-bootstrap';
import Modal from 'react-bootstrap/Modal';
import LessonView from './LessonView'
import AddLesson from './AddLesson';

export default function LessonList (){
    const [data, setData] = useState();
    const [show, setShow] = useState(false);

    const handleClose = () => setShow(false);
    const handleShow = () => setShow(true);
    useEffect(()=>{
        fetch("http://localhost:5000/admin/lessonList")
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
            {/* <Modal show={show1} onHide={handleClose1}>
                <Modal.Header closeButton>
                <Modal.Title>Add Vocabulary</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    <AddVocab/>
                </Modal.Body>
                <Modal.Footer>
                </Modal.Footer>
            </Modal> */}
            <Modal show={show} onHide={handleClose}>
                <Modal.Header closeButton>
                <Modal.Title>Add Lesson</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    <AddLesson/>
                </Modal.Body>
                <Modal.Footer>
                </Modal.Footer>
            </Modal>
            <div className="table-responsive">
                <div className="table-wrapper">
                    <div className="table-title">
                            <div className="row">
                                <div className="col-sm-6">
                                    <h2>Manage <b>Lesson</b></h2>
                                </div>
                                <div className="col-sm-6">
                                    <Button onClick={handleShow} className="btn btn-success" data-toggle="modal"><i className="material-icons">&#xE147;</i> <span>Add New Lesson</span></Button>					
                                </div>
                        </div>
                    </div>
                    <table className="table table-striped table-hover">
                        <thead>
                            <tr>
                                <th>Topic</th>
                                <th>Content 1</th>
                                <th>Content 2</th>
                                <th>Actions</th>
                            </tr>
                        </thead>
                        <tbody>
                            {data?.map?.((lesson, index)=>{
                                return(
                                    <tr key={index}>
                                        <LessonView lesson = {lesson} />
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