import React, { useState} from 'react';
import { useParams } from "react-router-dom";
import './ResetPass.css'

export default function ResetPassword(){
    const [password,setPassword] = useState("");
    const param = useParams();

    const handleSubmit = event => {
        event.preventDefault();
        fetch(`http://localhost:5000/reset-password/${param.id}/${param.token}`,{
            method: "POST",
            crossDomain: true,
            headers: {
                "Content-Type": "application/json",
                Accept: "application/json",
                "Access-Control-Allow-Origin":"*",
            },
            body: JSON.stringify({
                password
            }),
        })
        .then((res)=> res.json())
        .then((data)=>{
            console.log(data, "userRegister");
            window.location.href = "./";
        });
    }
    return (
        <div className="ResetPassForm">
        <form className="ResetPassword" onSubmit= {handleSubmit}  >
            <h1 className='ResetPassword'>Reset Password</h1>
            <br />
            <label htmlFor="name" className="name">Password:</label>
            <input 
                type="password"
                // name="name"
                className="ResetPassForm"
                placeholder="Enter password"
                onChange={event => setPassword(event.target.value)}
                />
                <label htmlFor="name" className="name">Confirm Password:</label>
            <input 
                type="password"
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