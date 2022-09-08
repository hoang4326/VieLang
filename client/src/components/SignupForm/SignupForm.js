import React, { useState } from "react";
import Swal from 'sweetalert2';
import withReactContent from 'sweetalert2-react-content';

import "./SignupForm.css";

export default function SignupForm() {
    const [name,setName] = useState("");
    const [email,setEmail] = useState("");
    const [username,setUsername] = useState("");
    const [password,setPassword] = useState("");
    const [cpassword,setCpassword] = useState("");
    const [role] = useState("customer");
    const MySwal = withReactContent(Swal);


    const handleSubmit = event => {
        event.preventDefault();
        console.log({name, email, username ,password, role});
        if (password !== cpassword) {
            MySwal.fire({
                title: <strong>Try again!</strong>,
                html: <i>Your confirm password is not correct!</i>,
                icon: 'warning'
            })
        } else {
        fetch("http://localhost:5000/signup",{
            method: "POST",
            crossDomain: true,
            headers: {
                "Content-Type": "application/json",
                Accept: "application/json",
                "Access-Control-Allow-Origin":"*",
            },
            body: JSON.stringify({
                name,
                email,
                username,
                password,
                role
            }),
        })
        .then((res)=> res.json())
        .then((data)=>{
            console.log(data, "userRegister");
            MySwal.fire({
                title: <strong>Success!</strong>,
                html: <i>Registered successfully!</i>,
                icon: 'success'
            }).then(() =>{
                window.location.href = "./login";

            })
        });
    }
    }

    return (
    <div className="SignupForm">
        <form className="signup" onSubmit={handleSubmit}>
            <h1>Sign up</h1>
            <br />
            <label htmlFor="name" className="name">Your name:</label>
            <input 
                type="text"
                // name="name"
                className="signup"
                id="name"
                placeholder="Your name"
                onChange= {event => setName(event.target.value)} />
            <label htmlFor="name" className="email">Email:</label>
            <input
                type="text"
                // name="name"
                className="signup"
                id="email"
                placeholder="Email"
                onChange= {event => setEmail(event.target.value)} />
            <label htmlFor="name" className="username">Username:</label>
            <input
                type="text"
                // name="username"
                className="signup"
                id="username"
                placeholder="Username"
                onChange= {event => setUsername(event.target.value)} />
            <label htmlFor="name" className="password">Password:</label>
            <input
                type="password"
                // name="password"
                className="signup"
                id="password"
                placeholder="password"
                onChange= {event => setPassword(event.target.value)}
            />
            <label htmlFor="name" className="password">Confirm Password:</label>
            <input
                type="password"
                // name="password"
                className="signup"
                id="cpassword"
                placeholder="cpassword"
                onChange= {event => setCpassword(event.target.value)}
            />

            <button type="submit">Sign up</button>
        </form>
    </div>
);
}