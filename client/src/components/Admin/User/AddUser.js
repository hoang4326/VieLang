import React, { useState } from "react";
import { Form, Button } from "react-bootstrap";
import Swal from 'sweetalert2';
import withReactContent from 'sweetalert2-react-content';

export default function AddUser({chooseMessage}){
    const [name,setName] = useState('');
    const [email, setEmail] = useState('');
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const [cpassword, setCpassword] = useState('');

    const [role, setRole] = useState('');

    const MySwal = withReactContent(Swal);
    const handleSubmit = event => {
        event.preventDefault();
        if (password !== cpassword) {
            MySwal.fire({
                title: <strong>Try again!</strong>,
                html: <i>Your confirm password is not correct!</i>,
                icon: 'warning'
            })
        }else{
            fetch("http://localhost:5000/admin/addUser",{
                method: "POST",
                crossDomain: true,
                headers: {
                    "Content-Type": "application/json",
                    Accept: "application/json",
                    "Access-Control-Allow-Origin":"*",
                },
                body: JSON.stringify({
                    name: name,
                    email: email,
                    username: username,
                    password: password,
                    role: role
                })
            }).then((res)=> res.json())
            .then((data)=>{
                if(data.status === 'Error'){
                    MySwal.fire({
                        title: <strong>Try again!</strong>,
                        html: <i>Cannot add User</i>,
                        icon: 'warning'
                    })
                }else{
                    MySwal.fire({
                        title: <strong>Success!</strong>,
                        html: <i>Add new user successfully</i>,
                        icon: 'success'
                    })
                    chooseMessage()
                    setName('')
                    setEmail('')
                    setUsername('')
                    setPassword('')
                    setCpassword('')

                }
            });
        }
        
    }
    return (
        <Form onSubmit={handleSubmit}>
            <Form.Group className="mb-4">
                <Form.Label>Enter name: </Form.Label>
                <Form.Control
                    type="text"
                    placeholder="Enter name: *"
                    name="name"
                    onChange = { e => setName(e.target.value)}
                    required
                />
            </Form.Group>
            <Form.Group className="mb-4">
                <Form.Label>Enter email: </Form.Label>
                <Form.Control
                    type="email"
                    placeholder="Enter email: *"
                    name="email"
                    onChange = { e => setEmail(e.target.value)}
                    required
                />
            </Form.Group>
            <Form.Group className="mb-4">
                <Form.Label>Enter username: </Form.Label>
                <Form.Control
                    type="text"
                    placeholder="Enter username: *"
                    name="username"
                    onChange = { e => setUsername(e.target.value)}
                    required
                />
            </Form.Group>
            <Form.Group className="mb-4">
                <Form.Label>Enter password: </Form.Label>
                <Form.Control
                    type="password"
                    placeholder="Enter password: *"
                    name="password"
                    onChange = { e => setPassword(e.target.value)}
                    required
                />
            </Form.Group>
            <Form.Group className="mb-4">
                <Form.Label>Enter confirm password: </Form.Label>
                <Form.Control
                    type="password"
                    placeholder="Enter confirm password: *"
                    name="password"
                    onChange = { e => setCpassword(e.target.value)}
                    required
                />
            </Form.Group>
            <Form.Group className="mb-4">
            <Form.Label>Select role of user: </Form.Label>
            <Form.Select aria-label="Default select example" onChange={e => setRole(e.target.value)} required>
                <option value=''>Open this select menu</option>
                <option value='admin'>admin</option>
                <option value='customer'>customer</option>
            </Form.Select>
        </Form.Group>
            <Button variant="success" type="submit" >
                Add New User
            </Button>
        </Form>
    )
}