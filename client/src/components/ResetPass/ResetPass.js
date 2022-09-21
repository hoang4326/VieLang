import React, { useState} from 'react';
import { useParams } from "react-router-dom";
import Swal from 'sweetalert2';
import withReactContent from 'sweetalert2-react-content';
import './ResetPass.css'

export default function ResetPassword(){
    const [password,setPassword] = useState("");
    const [cpassword,setCpassword] = useState("");
    const param = useParams();
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
            MySwal.fire({
                title: <strong>Password Changed!</strong>,
                html: <i>Your password has been changed successfully</i>,
                icon: 'success'
            })
            // .then(() =>{
            //     window.location.href = "./";

            // })
        });
    }
    }
    return (
        <div className="ResetPassForm">
        <form className="ResetPassword" onSubmit= {handleSubmit}  >
            <h1 className='ResetPassword'>Reset Password</h1>
            <br />
            <label htmlFor="name" className="name">Password:</label>
            <input 
                type="password"
                name="password"
                className="ResetPassForm"
                placeholder="Enter password"
                onChange={event => setPassword(event.target.value)}
                required='required'
                />
                <label htmlFor="name" className="name">Confirm Password:</label>
            <input 
                type="password"
                name="confirm-password"
                className="ResetPassForm"
                placeholder="Enter confirm password"
                onChange={event => setCpassword(event.target.value)}
                required='required'
                />
            <button type="submit">Reset</button>
        </form>
    </div>
    )
}