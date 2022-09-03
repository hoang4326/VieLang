import React, { useState } from "react";

import "./SignupForm.css";

export default function SignupForm() {
    const [name,setName] = useState("");
    const [email,setEmail] = useState("");
    const [username,setUsername] = useState("");
    const [password,setPassword] = useState("");

    const handleSubmit = event => {
        event.preventDefault();
        const {name, email, username, password} = event.target;
        console.log(name, email, username, password);
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
                placeholder="Password"
                onChange= {event => setPassword(event.target.value)}
            />
            {/* <label htmlFor="name" className="password">Confirm Password:</label>
            <input
                type="password"
                name="password"
                className="signup"
                id="password"
                placeholder="Password"
            /> */}


            <button type="submit">Sign up</button>
        </form>
    </div>
);
}