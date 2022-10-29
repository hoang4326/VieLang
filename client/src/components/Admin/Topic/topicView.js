import React, { useState} from 'react';
import Modal from 'react-bootstrap/Modal';
import Swal from 'sweetalert2';
import withReactContent from 'sweetalert2-react-content';
// import { Button} from 'react-bootstrap';
import EditTopic from './EditTopic';

const TopicView = ({topic, chooseMessage}) =>{
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
            fetch("http://localhost:5000/admin/deleteTopic",{
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
                    html: <i>Delete topic successfully !</i>,
                    icon: 'success'
                })
                fetch("http://localhost:5000/admin/topicList")
                    .then(res => 
                        res.json()
                    )
                    .then((data)=>{
                        chooseMessage(data)
                    })
                    .catch((err) => {
                        console.log(err)
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
            <td>{topic.name}</td>
                <td>{topic.topicImg?.map?.((item, id)=>{
                    return (
                        <img className='topicImg' src={item.urlImage} alt="Topic" key={id}/>
                    )
                    })}
                </td>
                <td>{topic.lessonImg?.map?.((item, id)=>{
                    return (
                        <img className='lessonImg' src={item.urlImage} alt="Lesson" key={id} />
                    )
                    })}
                </td>
                <td>{topic.vocab?.map?.((item, id)=>{
                    return (
                        <div key={id}>
                            {item.vocabEng} - {item.vocabVie} <br/>
                        </div>
                    )
                    })}
                </td>
                <td>
                    <button onClick={handleShow} className="btn text-warning btn-act" data-toggle="modal"><i className="material-icons">&#xE254;</i></button>
                    <button onClick={() => handleDelete(topic.name, topic.id)}  className="btn text-danger btn-act" data-toggle="modal"><i className="material-icons">&#xE872;</i></button>
                </td>
                
                <Modal show={show} onHide={handleClose} dialogClassName="info-modal">
                        <Modal.Header closeButton>
                                <Modal.Title>
                                    Edit Topic
                                </Modal.Title>
                            </Modal.Header>
                            <Modal.Body >
                                <EditTopic topic = {topic} chooseMessage= {chooseMessage}/>
                            </Modal.Body>
                            <Modal.Footer>
                            </Modal.Footer>
                </Modal>
        </>
    )
}

export default  TopicView