import React, { useState } from 'react';
import { MenuItems }   from "./Menu";
import LoginForm from '../LoginForm/LoginForm';
import SignupForm from '../SignupForm/SignupForm';
import Support from '../Support/Support';
import Membership from '../Membership/Membership';
import Home from '../Home/Home';
import {
    Routes,
    Route,
    Link
} from "react-router-dom";
import './Navbar.css';
import UserDetails from '../userDetails';
export default function Navbar() {
    // const state = { clicked: false}

    const [clicked, setClicked] = useState(false);
    const subMenu = document.getElementById("subMenu");

    const toggleMenu = () =>{
        subMenu.classList.toggle("open-menu");
    }

    const handleClick = () =>{
        // this.setState({ clicked: !state.clicked })
        setClicked(!clicked);
    }
        return (
            <div className='Navigation'>
                <nav className='navbarItems'>
                    <h1 className='navbar-logo'> VIELANG</h1>
                    <div className='menu-icon' onClick={handleClick}>
                            <i className={clicked ? 'fas fa-times': 'fa fa-bars'}></i>
                    </div>
                    <ul className={clicked ? 'nav-menu active' : 'nav-menu'}>
                        {MenuItems.map((item,index)=>{
                            return (
                                <li key = {index}>
                                    <Link className={item.cName} to={item.url}>
                                        {item.title}
                                    </Link>
                                </li>
                            )
                        })}
                    </ul>
                    <img src={require('../../assets/image/user.png')} className='user-pic' alt='profile' onClick={toggleMenu} />
                    <div className='sub-menu-wrap' id="subMenu">
                        <div className='sub-menu'>
                            <div className='user-info'>
                                <img src={require('../../assets/image/user.png')}  alt='profile' />
                                <h2>Việt Hoàng</h2>
                            </div>
                            <hr/>

                            <a href='/#' className='sub-menu-link'>
                                <img src={require('../../assets/image/profile.png')} alt='profile' />
                                <p>Edit profile</p>
                                <span>{'>'}</span>
                            </a>
                            <a href='/#' className='sub-menu-link'>
                                <img src={require('../../assets/image/logout.png')} alt='profile' />
                                <p>Logout</p>
                                <span>{'>'}</span>
                            </a>

                        </div>
                    </div>
                </nav>
                <Routes>
                    <Route path="/" element={<Home/>} />
                    <Route path='/login' element={<LoginForm/>}/>
                    <Route path='/signup' element={<SignupForm/>}/>
                    <Route path='/support' element={<Support/>}/>
                    <Route path='/membership' element={<Membership/>}/>
                    <Route path='/userDetails' element={<UserDetails/>}/>
                </Routes>
            </div>

        )
}

