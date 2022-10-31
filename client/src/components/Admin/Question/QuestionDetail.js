import React,{useState} from 'react';
import Modal from 'react-bootstrap/Modal';
import EditQuestion from './EditQuestion';
import Swal from 'sweetalert2';
import withReactContent from 'sweetalert2-react-content';

export default function QuestionDetail({item , question , chooseMessage}){
    const MySwal = withReactContent(Swal);
    const [show, setShow] = useState(false);
    const handleShow = () => {
        setShow(true)
    };

    const handleClose = () => {
        setShow(false);
    }
    const handleDelete =  (topic, lesson, questionText) => {
            MySwal.fire({
            title: <strong>Are you sure ?</strong>,
            icon: 'warning',
            showCancelButton: true,
            confirmButtonText: 'Delete',
        }).then((result) => {
        if (result.isConfirmed) {
            fetch("http://localhost:5000/admin/questionDelete",{
            method: "POST",
            crossDomain: true,
            headers: {
                "Content-Type": "application/json",
                Accept: "application/json",
                "Access-Control-Allow-Origin":"*",
            },
            body: JSON.stringify({
                topic, lesson, questionText
            }),
        }).then((res)=> res.json())
        .then((data)=>{
            if(data.status === 'success'){
                MySwal.fire({
                    title: <strong>Success!</strong>,
                    html: <i>Delete topic successfully !</i>,
                    icon: 'success'
                })
                chooseMessage()
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
        <button onClick={()=>handleShow()} className="btn text-warning btn-act" data-toggle="modal"><i className="material-icons">&#xE254;</i></button>
        <button onClick={()=>handleDelete(question.topic, question.lesson, item.questionText)} className="btn text-danger btn-act" data-toggle="modal"><i className="material-icons">&#xE872;</i></button>
        <Modal show={show} onHide={()=>handleClose()} dialogClassName="info-modal">
        <Modal.Header closeButton>
            <Modal.Title>
                Edit question
            </Modal.Title>
        </Modal.Header>
        <Modal.Body >
            <EditQuestion item = {item} question = {question} chooseMessage= {chooseMessage}/>
        </Modal.Body>
        <Modal.Footer>
        </Modal.Footer>
    </Modal>
    </>
    )
}