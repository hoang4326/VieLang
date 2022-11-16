import React, { useState } from 'react';
import { Form, Button } from "react-bootstrap";
import Swal from 'sweetalert2';
import withReactContent from 'sweetalert2-react-content';

const EditUser = ({user, chooseMessage}) =>{
    const MySwal = withReactContent(Swal)
    // const [topic,setTopic] = useState(lesson.topic);
    const [name,setName] = useState(user.name)
    const [email,setEmail] = useState(user.email)
    const [emailCheck] = useState(user.email)
    const [username, setUsername] = useState(user.username)
    const [role, setRole] = useState(user.role)

    const handleSubmit = event =>{
        event.preventDefault();
        fetch("http://localhost:5000/admin/updateUser",{
            method: "POST",
            crossDomain: true,
            headers: {
                'Content-Type': 'application/json',
                Accept: "application/json",
                "Access-Control-Allow-Origin":"*",
            },
            body: JSON.stringify({
                id: user._id,
                name: name, 
                email: email,
                emailCheck: emailCheck,
                username: username,
                role: role
            }),
        }).then((res)=> res.json())
        .then((data)=>{
            if(data.status === 'success'){
                MySwal.fire({
                    title: <strong>Success!</strong>,
                    html: <i>Update successfully !</i>,
                    icon: 'success'
                })
                chooseMessage()
            }else if(data.status === 'User exits'){
                MySwal.fire({
                    title: <strong>Try again!!</strong>,
                    html: <i>Email already exists, please choose another email</i>,
                    icon: 'warning'
                })    
            }
            else{
                MySwal.fire({
                    title: <strong>Try again!!</strong>,
                    html: <i>Cannot update</i>,
                    icon: 'warning'
                })
            }
        });
        
    }
    // useEffect(()=>{
    //     fetch("http://localhost:5000/admin/topic")
    //     .then(res => 
    //         res.json()
    //     )
    //     .then((data)=>{
    //         const topicNew = data.filter(e => e.name !== lesson.topic);
    //         setData(topicNew);
    //     })
    //     .catch((err) => {
    //         console.log(err)    
    //     });
    // }, [lesson.topic])
    return(
        <Form onSubmit={handleSubmit}>
            <Form.Group className="mb-4">
                <Form.Label>Name: </Form.Label>
                <Form.Control
                    type="text"
                    placeholder="Enter name:"
                    name="name"
                    defaultValue={name}
                    onChange = {event => setName(event.target.value)}
                    required
                />
            </Form.Group>
            <Form.Group className="mb-4">
                <Form.Label>Email: </Form.Label>
                <Form.Control
                    type="email"
                    placeholder="Enter mail:"
                    name="email"
                    defaultValue={email}
                    onChange = {event => setEmail(event.target.value)}
                    required
                />
            </Form.Group>
            <Form.Group className="mb-4">
                <Form.Label>Username: </Form.Label>
                <Form.Control
                    type="text"
                    placeholder="Enter username:"
                    name="username"
                    defaultValue={username}
                    onChange = {event => setUsername(event.target.value)}
                    required
                />
            </Form.Group>
            {/* <Form.Group className="mb-4">
                <Form.Label>Password: </Form.Label>
                <Form.Control
                    type="text"
                    placeholder="Enter password:"
                    name="password"
                    defaultValue={password}
                    onChange = {event => setPassword(event.target.value)}
                    required
                />
            </Form.Group> */}
            <Form.Group className="mb-4">
                <Form.Label>Select role of user: </Form.Label>
                    <Form.Select aria-label="Default select example"  
                    onChange={e => setRole(e.target.value)}
                    required
                    >
                        <option value={user.role} >{user.role}</option>
                        {user.role === 'admin' ?
                        (
                            <option value='customer' >customer</option>
                        ):
                        (
                            <option value='admin' >admin</option>
                        )
                        }
                    </Form.Select>
            </Form.Group>
            <Button variant="success" type="submit" >
                Save
            </Button>
        </Form>
    )
}

export default  EditUser