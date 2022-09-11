import React, { useState, useEffect } from 'react';
// import { MenuItems }   from "./Menu";
import LoginForm from '../LoginForm/LoginForm';
import SignupForm from '../SignupForm/SignupForm';
import Support from '../Support/Support';
import Membership from '../Membership/Membership';
import Home from '../Home/Home';
import Manage from '../admin';
import Auth from './authProvider';
import ForgotPassword from '../ForgotPass/ForgotPass';

import {
    Routes,
    Route,
    Link,
} from "react-router-dom";
import './Navbar.css';

export default function Navbar() {
    const [userData, setUserData] = useState("");
    const [clicked, setClicked] = useState(false);


    // const ref = useRef(null);
    const [toggled, setToggled] = useState(false);


    const token = localStorage.getItem('token');
    var style1 = {};
    var style2 = {};

    if(!token) {
        style1.display = 'none';
    }else{
        style2.display = 'none';
    }

    const toggleMenu = () =>{
        setToggled(!toggled);
    }
    // const toggleMenu = () => {
    //     const el = ref.current;
    //     el.classList.toggle('open-menu');
    // }

    const logOut = () =>{
        localStorage.removeItem('token');
    }

    const handleClick = () =>{
        setClicked(!clicked);
    }
    useEffect(() => {
        fetch("http://localhost:5000/userData",{
            method: "POST",
            crossDomain: true,
            headers: {
                "Content-Type": "application/json",
                Accept: "application/json",
                "Access-Control-Allow-Origin":"*",
            },
            body: JSON.stringify({
                token:window.localStorage.getItem("token"),
            }),
        })
        .then((res)=> res.json())
        .then((data)=>{
            console.log(data, "userData");
            setUserData(data.data);
        });
    },[]);
    return (
            <div className='Navigation'>
                <nav className='navbarItems'>
                    <h1 className='navbar-logo'> VIELANG</h1>
                    <div className='menu-icon' onClick={handleClick}>
                            <i className={clicked ? 'fas fa-times': 'fa fa-bars'}></i>
                    </div>
                    <ul className={clicked ? 'nav-menu active' : 'nav-menu'}>
                        {/* {MenuItems.map((item,index)=>{
                            return (
                                <li key = {index}>
                                    <Link className={item.cName} to={item.url}>
                                        {item.title}
                                    </Link>
                                </li>
                            )
                        })} */}
                        <li>
                            <Link className='nav-links' to='/home'>
                                HOME
                            </Link>
                        </li>
                        <li>
                            <Link className='nav-links' to='/#'>
                                LESSONS
                            </Link>
                        </li>
                        <li>
                            <Link className='nav-links' to='/membership'>
                                MEMBERSHIP
                            </Link>
                        </li>
                        <li>
                            <Link className='nav-links' to='/support'>
                                CONTACT
                            </Link>
                        </li>
                        <li>
                            <Link className='nav-links' to='/login' style={style2}>
                                SIGN IN
                            </Link>
                        </li>
                    </ul>
                    <img src={require('../../assets/image/user.png')} className='user-pic' alt='profile' onClick={toggleMenu} style={style1}/>
                    <div className={ toggled ? 'sub-menu-wrap open-menu' : 'sub-menu-wrap' } style={style1} >
                    {/* <div className='sub-menu-wrap' style={style1} id='subMenu' ref={ref}> */}
                        <div className='sub-menu'>
                            <div className='user-info'>
                                <img src={require('../../assets/image/user.png')}  alt='profile' />
                                <h2>{userData.name}</h2>
                            </div>
                            <hr/>

                            <Link to='/#' className='sub-menu-link'>
                                <img src={require('../../assets/image/profile.png')} alt='profile' />
                                <p>Edit profile</p>
                                {/* <span>{'>'}</span> */}
                            </Link>
                            <a href='/home' className='sub-menu-link' onClick={logOut}>
                                <img src={require('../../assets/image/logout.png')} alt='profile' />
                                <p>Logout</p>
                                {/* <span>{'>'}</span> */}
                            </a>

                        </div>
                    </div>
                </nav>
                <Routes>
                    <Route path="/home" element={<Home/>} />
                    <Route path='/login' element={<LoginForm/>}/>
                    <Route path='/signup' element={<SignupForm/>}/>
                    <Route path='/support' element={<Support/>}/>
                    <Route path='/membership' element={<Membership/>}/>
                    <Route path='/admin' element={<Manage/>}/>
                    <Route path='/forgot-password' element={<ForgotPassword/>}/>

                    {/* <Route path='/admin' render = {()=>{
                        return userData.role === 'admin' ? <Manage/> : <Navigate to = '/login'/>
                    }} /> */}
                    <Route path='/' element={<Auth/>}/>

                </Routes>
            </div>

        )
}

