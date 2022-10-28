import React, { useState} from 'react';
import Modal from 'react-bootstrap/Modal';
import Swal from 'sweetalert2';
import withReactContent from 'sweetalert2-react-content';
// import { Button} from 'react-bootstrap';
import LessonEdit from './LessonEdit';

const LessonView = ({lesson}) =>{
    const [show, setShow] = useState(false);
    const MySwal = withReactContent(Swal);
    const handleShow = () => setShow(true);
    const handleClose = () => setShow(false);
    const handleDelete =  (name, id) => {
            MySwal.fire({
            title: <strong>Are you sure ?</strong>,
            icon: 'warning',
            showCancelButton: true,
            confirmButtonText: 'Delete',
        }).then((result) => {
        if (result.isConfirmed) {
            fetch("http://localhost:5000/admin/deleteLesson",{
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
                    html: <i>Delete lesson successfully !</i>,
                    icon: 'success'
                });
            }else{
                MySwal.fire({
                    title: <strong>Try again!!</strong>,
                    html: <i>Cannot delete</i>,
                    icon: 'warning'
                })
            }
        })
        }
        })
    }

    return (
        <>
                <td>{lesson.topic}</td>
                <td>{lesson.content1}</td>
                <td>{lesson.content2}</td>
                <td>
                    <button onClick = {handleShow} className="btn text-warning btn-act" data-toggle="modal"><i className="material-icons">&#xE254;</i></button>
                    <button onClick={() => handleDelete(lesson.topic, lesson.id)} className="btn text-danger btn-act" data-toggle="modal"><i className="material-icons">&#xE872;</i></button>
                </td>
                
                <Modal show={show} onHide={handleClose} dialogClassName="info-modal">
                        <Modal.Header closeButton>
                                <Modal.Title>
                                    Edit Lesson
                                </Modal.Title>
                            </Modal.Header>
                            <Modal.Body >
                                <LessonEdit lesson = {lesson} />
                            </Modal.Body>
                            <Modal.Footer>
                            </Modal.Footer>
                </Modal>
        </>
    )
}

export default LessonView