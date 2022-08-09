import React from "react";

import "./SignupForm.css";

export default function SignupForm() {
    return (
    <div className="SignupForm">
        <form>
            <h1>Sign up</h1>
            <br />
            <label htmlFor="name" className="name">Your name:</label>
            <input type="text" name="name" id="name" placeholder="Your name" />
            <label htmlFor="name" className="email">Email:</label>
            <input type="text" name="name" id="name" placeholder="Email" />
            <label htmlFor="name" className="username">Username:</label>
            <input type="text" name="username" id="name" placeholder="Username" />
            <label htmlFor="name" className="password">Password:</label>
            <input
                type="password"
                name="password"
                id="password"
                placeholder="Password"
            />
            <label htmlFor="name" className="password">Confirm Password:</label>
            <input
                type="password"
                name="password"
                id="password"
                placeholder="Password"
            />


            <button type="submit">Sign up</button>
        </form>
    </div>
);
}