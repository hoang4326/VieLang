import React from 'react';
import './ResetPass.css'

export default function ResetPassword(){
    return (
        <div className="ResetPassForm">
        <form className="ResetPassword"  >
            <h1 className='ResetPassword'>Reset Password</h1>
            <br />
            <label htmlFor="name" className="name">Password:</label>
            <input 
                type="text"
                // name="name"
                className="ResetPassForm"
                placeholder="Enter password"
                // onChange={event => setEmail(event.target.value)}
                />
                <label htmlFor="name" className="name">Confirm Password:</label>
            <input 
                type="text"
                // name="name"
                className="ResetPassForm"
                placeholder="Enter confirm password"
                // onChange={event => setEmail(event.target.value)}
                />
            <button type="submit">Reset</button>
        </form>
    </div>
    )
}