import React,{ useState} from 'react';
import './ForgotPass.css';
import { Link } from 'react-router-dom';

export default function ForgotPassword(){
    const [email,setEmail] = useState("")

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
            console.log(data, "userRegister");
            alert(data.status);
        });
    }

    return(
        <div className="ForgotPassForm">
        <form className="ForgotPassword" onSubmit={handleSubmit} >
            <h1 className='ForgotPassword'>Forgot Password</h1>
            <br />
            {/* <p>Nhập email mà bạn đã đăng ký trước đây và bấm khôi phục. Bạn sẽ nhận được 1 email bao gồm tên đăng nhập và
            1 đường link để đặt mật khẩu mới cho tài khoản của bạn.
            Ai quên tên đăng nhập cũng có thể dùng chức năng này để lấy lại tên đăng nhập</p> */}
            <label htmlFor="name" className="name">Email:</label>
            <input 
                type="text"
                // name="name"
                className="ForgotPassForm"
                placeholder="Enter email"
                onChange={event => setEmail(event.target.value)}
                />
            <button type="submit">Submit</button>
            <label htmlFor="name">Already have an account? ? <Link to="/signup">Sign in</Link></label>
        </form>
    </div>
    )
}