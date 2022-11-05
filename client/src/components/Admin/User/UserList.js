import React from 'react'
import { useEffect, useState } from 'react'
import '../Topic/topic.css'
import { Button, InputGroup, Form} from 'react-bootstrap'
import Modal from 'react-bootstrap/Modal'
import UserView from './UserView'
import AddUser from './AddUser'


export default function UserList (){
    const [data, setData] = useState()
    const [show, setShow] = useState(false)
    const [search, setSearch] = useState("")
    const handleClose = () => setShow(false)
    const handleShow = () => setShow(true)

    const chooseMessage = () => {
        fetch("http://localhost:5000/admin/user")
        .then(res => 
            res.json()
        )
        .then((data)=>{
            setData(data);
        })
        .catch((err) => {
            console.log(err)    
        });
    };

    useEffect(()=>{
        fetch("http://localhost:5000/admin/user")
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
        fetch("http://localhost:5000/admin/userFind",{
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
            <Modal show={show} onHide={handleClose}>
                <Modal.Header closeButton>
                <Modal.Title>Add User</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    <AddUser chooseMessage = {chooseMessage}/>
                </Modal.Body>
                <Modal.Footer>
                </Modal.Footer>
            </Modal>
            <div className="table-responsive">
                <div className="table-wrapper">
                    <div className="table-title">
                            <div className="row">
                                <div className="col-sm-6">
                                    <h2>Manage <b>User</b></h2>
                                </div>
                                <div className="col-sm-6">
                                    <Button onClick={handleShow} className="btn btn-success" data-toggle="modal"><i className="material-icons">&#xE147;</i> <span>Add New User</span></Button>					
                                </div>
                        </div>
                    </div>
                            <InputGroup className="mb-3 fix">
                                <Form.Control
                                    placeholder='Search user by name'
                                    onChange={(e) => setSearch(e.target.value)}
                                />
                                <Button variant="outline-secondary" id="button-addon1" className='change' onClick={()=>searchByName(search)}>
                                    Search
                                </Button>
                            </InputGroup>
                    <table className="table table-striped table-hover">
                        <thead>
                            <tr className='centerItems'>
                                <th></th>
                                <th>Name</th>
                                <th>Email</th>
                                <th>Username</th>
                                <th>Role</th>
                                <th>Action</th>
                            </tr>
                        </thead>
                        <tbody>
                            {data?.map?.((user, index)=>{
                                return(
                                    <tr key={index} className='centerItems'>
                                        <UserView user = {user} index = {index} chooseMessage = {chooseMessage}/>
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