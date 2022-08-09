import React from "react";

import "./LoginForm.css";

export default function LoginForm() {
    return (
    <div className="loginForm">
        <form>
            <h1>Sign in <br /> Access your account</h1>
            <br />
            <br />
            <label htmlFor="name" className="username">Username:</label>
            <input type="text" name="name" id="name" placeholder="Username" />
            <label htmlFor="name" className="password">Password:</label>
            <input
                type="password"
                name="password"
                id="password"
                placeholder="Password"
            />
            {/* <ul className="error-container">
                <li>Name is required</li>
            </ul> */}

            <button type="submit">Sign in</button>
            <label htmlFor="name">Don't have an account ? <a href="/signup">Create your account now.</a></label>
            <br/>
            <a href="#" ><label htmlFor="name">Forgot password?</label></a>
        </form>
    </div>
);
}