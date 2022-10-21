import React,{ useState} from 'react';
import './ForgotPass.css';
import { Link } from 'react-router-dom';
import Swal from 'sweetalert2';
import withReactContent from 'sweetalert2-react-content';

export default function ForgotPassword(){
    const [email,setEmail] = useState("")
    const MySwal = withReactContent(Swal);

    const handleSubmit = event => {
        event.preventDefault();
        console.log(email);
        fetch("http://localhost:5000/forgot-password",{
            method: "POST",
            crossDomain: true,
            headers: {
                "Content-Type": "application/json",
                Accept: "application/json",
                "Access-Control-Allow-Origin":"*",
            },
            body: JSON.stringify({
                email,
            }),
        })
        .then((res)=> res.json())
        .then((data)=>{
            if(data.status === 'User not exist!!'){
                MySwal.fire({
                    title: <strong>Try again!</strong>,
                    html: <i>Your email does not exist !</i>,
                    icon: 'warning'
                })
            }else{
                MySwal.fire({
                    title: <strong>Success!</strong>,
                    html: <i>Please check your email to change your password!</i>,
                    icon: 'success'
                })
            } 
        });
    }

    return(
        <div className="ForgotPassForm">
        <form className="ForgotPassword" onSubmit={handleSubmit} >
            <h1 className='ForgotPassword'>Forgot Password</h1>
            <br />
            <label htmlFor="name" className="name">Email:</label>
            <input 
                type="email"
                name="email"
                placeholder="Enter email"
                className="ForgotPassForm"
                onChange={event => setEmail(event.target.value)}
                />
            <button type="submit" className='forgotPass'>Submit</button>
            <label htmlFor="name">Already have an account ? <Link to="/signup">Sign in</Link></label>
        </form>
    </div>
    )
}