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

