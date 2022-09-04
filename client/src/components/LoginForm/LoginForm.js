import React, { useState } from "react";
import {Link} from "react-router-dom";
import "./LoginForm.css";

export default function LoginForm() {
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");

    const handleSubmit = event => {
        event.preventDefault();
        console.log(email, password);
        fetch("http://localhost:5000/login",{
            method: "POST",
            crossDomain: true,
            headers: {
                "Content-Type": "application/json",
                Accept: "application/json",
                "Access-Control-Allow-Origin":"*",
            },
            body: JSON.stringify({
                email,
                password,
            }),
        })
        .then((res)=> res.json())
        .then((data)=>{
            console.log(data, "userRegister")
        });
    }

    return (
    <div className="loginForm">
        <form className="login" onSubmit={handleSubmit}>
            <h1>Sign in <br /> Access your account</h1>
            <br />
            <br />
            <label htmlFor="name" className="email">Email:</label>
            <input
                type="text"
                className="loginform"
                name="email"
                id="email"
                placeholder="Email"
                onChange={event => setEmail(event.target.value)}/>
            <label htmlFor="name" className="password">Password:</label>
            <input
                type="password"
                name="password"
                className="loginform"
                id="password"
                placeholder="Password"
                onChange={event => setPassword(event.target.value)}
            />
            {/* <ul className="error-container">
                <li>Name is required</li>
            </ul> */}

            <button type="submit">Sign in</button>
            <label htmlFor="name">Don't have an account ? <Link to="/signup">Create your account here.</Link></label>
            <br/>
            <label htmlFor="name"><a href="/#" >Forgot password?</a></label>
        </form>
    </div>
);
}