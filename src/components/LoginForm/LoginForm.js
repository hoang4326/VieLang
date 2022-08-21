import React from "react";

import "./LoginForm.css";

export default function LoginForm() {
    return (
    <div className="loginForm">
        <form className="login">
            <h1>Sign in <br /> Access your account</h1>
            <br />
            <br />
            <label htmlFor="name" className="username">Username:</label>
            <input type="text" className="loginform" name="name" id="name" placeholder="Username" />
            <label htmlFor="name" className="password">Password:</label>
            <input
                type="password"
                name="password"
                className="loginform"
                id="password"
                placeholder="Password"
            />
            {/* <ul className="error-container">
                <li>Name is required</li>
            </ul> */}

            <button type="submit">Sign in</button>
            <label htmlFor="name">Don't have an account ? <a href="/signup">Create your account here.</a></label>
            <br/>
            <label htmlFor="name"><a href="#" >Forgot password?</a></label>
        </form>
    </div>
);
}